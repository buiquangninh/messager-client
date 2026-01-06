import { User } from "./user";

export interface AuthState {
  user: User | null;
  loading: boolean;
  clearState: () => void;
  signUp: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  signIn: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}
