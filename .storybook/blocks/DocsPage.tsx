import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/blocks";
import React from "react";

export default () => {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      <Primary />
      <Controls />
      <Stories includePrimary={false} />
    </>
  );
};
