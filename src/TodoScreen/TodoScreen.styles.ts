import { center } from "csstips";
import { percent, px } from "csx";
import { style } from "typestyle";

export const h1 = style({
  color: "rgba(0, 0, 0, 0.29)",
  fontSize: px(64),
  marginLeft: px(26)
})

export const main = style({
  display: 'flex',
  flexDirection: "column",
  width: percent(100),
  height: percent(100)
})

export const inputTodo = style({
  flexShrink: 0
})

export const grow = style({
  flexGrow: 0.9
})