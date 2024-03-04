import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostType, PostDto, NewPostDataDto } from './dto/post.dto';
import { AtGuard } from 'src/common/decorators/guards';
import { Request } from 'express';
import { ReqUser } from 'src/user/dto/user.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AtGuard)
  @Post('create')
  @HttpCode(HttpStatus.OK)
   createPost(
    @Req() req: Request & { user: ReqUser },
    @Body() postDto: PostDto,
  // ): Promise<PostType> {
  ) {
    return postDto;
    
    // const userId = req.user.sub;
    // const postToBeCreated = { userId, ...postDto };
    // return this.postsService.createPost(postToBeCreated);
  }


  @UseGuards(AtGuard)
  @Delete('delete/:postId')
  @HttpCode(HttpStatus.OK)
  deletePost(
    @Req() req: Request & { user: ReqUser },
    @Param('postId') postId: string,
  ): Promise<PostType> {
    const userId = req.user.sub;
    return this.postsService.deletePost(userId, postId);
  }


  @UseGuards(AtGuard)
  @Patch('update/:postId')
  @HttpCode(HttpStatus.OK)
  updatePost(
    @Req() req: Request & { user: ReqUser },
    @Param('postId') postId: string,
    @Body() newPostData: NewPostDataDto
  ): Promise<PostType> { 
    console.log(newPostData);
    
        const userId = req.user.sub;
    return this.postsService.updatePost(userId, postId, newPostData);
  }

  @UseGuards(AtGuard)
  @Get('getPost/:postId')
  @HttpCode(HttpStatus.OK)
  getPostById(
    @Req() req: Request & { user: ReqUser },
    @Param('postId') postId: string,
  ): Promise<PostType> { 
        const userId = req.user.sub;
    return this.postsService.getPostById(userId, postId);
  }


  @UseGuards(AtGuard)
  @Get('getPosts/:userId/:postId')
  @HttpCode(HttpStatus.OK)
  getPostsByUser(
    @Param('userId') userId: string,
  ): Promise<PostType[]> { 
    return this.postsService.getPostsByUser(userId);
  }
  @UseGuards(AtGuard)
  @Get('allPosts')
  @HttpCode(HttpStatus.OK)
  getAllPosts(
    @Req() req: Request & { user: ReqUser },
    @Param('userId') userId: string,
  ): Promise<PostType[]> { 
    return this.postsService.getAllPosts(userId);
  }


}
