/**
 * Mindrupee Theme JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector(".mobile-menu-toggle")
  const mainNav = document.querySelector(".main-nav")

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("is-open")

      // Update aria-expanded
      const isOpen = mainNav.classList.contains("is-open")
      menuToggle.setAttribute("aria-expanded", isOpen)
    })
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        e.preventDefault()
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Header scroll effect
  const header = document.querySelector(".site-header")
  let lastScroll = 0

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.08)"
    } else {
      header.style.boxShadow = "none"
    }

    lastScroll = currentScroll
  })
})
