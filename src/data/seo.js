const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not set");
}

export { siteUrl };

export const allowIndexing = process.env.NEXT_PUBLIC_APP_ENV === "production";
