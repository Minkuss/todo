import { percent, px } from "csx";
import { style } from "typestyle";

export const todoBlock = style({
  background: "#FFFFFF",
  border: "1px solid rgba(0, 0, 0, 0.23)",
  borderRadius: px(10),
  marginLeft: px(19),
  marginRight: px(19),
  height: px(36),
  marginTop: px(10),
  display: 'flex',

})

export const todo = style({
  borderRadius: px(10),
  height: percent(100),
  width: percent(100),
  color: "rgba(0, 0, 0, 0)",
  fontSize: px(15),
  opacity: 0.7,
  // display: "flex",
  // alignItems: 'center',
  // marginLeft: px(7),
  "$nest": {
    "&:focus": {
      outline: "none",
      boxShadow: 'none'
    },
    "&:hover": {
      opacity: 1
    },
  },
})

export const edit = style({
  borderTopRightRadius: px(10),
  borderBottomRightRadius: px(10),
  "$nest": {
    "&:focus": {
      outline: "none",
      boxShadow: 'none'
    },
  }
})