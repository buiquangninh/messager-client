import Avatar from "@/app/components/Avatar";
import { User } from "@/types/user";

interface UserBoxProps {
  data: User;
}

const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  return (
    <>
      <div
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
