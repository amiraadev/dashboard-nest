import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Friend, User, updatedUserData } from './dto/user.dto';
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

  async getUserFriends(id: string): Promise<Friend[]> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const friends = await this.prisma.user
      .findUnique({
        where: { id: id },
      })
      .friends();

    return friends;
  }

  async addRemoveFriend(id: string, friendId: string) {
    const [user, friend] = await Promise.all([
      this.prisma.user.findUnique({ where: { id } }),
      this.prisma.user.findUnique({ where: { id: friendId } }),
    ]);
    if (!user || !friend) {
      if (!friend) {
        throw new NotFoundException('Friend not found');
      } else {
        throw new NotFoundException('User not found');
      }
    }
    const existingFriend = await this.prisma.user.findUnique({
      where: { id },
      select: { friends: { where: { friendId } } },
    });

    if (existingFriend.friends.length === 0) {
      const addedFriend = await this.prisma.friend.create({
        data: {
          friendId,
          userId: id,
          firstName: friend.firstName,
          lastName: friend.lastName,
          picturePath: friend.picturePath,
          occupation: friend.occupation,
          location: friend.location,
        },
      });
      console.log('friend added successfully');

      return addedFriend;
    } else {
      const deletedFriend = await this.prisma.friend.deleteMany({
        where: {
          AND: [{ friendId }, { userId: id }],
        },
      });
      console.log('friend deleted successfully');

      return deletedFriend;
    }
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
}
