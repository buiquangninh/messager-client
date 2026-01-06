import Sidebar from "../components/SideBar/Sidebar";
import UserList from "./components/UserList";
import { getFriends } from "@/services/friendsService";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const friends = await getFriends();
  console.log("friends", friends);

  return (
    <Sidebar>
      <div className="h-full">
        <UserList items={friends} />
        {children}
      </div>
    </Sidebar>
  );
}
