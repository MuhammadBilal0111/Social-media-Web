import { Metadata } from "next";
import { Inter } from "next/font/google";
import TopBar from "@/components/shared/TopBar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import BottomBar from "@/components/shared/BottomBar";

export const metadata: Metadata = {
  title: "Threads",
  description: "A Nextjs Meta Threads Application",
};
const inter = Inter({
  subsets: ["latin"], // because we have multiple subsets
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950`}>
        {/* navbar */}
        <TopBar />
        {/* main container */}
        <main>
          <LeftSidebar />
          <section>
            <div className="">{children}</div>
          </section>
          <RightSidebar />
        </main>
        {/* bottom bar */}
        <BottomBar />
      </body>
      {/* by using inter.className the font style will be applied */}
    </html>
  );
}
