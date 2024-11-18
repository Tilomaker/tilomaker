import Link from "next/link";

export default function Success() {
  return (
    <div className="flex flex-col justify-start min-h-screen bg-customLightYellow p-8">
      <h1 className="mt-14 text-3xl font-bold text-customGreen">
        Оплата успішна!
      </h1>
      <p className="mt-4 text-gray-600">
        Дякуємо за ваше замовлення. Ваш платіж було оброблено успішно.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block bg-customGreen text-white py-2 px-4 rounded transition duration-300"
      >
        Повернутися на головну
      </Link>
    </div>
  );
}
