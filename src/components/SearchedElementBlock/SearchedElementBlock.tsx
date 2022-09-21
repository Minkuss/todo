import { FC } from "react";
import { Button, Card } from "@blueprintjs/core";

import * as classes from "./SearchedElementBlock.styles";
import { percent, px } from "csx";

export interface ISearchedElementBlock {
  content: string;
  onClick?: () => unknown;
}

export const SearchedElementBlock: FC<ISearchedElementBlock> = (props) => {
  const { content, onClick }: ISearchedElementBlock = {
    ...defaultProps,
    ...props,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: percent(100),
      }}
    >
      <Button fill text={content} />
    </div>
  );
};

const defaultProps: Required<ISearchedElementBlock> = {
  content: "",
  onClick: () => {},
};
