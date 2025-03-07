"use client";
import { CommentValidation } from "@/lib/validations/comments";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}
function Comments({ threadId, currentUserImage, currentUserId }: Props) {
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });
  const path = usePathname();
  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    console.log("thread id in comments", threadId);
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      path
    );
    form.reset(); // to reset the info
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel className="h-12">
                <Image
                  src={currentUserImage}
                  alt="profile photo"
                  height={52}
                  width={52}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  className="no-focus text-light-1 outline-none"
                  placeholder="Coment..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comments;
