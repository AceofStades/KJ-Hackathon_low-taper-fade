

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons()

  // Carousel functionality
  const carousel = document.querySelector(".carousel")
  const prevBtn = document.querySelector(".carousel-arrow.prev")
  const nextBtn = document.querySelector(".carousel-arrow.next")

  // Carousel navigation
  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -220, behavior: "smooth" })
  })

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: 220, behavior: "smooth" })
  })

  // Auto-play functionality
  let autoPlayInterval

  const startAutoPlay = () => {
    autoPlayInterval = setInterval(() => {
      carousel.scrollBy({ left: 220, behavior: "smooth" })
    }, 5000) // Change slide every 5 seconds
  }

  const stopAutoPlay = () => {
    clearInterval(autoPlayInterval)
  }

  // Start auto-play
  startAutoPlay()

  // Pause auto-play on hover
  carousel.addEventListener("mouseenter", stopAutoPlay)
  carousel.addEventListener("mouseleave", startAutoPlay)

  // Mobile touch gestures for carousel
  let touchStartX = 0
  let touchEndX = 0

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
  })

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX
    handleSwipe()
  })

  function handleSwipe() {
    const swipeThreshold = 50
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left
      carousel.scrollBy({ left: 220, behavior: "smooth" })
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right
      carousel.scrollBy({ left: -220, behavior: "smooth" })
    }
  }

  // Smooth scroll effect for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Dynamic header background on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header")
    if (window.scrollY > 50) {
      header.style.background = "rgba(0, 0, 0, 0.8)"
    } else {
      header.style.background = "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)"
    }
  })
})

document.addEventListener("DOMContentLoaded", function () {
    const notificationIcon = document.querySelector(".notification-icon");
    const notificationPanel = document.getElementById("notification-panel");
    const blurOverlay = document.getElementById("blur-overlay");

    // Toggle Notification Panel
    notificationIcon.addEventListener("click", function () {
        notificationPanel.classList.toggle("active");
        blurOverlay.classList.toggle("active");
    });

    // Close the panel when clicking outside
    blurOverlay.addEventListener("click", function () {
        notificationPanel.classList.remove("active");
        blurOverlay.classList.remove("active");
    });
});


