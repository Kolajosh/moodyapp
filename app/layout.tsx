"use client";

import React from "react";
import "@styles/globals.css";
import Provider from "@components/reusables/Provider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SnackbarProvider } from "notistack";

// export const metadata = {
//   title: "Moodboard",
//   description: "Document your mood",
// };

const notistackRef = React.createRef();
// const onClickDismiss = key => () => notistackRef.current.closeSnackbar(key);

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <SnackbarProvider>
            <ToastContainer />
            <div className="">
              <div className="" />
            </div>
            <main className="w-full font-poppins">
              <div className="flex-grow">{children}</div>
            </main>
          </SnackbarProvider>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
