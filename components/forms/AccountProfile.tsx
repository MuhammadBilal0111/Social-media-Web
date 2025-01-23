"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { userValidations } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUploadThing } from "@/lib/uploadthing";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props {
  user: {
    id: string;
    objectId: string;
    name: string;
    username: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function AccountProfile({ user, btnTitle }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");
  const form = useForm({
    resolver: zodResolver(userValidations),
    defaultValues: {
      profile_photo: user?.image || "",
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
  });
  async function onSubmit(values: z.infer<typeof userValidations>) {
    // z.infer<typeof userValidations> creates a type from the userValidations schema. This type is used to ensure that the values passed to the onSubmit function match the schema
    const blob = values.profile_photo;
    const hasImageChanged = isBase64Image(blob); // check that image id base64 to confirm that user has changed the image
    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      console.log(imgRes);
      if (imgRes && imgRes[0]?.url) {
        values.profile_photo = imgRes[0]?.url;
      }
      // Update the user data in database
      // best practice to use object when you want to pass multiple argument so that you can pass the argument in any order
      await updateUser({
        userId: user.id,
        username: values.username,
        name: values.name,
        image: values.profile_photo,
        bio: values.bio,
        path: pathname,
      });
      if (pathname === "/profile/edit") {
        router.back();
      } else {
        router.push("/");
      }
    }
  }
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>, //ChangeEvent<HTMLInputElement>: This specifies the type of the event (e) as a change event occurring on an HTML <input> element. It ensures type safety when accessing properties like e.target.files.
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const filereader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files)); // e.target.files it is of type filelist convert it into the array
      if (!file.type.includes("image")) return; // check to confirm that user input the image file
      filereader.onload = (event) => {
        // This defines what should happen after the file is successfully read by the FileReader
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl); //fieldChange is likely a callback function that updates the application state, stores the image data, or performs some other operation (e.g., previewing the image or sending it to a server).
      };
      filereader.readAsDataURL(file); //filereader.readAsDataURL(file);
      // This tells the FileReader to read the file as a Data URL (Base64 string).
      // A Data URL is a format that represents the file's content encoded as a string. It is often used for displaying images directly in the browser without uploading them to a server.
      // Once the file is read, the onload event is triggered, executing the logic defined in filereader.onload.
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex justify-center items-center gap-2">
              <FormLabel className="account-form-image-label">
                {field.value ? (
                  <Image // if field.value exists, render the Image component with the profile photo
                    src={field.value}
                    alt="profile photo"
                    height={96}
                    width={96}
                    priority // The priority prop ensures the profile photo is loaded immediately, improving perceived performance for the user.
                    className="profile-image"
                  />
                ) : (
                  <Image // if field.value exists, render the Image component with the profile photo
                    src="/assets/profile.svg"
                    alt="profile photo"
                    height={24}
                    width={24}
                    className="cursor-pointer object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form-image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-base-semibold text-light-2">
                Name
              </FormLabel>
              <FormControl className="text-base-semibold text-gray-200">
                <Input type="text" className="account-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-base-semibold text-light-2">
                Username
              </FormLabel>
              <FormControl className="text-base-semibold text-gray-200">
                <Input type="text" className="account-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel className="text-base-semibold text-light-2">
                Bio
              </FormLabel>
              <FormControl className="text-base-semibold text-gray-200">
                <Textarea rows={10} className="account-form_input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default AccountProfile;
