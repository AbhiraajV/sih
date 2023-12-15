"use client";
import { FileIcon, X } from "lucide-react";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useEdgeStore } from "../lib/edgestore";
import Image from "next/image";
import Loading from "./Loading";
const fileTypes = ["JPG", "PNG", "PDF"];
function DragDrop({
  url,
  setUrl,
}: {
  url: string | undefined;
  setUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<Number | undefined>(undefined);
  const { edgestore } = useEdgeStore();

  const handleChange = async (uploadedFile: File) => {
    setFile(uploadedFile);

    if (uploadedFile) {
      const res = await edgestore.publicFiles.upload({
        file: uploadedFile,
        onProgressChange: (progress) => {
          setProgress(progress);
        },
      });
      setUrl(res.url);
    }
  };

  if (!file) {
    // If file is not present, render the FileUploader
    return (
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    );
  }

  // If file type is not "pdf"
  if (!file.type || !file.type.startsWith("application/pdf")) {
    console.log({ url });
    if (!url) return <Loading loading={progress !== 100} />;
    return (
      <div className="relative h-20 w-20">
        <Image fill src={url} alt="upload" className="rounded-full" />
        <button
          onClick={() => {
            setFile(undefined);
            setUrl("");
            setProgress(undefined);
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // If file type is "pdf"
  return (
    <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
      <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
      >
        {file.name || "PDF File"}{" "}
        {/* Display a default name if 'name' is not available */}
      </a>
      <button
        onClick={() => {
          setFile(undefined);
          setUrl("");
          setProgress(undefined);
        }}
        className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
        type="button"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default DragDrop;
