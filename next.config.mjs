import path from "path";
import dotenv from "dotenv";

const mode = process.env.NODE_ENV || "development";
const envFile = mode === "production" ? ".env.prod" : ".env.dev";

dotenv.config({ path: path.resolve(process.cwd(), `.env/${envFile}`) });

console.log(`🌿 Loading environment from: ${path.resolve(process.cwd(), `.env/${envFile}`)}`);
console.log("🔧 process.env.NEXT_PUBLIC_API_BASE_URL =", process.env.NEXT_PUBLIC_API_BASE_URL);

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
