/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/112-108-97-121",
        destination: "/play",
      },
    ];
  },
};

export default nextConfig;
