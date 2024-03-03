import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatedPost, PostDto } from './dto/post.dto';
import { AtGuard } from 'src/common/decorators/guards';
import { Request } from 'express';
import { ReqUser } from 'src/user/dto/user.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @UseGuards(AtGuard)
  @Post("create")
  @HttpCode(HttpStatus.OK)
  createPost( @Req() req: Request & { user: ReqUser }, @Body() postDto: PostDto): Promise<CreatedPost> {
   const userId = req.user.sub
   const postToBeCreated = {userId,...postDto}
    return this.postsService.createPost(postToBeCreated);
  }


  @UseGuards(AtGuard)
  @Delete("delete/:postId")
  @HttpCode(HttpStatus.OK)
  deletePost( @Req() req: Request & { user: ReqUser },@Param("postId") postId:string ): Promise<CreatedPost> {
   const userId = req.user.sub
    return this.postsService.deletePost(userId,postId);
  }

  
}
