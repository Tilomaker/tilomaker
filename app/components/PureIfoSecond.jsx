import { Button } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  titleAnimation,
  subtitleAnimation,
  imageAnimation,
} from "../helpers/animation";

export default function PureInfoSecond({
  title,
  image,
  info,
  button = "Вперед",
  onNext,
}) {
  return (
    <>
      <div>
        {title && (
          <motion.h3
            className="text-2xl uppercase font-bold leading-7"
            dangerouslySetInnerHTML={{ __html: title }}
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
          />
        )}
      </div>
      <div className="bg-[#A9CD502E] rounded-[16px] border-2 border-[#D1EC8C] mb-16">
        {image && (
          <motion.div
            className={image.className}
            variants={imageAnimation}
            initial="hidden"
            animate="visible"
          >
            <Image
              src={image.src}
              alt="quiz image"
              width={200}
              height={280}
              className="w-full h-auto"
              quality={100}
            />
          </motion.div>
        )}
        <motion.p
          className="mx-auto text-[15px] leading-5 py-[12px] px-[19px] text-left"
          dangerouslySetInnerHTML={{ __html: info }}
          variants={subtitleAnimation}
          initial="hidden"
          animate="visible"
        />
      </div>

      <div>
        <Button
          fullWidth
          // className="fixed max-w-[80.6%] sm:max-w-[600px]  bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] bg-customGreen text-white text-[15px] font-semibold"
          className=" max-w-[80.6%] sm:max-w-[600px] h-[50px] bg-customGreen text-white text-[15px] font-semibold"
          onPress={onNext}
        >
          {button}
        </Button>
      </div>
    </>
  );
}
