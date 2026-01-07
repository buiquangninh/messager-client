import { authService } from "@/services/authService";
import { AuthState } from "@/types/store";
import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,
      clearState: () => {
        set({ accessToken: null, user: null, loading: false });
        localStorage.clear();
      },
      signUp: async (firstName, lastName, username, email, password) => {
        try {
          set({ loading: true });
          await authService.signUp(
            firstName,
            lastName,
            username,
            email,
            password
          );
          toast.success("Successfully signed up!");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(
              error?.response?.data?.message || "Error during sign up"
            );
          } else {
            console.log("Error during sign up:", error);
          }
        } finally {
          set({ loading: false });
        }
      },
      signIn: async (username, password) => {
        try {
          set({ loading: true });

          localStorage.clear();

          const { accessToken } = await authService.signIn(username, password);

          set({ accessToken });

          await get().fetchCurrentUser();
          toast.success("Successfully signed in!");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            toast.error(
              error?.response?.data?.message || "Error during sign in"
            );
          } else {
            console.log("Error during sign in:", error);
          }
        } finally {
          set({ loading: false });
        }
      },
      logout: async () => {
        try {
          set({ loading: true });
          await authService.logout();
          get().clearState();
          toast.success("Successfully logged out!");
        } catch (error) {
          console.log("Error during logout:", error);
        } finally {
          set({ loading: false });
        }
      },
      refresh: async () => {
        try {
          const { user, fetchCurrentUser } = get();

          const { accessToken } = await authService.refresh();

          set({ accessToken });

          if (!user) {
            await fetchCurrentUser();
          }
        } catch (error) {
          console.log("Error during refresh:", error);
          get().clearState();
        }
      },
      fetchCurrentUser: async () => {
        try {
          set({ loading: true });
          const user = await authService.fetchCurrentUser();
          set({ user });
        } catch (error) {
          set({ user: null });
          console.log("Error fetching current user:", error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
