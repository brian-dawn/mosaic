// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import imageSize from "image-size";

const fsPromises = fs.promises;

async function listDir() {
  try {
    return fsPromises.readdir("./public/");
  } catch (err) {
    console.error("Error occured while reading directory!", err);
  }
}

export default async (req, res) => {
  const files = await listDir();

  res.status(200).json(
    files
      .filter((file) => {
        return (
          file.endsWith("jpg") ||
          file.endsWith("png") ||
          file.endsWith("jpeg") ||
          file.endsWith("gif") ||
          file.endsWith("mp4")
        );
      })
      .map((file) => {
        //const size = imageSize(`./public/${file}`);
        //const aspectRatio = size.width / size.height;

        //const w = Math.round(size.width / 300) + 1;
        //const h = Math.round(size.height / 300) + 1;

        return {
          i: file,
        };
      })
  );
};
