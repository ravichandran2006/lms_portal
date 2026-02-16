"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PlusCircle, ImageIcon, Pencil } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { Attachement, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-upload";

interface AttachmentFormProps {
  initialData: Course & {attachements: Attachement[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData.imageUrl || "",
    },
  });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      {/* Header */}
      <div className="font-medium flex items-center justify-between">
        Course Attachments

        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}

          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an File
            </>
          )}

        </Button>
      </div>

      {/* Display Mode */}
      {!isEditing && (
        <>
        {initialData.attachements.length === 0 && (
          <p className="text-sm mt-2 text-slate-500 italic">
            No attachments added yet
            </p>
          )}
        </>
      )}

      {/* Edit Mode */}
      {isEditing && (
        <div>
          <FileUpload
          endpoint="courseImage"
          onChange={(url)=>{
            if(url){
              onSubmit({imageUrl: url});
            }
          }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
          </div>
        
      )}
    </div>
  );
};
