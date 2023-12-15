// "use client";
// import { useEdgeStore } from "../lib/edgestore";
// import { OurFileRouter } from "@/app/api/uploadthing/core";
// import React from "react";
// import "@uploadthing/react/styles.css";
// import Image from "next/image";
// import { FileIcon, X } from "lucide-react";
// import DragDrop from "./DnD";
// type Props = {
//   onChange: (url?: string) => void;
//   value: string;
//   endpoint: keyof OurFileRouter;
// };

// function FileUpload({ onChange, value, endpoint }: Props) {
//   const [file, setFile] = React.useState<File>();
//   const { edgestore } = useEdgeStore();
//   const fileType = value?.split(".").pop();
//   if (value && fileType !== "pdf") {
//     console.log({ value });
//     return (
//       <div className="relative h-20 w-20">
//         <Image fill src={value} alt="upload" className="rounded-full" />
//         <button
//           onClick={() => onChange("")}
//           className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
//           type="button"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     );
//   }

//   if (value && fileType === "pdf") {
//     return (
//       <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
//         <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
//         <a
//           href={value}
//           target="_blank"
//           rel="noopenner noreferrer"
//           className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
//         >
//           {value}
//         </a>
//         <button
//           onClick={() => onChange("")}
//           className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
//           type="button"
//         >
//           <X className="h-4 w-4" />
//         </button>
//       </div>
//     );
//   }
//   return (
//     <div>
//       <input
//         type="file"
//         onChange={(e) => {
//           setFile(e.target.files?.[0]);
//         }}
//       />
//       <DragDrop />
//       <button
//         onClick={async () => {
//           if (file) {
//             const res = await edgestore.publicFiles.upload({
//               file,
//               onProgressChange: (progress) => {
//                 console.log(progress);
//               },
//             });
//             console.log(res);
//           }
//         }}
//       >
//         Upload
//       </button>
//     </div>
//   );
// }

// export default FileUpload;
