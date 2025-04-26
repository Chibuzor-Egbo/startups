"use client";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { useActionState } from "react";
import { formSchema } from "@/lib/validation";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const CreateStartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (prev: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prev, formData, pitch);
      if (result.status === "SUCCESS") {
        toast("Startup Added Successfully");
        router.push(`/startup/${result._id}`);
      }

      // return result
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Something went wrong, Check your fields");
        return { ...prev, error: "Validation failed", status: "ERROR" };
      }

      return {
        ...prev,
        error: "An unexpected error occured",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "initial",
  });

  return (
    <form action={formAction} className="w-full" noValidate>
      <div className="flex flex-col gap-2 mb-8">
        <label htmlFor="title" className="uppercase font-bold">
          Title
        </label>
        <input
          type="text"
          name="title"
          required
          placeholder="Startup Title"
          className="rounded-sm indent-[10px] bg-white outline-none pr-12 py-2 border-3 border-black font-semibold"
        />

        {errors.title && <p className="text-red-600/80">{errors.title}</p>}
      </div>
      <div className="flex flex-col gap-2 mb-8">
        <label htmlFor="description" className="uppercase font-bold">
          Description
        </label>
        <textarea
          name="description"
          required
          placeholder="Startup Description"
          className="rounded-sm bg-white outline-none py-2 px-3 border-3 border-black font-semibold"
        />

        {errors.description && (
          <p className="text-red-600/80">{errors.description}</p>
        )}
      </div>
      <div className="flex flex-col gap-2 mb-8">
        <label htmlFor="category" className="uppercase font-bold">
          Category
        </label>
        <input
          type="text"
          name="category"
          required
          placeholder="Startup Category"
          className="rounded-sm indent-[10px] bg-white outline-none pr-12 py-2 border-3 border-black font-semibold"
        />

        {errors.category && <p>{errors.category}</p>}
      </div>
      <div className="flex flex-col gap-2 mb-8">
        <label htmlFor="link" className="uppercase font-bold">
          ImgURL
        </label>
        <input
          type="text"
          name="link"
          required
          placeholder="Paste the link to the image"
          className="rounded-sm indent-[10px] bg-white outline-none py-2 border-3 border-black font-semibold"
        />

        {errors.link && <p>{errors.link}</p>}
      </div>

      <div data-color-mode="light" className="flex flex-col gap-2 mb-8">
        <label htmlFor="pitch" className="uppercase font-bold">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          preview="edit"
          textareaProps={{ placeholder: "Tell Us About Your Startup" }}
          className="rounded-sm bg-white outline-none border-3 border-black"
        />

        {errors.pitch && <p className="text-red-600/80">{errors.pitch}</p>}
      </div>
      <button
        type="submit"
        className="w-full flex mb-8 justify-center items-center gap-1.5 font-bold bg-pink-500 hover:bg-pink-500/65 cursor-pointer py-3 rounded-sm"
        disabled={isPending}
      >
        {isPending ? "Submitting" : "Submit"}
        <Send size={12} />
      </button>
    </form>
  );
};

export default CreateStartupForm;
