import { style } from "typestyle";

export const btn = style({
  "$nest": {
    "&:focus": {
      outline: 'none',
      boxShadow: 'none',
    }
  }
})