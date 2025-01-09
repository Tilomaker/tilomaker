/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)", // Применяется ко всем маршрутам
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "", // Убираем заголовок
          },
        ],
      },
    ];
  },
};

export default nextConfig;
