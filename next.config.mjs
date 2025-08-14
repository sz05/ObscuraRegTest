/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/play",
        destination: "/",
        permanent: false,
      },
    ];
  },
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
