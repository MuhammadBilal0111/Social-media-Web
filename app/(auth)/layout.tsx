import { Metadata } from "next";
import { Inter } from "next/font/google";

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
      <body className={`${inter.className} bg-gray-950`}>{children}</body>
      {/* by using inter.className the font style will be applied */}
    </html>
  );
}
