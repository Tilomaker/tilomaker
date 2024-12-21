import { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import {
  calculateBMI,
  getBMIStatus,
  isSafeWeightLoss,
} from "../../helpers/calculateFunctions";
import { motion } from "framer-motion";

import Message from "./Message";
import {
  imageAnimation,
  subtitleAnimation,
  titleAnimation,
} from "../../helpers/animation";
import { MAX_WEIGHT_LOSS_DELTA } from "../../constants/constants";

export default function InputComponent({
  title,
  subtitle,
  warning,
  image,
  info,
  button = "Вперед",
  onNext,
  formData,
  onFormDataChange,
  field,
  input,
  ok,
  tooMuch,
  tooLittle,
}) {
  const [inputValue, setInputValue] = useState(formData[field] || "");
  const [message, setMessage] = useState("");
  const [warningSubtitle, setWarningVisible] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);

  useEffect(() => {
    const currentWeight = parseFloat(formData.weight);
    const height = formData.height;

    if (inputValue.length >= 2) {
      if (field === "desiredWeight") {
        handleDesiredWeightChange(currentWeight, height);
      } else if (field === "weight") {
        handleWeightChange();
      }
    }

    const isInvalidHeight = height >= 220;
    const isInvalidWeight =
      field === "desiredWeight" && parseFloat(inputValue) >= currentWeight;
    setIsBtnDisabled(
      isInvalidHeight || isInvalidWeight || inputValue.length < 2
    );
  }, [inputValue, field, formData.weight, formData.height]);

  const handleDesiredWeightChange = (currentWeight, height) => {
    if (inputValue.length < 2) {
      setWarningVisible(false);
      return;
    }

    const desiredWeight = parseFloat(inputValue);
    const bmiValue = calculateBMI(currentWeight, height);
    onFormDataChange("bmi", bmiValue);

    if (!isNaN(desiredWeight) && desiredWeight < currentWeight) {
      const weightDelta = currentWeight - desiredWeight;

      if (weightDelta > MAX_WEIGHT_LOSS_DELTA) {
        onFormDataChange(
          field,
          (currentWeight - MAX_WEIGHT_LOSS_DELTA).toString()
        );
        setWarningVisible(true);
      } else {
        onFormDataChange(field, inputValue);
        setWarningVisible(false);
      }

      const safeLossMessage = isSafeWeightLoss(
        currentWeight,
        desiredWeight,
        height
      );
      setMessage(safeLossMessage);
    } else {
      setMessage("");
      setWarningVisible(false);
    }
  };

  const handleWeightChange = () => {
    const currentWeight = parseFloat(inputValue);
    const bmiStatus = getBMIStatus(currentWeight, formData.height);
    onFormDataChange("bmiStatus", bmiStatus);
    setMessage(bmiStatus);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      onFormDataChange(field, value);
    }
  };

  const handleButtonClick = () => {
    const currentWeight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (height >= 220) {
      alert("Висота не може перевищувати 220 см.");
    } else if (field === "desiredWeight") {
      const desiredWeight = parseFloat(inputValue);
      if (isNaN(desiredWeight) || desiredWeight >= currentWeight) {
        alert("Бажана вага не може бути рівною або більшою за поточну вагу.");
      } else {
        proceedToNextStep();
      }
    } else if (inputValue.length < 2) {
      alert("Введіть валідні дані");
    } else {
      proceedToNextStep();
    }
  };

  const proceedToNextStep = () => {
    console.log("Перейдемо на наступний крок з значенням:", inputValue);
    onNext();
    setInputValue("");
    setMessage("");
  };

  const buttonClass = isBtnDisabled
    ? "bg-[#C3C3C3] cursor-not-allowed"
    : "bg-customGreen";

  return (
    <>
      <div>
        {title && (
          <motion.h3
            className="text-2xl uppercase font-bold leading-7"
            dangerouslySetInnerHTML={{ __html: title }}
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
          />
        )}
        {subtitle && (
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mt-3 mx-auto leading-5"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}
        {warningSubtitle && (
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mt-3 max-w-72 mx-auto leading-5"
            dangerouslySetInnerHTML={{ __html: warning }}
          />
        )}
        <motion.div
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
        >
          <Input
            className="text-base font-semibold mt-9 uppercase"
            color="success"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            endContent={<p>{input}</p>}
            size="lg"
          />
        </motion.div>

        {inputValue.length >= 2 && message && (
          <Message
            status={message}
            ok={ok}
            tooMuch={tooMuch}
            tooLittle={tooLittle}
          />
        )}
      </div>
      {image && (
        <motion.div
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
          className="ml-20 h-[45.3%] w-auto"
        >
          <Image
            src={image.src}
            alt="quiz image"
            width={300}
            height={280}
            quality={100}
            className="h-full w-auto"
          />
        </motion.div>
      )}
      <div>
        {info && (
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mx-auto text-base mb-16 leading-5"
            dangerouslySetInnerHTML={{ __html: info }}
          />
        )}

        <Button
          fullWidth
          className={`fixed max-w-[80.6%] sm:max-w-[600px] bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] text-white text-[15px] font-semibold ${buttonClass}`}
          onPress={handleButtonClick}
          disabled={isBtnDisabled}
        >
          {button}
        </Button>
      </div>
    </>
  );
}
