import z from "zod";

export const formSchema = z.object({
  title: z
    .string({ required_error: "hi you have to add a name" })
    .min(3)
    .max(100),
  description: z
    .string({ required_error: "hi you have to describe your startup" })
    .min(20)
    .max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        return contentType?.startsWith("image/");
      } catch {
        return false;
      }
    }),
  pitch: z.string().min(10),
});
