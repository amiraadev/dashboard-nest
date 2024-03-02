export class UserDto {
    firstName: string;
    lastName: string;
    email: string;
    picturePath?: string;
    location?: string;
    occupation?: string;
    viewedProfile:number;
    impressions:number;
  }

  export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    picturePath?: string,
    location?: string,
    occupation?: string,
    viewedProfile:number,
    impressions: number,
  }
  export interface Friend {
    id: string,
    userId: string,
    firstName: string,
    lastName: string,
    picturePath?: string,
    occupation?:string,
    location?: string,
  }
