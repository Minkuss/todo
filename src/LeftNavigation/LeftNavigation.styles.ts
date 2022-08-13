import { background, percent, px } from "csx";
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
  display: "inline-block",
  width: px(253),
  alignSelf: 'center',
  "$nest": {
    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.3)"
    }
  },
  backgroundColor: "#BDBDBD",
  boxShadow: "none",
  height: px(35),
})

export const btn_group = style({
  width: percent(100),
  height: percent(100),
  display: 'flex',
  flexDirection: "column",
})

export const burgerMenu = style({
  position: "relative",
  width: px(40),
  height: px(35),
  display: "block",
  cursor: 'pointer',
  "$nest": {
    "&::after": {
      height: px(3),
      width: percent(100),
      position: "absolute",
      background: "#515758",
      margin: "0 auto",
      content: `''`,
      bottom: px(0)
    },
    "&::before": {
      height: px(3),
      width: percent(100),
      position: "absolute",
      background: "#515758",
      margin: "0 auto",
      content: `''`,
      top: px(10)
    }
  },

})

export const span = style({
  height: px(3),
  width: percent(100),
  position: "absolute",
  background: "#515758",
  margin: "0 auto",
  top: px(21),
})