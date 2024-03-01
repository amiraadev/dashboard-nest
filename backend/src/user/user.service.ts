import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private readonly userService: PrismaService) {}

  getUserById(id: string){
    const user = this.userService.findUniqueUserById(id);
  }


  create(createUserDto: UserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
