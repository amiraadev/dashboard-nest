/** @format */

export interface User {
	firstName: string;
	lastName: string;
	email: string;
	picturePath?: string;
	location?: string;
	occupation?: string;
	viewedProfile: number;
	impressions: number;
	friends: string[];
}

export interface Post {
	id: string;
	userId: string;
	title: string;
	description: string;
	location: string;
	userpicturePath: string;
	picturePath: string;
	postPictures: string[];
	PostUserPicture: string;
}
export interface StateProps {
	mode: string;
	user: User | null;
	token: string | null;
	posts: Post[];
}

export interface RegisterProps {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	location: string;
	occupation: string;
	picture: string;
}
