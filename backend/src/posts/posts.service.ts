import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatedPost, Image, PostToCreate } from './dto/post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(postToCreate: PostToCreate): Promise<CreatedPost> {
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
     const updatedImg= await this.prisma.image.update({
        where: { id: image.id },
        data: { postId: createdPost.id },
      });
      console.log(updatedImg);
      
    }
    return createdPost;
  }
}
