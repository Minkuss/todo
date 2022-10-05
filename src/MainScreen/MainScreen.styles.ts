import { style } from "typestyle";

export const main = style({
  display: 'flex',
  "$nest": {
    "@media screen and (max-width: 600px)": {
      flexDirection: 'column'
    }
  }
})