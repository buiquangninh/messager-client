import api from "@/lib/axios";

export const authService = {
  signUp: async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) => {
    const response = await api.post(
      "/auth/signup",
      {
        firstName,
        lastName,
        username,
        email,
        password,
      },
      { withCredentials: true }
    );

    return response.data;
  },
  signIn: async (username: string, password: string) => {
    const response = await api.post(
      "/auth/signin",
      {
        username,
        password,
      },
      { withCredentials: true }
    );

    return response.data;
  },
  logout: async () => {
    const response = await api.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
    return response.data;
  },
  fetchCurrentUser: async () => {
    const response = await api.get("/auth/me", { withCredentials: true });
    return response.data.user;
  },
};
