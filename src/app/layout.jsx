import "./globals.css";
import AppLayoutWrapper from "@/components/AppLayoutWrapper";

export const metadata = {
  title: "Yulduzlar LMS — Bo'lajak Pedagoglar Platformasi",
  description: "Next.js + Express.js + MongoDB asosidagi zamonaviy raqamli pedagogika platformasi"
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <AppLayoutWrapper>{children}</AppLayoutWrapper>
      </body>
    </html>
  );
}
