import Cursor from "@/components/Cursor";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body>
        <Cursor />
        {children}
      </body>
    </html>
  );
}
