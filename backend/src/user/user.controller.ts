import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Friend, ReqUser, User } from './dto/user.dto';
import { AtGuard } from 'src/common/decorators/guards';
import { Request } from 'express';
import { SignUpDto } from 'src/auth/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AtGuard)
  @Get('/:id/details')
  @HttpCode(HttpStatus.OK)
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }
  @UseGuards(AtGuard)
  @Get('/friends')
  @HttpCode(HttpStatus.OK)
  getUserFriends( @Req() req: Request & { user: ReqUser }): Promise<Friend[]> {
    const userId = req.user.sub;
    return this.userService.getUserFriends(userId);
  }

  @UseGuards(AtGuard)
  @Post('add/remove/:friendId')
  @HttpCode(HttpStatus.OK)
  addRemoveFriend(
    @Req() req: Request & { user: ReqUser },
    @Param('friendId') friendId: string,
  ): Promise<Friend> {
    const userId = req.user.sub;
    return this.userService.addRemoveFriend(userId, friendId);
  }
  @UseGuards(AtGuard)
  @Post('update')
  @HttpCode(HttpStatus.OK)
  updateFriend(
    @Req() req: Request & { user: ReqUser },
    @Body() updatedUser:SignUpDto
  ): Promise<User> {
    const userId = req.user.sub;
    return this.userService.updateFriend(userId,updatedUser);
  }
}
