import { lerp, $ } from './utils.js'
import { createProjects } from './projects.js'

const main = $('main')
const video = $('video')
const videoSection = $('#video')

createProjects()

main.addEventListener('scroll', () => {
  animateVideo()
})

const headerLeft = $('.text__header__left')
const headerRight = $('.text__header__right')

function animateVideo() {
  let { bottom } = videoSection.getBoundingClientRect()
  let scale = 1 - (bottom - window.innerHeight) * 0.0005
  scale = scale < 0.2 ? 0.2 : scale > 1 ? 1 : scale
  video.style.transform = `scale(${scale})`

  // Text transformation
  let textTrans = bottom - window.innerHeight
  textTrans = textTrans < 0 ? 0 : textTrans
  headerLeft.style.transform = `translate(${-textTrans}px)`
  headerRight.style.transform = `translate(${textTrans}px)`
}
