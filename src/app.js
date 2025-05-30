import { lerp, $, $$ } from './utils.js'
import { createProjects, createBlogposts } from './projects.js'

const main = $('main')
const video = $('video')
const videoSection = $('#video')

createProjects()
createBlogposts()

main.addEventListener('scroll', () => {
  animateVideo()
})

// Video Section
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

// Projects Section
const projectsSticky = $('.projects__sticky')
const projectsSlider = $('.projects__slider')

let projectTargetX = 0
let projectCurrentX = 0

let percentages = {
  small: 700,
  medium: 360,
  large: 100
}

let limit =
  window.innerWidth <= 600
    ? percentages.small
    : window.innerWidth <= 1100
    ? percentages.medium
    : percentages.large

function setLimits() {
  limit =
    window.innerWidth <= 600
      ? percentages.small
      : window.innerWidth <= 1100
      ? percentages.medium
      : percentages.large
}

window.addEventListener('resize', setLimits)

function animateProjects() {
  const rect = projectsSticky.getBoundingClientRect()

  // Only animate if it is within the viewport
  if (rect.bottom < 0 || rect.top > window.innerHeight) return


  let offsetTop = projectsSticky.parentElement.offsetTop
  let percentage = ((main.scrollTop - offsetTop) / window.innerHeight) * 100
  percentage = percentage < 0 ? 0 : percentage > limit ? limit : percentage
  projectTargetX = percentage
  projectCurrentX = lerp(projectCurrentX, projectTargetX, 0.1)
  projectsSlider.style.transform = `translate3d(${-projectCurrentX}vw, 0, 0)`
}

// Section Post Animation
const blogSection = $('#blog')
const blogPosts = [...$$('.post')]

function scrollBlogPosts() {
  let blogSectionTop = blogSection.getBoundingClientRect().top
  for (let i = 0; i < blogPosts.length; i++) {
    if (blogPosts[i].parentElement.getBoundingClientRect().top <= 1) {
      let offset = (blogSectionTop + window.innerHeight * (i + 1)) * 0.0005
      offset = offset < -1 ? -1 : offset >= 0 ? 0 : offset
      blogPosts[i].style.transform = `scale(${1 + offset})`
    }
  }
}

// Circle Animation
const circleSection = $('#circle__section')
const circle = $('.circle')

function scrollCircle() {
  let { top } = circleSection.getBoundingClientRect()
  let scaleTop = Math.abs(top)
  let scale = scaleTop / window.innerHeight
  scale = scale < 0 ? 0 : scale > 1 ? 1 : scale

  if (top <= 0) {
    circle.style.transform = `translate(-50%, -50%) scale(${scale})`
  } else {
    circle.style.transform = `translate(-50%, -50%) scale(${0})`
  }
}

function animate() {
  animateProjects()
  requestAnimationFrame(animate)
}

main.addEventListener('scroll', () => {
  scrollBlogPosts()
  scrollCircle()
})

animate()
