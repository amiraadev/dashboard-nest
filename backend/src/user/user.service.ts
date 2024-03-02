import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Friend, User } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from 'src/auth/dto';

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



  async addRemoveFriend(id: string, friendId: string): Promise<Friend> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const friend = await this.prisma.user.findUnique({
      where: { id: friendId },
    });
    if (!friend) {
      throw new NotFoundException(
        'there is no such a friend subscribed in this platform!',
      );
    }
    const userFriends = await this.prisma.user
      .findUnique({
        where: { id: id },
      })
      .friends();

    const friendExist = userFriends.find((frd) => {
      return frd.id === friendId;
    });

    if (!friendExist) {
      console.log("this friend does not exist in the friend's list");

      const friendToAdd = {
        id: friend.id,
        userId: user.id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        picturePath: friend.picturePath,
        occupation: friend.occupation,
        location: friend.location,
      };
      const addedFriend = await this.prisma.friend.create({
        data: friendToAdd,
      });
      const userToAdd = {
        id: user.id,
        userId: addedFriend.id,
        firstName: user.firstName,
        lastName: user.lastName,
        picturePath: user.picturePath,
        occupation: user.occupation,
        location: user.location,
      }
      await this.prisma.friend.create({
        data: userToAdd,
      });
      console.log(
        `${addedFriend.firstName} ${addedFriend.lastName} has been added to the friend's list of ${user.firstName} ${user.lastName}`,
      );
      return addedFriend;
    }

    const removedFriend = await this.prisma.friend.delete({
      where: {
        id: friendId,
        userId: id,
      },
    });

    await this.prisma.friend.delete({
      where: {
        id: id,
        userId: friendId,
      },
    });
    console.log(
      `${removedFriend.firstName} ${removedFriend.lastName} has been removed from the friend's list of ${user.firstName} ${user.lastName}`,
    );
    return removedFriend;
  }



  async updateFriend(userId: string,updatedUser:SignUpDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where:{
        id: userId,
      }
    })
    if (!user){
      throw new NotFoundException('User not found');
    }
  try {
    const updatedUserData = {
      ...user,
      ...updatedUser, 
    };

    const UpdatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updatedUserData,
    });

    return UpdatedUser;
  } catch (error) {
    throw new InternalServerErrorException('Failed to update user');
  }
 


  }

}
