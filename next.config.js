/** @type {import('next').NextConfig} */
const nextConfig = {
  // devServer: {
  //   host: "localhost",
  //   port: 3030,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sjhgtflizyhakaxkjoap.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
