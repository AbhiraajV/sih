import TenderForm from "@/components/Form/TenderForm";
import { initiateProfile } from "@/lib/initiate-profile";
import React from "react";
import { FileUploader } from "react-drag-drop-files";

type Props = {};

async function CreateTender({}: Props) {
  const user = await initiateProfile();
  return (
    <div className="w-full">
      <TenderForm user={user} />
    </div>
  );
}

export default CreateTender;
