import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {  User, updatedUserData } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      picturePath: user.picturePath,
      location: user.location,
      occupation: user.occupation,
      viewedProfile: user.viewedProfile,
      impressions: user.impressions,
    };
  }

  async follow(currentUserId, userIdToFollow) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id: currentUserId },
    });

    const userToFollow = await this.prisma.user.findUnique({
      where: { id: userIdToFollow },
    });

    if (!currentUser || !userToFollow) {
      throw new NotFoundException('User or user to follow not found');
    }
    const userFollowings = await this.prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
      include: {
        following: true,
      },
    });
  
    const isFollowing = userFollowings.following.some((following) => following.id === userIdToFollow);
  
    if (!isFollowing) {
       await this.prisma.user.update({
        where: { id: currentUserId },
        data: {
          following: {
            connect: { id: userIdToFollow },
          },
        },
      });
      return {
        id:userToFollow.id,
        firstName:userToFollow.firstName,
        lastName:userToFollow.lastName,
      }
    
    } else {
       await this.prisma.user.update({
        where: { id: currentUserId },
        data: {
          following: {
            disconnect: { id: userIdToFollow },
          },
        },
      });
      return {
        id:userToFollow.id,
        firstName:userToFollow.firstName,
        lastName:userToFollow.lastName,
      }
    }
  }

  async getFollowing(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userWithFollowings = await this.prisma.user.findUnique({
      where: { id: userId },
      include:{following: true}
    });

    const formattedFollowings = userWithFollowings.following.map(following =>{
      const {
        firstName, lastName ,picturePath,
        ...rest
      } = following;

      return {
        firstName,
        lastName,
        picturePath
      }; 
    })

    return formattedFollowings;
  }

  async updateUserData(
    userId: string,
    newUserData: updatedUserData,
  ): Promise<updatedUserData> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!newUserData) {
      throw new NotFoundException('Nothing to update');
    }
    try {
      const updatedUserData = {
        ...user,
        ...newUserData,
      };

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: updatedUserData,
      });

      const returnedUpdatedUser = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        picturePath: updatedUser.picturePath,
        location: updatedUser.location,
        occupation: updatedUser.occupation,
      };
      return returnedUpdatedUser;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async DeleteUser(userId: string): Promise<updatedUserData> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    try {
      const deletedUser = this.prisma.user.delete({
        where: { id: userId },
      });
      return deletedUser;
    } catch (error) {
      console.log(error);
    }
  }

  async getLikesByUser(userId) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userWithLikes = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        likes: {
          include: {
            user: true,
          },
        },
      },
    });

    const transformedlikes = userWithLikes.likes.map((like) => {
      const {
        user: { firstName, lastName },
        ...rest
      } = like;

      return {
        ...rest,
        authorFirstName: firstName,
        authorLastName: lastName,
      };
    });
    return transformedlikes;
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
        userId,
      },
      include: { user: true, post: true },
    });
    const transformedComments = comments.map((comment) => {
      const {
        user: { firstName, lastName },
        post: { title, description, picturePath, userpicturePath },
        ...rest
      } = comment;

      return {
        ...rest,
        authorFirstName: firstName,
        authorLastName: lastName,
        authorPicture: userpicturePath,
        postPicture: picturePath,
        postTitle: title,
        postDescription: description,
      };
    });
    return transformedComments;
  }

  

  
}
