import { Montserrat } from "next/font/google";
import Script from "next/script";
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '292102645600496');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=292102645600496&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="bg-customLightYellow overflow-x-hidden">{children}</body>
    </html>
  );
}
