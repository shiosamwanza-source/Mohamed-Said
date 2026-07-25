import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohamed Said Digital Historical Archive",
    short_name: "MS Archive",
    description: "AI Historical Archive powered by AWS S3 + RAG + OCR",
    start_url: "/",
    display: "standalone",
    background_color: "#050C16",
    theme_color: "#D4AF37",
    icons: [
      {
        src: "/icon.png", // Hakikisha unaweka picha hapa kwenye public folder
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
