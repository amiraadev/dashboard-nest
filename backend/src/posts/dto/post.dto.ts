export class PostDto {
  title: string;
  description: string;
  location?: string;
  picturePath?: string;
}

export interface PostToCreate {
  userId: string;
  title: string;
  description: string;
  location?: string;
  picturePath?: string;
  userpicturePath?: string;
}
export interface CreatedPost {
  id: string;
  userId: string;
  title: string;
  description: string;
  location?: string;
  picturePath?: string;
  userpicturePath?: string;
}
export interface Image {
  id?: string;
  path: string;
  userId?: string;
  postId?: string;
}
