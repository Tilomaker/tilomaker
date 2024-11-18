import { useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  imageAnimation,
  subtitleAnimation,
  titleAnimation,
  variantsAnimation,
} from "../helpers/animation";

export default function TestMultiSelect({
  title,
  subtitle,
  image,
  button = "Вперед",
  onNext,
  formData,
  onFormDataChange,
  field,
  variants = [],
}) {
  const [selectedValues, setSelectedValues] = useState(formData[field] || []);

  const isButtonDisabled = selectedValues.length === 0;

  const handleSelect = (key) => {
    const isSelected = selectedValues.includes(key);

    const newSelectedValues = isSelected
      ? selectedValues.filter((item) => item !== key)
      : [...selectedValues, key];

    setSelectedValues(newSelectedValues);
    onFormDataChange(field, newSelectedValues);
  };

  const handleButtonClick = () => {
    if (isButtonDisabled) {
      alert("Оберіть хоча б один варіант");
    } else {
      console.log("Next step initiated");
      console.log(`Введене значення для ${field}: `, selectedValues);
      onNext();
      setSelectedValues([]);
    }
  };

  return (
    <>
      <div>
        {title && (
          <motion.h3
            className="text-2xl uppercase font-bold leading-7"
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        {subtitle && (
          <motion.p
            className="mt-3 max-w-72 mx-auto leading-5"
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        <div>
          <ul className="my-6 space-y-2">
            {variants.map((variant, index) => {
              const key = Object.keys(variant)[0];
              const text = variant[key];
              const isSelected = selectedValues.includes(key);

              return (
                <motion.li
                  key={index}
                  onClick={() => handleSelect(key)}
                  className={`flex items-center justify-center cursor-pointer border h-[50px] rounded-xl bg-[#A9CD5030] ${
                    index === 0 ? "w-full" : "w-[125px] ml-auto"
                  } ${isSelected ? "border-black" : "border-transparent"}`}
                  variants={variantsAnimation}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                >
                  {text}
                </motion.li>
              );
            })}
          </ul>

          {image && (
            <motion.div
              className="absolute left-7 top-64 h-2/4 w-auto"
              variants={imageAnimation}
              initial="hidden"
              animate="visible"
            >
              <Image
                src={image}
                alt="quiz image"
                width={238}
                height={503}
                className="max-w-64 h-full w-auto"
                quality={100}
              />
            </motion.div>
          )}
        </div>
      </div>

      <div>
        <Button
          fullWidth
          className={`h-[50px] text-white text-[15px] font-semibold ${
            isButtonDisabled
              ? "bg-[#C3C3C3] cursor-not-allowed"
              : "bg-customGreen"
          }`}
          onPress={handleButtonClick}
        >
          {button}
        </Button>
      </div>
    </>
  );
}
