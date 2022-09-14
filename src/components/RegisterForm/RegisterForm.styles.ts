import { percent, px } from "csx";
import { keyframes, style } from "typestyle";

const move = keyframes({
  "0%": {marginRight: percent(100), width: percent(10), fontSize: px(1)},
  "50%": {marginLeft: percent(20)},
  "100%": {marginRight: percent(0)}
})

export const card = style({
  fontSize: px(20),
  background: "#D9D9D9",
  borderRadius: px(30),
  width: percent(40),
  height: px(308),
  animationName: move,
  animationDuration: '1s'
})

export const input = style({
  display: 'block',
  width: percent(100),
  height: px(50),
  boxShadow: 'none',
  borderRadius: px(15),
})

export const formGroup = style({
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