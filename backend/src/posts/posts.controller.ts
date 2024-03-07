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
import { PostType, NewPostDataDto, PostToCreate, CommentDto } from './dto/post.dto';
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
    @Body() postDto: PostToCreate,
  ) {
    const userId = req.user.sub;
    return this.postsService.createPost(userId,postDto);
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
    return this.postsService.getPostsByUserId(userId);
  }

  @UseGuards(AtGuard)
  @Post('like/:postId')
  @HttpCode(HttpStatus.OK)
  likePost(
    @Req() req: Request & { user: ReqUser },
    @Param('postId') postId: string,
  // ): Promise<PostType[]> { 
  ) { 
    const userId = req.user.sub;
    return this.postsService.likePost(userId,postId);
  }

  @UseGuards(AtGuard)
  @Post('commentOn/:postId')
  @HttpCode(HttpStatus.OK)
  commentPost(
    @Req() req: Request & { user: ReqUser },
    @Param('postId') postId: string,
    @Body() commentContent: CommentDto,
  ) { 
    const userId = req.user.sub;
    return this.postsService.commentOnPost(userId,postId,commentContent);
  }

  @UseGuards(AtGuard)
  @Get('get/comments/:postId')
  @HttpCode(HttpStatus.OK)
  getCommentsByPostId(
    @Param('postId') postId: string,
  ) { 
    return this.postsService.getCommentsByPostId(postId);
  }

  @UseGuards(AtGuard)
  @Get('likes/:postId')
  @HttpCode(HttpStatus.OK)
  getPostLikes(
    @Req() req: Request & { user: ReqUser },
    @Param("postId") postId:string
  ) { 
    const userId = req.user.sub;
    
    return this.postsService.getLikesByPostId(userId,postId);
  }


}
