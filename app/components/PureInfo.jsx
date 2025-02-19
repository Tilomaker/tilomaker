import { Button } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  titleAnimation,
  subtitleAnimation,
  imageAnimation,
} from "../helpers/animation";
import { useRouter } from "next/navigation";

export default function PureInfo({
  bigTitle,
  title,
  subtitle,
  image,
  info,
  button = "Вперед",
  onNext,
  link,
}) {
  const router = useRouter();

  const handleStartTrial = () => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "StartTrial");
    }
  };

  const handleClick = () => {
    console.log("StartTrial triggered");
    handleStartTrial();
    setTimeout(() => {
      router.push("/tilomaker");
    }, 200);
  };

  return (
    <>
      <div>
        {bigTitle && (
          <motion.h1
            className="text-4xl uppercase font-bold text-customGreen"
            dangerouslySetInnerHTML={{ __html: bigTitle }}
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
          />
        )}
        {title && (
          <motion.h3
            className="text-2xl uppercase font-bold leading-7"
            dangerouslySetInnerHTML={{ __html: title }}
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
          />
        )}
        {subtitle && (
          <motion.p
            className="mt-3 text-sm mx-auto leading-5"
            dangerouslySetInnerHTML={{ __html: subtitle }}
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
          />
        )}
      </div>
      {image && (
        <motion.div
          className={`${image.className} ${
            image.src == "/images/women/taking-photo.png"
              ? "h-[57%] w-auto"
              : ""
          }`}
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
        >
          <Image
            className={
              image.src == "/images/women/yoga.png"
                ? "h-[270px] w-auto"
                : image.src == "/images/women/taking-photo.png"
                ? "h-[100%] w-auto"
                : ""
            }
            src={image.src}
            alt="quiz image"
            width={300}
            height={280}
            quality={100}
          />
        </motion.div>
      )}
      <div>
        <motion.p
          className="mx-auto text-base mb-16 leading-5"
          dangerouslySetInnerHTML={{ __html: info }}
          variants={subtitleAnimation}
          initial="hidden"
          animate="visible"
        />
      </div>
      {link ? (
        <Button
          onPress={handleClick}
          fullWidth
          className="fixed max-w-[80.6%] bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] bg-customGreen text-white text-[15px] font-semibold"
        >
          {button}
        </Button>
      ) : (
        <Button
          fullWidth
          className="fixed max-w-[80.6%] bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] bg-customGreen text-white text-[15px] font-semibold"
          onPress={onNext}
        >
          {button}
        </Button>
      )}
    </>
  );
}
