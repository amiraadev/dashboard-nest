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
import { Friend, User, UserDto } from './dto/user.dto';
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

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
