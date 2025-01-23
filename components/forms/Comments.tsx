"use client";
import { CommentValidation } from "@/lib/validations/comments";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { addCommentToThread } from "@/lib/actions/thread.action";

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
    console.log(values);
    await addCommentToThread(threadId, values.thread, currentUserId, path);
    form.reset();
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex justify-start gap-5 items-center"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4 w-full">
              <FormLabel>
                <Image
                  src={currentUserImage}
                  alt="profile photo"
                  height={48}
                  width={48}
                  className="profile-image"
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
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-btn">
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comments;
