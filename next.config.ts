import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  ignoreDuringBuilds: true, // 👈 esto es lo importante
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
