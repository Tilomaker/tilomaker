import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  imageAnimation,
  subtitleAnimation,
  titleAnimation,
} from "../helpers/animation";

const getTargetDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 28);
  return today
    .toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(" р.", " ");
};

export default function GraphSecond({
  boldTxt,
  title,
  subtitle,
  image,
  info,
  button = "Вперед",
  onNext,
  formData,
}) {
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    setTargetDate(getTargetDate());
  }, []);

  return (
    <>
      <div>
        {title && (
          <motion.h3
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
            className="text-2xl uppercase font-bold leading-7"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {subtitle && (
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mt-3 text-[14px] mx-auto leading-5"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        <div className="mt-7">
          {image && (
            <motion.div
              variants={imageAnimation}
              initial="hidden"
              animate="visible"
              className="relative w-[280px] h-[280px] mx-auto"
            >
              <p className="text-[10px] absolute top-[1.5%] left-[11.5%] bg-customLightYellow">
                {formData.weight} кг
              </p>
              <p className="text-[10px] absolute top-[35%] right-[25%] bg-customGreen text-white">
                {formData.desiredWeight} кг
              </p>
              <Image
                className={image.className}
                src={image.src}
                alt="quiz image"
                width={240}
                height={180}
              />
            </motion.div>
          )}
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-[270px] text-lg mb-4 font-semibold leading-5"
            dangerouslySetInnerHTML={{ __html: boldTxt }}
          />
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="max-w-72 mx-auto text-lg mb-4 font-semibold leading-5"
          >
            <span className="text-customGreen">
              {formData.desiredWeight} кг
            </span>{" "}
            до <span className="text-customGreen">{targetDate}</span>
          </motion.p>
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mx-auto text-base mb-16 leading-5"
            dangerouslySetInnerHTML={{ __html: info }}
          />
          <Button
            fullWidth
            className="fixed max-w-[80.6%] sm:max-w-[600px]  bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] bg-customGreen text-white text-[15px] font-semibold"
            onPress={onNext}
          >
            {button}
          </Button>
        </div>
      </div>
    </>
  );
}
