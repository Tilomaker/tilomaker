import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { titleAnimation, variantsAnimation } from "../../helpers/animation";
import BMIStatus from "./BIMStatus";
import AddInfo from "./AddInfo";
import SummMessages from "./SummMessages";
import Link from "next/link";

export default function Summaries({
  title,
  formData,
  button = "Вперед",
  onNext,
}) {
  console.log("🚀 ~ formData:", formData);
  return (
    <>
      <div className="h-[90%] ">
        {title && (
          <motion.h3
            className="text-2xl uppercase font-bold leading-7"
            dangerouslySetInnerHTML={{ __html: title }}
            variants={titleAnimation}
            initial="hidden"
            animate="visible"
          />
        )}
        <div className="flex flex-col gap-4 mt-10 overflow-y-auto h-[86%]">
          <motion.div
            variants={variantsAnimation}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <BMIStatus formData={formData} />
          </motion.div>

          <motion.div
            variants={variantsAnimation}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <AddInfo formData={formData} />
          </motion.div>

          <motion.div
            variants={variantsAnimation}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <SummMessages formData={formData} />
          </motion.div>
        </div>
      </div>

      <div>
        <Link href={"/personal-plan"}>
          <Button
            fullWidth
            className="h-[50px] bg-customGreen text-white text-[15px] font-semibold"
            // onPress={onNext}
          >
            {button}
          </Button>
        </Link>
      </div>
    </>
  );
}
