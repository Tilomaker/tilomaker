import { useState } from "react";
import { Button, RadioGroup } from "@nextui-org/react";
import { motion } from "framer-motion";
import { titleAnimation, variantsAnimation } from "../../helpers/animation";
import CustomRadio from "./CustomRadio";

export default function TestRadioBtns({
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

  const handleSelect = (variantObj) => {
    setSelectedValue(variantObj);
    onFormDataChange(field, variantObj);
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
        <RadioGroup
          value={selectedValue}
          onValueChange={(value) => {
            setSelectedValue(value);
            onFormDataChange(field, value);
          }}
          className="flex flex-col gap-6 mt-11 mb-16"
        >
          {variants.map((variantObj, index) => {
            const [key, variant] = Object.entries(variantObj)[0];

            return (
              <motion.div
                key={index}
                className="mb-3"
                variants={variantsAnimation}
                initial="hidden"
                animate="visible"
                custom={index}
                onClick={() => handleSelect(variantObj)}
              >
                <CustomRadio
                  value={key}
                  isSelected={selectedValue === variantObj}
                  onChange={() => handleSelect(variantObj)}
                >
                  {variant}
                </CustomRadio>
              </motion.div>
            );
          })}
        </RadioGroup>
      </div>

      <div>
        <Button
          fullWidth
          className={`fixed max-w-[80.6%] sm:max-w-[600px] bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] text-white text-[15px] font-semibold ${
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
