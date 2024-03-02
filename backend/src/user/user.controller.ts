import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Friend, User } from './dto/user.dto';
import { AtGuard } from 'src/common/decorators/guards';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AtGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
  @UseGuards(AtGuard)
  @Get('/:id/friends')
  @HttpCode(HttpStatus.OK)
  getUserFriends(@Param('id') id: string):  Promise<Friend[]> {
    return this.userService.getUserFriends(id);
  }
  @UseGuards(AtGuard)
  @Post('/:id')
  @HttpCode(HttpStatus.OK)
  addRemoveFriend(@Param('id') id: string,@Body('friendId') friendId:string):  Promise<Friend> {
    return this.userService.addRemoveFriend(id,friendId);
  }

  
}
