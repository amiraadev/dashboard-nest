import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsString()
  @IsOptional()
  location?: string | undefined;
  @IsString()
  @IsOptional()
  picturePath?: string | undefined;
}

export class CommentDto {
  @IsString()
  comment: string;
 
}
export interface PostToCreate {
  userId: string;
  title: string;
  description: string;
  location?: string;
  picturePath?: string;
  userpicturePath?: string;
}
export interface PostType {
  id: string;
  userId: string;
  title: string;
  description: string;
  location?: string;
  picturePath?: string;
  userpicturePath?: string;
}

export class NewPostDataDto {
  title?: string | null;
  description?: string | null;
  location?: string | null;
  picturePath?: string | null;
}
export interface Image {
  id?: string;
  path: string;
  userId?: string;
  postId?: string;
}
