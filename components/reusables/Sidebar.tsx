// Sidebar.tsx
import { signOut } from "next-auth/react";
import Chart from "@assets/svgs/chartt.svg";
import Profile from "@assets/svgs/profilee.svg";
import Settings from "@assets/svgs/settingss.svg";
import Dashboard from "@assets/svgs/dashboardd.svg";
import Logout from "@assets/svgs/logoutt.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DashboardIcon, ChartIcon } from "@utils/icon"

interface SidebarProps {
  // Add any props if needed
}

const Sidebar: React.FC<SidebarProps> = () => {
  const router = useRouter();
  const pathname = window?.location.pathname;
  
  return (
    <div className="bg-[#fff] w-[90px] h-screen overflow-hidden">
      <div className="flex flex-col h-full justify-between py-10">
        <div className="space-y-10 w-full md:w-auto flex flex-col justify-center items-center text-center font-light font-inter text-sm mx-auto">
          <div className="text-lg font-medium text-black ">MB</div>
          <div
            className={`text-white ${pathname === "/dashboard" && "bg-[#37004C] p-3 rounded-lg"} flex items-center gap-2 cursor-pointer`}
            onClick={() => router.push("/dashboard")}
          >
            <DashboardIcon stroke={pathname === "/dashboard" ? "#fff" : "#292D32"} />
          </div>
          <div
            className={`text-white ${pathname === "/analytics" && "bg-[#37004C] p-3 rounded-lg"} flex items-center gap-2 cursor-pointer`}
            onClick={() => router.push("/analytics")}
          >
            {/* <Image src={Chart} width={25} alt="Chart" /> */}
            <ChartIcon stroke={pathname === "/analytics" ? "#fff" : "#292D32"} />
          </div>
          <div className="text-white flex items-center font-regular gap-2">
            <Image src={Profile} width={25} alt="Profile" />
          </div>
          <div className="text-white flex items-center font-regular gap-2">
            <Image src={Settings} width={25} alt="Settings" />
          </div>
        </div>
        <div className="mx-auto font-inter">
          <div
            className="flex gap-2 font-regular text-sm text-white items-center cursor-pointer"
            onClick={() => signOut()}
          >
            <Image src={Logout} width={25} alt="Settings" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
