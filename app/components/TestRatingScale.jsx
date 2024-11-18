import { useState } from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  subtitleAnimation,
  titleAnimation,
  variantsAnimation,
} from "../helpers/animation";

export default function TestRatingScale({
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
        <motion.p
          variants={subtitleAnimation}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-[14px] leading-5 text-[15px]"
        >
          Чи погоджуєшся ти з цим твердженням?
        </motion.p>
        {title && (
          <motion.h3
            className="text-2xl uppercase font-bold leading-7"
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
      </div>

      <div>
        <motion.p
          variants={subtitleAnimation}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-[14px] text-xs mt-[14px]"
        >
          1 - зовсім не згодна, 5 - повністю погоджуюся
        </motion.p>
        <ul className="flex justify-center gap-2 mb-20">
          {variants.map((variantObj, index) => {
            const [key, variant] = Object.entries(variantObj)[0];
            const isSelected = selectedValue === key;

            return (
              <motion.li
                key={index}
                className={`px-6 py-[26px] w-14 h-[73px] flex justify-center items-center bg-[#A9CD5030] rounded-lg ${
                  isSelected ? "border-2 border-black" : "border-transparent"
                }`}
                variants={variantsAnimation}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => handleSelect(key)}
              >
                <p className="text-2xl font-bold">{variant}</p>
              </motion.li>
            );
          })}
        </ul>
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
