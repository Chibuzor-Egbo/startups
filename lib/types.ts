export interface AuthorType {
  _id: number;
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
}

export interface StartupCardType {
  _id: number;
  _createdAt: string;
  views: number;
  author: AuthorType;
  description: string;
  image: string;
  category: string;
  title: string;
}

export interface Post {
  description: string;
  title: string;
  _createdAt: string;
  _id: string;
  pitch: string;
  category: string;
  image: string;
  author: AuthorType;
  views: number;
}
