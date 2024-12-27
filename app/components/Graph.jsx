import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  imageAnimation,
  subtitleAnimation,
  titleAnimation,
} from "../helpers/animation";

// Функция для получения даты + 36 дней
const getTargetDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 36); // Добавляем 36 дней к сегодняшней дате
  return today
    .toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .replace(" р.", " року");
};

export default function Graph({
  bigTitle,
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
        {bigTitle && (
          <motion.h1
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
            className="text-4xl uppercase font-bold text-customGreen"
            dangerouslySetInnerHTML={{ __html: bigTitle }}
          />
        )}
        {title && (
          <motion.h3
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="text-2xl uppercase font-bold leading-7"
            dangerouslySetInnerHTML={{
              __html: `${title} до <span class='text-customGreen'>${formData.desiredWeight} кг</span> уже до <span class='text-customGreen'>${targetDate}</span>`,
            }}
          />
        )}
        {subtitle && (
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mt-3 max-w-72 mx-auto leading-5"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
      </div>
      {image && (
        <motion.div
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
          className="relative w-[280px] h-[280px] mx-auto overflow-x-hidden"
        >
          <p className="text-xs absolute top-[3%] left-[4.5%] bg-customLightYellow">
            {formData.weight} кг
          </p>
          <p className="absolute text-xs bottom-[52%] right-[19.5%] bg-customGreen text-white px-1">
            {formData.desiredWeight} кг
          </p>
          <Image
            className={image.className}
            src={image.src}
            alt="quiz image"
            width={300}
            height={280}
          />
        </motion.div>
      )}
      <div>
        <motion.p
          variants={subtitleAnimation}
          initial="hidden"
          animate="visible"
          className="max-w-72 mx-auto text-base mb-16 leading-5"
          dangerouslySetInnerHTML={{ __html: info }}
        />
        <Button
          fullWidth
          // className="fixed max-w-[80.6%] sm:max-w-[600px]  bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] bg-customGreen text-white text-[15px] font-semibold"
          className=" max-w-[80.6%] sm:max-w-[600px]   h-[50px] bg-customGreen text-white text-[15px] font-semibold"
          onPress={onNext}
        >
          {button}
        </Button>
      </div>
    </>
  );
}
