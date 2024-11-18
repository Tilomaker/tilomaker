import { sendMessage } from "../lib/sendMessage";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("Отримані дані WebHook:", req.body);

    const { amount, status, destination } = req.body;

    const destinationString = destination
      ? destination.replace(/&#34;/g, '"')
      : "{}";

    let formData = {};
    try {
      formData = JSON.parse(destinationString);
    } catch (error) {
      console.error("Помилка при парсингу destination:", error);
    }

    if (status === "success" && amount) {
      const amountInUAH = (amount / 100).toFixed(2);
      const message = `Платіж отримано:
            Сума: ${amountInUAH} грн
            Email: ${formData.email || "Не вказано"}
            Телефон: ${formData.phone || "Не вказано"}
         `;
      // Відправка повідомлення в Telegram
      try {
        await sendMessage(message);
        console.log("Повідомлення успішно надіслано до Telegram");
        return res.status(200).json({ status: "success" });
      } catch (error) {
        console.error(
          "Помилка при надсиланні повідомлення до Telegram:",
          error
        );
        return res.status(500).json({
          status: "error",
          message: "Не вдалося надіслати повідомлення до Telegram",
        });
      }
    } else {
      console.log(
        "Невдалий статус або недостатньо даних для відправки повідомлення"
      );
      return res.status(400).json({
        status: "error",
        message: "Недостатньо даних або статус не успішний",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Метод ${req.method} не дозволений`);
  }
}
