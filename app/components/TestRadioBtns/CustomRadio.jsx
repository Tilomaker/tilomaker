import checked from "../../../public/icons/tick-circle.svg";
import circle from "../../../public/icons/circle.svg";
import Image from "next/image";

export default function CustomRadio({ value, children, isSelected, onChange }) {
  return (
    <div
      onClick={() => onChange(value)}
      className="flex items-center cursor-pointer gap-5"
    >
      <div>
        {isSelected ? (
          <div className="w-[28px] h-[28px]">
            <Image src={checked} alt="checked icon" width={28} height={28} />
          </div>
        ) : (
          <div className="w-[28px] h-[28px]">
            <Image src={circle} alt="checked icon" width={28} height={28} />
          </div>
        )}
      </div>
      <span className="text-left text-base leading-5">{children}</span>
    </div>
  );
}
