const nextConfig = {
  // Fully static build (Cloudflare Pages). The homepage, all project pages
  // and the contact flow (mailto) are static; audio streams from R2 via the
  // Pages Function in /functions (see wrangler.toml). No server runtime.
  output: "export",
  images: {
    // Static export ships plain <img> — no image optimizer API route.
    unoptimized: true,
  },
  // Security headers + the chef4me redirect moved to /public/_headers and
  // /public/_redirects (Cloudflare Pages equivalents of the removed
  // headers()/redirects(), which are Next-server-only features).
};

export default nextConfig;

