
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
  picturePath?: string;
}
export interface Image {
  id?: string;
  path: string;
  userId?: string;
  postId?: string;
}
