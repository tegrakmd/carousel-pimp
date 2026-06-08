import { Metadata } from "next";

export function constructMetaData({
  title = "Carousel Pimp ",
  description = "Triy first try on a carousel pimp.",
  image = "/ogimage.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image }],
      creator: "@tegrakmd",
    },
    icons,
    metadataBase: new URL("https://pint-three.vercel.app/"),
    themeColor: "#131313",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
