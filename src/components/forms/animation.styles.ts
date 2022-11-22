import { percent, px } from "csx";
import { keyframes, style } from "typestyle";

const moveRight = keyframes({
  "0%": {marginRight: percent(100), width: percent(10), fontSize: px(1)},
  "50%": {marginLeft: percent(20)},
  "100%": {marginRight: percent(0)}
})

const moveLeft = keyframes({
  "0%": {marginLeft: percent(100), width: percent(10), fontSize: px(1)},
  "50%": {marginRight: percent(20)},
  "100%": {marginLeft: percent(0)}
})


export const animationLogin = style({
  animationName: moveRight,
  animationDuration: '1s',
})

export const animationRegister = style({
  animationName: moveLeft,
  animationDuration: '1s',
})