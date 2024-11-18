import Image from "next/image";
import { motion } from "framer-motion";
import greenCircle from "../../../public/icons/green-circle.svg";
import redCircle from "../../../public/icons/red-circle.svg";
import blueCircle from "../../../public/icons/blue-circle.svg";
import { imageAnimation } from "../../helpers/animation";

const Message = ({ status, ok, tooMuch, tooLittle }) => {
  const getMessageDetails = (status) => {
    switch (status) {
      case "ok":
      case "NORMAL":
        return {
          icon: <Image src={greenCircle} alt="icon" width={24} height={24} />,
          backgroundClass: "bg-[#A9CD502E]",
          text: ok,
        };
      case "tooMuch":
      case "OVERWEIGHT":
        return {
          icon: <Image src={redCircle} alt="icon" width={24} height={24} />,
          backgroundClass: "bg-[#FFC5DD]",
          text: tooMuch,
        };
      case "tooLittle":
      case "UNDERWEIGHT":
        return {
          icon: <Image src={blueCircle} alt="icon" width={24} height={24} />,
          backgroundClass: "bg-[#D9EDFF]",
          text: tooLittle,
        };
      default:
        return {
          icon: null,
          backgroundClass: "",
          text: "",
        };
    }
  };

  const { icon, backgroundClass, text } = getMessageDetails(status);

  return (
    <motion.div
      variants={imageAnimation}
      initial="hidden"
      animate="visible"
      className={`flex mt-9 py-6 px-4 rounded-[20px] gap-3 items-start ${backgroundClass}`}
    >
      {icon}
      <p
        className="text-xs text-left"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </motion.div>
  );
};

export default Message;
