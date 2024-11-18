import Image from "next/image";
import img from "../../../public/images/women/summary.png";

export default function AddInfo({ formData }) {
  return (
    <div className="bg-white p-3 rounded-[14px] border border-customGreen relative h-[102px]">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-[5px]">
          <p className="text-xs font-semibold text-left">
            <span className="text-customGreen">Ціль:</span> Скинути вагу
          </p>
          <p className="text-xs font-semibold">
            <span className="text-customGreen">Тренування:</span> Невеликі або
            без
          </p>
          <p className="text-xs font-semibold text-left">
            <span className="text-customGreen">Рівень активності:</span>{" "}
            Середній
          </p>
          <p className="text-xs font-semibold text-left">
            <span className="text-customGreen">Вік:</span> {formData.age}
          </p>
        </div>
        <div className="absolute right-0 top-0 w-auto h-full">
          <Image
            src={img}
            alt="athletic body"
            sizes="100vh"
            className="w-auto h-full"
          />
        </div>
      </div>
    </div>
  );
}
