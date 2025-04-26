/* eslint-disable @next/next/no-img-element */
import React from "react";
import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import { formatDate } from "@/lib/utils";
import { StartupCardType } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { writeClient } from "@/sanity/lib/write-client";
import StartupCard from "@/app/components/StartupCard";

const md = markdownit();

// export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const [post, { select: pennywisePosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "pennywise",
    }),
  ]);

  const parsedContent = md.render(post.pitch || "");

  await writeClient
    .patch(id)
    .set({ views: post.views + 1 })
    .commit();
  return (
    <>
      <section className="!min-h-[230px] flex flex-col gap-8 py-8 items-center bg-pink-500">
        <p className="bg-yellow-300 py-4 px-8 inline-block relative uppercase font-bold">
          <span className="absolute bg-black w-3 h-3 [clip-path:polygon(0_0,100%_0,0_100%)] top-[10%] left-[5%]"></span>
          <span className="absolute bg-black w-3 h-3 [clip-path:polygon(0_0,100%_0,0_100%)] bottom-[10%] right-[5%] rotate-180"></span>
          {formatDate(post._createdAt)}
        </p>
        <h1 className="bg-black text-white uppercase font-extrabold px-12 py-6 text-center text-4xl">
          {post.title}
        </h1>
        <p
          className="text-white font-semibold text-center text-xl"
          style={{ width: "min(1000px, 70%)" }}
        >
          {post.description}
        </p>
      </section>
      <section style={{ width: "min(1200px, 70%)" }} className="mx-auto">
        <div className="space-y-5 mt-10 max-w-4xl ">
          <div>
            <img
              src={post.image}
              alt="thumbnail"
              className=" object-cover rounded-xl w-full mx-auto"
            />
          </div>

          <div className="flex justify-between items-center">
            <Link
              href={`/user/${post.author._id}`}
              className="flex gap-2 items-center"
            >
              <div className="w-[50px] h-[50px] overflow-hidden rounded-full drop-shadow-lg">
                <Image
                  src={post.author.image}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="  object-cover "
                />
              </div>

              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p>@{post.author.username}</p>
              </div>
            </Link>
            <p className="font-semibold px-4 py-1 bg-pink-100 rounded-4xl inline-block">
              {post.category}
            </p>
          </div>

          <h3 className="text-2xl font-extrabold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose break-words !max-w-none"
            />
          ) : (
            <p>nothing to show</p>
          )}
          <hr className="mb-5" />
        </div>

        {pennywisePosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="">Similar</p>

            <ul className="mt-7">
              {pennywisePosts.map((post: StartupCardType, index: number) => (
                <StartupCard key={index} post={post} />
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
};

export default page;
