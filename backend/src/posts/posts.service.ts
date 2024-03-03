import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PostType, Image, PostToCreate, NewPostDataDto } from './dto/post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(postToCreate: PostToCreate): Promise<PostType> {
    const userId = postToCreate.userId;
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
      ? { userpicturePath: user.picturePath, ...postToCreate }
      : postToCreate;

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
    if(post.userId !== userId) {
      throw new ForbiddenException('Only the original author can delete his content!')
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
    if(post.userId !== userId) {
      throw new ForbiddenException('Only the original author can edit his content!')
    }
    console.log(newPostData);
    
    if (Object.keys(newPostData).length === 0 ) {
      throw new NotFoundException('Nothing to update');
    }
    try {

      if(newPostData.picturePath){
        const updatedImg = await this.prisma.image.update({
          where:{
            path:post.picturePath
          },
          data:{path:newPostData.picturePath}
        })
        console.log("Updated Image" + updatedImg.path);
        
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
}
