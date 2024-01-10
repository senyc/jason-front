import { LogOut } from "react-feather";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const logout = () => {
    deleteCookie('jwt');
    router.replace('/login');
  };
  return (
    <li className={`h-full w-full hover:bg-gray-100 justify-between px-4 py-1 transition duration-75 ease-in hover:text-gray-900`}>
      <button
        onClick={logout}
        className="flex h-full w-full flex-row items-center justify-between text-sm"
      >{"Log out"}
        <LogOut size={17} />
      </button>
    </li >
  );
}
