import { Button } from "@nextui-org/react";
import Image from "next/image";
import {
  titleAnimation,
  subtitleAnimation,
  imageAnimation,
} from "../helpers/animation";
import { motion } from "framer-motion";
import mono from "../../public/icons/mono.svg";
import { createInvoice } from "../../lib/monoService";
import { v4 as uuidv4 } from "uuid";

export default function Payment({ title, image, onNext, formData }) {
  const handlePayment = async (isDelivery) => {
    try {
      const orderId = uuidv4();
      const customerEmails = formData.email;
      const priceId = "1";

      const response = await createInvoice(
        isDelivery,
        orderId,
        customerEmails,
        priceId,
        formData
      );

      // Перенаправлення на URL для оплати
      window.location.href = response.pageUrl;
    } catch (error) {
      console.error("Помилка при оплаті:", error);
    }
  };

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
        <motion.div
          variants={subtitleAnimation}
          initial="hidden"
          animate="visible"
          className="rounded-[14px] border border-[#A9CD50] bg-white py-5 px-[18px] mt-8 flex flex-col gap-[20px]"
        >
          <div className="flex justify-between w-full">
            <p className="text-[14px] text-left">Підписка на 6 місяців</p>
            <p className="text-base font-bold line-through">4140 грн</p>
          </div>
          <div className="flex justify-between w-full">
            <p className="text-[14px] text-left font-bold">Знижка 15%</p>
            <p className="text-base font-bold text-[#FF398B]">3519 грн</p>
          </div>
          <hr className="bg-[#A0A0A0]" />
          <div className="flex justify-between w-full">
            <p className="text-base text-left font-medium">Разом</p>
            <p className="text-base font-bold">3519 грн</p>
          </div>
        </motion.div>
      </div>
      {image && (
        <motion.div
          className={image.className}
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
        >
          <Image
            src={image}
            alt="quiz image"
            width={250}
            height={280}
            quality={100}
            className="mx-auto"
          />
        </motion.div>
      )}
      <div>
        <Button
          fullWidth
          className="h-[50px] bg-black"
          onPress={() => handlePayment(false)}
        >
          <Image src={mono} alt="Mono" width={91} height={29} quality={100} />
        </Button>
      </div>
    </>
  );
}
