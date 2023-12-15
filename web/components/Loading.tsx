"use client";
import { Steps } from "@/hooks/types/type";
import useStore from "@/hooks/useStore";
import React from "react";
import { SpinnerRoundFilled } from "spinners-react";

type Props = {
  loading: boolean;
};

function Loading({ loading }: Props) {
  const { isLoading } = useStore((state) => state);
  if (!loading) return <></>;
  return (
    <div className="absolute top-0 left-0 w-[100%] h-[100%] flex items-center justify-center z-50 bg-white bg-opacity-40 backdrop-blur-sm shadow-lg">
      <div className="text-center">
        <SpinnerRoundFilled
          size={90}
          thickness={180}
          speed={97}
          still={false}
          color="rgba(57, 76, 172, 1)"
        />
      </div>
    </div>
  );
}

export default Loading;
