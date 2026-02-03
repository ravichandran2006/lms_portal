import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

/**
 * Safe Clerk authentication
 * Prevents 500 errors
 */
const handleAuth = async () => {
  const { userId } = await auth();

  if (!userId) {
    return { userId: null };
  }

  return { userId };
};

export const ourFileRouter = {
  // ========================
  // Course Image Upload
  // ========================
  courseImage: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete");
      console.log("User:", metadata.userId ?? "Not logged in");
      console.log("URL:", file.url);

      return {
        url: file.url,
        userId: metadata.userId,
      };
    }),

  // ========================
  // Course Attachments
  // ========================
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Attachment uploaded");
      console.log("User:", metadata.userId ?? "Not logged in");
      console.log("URL:", file.url);

      return {
        url: file.url,
        userId: metadata.userId,
      };
    }),

  // ========================
  // Chapter Video Upload
  // ========================
  chapterVideo: f({
    video: {
      maxFileSize: "512GB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => await handleAuth())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Video uploaded");
      console.log("User:", metadata.userId ?? "Not logged in");
      console.log("URL:", file.url);

      return {
        url: file.url,
        userId: metadata.userId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
