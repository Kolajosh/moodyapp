// Sidebar.tsx
import { signOut } from "next-auth/react";
import Chart from "@assets/svgs/chartt.svg";
import Profile from "@assets/svgs/profilee.svg";
import Settings from "@assets/svgs/settingss.svg";
import Dashboard from "@assets/svgs/dashboardd.svg";
import Logout from "@assets/svgs/logoutt.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SidebarProps {
  // Add any props if needed
}

const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();
  return (
    <div className="bg-[#37004C] w-[60px] md:w-[160px] h-screen overflow-hidden">
      <div className="flex flex-col h-full justify-between py-10">
        <div className="space-y-10 w-full md:w-auto flex flex-col justify-center items-center md:items-start text-center font-light font-inter text-sm mx-auto">
          <div className="text-lg font-semibold text-white ">Moodboard</div>
          <div
            className="text-white flex items-center gap-2 cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            <Image src={Dashboard} width={25} alt="Chart" />
            <span className="hidden md:block">Dashboard</span>
          </div>
          <div
            className="text-white flex items-center font-regular gap-2 cursor-pointer"
            onClick={() => router.push("/analytics")}
          >
            <Image src={Chart} width={25} alt="Chart" />
            <span className="hidden md:block">Analytics</span>
          </div>
          <div className="text-white flex items-center font-regular gap-2">
            <Image src={Profile} width={25} alt="Profile" />
            <span className="hidden md:block">Profile</span>
          </div>
          <div className="text-white flex items-center font-regular gap-2">
            <Image src={Settings} width={25} alt="Settings" />
            <span className="hidden md:block">Settings</span>
          </div>
        </div>
        <div className="mx-auto font-inter">
          <div
            className="flex gap-2 font-regular text-sm text-white items-center cursor-pointer"
            onClick={() => signOut()}
          >
            <Image src={Logout} width={25} alt="Settings" />
            <span className="hidden md:block">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
