import { percent, px } from "csx";
import { style } from "typestyle";

export const btn = style({
  marginTop: px(15),
  border: "1px solid rgba(0, 0, 0, 0.15)",
  height: px(35),
  fontSize: px(15),
  lineHeight: px(15),
  color: "black",
  opacity: "0.40",
  "$nest": {
    "&:focus": {
      outline: 'none',
      boxShadow: 'none',
    },

    "&:hover": {
      opacity: "1"
    }
  }
})

export const card = style({
  width: px(262),
  backgroundColor: '#D9D9D9',
})

export const input = style({
  display: "block"
})

export const btn_group = style({
  width: percent(100)
})