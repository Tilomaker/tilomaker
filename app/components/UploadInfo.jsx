import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { imageAnimation, titleAnimation } from "../helpers/animation";

export default function UploadInfo({ title, image, onNext }) {
  const [progress, setProgress] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let interval;
    if (progress < 100) {
      interval = setTimeout(() => {
        const randomIncrement = Math.random() * 10;
        setProgress((prev) => Math.min(prev + randomIncrement, 100));
      }, 400);
    } else {
      controls.start({ opacity: 0 }).then(onNext);
    }

    return () => clearTimeout(interval);
  }, [progress, onNext, controls]);

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
      </div>
      {image && (
        <motion.div
          className={image.className}
          variants={imageAnimation}
          initial="hidden"
          animate="visible"
        >
          <Image
            src={image.src}
            alt="quiz image"
            width={300}
            height={280}
            quality={100}
          />
        </motion.div>
      )}
      <div className="mt-4">
        <div className="flex justify-between">
          <span className="mr-2 mb-[10px] text-sm">
            Складаємо для тебе програму...
          </span>
          <span className="ml-auto text-sm">{Math.round(progress)}%</span>
        </div>

        <motion.div
          className="w-full h-2 mt-2 bg-gray-300 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-customGreen"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
          />
        </motion.div>
      </div>
    </>
  );
}
