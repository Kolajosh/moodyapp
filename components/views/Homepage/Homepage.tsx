"use client";

import Carousel from "@components/reusables/Carousel";
import CenterModal from "@components/reusables/CenterModal";
import Navbar from "@components/reusables/Navbar";
import PageLoader from "@components/reusables/PageLoader";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [providers, setProviders] = useState<any>(null);
  const [loginModal, toggleLoginModal] = useState<boolean>(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setUpProviders();
  }, []);

  useEffect(() => {
    if (session?.user) {
      toggleLoginModal(false);
      router.push("dashboard");
    }
  }, [session]);
  return (
    <>
      {!providers && <PageLoader message="Loading" />}

      <div className="font-poppins">
        <Navbar />
      </div>
      <section className="w-full flex-center mt-20 flex-col">
        <h1 className="text-center text-4xl font-medium">
          Document your mood whenever
        </h1>
        <div className="text-center mt-10">
          <p>Sign in to get started</p>
          {providers && (
            <button
              type="button"
              className={`${
                session?.user
                  ? "hidden"
                  : "font-semibold px-5 py-2 border mt-2 border-[#7B00A8] bg-[#EBD9F2] rounded-xl text-md"
              }`}
              onClick={() => toggleLoginModal(true)}
            >
              Login
            </button>
          )}
        </div>
        <div className="w-full mt-10 overflow-hidden">
          <Carousel />
        </div>
      </section>

      <CenterModal
        title="Login"
        isOpen={loginModal}
        onClose={() => toggleLoginModal(false)}
        width="w-3/12"
      >
        <div>
          <div className="text-center">
            {providers &&
              Object.values(providers)?.map((provider) => (
                <button
                  className="border-2 bg-black text-white rounded-lg p-3"
                  type="button"
                  key={provider?.name}
                  onClick={() => signIn(provider?.id)}
                >
                  Sign in with Google
                </button>
              ))}
          </div>
        </div>
      </CenterModal>
    </>
  );
};

export default Home;
