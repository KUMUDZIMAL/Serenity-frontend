// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ⚠️ Skips TS errors at build time
  },

  async headers() {
    return [
      // 1) Existing socket CORS
      {
        source: "/api/socket",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,OPTIONS" },
        ],
      },

      // 2) CORS for backend API calls
      {
        source: "/api/:path*",      // match any API route
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://serenity-backend-liart.vercel.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },

      // 3) Global Content Security Policy
      {
        source: "/:path*",         // apply to all pages and static assets
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // allow scripts from our domain and the Vercel login iframe
              "script-src 'self' https://serenity-peach.vercel.app 'wasm-unsafe-eval' 'inline-speculation-rules'",
              // you can be explicit about script elements if you like:
              "script-src-elem 'self' https://serenity-peach.vercel.app",
              // styles & inline CSS (for Tailwind)
              "style-src 'self' 'unsafe-inline'",
              // images
              "img-src 'self' data:",
              // AJAX/fetch/connect
              "connect-src 'self' https://serenity-peach.vercel.app https://serenity-backend-liart.vercel.app",
              // fonts, media, etc:
              "font-src 'self' data:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
