export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  displayName: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Friend {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl: string
}

export interface FriendRequest {
  _id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
}