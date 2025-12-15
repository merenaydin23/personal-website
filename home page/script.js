function toggleSubscribe() {
  document.getElementById("subscribeWidget").classList.toggle("active")
}

function subscribe() {
  const success = document.getElementById("subscribeSuccess")
  success.style.display = "block"
}

// Scroll animation
document.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach((section) => {
    const rect = section.getBoundingClientRect()
    if (rect.top < window.innerHeight - 100) {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }
  })
})

document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault() // Prevent immediate navigation
    link.classList.add("clicked")

    // Navigate after animation
    setTimeout(() => {
      window.open(link.href, "_blank")
      link.classList.remove("clicked")
    }, 1200) // 1.2 seconds
  })
})
