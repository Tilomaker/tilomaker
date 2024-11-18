import { useState } from "react";

export default function Debugger({ currentScreen, formData, onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false); // Управление состоянием открытия дебаггера

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Кнопка "Д" внизу слева */}
      <div
        className="fixed bottom-5 left-5 bg-black text-white p-2 text-2xl cursor-pointer"
        onClick={handleToggle}
      >
        D
      </div>

      {/* Окно дебаггера */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 text-white p-8 flex flex-col justify-center items-center">
          <div className="text-sm mb-4">
            <h2 className="text-lg font-bold mb-2">
              Debugger v.1.1 (c) cyanidium.dev
            </h2>
            <p>
              <strong>Step:</strong> {currentScreen}
            </p>
            <p>
              <strong>State:</strong> {JSON.stringify(formData, null, 2)}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              className="bg-gray-500 p-2"
              onClick={onPrev} // Кнопка "Назад"
            >
              Back
            </button>
            <button
              className="bg-gray-500 p-2"
              onClick={onNext} // Кнопка "Вперед"
            >
              Forw
            </button>
          </div>

          {/* Кнопка закрытия */}
          <button
            className="absolute top-5 right-5 bg-red-500 text-white p-2"
            onClick={handleToggle}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
