"use client";

import data from "./plot/plot.json";
import PureInfo from "./components/PureInfo";

export default function Home() {
  const { bigTitle, subtitle, image, info, link, button } = data[0];

  return (
    <main className="h-screen w-screen outline-none flex flex-col justify-between pt-12 pb-8 px-10 bg-customLightYellow max-w-[400px] mx-auto overflow-y-auto">
      <PureInfo
        bigTitle={bigTitle}
        subtitle={subtitle}
        image={image}
        info={info}
        link={link}
        button={button}
      />
    </main>
  );
}
