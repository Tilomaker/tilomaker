"use client";
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

export default function Form() {
  const [fields, setFields] = useState({
    email: "",
    phone: "",
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
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead");
    }

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
        ` Email: ${fields.email || "Не вказано"}, Телефон: ${
          fields.phone || "Не вказано"
        }`
      );
      console.log(
        ` Email: ${fields.email || "Не вказано"}, Телефон: ${
          fields.phone || "Не вказано"
        }`
      );
      setFields({ email: "", phone: "" });
      window.location.href = "https://tilomaker.com/tilomakeronline";
    }
  };

  return (
    <div className="h-screen w-screen outline-none flex flex-col justify-between pt-12 pb-8 px-10 bg-customLightYellow max-w-[400px] mx-auto overflow-y-auto">
      <form
        className="flex flex-col justify-between h-full"
        onSubmit={handleButtonClick}
      >
        <div>
          <motion.h3
            className="text-2xl uppercase font-bold leading-7"
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
          >
            Щоб отримати персональний план схуднення
          </motion.h3>

          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mt-3 max-w-72 mx-auto leading-5 mb-9"
          >
            Додай свою електронну адресу та номер телефону
          </motion.p>

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
              errorMessage={
                <span style={{ color: "red" }}>{errors.email}</span>
              }
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
              errorMessage={
                <span style={{ color: "red" }}>{errors.phone}</span>
              }
              status={errors.phone ? "error" : "default"}
            />
          </motion.div>
          <motion.p
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
            className="mx-auto text-[#929292] mt-6 text-xs text-left mb-16"
          >
            Ми поважаємо вашу конфіденційність. Усі ваші дані залишатимуться
            конфіденційними та ніколи не будуть використовуватися за межами
            TILOMAKER
          </motion.p>
        </div>

        <div>
          <Button
            fullWidth
            type="submit"
            className={`fixed max-w-[80.6%] sm:max-w-[600px] bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] text-white text-[15px] font-semibold ${
              !fields.email || !fields.phone || errors.email || errors.phone
                ? "bg-[#C3C3C3] cursor-not-allowed"
                : "bg-customGreen"
            }`}
            disabled={
              !fields.email || !fields.phone || errors.email || errors.phone
            }
          >
            Далі
          </Button>
        </div>
      </form>
    </div>
  );
}
