import { percent, px, translateX } from "csx";
import { keyframes, style } from "typestyle";


export const main = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  "$nest": {
    "@media screen and (max-width: 445px)": {
        overflow: 'hidden'
      }
  }
})

export const btn = style({
  boxShadow: "none",
  border: "1px solid rgba(0, 0, 0, 0.15)",
  "$nest": {
    "&:focus": {
      outline: 'none',
      boxShadow: 'none',
    },
  }
})

export const btnGroup = style({
  background: "#D9D9D9",
  borderRadius: px(100),
  width: "calc(320px + (100 — 320) * ((100vw — 375px) / (1920 — 375)))",
  zIndex: "1"
})

export const signIn = style({
  borderTopLeftRadius: px(100),
  borderBottomLeftRadius: px(100),
})

export const signUp = style({
  borderTopRightRadius: px(100),
  borderBottomRightRadius: px(100),
})