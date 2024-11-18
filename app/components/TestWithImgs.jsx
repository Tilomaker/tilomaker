import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { titleAnimation, variantsAnimation } from "../helpers/animation";

export default function TestWithImgs({
  title,
  variants = [],
  button = "Вперед",
  formData,
  field,
  onNext,
  onFormDataChange,
}) {
  const [selectedValue, setSelectedValue] = useState(formData[field] || "");

  const isButtonDisabled = !selectedValue;

  const handleSelect = (key) => {
    setSelectedValue(key);
    onFormDataChange(field, key);
  };

  const handleButtonClick = () => {
    if (isButtonDisabled) {
      alert("Оберіть один з варіантів");
    } else {
      console.log("Next step initiated");
      console.log(`Введене значення для ${field}: `, selectedValue);
      onNext();
      setSelectedValue("");
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
        <ul className="flex flex-col gap-3 mt-8 mb-8">
          {variants.map((variantObj, index) => {
            const [key, variant] = Object.entries(variantObj)[0];
            const isSelected = selectedValue === key;

            return (
              <motion.li
                key={index}
                className={`cursor-pointer flex gap-8 items-center rounded-[14px] border px-3 transition-colors duration-300 max-h-[72px] overflow-y-hidden ${
                  isSelected
                    ? "border-2 border-customGreen bg-[#E6F8E0]"
                    : "border border-customGreen bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(key)}
                custom={index}
                variants={variantsAnimation}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src={variant.img}
                  alt={`Варіант ${key}`}
                  width={89}
                  height={68}
                  className="rounded-[14px]"
                  quality={100}
                />
                <p className="text-sm font-medium text-left">{variant.text}</p>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div>
        <Button
          fullWidth
          className={`fixed max-w-[80.6%] bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] text-white text-[15px] font-semibold ${
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
