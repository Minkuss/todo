import { style } from "typestyle";

export const btn = style({
  display: 'flex',
  "$nest": {
    "&:focus": {
      outline: 'none',
      boxShadow: 'none',
    }
  }
})