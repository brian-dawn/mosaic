import Head from "next/head";

import GridLayout from "react-grid-layout";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { Masonry } from "masonic";

import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

// var i = 0;
// const items = Array.from(Array(5000), () => ({ id: i++ }));

function isVideo(path: string) {
  return path.endsWith("mp4") || path.endsWith("avi") || path.endsWith("flv");
}
const MasonryCard = ({ index, data: { id }, width }) => (
  <div>
    <div>Index: {index}</div>
    <pre>ID: {id}</pre>
    <div>Column width: {width}</div>
  </div>
);

export default function Home() {
  const [imagesWithLayout, setImagesWithLayout] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      console.log("fetching");
      const resp = await fetch("/api/files");
      const respBody = await resp.text();
      const files = JSON.parse(respBody);
      console.log(files);
      setImagesWithLayout(files);
    })();
  }, []);

  return (
    <Masonry
      // Provides the data for our grid items
      items={imagesWithLayout}
      // Adds 8px of space between the grid cells
      columnGutter={8}
      // Sets the minimum column width to 172px
      columnWidth={512}
      // Pre-renders 5 windows worth of content
      overscanBy={5}
      // This is the grid item component
      render={FakeCard}
    />
  );
}

const FakeCard = ({ data: { id, name, i } }) => {
  if (isVideo(i)) {
    return (
      <div className="fill">
        <video width="100%" autoPlay={true} loop={true} muted={true} src={i} />
        <span children={name} />
      </div>
    );
  }
  return (
    <div className="fill">
      <img alt="kitty" src={i} />
      <span children={name} />
    </div>
  );
};
