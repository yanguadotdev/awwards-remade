import { lerp, $ } from './utils.js'

const main = $('main')
const video = $('video')
const videoSection = $('#video')

main.addEventListener('scroll', () => {
  animateVideo()
})

function animateVideo() {
  let { bottom } = videoSection.getBoundingClientRect()
  let scale = 1 - (bottom - window.innerHeight) * 0.0005
  scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale
  video.style.transform = `scale(${scale})`
}
