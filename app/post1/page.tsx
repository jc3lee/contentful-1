import { log } from "console";
import React from "react";
import { createClient } from "contentful";
import Image from "next/image";
import {
  BLOCKS,
  Document,
  INLINES,
  Inline,
  Block,
} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

async function Post1() {
  const client = createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: process.env.CONTENTFUL_SPACE_ID as string,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token
  const data = await client.getEntry(process.env.CONTENTFUL_ENTRY as string);
  // const res = await fetch(
  //   "https://cdn.contentful.com/spaces/process.env.CONTENTFUL_SPACE_ID/environments/process.env.CONTENTFUL_ENVIRONMENT/entries/process.env.CONTENTFUL_ENTRY?access_token={process.env.CONTENTFUL_ACCESS_TOKEN}&include=10"
  // );
  log("data", JSON.stringify(data.fields, null, 5));
  const { mainPhoto } = data.fields as any;
  const imgUrl = mainPhoto?.fields?.file?.url;
  const richTextComponents = documentToReactComponents(
    data.fields.postContent as Document
  );
  return (
    <div className="max-w-screen-md mx-auto mt-8">
      <h1 className="text-5xl text-center font-medium">
        {data ? (data.fields as any).title : "Loading"}
      </h1>
      <Image
        src={imgUrl ? "https:" + imgUrl + "?w=1500&h=600" : ""}
        alt={mainPhoto?.fields?.title || "Image not found"}
        width={1500}
        height={600}
        className="mt-20 w-full aspect-[16/9] object-cover rounded-md"
      />
      {richTextComponents}
    </div>
  );
}

export default Post1;
