import type { NextConfig } from "next";
import os from "os";

const getLocalIPs = () => {
  const interfaces = os.networkInterfaces();
  const ips: string[] = ["localhost", "127.0.0.1"];
  for (const name of Object.keys(interfaces)) {
    const netList = interfaces[name];
    if (netList) {
      for (const net of netList) {
        // We look for IPv4 addresses that are not internal (i.e. loopback)
        if (net.family === "IPv4" && !net.internal) {
          ips.push(net.address);
        }
      }
    }
  }
  return ips;
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: getLocalIPs(),
};

export default nextConfig;

