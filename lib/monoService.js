import axios from "axios";
import prices from "../data/prices.json";

const BASE_URL = "https://api.monobank.ua/api/merchant/invoice/create";
const MONOBANK_TOKEN = process.env.NEXT_PUBLIC_MONOBANK_API_TOKEN;

export async function createInvoice(
  isDelivery,
  orderId,
  emails,
  priceId,
  formData
) {
  const priceObject = prices.find((price) => price.id === priceId);

  if (!priceObject) {
    throw new Error(`Ціна з ID ${priceId} не знайдена`);
  }

  const amount = priceObject.price;

  const data = {
    amount: amount * 100,
    merchantPaymInfo: {
      reference: orderId,
      destination: JSON.stringify(formData),
      // comment: JSON.stringify(formData),
    },
    redirectUrl: `https://quiz-sport.vercel.app/success`,
    webHookUrl: `https://quiz-sport.vercel.app/api/monobankWebhook`,
  };

  try {
    const response = await axios.post(BASE_URL, data, {
      headers: {
        "X-Token": MONOBANK_TOKEN,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка створення інвойсу:", error);
    throw error;
  }
}
