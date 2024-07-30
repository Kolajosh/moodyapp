"use client";

import { signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  // Add any props is needed
}

const Navbar: React.FC<NavbarProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();


  return (
    <>
      <nav className="flex rounded-full mt-5 border mx-5 shadow-xl justify-between items-center px-10 py-5">
        <div className="font-bold text-md md:text-xl">Moodboard</div>
        <div className="flex justify-center md:text-md text-sm font-medium items-center gap-5">
          <div>About</div>
          <div>Contact</div>
          <div>Partnership</div>
        </div>
        {/* <div>
          <div>
            {session?.user && (
              <button
                type="button"
                onClick={() => signOut()}
                className="font-semibold px-5 py-2 border bg-[#7B00A8] text-[#EBD9F2] rounded-xl text-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div> */}
      </nav>
    </>
  );
};

export default Navbar;
