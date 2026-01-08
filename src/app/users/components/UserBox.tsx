import Avatar from "@/app/components/Avatar";
import api from "@/lib/axios";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await api.post("/conversations", {
        recipientId: data._id,
      });

      router.push(`/conversations/${res.data._id}`);
    } catch (error) {
      console.error("Conversation error: ", error);
      toast.error("Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="
          w-full 
          relative 
          flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-gray-900">
                {data.displayName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;
