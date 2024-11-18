export default function BMIStatus({ formData }) {
  const getStatusPosition = (bmiStatus) => {
    switch (bmiStatus) {
      case "UNDERWEIGHT":
        return "left-[8%]";
      case "NORMAL":
        return "left-1/2 transform -translate-x-1/2";
      case "OVERWEIGHT":
        return "right-[8%]";
      default:
        return "left-1/2 transform -translate-x-1/2";
    }
  };

  const getStatusText = (bmiStatus) => {
    switch (bmiStatus) {
      case "UNDERWEIGHT":
        return "Недостатній";
      case "NORMAL":
        return "Оптимальний";
      case "OVERWEIGHT":
        return "Надлишковий";
      default:
        return "";
    }
  };

  const getStatusBackgroundColor = (bmiStatus) => {
    switch (bmiStatus) {
      case "UNDERWEIGHT":
        return "bg-[#44A6FF]";
      case "NORMAL":
        return "bg-[#A9CD50]";
      case "OVERWEIGHT":
        return "bg-[#FF398B]";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className=" bg-white p-3 rounded-[14px] border border-customGreen">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold">Твій індекс маси тіла</p>
        <div
          className={`px-4 py-[6px] rounded-[5px] ${getStatusBackgroundColor(
            formData.bmiStatus
          )}`}
        >
          <p className="text-[#FAFFEE] text-[10px]">
            {getStatusText(formData.bmiStatus)}
          </p>
        </div>
      </div>
      <div className="mt-7 relative h-[10px] rounded-full bg-gradient-to-r from-blue-400 via-[#A9CD50] to-pink-400">
        <div
          className={`absolute top-1/2 transform -translate-y-1/2 w-[22px] h-[22px] bg-[#A9CD50] rounded-full border-2 border-white ${getStatusPosition(
            formData.bmiStatus
          )}`}
        ></div>
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-[#A0A0A0]">
        <span>Недостатній</span>
        <span>Оптимальний</span>
        <span>Надлишковий</span>
      </div>
    </div>
  );
}
