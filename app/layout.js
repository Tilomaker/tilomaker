import { Montserrat } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Квіз тренувальної програми",
  description: "Тіло твоєї мрії за місяць",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={`${montserrat.className}`}>
      <body className="bg-customLightYellow overflow-x-hidden">{children}</body>
    </html>
  );
}
