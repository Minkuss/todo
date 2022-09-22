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
  display: 'inline',
  alignSelf: 'center',
  background: '#D9D9D9',
  boxShadow: 'none',
  width: percent(100),
  paddingLeft: px(18),
  "$nest": {
    "&::placeholder": {
      fontSize: px(15),
      color: "rgba(0, 0, 0, 0.29)",
    },
    "&:focus": {
      boxShadow: 'none'
    }
  }
})

export const inputBlock = style({
  display: 'flex',
  marginLeft: px(21),
  marginRight: px(21),
  height: px(49),
  background: '#D9D9D9',
  borderRadius: px(14),
  flexShrink: 0,
})

export const grow = style({
  flexGrow: 0.9,
  overflowY: "scroll",
})

export const screen = style({
  display: 'flex',
  flexGrow: 1,
})

export const edit = style({
  // backgroundColor: '#D9D9D9',
  width: percent(100),
  display: "flex",
  alignItems: "center",
  flexDirection: "column"
})

export const editInput = style({
  background: '#D9D9D9',
  fontSize: px(20),
  height: px(50),
  boxShadow: 'none',
  width: percent(95),
  paddingLeft: px(18),
  borderRadius: px(14),
  marginTop: percent(5),
  "$nest": {
    "&::placeholder": {
      fontSize: px(15),
      color: "rgba(0, 0, 0, 0.29)",
    },
    "&:focus": {
      boxShadow: 'none'
    }
  }
})

export const additionalButton = style({
  alignSelf: "start",
  marginLeft: percent(2.5),
  marginTop: px(5),
  borderRadius: px(10),
})