import { Button } from "@nextui-org/react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  titleAnimation,
  subtitleAnimation,
  imageAnimation,
} from "../helpers/animation";

export default function PureInfo({
  bigTitle,
  title,
  subtitle,
  image,
  info,
  button = "Вперед",
  onNext,
}) {
  const FACEBOOK_PIXEL_ID = "292102645600496";

  const handleButtonClick = () => {
    // Прямой вызов fbq с кастомным событием
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("trackCustom", "ButtonClick", {
        content_name: title || "No Title",
        button_text: button,
        value: 1,
      });
    } else {
      // Инициализация, если fbq еще не существует
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
      );

      fbq("init", FACEBOOK_PIXEL_ID);
      fbq("trackCustom", "ButtonClick", {
        content_name: title || "No Title",
        button_text: button,
        value: 1,
      });
    }

    if (onNext) {
      onNext();
    }
  };

  return (
    <>
      <div>
        {bigTitle && (
          <motion.h1
            className="text-4xl uppercase font-bold text-customGreen"
            dangerouslySetInnerHTML={{ __html: bigTitle }}
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
          />
        )}
        {title && (
          <motion.h3
            className="text-2xl uppercase font-bold leading-7"
            dangerouslySetInnerHTML={{ __html: title }}
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
          />
        )}
        {subtitle && (
          <motion.p
            className="mt-3 text-sm mx-auto leading-5"
            dangerouslySetInnerHTML={{ __html: subtitle }}
            variants={subtitleAnimation}
            initial="hidden"
            animate="visible"
          />
        )}
      </div>
      {image && (
        <motion.div
          className={`${image.className} ${
            image.src == "/images/women/taking-photo.png"
              ? "h-[57%] w-auto"
              : ""
          }`}
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
        >
          <Image
            className={
              image.src == "/images/women/yoga.png"
                ? "h-[270px] w-auto"
                : image.src == "/images/women/taking-photo.png"
                ? "h-[100%] w-auto"
                : ""
            }
            src={image.src}
            alt="quiz image"
            width={300}
            height={280}
            quality={100}
          />
        </motion.div>
      )}
      <div>
        <motion.p
          className="mx-auto text-base mb-16 leading-5"
          dangerouslySetInnerHTML={{ __html: info }}
          variants={subtitleAnimation}
          initial="hidden"
          animate="visible"
        />
      </div>
      <Button
        fullWidth
        className="fixed max-w-[80.6%] sm:max-w-[600px] bottom-6 left-1/2 transform -translate-x-1/2 h-[50px] bg-customGreen text-white text-[15px] font-semibold"
        onPress={handleButtonClick}
      >
        {button}
      </Button>
    </>
  );
}
