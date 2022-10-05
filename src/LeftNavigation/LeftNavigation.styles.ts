import { background, important, percent, px } from "csx";
import { style, media } from "typestyle";

export const btn = style({
  flex: important(1),
  border: "1px solid rgba(0, 0, 0, 0.15)",
  height: px(35),
  fontSize: px(15),
  lineHeight: px(15),
  color: "black",
  opacity: "1",
  "$nest": {
    "&:focus": {
      outline: 'none',
      boxShadow: 'none',
    },

    "&:hover": {
      opacity: "1"
    },
    "@media screen and (max-width: 600px)": {
      display: 'none',
    }
  }
})

export const btnDrawer = style({
  flex: important(1),
  border: "1px solid rgba(0, 0, 0, 0.15)",
  height: px(35),
  fontSize: px(15),
  lineHeight: px(15),
  color: "black",
  opacity: "1",
  "$nest": {
    "&:focus": {
      outline: 'none',
      boxShadow: 'none',
    },

    "&:hover": {
      opacity: "1"
    },
  }
})

export const link = style({
  display: 'flex',
  marginTop: px(15),
  "$nest": {
    "&:focus": {
      textDecoration: "none",
      outline: 'none',
    },
    "&:hover": {
      textDecoration: "none"
    },
    "@media screen and (max-width: 600px)": {
      display: 'none',
    }
  }
})

export const linkDrawer = style({
  display: 'flex',
  marginTop: px(15),
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

export const card = style({
  width: px(262),
  backgroundColor: '#D9D9D9',
  "$nest": {
    "@media screen and (max-width: 600px)": {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: percent(100),
    }
  }
})

export const input = style({
  display: "inline-block",
  width: px(253),
  alignSelf: 'center',
  "$nest": {
    "&::placeholder": {
      color: "rgba(0, 0, 0, 0.5)"
    },
    "@media screen and (max-width: 600px)": {
      width: percent(50),
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
  "$nest": {
    "@media screen and (max-width: 600px)": {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      width: percent(100),
    }
  }
})

export const burgerMenu = style({
  position: "relative",
  width: px(40),
  height: px(35),
  display: "none",
  cursor: 'pointer',
  alignSelf: "center",
  top: px(-5),
  "$nest": {
    "&::after": {
      height: px(4),
      width: percent(100),
      position: "absolute",
      background: "#515758",
      opacity: '0.7',
      margin: "0 auto",
      content: `''`,
      bottom: px(0)
    },
    "&::before": {
      height: px(4),
      width: percent(100),
      position: "absolute",
      background: "#515758",
      margin: "0 auto",
      content: `''`,
      opacity: '0.7',
      top: px(10)
    },
    "@media screen and (max-width: 600px)": {
      display: 'block',
    }
  },

})

export const span = style({
  height: px(4),
  width: percent(100),
  position: "absolute",
  background: "#515758",
  margin: "0 auto",
  top: px(21),
  opacity: '0.7',
})