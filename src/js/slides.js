// Slide navigation logic
let currentSlide = 0
const slides = document.querySelectorAll('.slide')
const totalSlides = slides.length
const currentSlideEl = document.getElementById('current-slide')
const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')
const announcer = document.getElementById('slide-announcer')

function showSlide(index) {
  // Clamp index
  if (index < 0) index = 0
  if (index >= totalSlides) index = totalSlides - 1

  // Get the slide we're about to show
  const activeSlide = slides[index]

  // CRITICAL: Clear any existing focus BEFORE changing aria-hidden
  // This prevents the "blocked aria-hidden" warning when an element retains focus
  if (document.activeElement) {
    document.activeElement.blur()
  }

  // Hide all slides and mark as hidden for screen readers
  slides.forEach(slide => {
    slide.classList.remove('active')
    slide.setAttribute('aria-hidden', 'true')
  })

  // Show current slide
  activeSlide.setAttribute('aria-hidden', 'false')
  activeSlide.classList.add('active')
  currentSlide = index

  // Update UI
  currentSlideEl.textContent = index + 1
  prevBtn.disabled = index === 0
  nextBtn.disabled = index === totalSlides - 1

  // Announce slide change to screen readers
  const slideContent = activeSlide.querySelector('.slide-content')
  const firstHeading = slideContent.querySelector('h1, h2, h3, h4, h5, h6')
  const headingText = firstHeading ? firstHeading.textContent : ''
  announcer.textContent = `Slide ${index + 1} of ${totalSlides}${headingText ? ': ' + headingText : ''}`

  // Focus management: move focus to slide content for keyboard users
  const focusTarget = slideContent.querySelector('h1, h2, h3, h4, h5, h6') || slideContent
  if (focusTarget.tagName && focusTarget.tagName.match(/^H[1-6]$/)) {
    // Make heading focusable temporarily
    focusTarget.setAttribute('tabindex', '-1')
    focusTarget.focus()
    // Remove tabindex after focus to keep natural tab order
    focusTarget.addEventListener('blur', () => focusTarget.removeAttribute('tabindex'), { once: true })
  }

  // Update URL hash
  window.location.hash = index + 1
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    showSlide(currentSlide + 1)
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    showSlide(currentSlide - 1)
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // Don't interfere if user is typing in an input field
  if (e.target.matches('input, textarea, select')) {
    return
  }

  // Handle Cmd/Ctrl + Arrow keys for first/last slide
  if (e.metaKey || e.ctrlKey) {
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        showSlide(0)
        break
      case 'ArrowRight':
        e.preventDefault()
        showSlide(totalSlides - 1)
        break
    }
    return
  }

  switch(e.key) {
    case 'ArrowRight':
    case 'ArrowDown':
    case ' ':
    case 'PageDown':
      e.preventDefault()
      nextSlide()
      break
    case 'ArrowLeft':
    case 'ArrowUp':
    case 'PageUp':
      e.preventDefault()
      prevSlide()
      break
    case 'Home':
      e.preventDefault()
      showSlide(0)
      break
    case 'End':
      e.preventDefault()
      showSlide(totalSlides - 1)
      break
  }
})

// Button navigation
nextBtn.addEventListener('click', nextSlide)
prevBtn.addEventListener('click', prevSlide)

// Initialize from URL hash or start at first slide
const initialSlide = parseInt(window.location.hash.slice(1)) - 1
showSlide(isNaN(initialSlide) ? 0 : initialSlide)

// Handle hash changes (e.g., browser back/forward buttons)
window.addEventListener('hashchange', () => {
  const slideNum = parseInt(window.location.hash.slice(1)) - 1
  if (!isNaN(slideNum) && slideNum !== currentSlide) {
    showSlide(slideNum)
  }
})
