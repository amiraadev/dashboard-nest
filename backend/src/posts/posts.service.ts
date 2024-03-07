import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostType, Image, NewPostDataDto } from './dto/post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId, postToCreate): Promise<PostType> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    let image: Image | null = null;
    if (postToCreate.picturePath) {
      image = await this.prisma.image.create({
        data: { path: postToCreate.picturePath, userId: user?.id }, // Use optional chaining if user might be null
      });
    }

    const postData = user.picturePath
      ? { userpicturePath: user.picturePath, userId, ...postToCreate }
      : { userId, ...postToCreate };

    const createdPost = await this.prisma.post.create({
      data: postData,
    });

    if (image) {
      const updatedImg = await this.prisma.image.update({
        where: { id: image.id },
        data: { postId: createdPost.id },
      });
      console.log('updated image' + updatedImg);
    }
    return createdPost;
  }

  async deletePost(userId: string, postId: string): Promise<PostType> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException('User not found');
    }
    if (post.userId !== userId) {
      throw new ForbiddenException(
        'Only the original author can delete his content!',
      );
    }
    try {
      const deletedPost = await this.prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return {
        id: deletedPost.id,
        userId: deletedPost.userId,
        title: deletedPost.title,
        description: deletedPost.description,
        location: deletedPost.location,
        picturePath: deletedPost.picturePath,
        userpicturePath: deletedPost.userpicturePath,
      };
    } catch (error) {
      console.log('DELETE POST ERROR: ' + error);
    }
  }

  async updatePost(
    userId: string,
    postId: string,
    newPostData: NewPostDataDto,
  ): Promise<PostType> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    if (post.userId !== userId) {
      throw new ForbiddenException(
        'Only the original author can edit his content!',
      );
    }
    console.log(newPostData);

    if (Object.keys(newPostData).length === 0) {
      throw new NotFoundException('Nothing to update');
    }
    try {
      if (newPostData.picturePath) {
        const updatedImg = await this.prisma.image.update({
          where: {
            path: post.picturePath,
          },
          data: { path: newPostData.picturePath },
        });
        console.log('Updated Image' + updatedImg.path);
      }

      const updatedPostData = {
        ...post,
        ...newPostData,
      };

      const updatedPost = await this.prisma.post.update({
        where: { id: postId },
        data: updatedPostData,
      });

      const returnedUpdatedPost = {
        id: updatedPost.id,
        userId: updatedPost.userId,
        title: updatedPost.title,
        description: updatedPost.description,
        location: updatedPost.location,
        picturePath: updatedPost.picturePath,
        userpicturePath: updatedPost.userpicturePath,
      };
      return returnedUpdatedPost;
    } catch (error) {
      console.log('UPDATE POST ERROR: ' + error);

      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async getPostById(userId, postId): Promise<PostType> {
    const [user, post] = await this.prisma.$transaction([
      this.prisma.user.findUnique({
        where: { id: userId },
      }),
      this.prisma.post.findUnique({
        where: { id: postId },
      }),
    ]);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
  }

  async getPostsByUser(userId): Promise<PostType[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const posts = await this.prisma.post.findMany({
      where: { userId },
    });
    return posts;
  }

  async getAllPosts(userId): Promise<PostType[]> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async likePost(userId, postId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const listOfLikes = await this.prisma.post.findUnique({
      where: { id: postId },
      include: {
        likedBy: {
          select: {
            id: true,
          },
        },
      },
    });
    const userAlreadyLikesPst = listOfLikes.likedBy.some(
      (user) => user.id === userId,
    );

    if (userAlreadyLikesPst) {
      const PostMinusLike = await this.prisma.post.update({
        where: { id: postId },
        data: {
          likedBy: {
            disconnect: { id: userId },
          },
        },
      });
      return PostMinusLike;
    } else {
    }
    const PostPlusLike = await this.prisma.post.update({
      where: { id: postId },
      data: {
        likedBy: {
          connect: { id: userId },
        },
      },
    });
    return PostPlusLike;
  }

  async AddComment(userId, postId, commentContent) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const newComment = await this.prisma.comment.create({
      data: {
        content: commentContent.comment,
        user: {
          connect: { id: userId },
        },
        post: {
          connect: { id: postId },
        },
      },
    });
    return newComment;
  }

  async getCommentsByPostId(postId) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }
    const comments = await this.prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include:{user: true,post: true}
    });
    const transformedComments = comments.map((comment) => {
      
      const { user: { firstName, lastName },post:{title,description,picturePath,userpicturePath}, ...rest } = comment;
    
      return {
        ...rest, 
        authorFirstName: firstName, 
        authorLastName: lastName, 
        authorPicture: userpicturePath, 
        postPicture:picturePath,
        postTitle:title,
        postDescription:description,
      };
    });
    return transformedComments
  }

  async getCommentsByUser(userId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const comments = await this.prisma.comment.findMany({
      where: {
        userId
      },
      include:{user: true,post: true}
    });
    const transformedComments = comments.map((comment) => {
      
      const { user: { firstName, lastName },post:{title,description,picturePath,userpicturePath}, ...rest } = comment;
    
      return {
        ...rest, 
        authorFirstName: firstName, 
        authorLastName: lastName, 
        authorPicture: userpicturePath, 
        postPicture:picturePath,
        postTitle:title,
        postDescription:description,
      };
    });
    return transformedComments
  
  }
}
