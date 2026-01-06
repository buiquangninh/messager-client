import { authFetch } from "@/lib/auth-fetch";
import Sidebar from "../components/SideBar/Sidebar";
import UserList from "./components/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await authFetch("/friends");
  const users = await res.json();
  //   console.log("users", users);

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={users} />
        {children}
      </div>
    </Sidebar>
  );
}
