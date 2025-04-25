import React from "react";
import CreateStartupForm from "@/app/components/CreateStartupForm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="!min-h-[230px] flex py-8 items-center justify-center bg-pink-500/90 mb-10">
        <h1 className="bg-black text-white uppercase font-extrabold px-12 py-6 text-center text-4xl">
          Submit Your Startup
        </h1>
      </section>
      <section
        className="flex justify-center mx-auto"
        style={{ width: "min(1200px, 80vw)" }}
      >
        <CreateStartupForm />
      </section>
    </>
  );
};

export default page;
