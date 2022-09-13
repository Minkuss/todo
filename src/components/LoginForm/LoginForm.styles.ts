import { percent, px } from "csx";
import { style } from "typestyle";

export const card = style({
  // display: 'flex',
  background: "#D9D9D9",
  borderRadius: px(30),
  width: percent(40),
  height: px(308),
})

export const input = style({
  display: 'block',
  width: percent(100),
  height: px(50),
  boxShadow: 'none',
  borderRadius: px(15),
})

export const formGroup = style({
  fontSize: px(20),  
  color: "rgba(0, 0, 0, 0.5)",
  "$nest": {
    "&:hover": {
      color: "rgba(0, 0, 0, 1)",
    }
  }
})

export const btn = style({
  borderRadius: px(15),
  height: px(40),

})