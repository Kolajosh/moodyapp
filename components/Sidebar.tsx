// Sidebar.tsx
import Chart from "@public/assets/svgs/chartt.svg";
import Profile from "@public/assets/svgs/profilee.svg";
import Settings from "@public/assets/svgs/settingss.svg";
import Dashboard from "@public/assets/svgs/dashboardd.svg";
import Logout from "@public/assets/svgs/logoutt.svg";
import Image from "next/image";

interface SidebarProps {
  // Add any props if needed
}

const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div className="bg-[#37004C] w-[90px] h-screen overflow-hidden">
      <div className="flex flex-col h-full justify-between">
        <div className="mt-10 space-y-10 mx-auto">
          <div>
            <Image src={Dashboard} alt="Chart" />
          </div>
          <div>
            <Image src={Chart} alt="Chart" />
          </div>
          <div>
            <Image src={Profile} alt="Profile" />
          </div>
          <div>
            <Image src={Settings} alt="Settings" />
          </div>
        </div>
        <div className="mx-auto mb-10">
          <div>
            <Image src={Logout} alt="Settings" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
