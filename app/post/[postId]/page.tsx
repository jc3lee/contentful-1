import { log } from "console";
import React from "react";
import Image from "next/image";
import {
  BLOCKS,
  Document,
  INLINES,
  Inline,
  Block,
} from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getClient } from "@/lib/contentful-client";

async function Post() {
  const client = getClient();
  const data = await client.getEntry(process.env.CONTENTFUL_ENTRY as string);
  log("post data", JSON.stringify(data.fields, null, 4));
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

export default Post;
