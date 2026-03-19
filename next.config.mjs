const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  // ─────────────────────────────────────────────────────────────────────────────
  // SECURITY HEADERS
  // ─────────────────────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Enable XSS filter in browsers
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Restrict permissions (camera, microphone, geolocation, etc.)
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Content Security Policy - allow necessary sources for portfolio
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Next.js
              "style-src 'self' 'unsafe-inline'", // Required for Tailwind CSS
              "img-src 'self' data: blob: https: https://images.unsplash.com https://images.unsplash.com",
              "font-src 'self' data:",
              "connect-src 'self' https://api.resend.com https://*.unsplash.com",
              "frame-src 'self' https://www.youtube.com https://w.soundcloud.com https://www.behance.net https://open.spotify.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "report-uri /api/csp-violation",
              "report-to csp-endpoint",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
