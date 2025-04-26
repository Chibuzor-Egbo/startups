/* eslint-disable @next/next/no-img-element */
import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { StartupCardType } from "@/lib/types";

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorId, name: authorName, image: authorImage },
    _id,
    description,
    image,
    category,
    title,
  } = post;
  return (
    <li className="hover:border-pink-600 hover:bg-pink-100 px-6 py-8 border-black border-4 rounded-4xl flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-semibold px-4 py-1 bg-pink-100 rounded-4xl">
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-2">
          <EyeIcon stroke="red" />
          <span className="font-bold">{views}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <Link href={`/user/${authorId}`}>
            <p className="font-bold">{authorName}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-3xl font-extrabold">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${authorId}`}>
          <Image
            src={authorImage}
            alt={authorName}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="font-semibold mb-2 line-clamp-1">{description}</p>
        <img
          src={image}
          alt="startup-img"
          className="w-full h-[150px] object-center object-cover rounded-md border-2 border-black"
        />
      </Link>
      <div className="flex justify-between items-center">
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className="font-extrabold">{category}</p>
        </Link>
        <button className="px-4 py-1 rounded-4xl bg-black text-white cursor-pointer font-semibold">
          <Link href={`/startup/${_id}`}>Details</Link>
        </button>
      </div>
    </li>
  );
};

export default StartupCard;
