import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";
import {
  imageAnimation,
  subtitleAnimation,
  titleAnimation,
} from "../helpers/animation";
import { sendMessage } from "../../lib/sendMessage";

const validationRules = {
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: "Невірний формат електронної адреси",
  },
  phone: {
    regex: /^(\+?38)?\s?\(?0\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
    errorMessage: "Невірний формат номера телефону",
  },
};

export default function Form({
  title,
  subtitle,
  info,
  button = "Далі",
  onNext,
  formData,
  onFormDataChange,
}) {
  const [fields, setFields] = useState({
    email: formData.email || "",
    phone: formData.phone || "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const { regex, errorMessage } = validationRules[name] || {};
    if (regex && !regex.test(value)) {
      return errorMessage;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    onFormDataChange(name, value);
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    const newErrors = {};
    for (const [key, value] of Object.entries(fields)) {
      newErrors[key] = validateField(key, value);
    }

    setErrors(newErrors);

    if (
      Object.values(newErrors).some((error) => error) ||
      !fields.email ||
      !fields.phone
    ) {
      alert("Будь ласка, виправте помилки перед продовженням.");
    } else {
      await sendMessage(
        ` Email: ${formData.email || "Не вказано"}, Телефон: ${
          formData.phone || "Не вказано"
        }`
      );
      console.log("Перейдемо на наступний крок з даними:", fields);
      onNext();
      setFields({ email: "", phone: "" });
      window.location.href = "https://izft9.weblium.site/tilomakeronline";
    }
  };

  return (
    <form
      className="flex flex-col justify-between h-full"
      onSubmit={handleButtonClick}
    >
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
            className="mt-3 max-w-72 mx-auto leading-5 mb-9"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        )}

        <motion.div
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
        >
          <Input
            name="email"
            className="text-xl mt-4"
            color="success"
            type="email"
            label={
              <span className="text-[14px]">
                Email <span className="text-[#FF398B]">*</span>
              </span>
            }
            labelPlacement="inside"
            value={fields.email}
            onChange={handleChange}
            errorMessage={<span style={{ color: "red" }}>{errors.email}</span>}
            status={errors.email ? "error" : "default"}
          />
        </motion.div>

        <motion.div
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
        >
          <Input
            name="phone"
            className="text-xl mt-4"
            color="success"
            type="text"
            label={
              <span className="text-[14px]">
                Телефон <span className="text-[#FF398B]">*</span>
              </span>
            }
            labelPlacement="inside"
            value={fields.phone}
            onChange={handleChange}
            errorMessage={<span style={{ color: "red" }}>{errors.phone}</span>}
            status={errors.phone ? "error" : "default"}
          />
        </motion.div>

        {info && (
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mx-auto text-[#929292] mt-6 text-xs text-left mb-16"
            dangerouslySetInnerHTML={{ __html: info }}
          />
        )}
      </div>

      <div>
        <Button
          fullWidth
          type="submit"
          className={`fixed max-w-[80.6%] bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] text-white text-[15px] font-semibold ${
            !fields.email || !fields.phone || errors.email || errors.phone
              ? "bg-[#C3C3C3] cursor-not-allowed"
              : "bg-customGreen"
          }`}
          disabled={
            !fields.email || !fields.phone || errors.email || errors.phone
          }
        >
          {button}
        </Button>
      </div>
    </form>
  );
}
