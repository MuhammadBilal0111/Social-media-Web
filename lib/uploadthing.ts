import cloudinary from "./config/cloudinary.config";

const uploadImage = async (file: File, folder: string) => {
  const buffer = await file.arrayBuffer(); // for extracting the image
  const bytes = Buffer.from(buffer);
  return new Promise(async (resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image", // automatically analyze the type of file i.e image or video
          folder: folder,
        },
        async (err, result) => {
          if (err) {
            reject(err.message);
          } else {
            resolve(result);
          }
        }
      )
      .end(bytes);
  });
};
export default uploadImage;
