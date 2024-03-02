import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Friend, ReqUser, User } from './dto/user.dto';
import { AtGuard } from 'src/common/decorators/guards';
import { Request } from 'express';

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
}
