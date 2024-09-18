/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      providedExports: false, // Отключает tree shaking
      usedExports: false,
    };
    return config;
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

export default nextConfig;
