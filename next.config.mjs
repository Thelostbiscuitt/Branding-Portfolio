const nextConfig = {
  // Fully static build (Cloudflare Pages). The homepage and every project page
  // are prerendered; audio streams from R2 and the enquiry endpoint runs in the
  // Pages Function under /functions (see wrangler.toml). No Next server runtime.
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

