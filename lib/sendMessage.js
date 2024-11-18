export const sendMessage = async (message) => {
  const TOKEN = "7882633489:AAF78vmVJPSBXGGfJ96Q2dSf_bdJJjGSOfA";
  const CHAT_ID = "-1002286645877";
  const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  try {
    const response = await fetch(URL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      }),
    });

    if (!response.ok) {
      throw new Error("Ошибка отправки сообщения");
    }

    const data = await response.json();
    console.log("Сообщение отправлено:", data);
    return data;
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
};
