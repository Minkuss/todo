import { important, percent, px } from "csx";
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
  flex: important(1),
  borderRadius: px(10),
  height: percent(100),
  width: percent(100),
  color: "rgba(0, 0, 0, 0)",
  fontSize: px(15),
  opacity: 1,
  "$nest": {
    "&:focus": {
      outline: "none",
      boxShadow: 'none'
    },
    "&:hover": {
      opacity: 0.7,
    },
  },
})

export const sign = style({
  borderTopRightRadius: px(10),
  borderBottomRightRadius: px(10),
  "$nest": {
    "&:focus": {
      outline: "none",
      boxShadow: 'none'
    },
  }
})

export const edit = style({
  "$nest": {
    "&:focus": {
      outline: "none",
      boxShadow: 'none'
    },
  }
})

export const deleteTodo = style({
  borderTopLeftRadius: px(10),
  borderBottomLeftRadius: px(10),
  // marginLeft: px(5),
  "$nest": {
    "&:focus": {
      outline: "none",
      boxShadow: 'none'
    },
    "&:active": {
      backgroundColor: 'black',
    }
  }
})

export const link = style({
  display: 'flex',
  width: percent(100),
  "$nest": {
    "&:focus": {
      textDecoration: "none",
      outline: 'none',
    },
    "&:hover": {
      textDecoration: "none"
    }
  }
})