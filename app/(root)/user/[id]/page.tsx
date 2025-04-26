import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import React from "react";
import Image from "next/image";
import UserStartups from "@/app/components/UserStartups";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();
  return (
    <>
      <section>
        <div>
          <div>
            <h3 className="uppercase text-center line-clamp-1">{user.name}</h3>
          </div>

          <Image src={user.image} alt={user.name} width={220} height={220} />

          <p className="mt-7">@{user.username}</p>
          <p className="mt-1 text-center">{user?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="">{session.user.id === id ? "Your" : "All"} Startups</p>
          <ul>
            <UserStartups id={id} />
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
