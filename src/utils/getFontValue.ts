export function remToPx(value: number | string) {
  return Math.round(parseFloat(value.toString()) * 16)
}

export function pxToRem(value: number | string) {
  return `${parseFloat(value.toString()) / 16}rem`
}
