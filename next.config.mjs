/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["saypjauxxtdemjrnqqtg.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "saypjauxxtdemjrnqqtg.supabase.co",
      },
    ],
  },
};

export default nextConfig;
