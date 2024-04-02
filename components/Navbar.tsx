"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  // Add any props is needed
}

const Navbar: React.FC<NavbarProps> = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  const [providers, setProviders] = useState<any>(null);

  console.log(providers);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  useEffect(() => {
    if (session?.user) {
      router.push("dashboard");
    }
  }, [session]);

  return (
    <>
      <nav className="flex justify-between items-center px-10 py-5">
        <div className="font-bold text-2xl">Moodboard</div>
        <div className="flex justify-center font-medium items-center gap-10">
          <div>About</div>
          <div>Contact</div>
          <div>Partnership</div>
        </div>
        <div>
          <div>
            {providers &&
              Object.values(providers)?.map((provider) => (
                <button
                  type="button"
                  key={provider?.name}
                  onClick={() => signIn(provider?.id)}
                  className={`${
                    session?.user
                      ? "hidden"
                      : "font-semibold px-5 py-2 border border-[#7B00A8] bg-[#EBD9F2] rounded-xl text-lg"
                  }`}
                >
                  Login
                </button>
              ))}
          </div>
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
        </div>
      </nav>
    </>
  );
};

export default Navbar;
