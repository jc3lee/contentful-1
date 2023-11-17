import { createClient } from "contentful";

export function getClient() {
  const client = createClient({
    host: "preview.contentful.com",
    environment: process.env.CONTENTFUL_ENVIRONMENT as string,
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string,
  });
  // const client = createClient({
  //   host:
  //     process.env.NODE_ENV === "production"
  //       ? "https://cdn.contentful.com"
  //       : "https://preview.contentful.com",
  //   environment: process.env.NODE_ENV === "production" ? "master" : "master",
  //   // This is the space ID. A space is like a project folder in Contentful terms
  //   space: process.env.CONTENTFUL_SPACE_ID as string,
  //   accessToken:
  //     process.env.NODE_ENV === "production"
  //       ? (process.env.CONTENTFUL_PRODUCTION_ACCESS_TOKEN as string)
  //       : (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN as string),
  //   // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  // });
  return client;
}
