// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from "fs";
import path from "path";
import imageSize from "image-size";

const fsPromises = fs.promises;

const getAllFiles = function (dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

export default async (req, res) => {
  const files = await getAllFiles("./public/", []);

  res.status(200).json(
    files
      .filter((file) => {
        return (
          file.endsWith("jpg") ||
          file.endsWith("png") ||
          file.endsWith("jpeg") ||
          file.endsWith("gif") ||
          file.endsWith("mp4") ||
          file.endsWith("avi") ||
          file.endsWith("webm") ||
          file.endsWith("flv")
        );
      })
      .map((file) => {
        //const size = imageSize(`./public/${file}`);
        //const aspectRatio = size.width / size.height;

        //const w = Math.round(size.width / 300) + 1;
        //const h = Math.round(size.height / 300) + 1;

        return {
          i: file.replace(/^\/public/g, ""),
        };
      })
  );
};
