export default function ProgressBar({ currentScreen, totalScreens }) {
  const progress = ((currentScreen - 1) / (totalScreens - 2)) * 100;

  return (
    <div className="absolute w-[80.6%] top-6 left-1/2 transform -translate-x-1/2 h-2 bg-customLightYellow border border-[#607725C7] rounded-full overflow-hidden z-10">
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-customGreen transition-width duration-300"
      />
    </div>
  );
}
