import React from "react";
import Mix from "./Mix";

interface IMixesBlock {
  name: string;
}

function MixesBlock({ name }: IMixesBlock) {
  return <Mix />;
}

export default MixesBlock;
