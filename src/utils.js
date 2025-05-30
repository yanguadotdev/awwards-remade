function lerp(start, end, t) {
  return start * (1 - t) + end * t
}

const $ = (el) => document.querySelector(el)
const $$ = (el) => document.querySelectorAll(el)

export { lerp, $, $$ }
