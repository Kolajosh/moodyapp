import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Moodboard",
  description: "Document your mood",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="">
            <div className="" />
          </div>
          <main className="w-full font-poppins">
            <div className="flex-grow">{children}</div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
