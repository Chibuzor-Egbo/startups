import React from "react";
import SearchForm from "../components/SearchForm";
import StartupCard from "../components/StartupCard";

import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupCardType } from "@/lib/types";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams)?.query;

  const { data: posts } = await sanityFetch({
    query: STARTUPS_QUERY,
    params: { search: query || null },
  });

  const session = await auth();
  console.log(session);

  return (
    <>
      <section className="bg-pink-500 px-6 py-20 flex items-center gap-8 flex-col">
        <p className="bg-yellow-300 py-4 px-8 inline-block relative uppercase font-bold">
          <span className="absolute bg-black w-3 h-3 [clip-path:polygon(0_0,100%_0,0_100%)] top-[10%] left-[2%]"></span>
          <span className="absolute bg-black w-3 h-3 [clip-path:polygon(0_0,100%_0,0_100%)] bottom-[10%] right-[2%] rotate-180"></span>
          Pitch, vote and grow
        </p>
        <h1 className="bg-black text-white uppercase font-extrabold p-12 text-center text-4xl">
          Pitch your startup, <br /> Connect with Entrepreneurs
        </h1>
        <p className="text-neutral-100 font-bold text-center">
          Submit Ideas, Vote on Pitches, and get noticed in virtual
          competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="xl:py-12 py-6 xl:px-[150px] px-[60px] sm:px-[15px]">
        <p className="font-bold text-4xl">
          {query ? `Search results for "${query}"` : "All startups"}{" "}
        </p>
        <ul className="mt-7 grid lg:grid-cols-3 sm:grid-cols-2 gap-5">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p>No Startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}

export default Home;
