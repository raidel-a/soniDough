/** @type {import('next').NextConfig} */
const nextConfig = {
  // devServer: {
  //   host: "localhost",
  //   port: 3000,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zxdzlvmjuezxflficpdw.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
