"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createPitch = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  formdata: FormData,
  pitch: string
) => {
  const session = await auth();
  console.log(session);

  if (!session) {
    return parseServerActionResponse({
      error: "Not Signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(formdata).filter(([key]) => key !== "pitch")
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: { _type: "slug", current: slug },
      author: { _type: "reference", _ref: session.user.id },
      pitch,
      views: 0,
    };
    const result = await writeClient.create({ _type: "startup", ...startup });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
