import { getClient } from "@/lib/contentful-client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";
import Image from "next/image";
import { ContentfulLivePreview } from "@contentful/live-preview";
import { log } from "console";

async function Post1() {
  const client = getClient();
  // This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token
  ContentfulLivePreview.init({ locale: "en-US" });
  const data = await client.getEntry(process.env.CONTENTFUL_ENTRY as string);
  const { mainPhoto } = data.fields as any;
  const imgUrl = mainPhoto?.fields?.file?.url;
  const richTextComponents = documentToReactComponents(
    data.fields.postContent as Document,
    {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          log("node", JSON.stringify(node.data, null, 2));
          const assetUrl = node.data.target?.fields?.file?.url;
          const assetTitle = node.data.target?.fields?.title;
          return (
            <Image
              src={assetUrl ? "https:" + assetUrl + "?w=1500&h=600" : ""}
              alt={assetTitle || "Image not found"}
              width={1500}
              height={600}
              className="mt-20 w-full aspect-[16/9] object-cover rounded-md"
            />
          );
        },
      },
    }
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
