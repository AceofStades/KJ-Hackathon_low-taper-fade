document.addEventListener("DOMContentLoaded", () => {
	// Initialize Lucide icons
	lucide.createIcons();

	// Carousel functionality
	const carousel = document.querySelector(".carousel");
	const prevBtn = document.querySelector(".carousel-arrow.prev");
	const nextBtn = document.querySelector(".carousel-arrow.next");

	prevBtn.addEventListener("click", () => {
		carousel.scrollBy({ left: -220, behavior: "smooth" });
	});

	nextBtn.addEventListener("click", () => {
		carousel.scrollBy({ left: 220, behavior: "smooth" });
	});

	// Auto-play functionality
	let autoPlayInterval;

	const startAutoPlay = () => {
		autoPlayInterval = setInterval(() => {
			carousel.scrollBy({ left: 220, behavior: "smooth" });
		}, 5000);
	};

	const stopAutoPlay = () => {
		clearInterval(autoPlayInterval);
	};

	startAutoPlay();

	carousel.addEventListener("mouseenter", stopAutoPlay);
	carousel.addEventListener("mouseleave", startAutoPlay);

	// Mobile touch gestures for carousel
	let touchStartX = 0;
	let touchEndX = 0;

	carousel.addEventListener("touchstart", (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	carousel.addEventListener("touchend", (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	});

	function handleSwipe() {
		const swipeThreshold = 50;
		if (touchStartX - touchEndX > swipeThreshold) {
			carousel.scrollBy({ left: 220, behavior: "smooth" });
		} else if (touchEndX - touchStartX > swipeThreshold) {
			carousel.scrollBy({ left: -220, behavior: "smooth" });
		}
	}

	// Smooth scroll effect for navigation links
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute("href")).scrollIntoView({
				behavior: "smooth",
			});
		});
	});

	// Dynamic header background on scroll
	window.addEventListener("scroll", () => {
		const header = document.querySelector("header");
		if (window.scrollY > 50) {
			header.style.background = "rgba(0, 0, 0, 0.8)";
		} else {
			header.style.background =
				"linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%)";
		}
	});

	// Notification functionality with WebSocket
	const notificationIcon = document.querySelector(".notification-icon");
	const notificationPanel = document.getElementById("notification-panel");
	const blurOverlay = document.getElementById("blur-overlay");
	const notificationList = document.getElementById("notification-list");
	const notificationBadge = document.querySelector(".notification-badge");

	notificationIcon.addEventListener("click", function () {
		notificationPanel.classList.toggle("active");
		blurOverlay.classList.toggle("active");
		notificationBadge.textContent = "";
		notificationBadge.style.display = "none";
	});

	blurOverlay.addEventListener("click", function () {
		notificationPanel.classList.remove("active");
		blurOverlay.classList.remove("active");
	});

	// Connect to WebSocket server
	const socket = io("http://localhost:5000");

	socket.on("connect", () => {
		console.log("Connected to notification server");
	});

	socket.on("new_notification", (data) => {
		console.log("New notification received:", data.message);

		// Create a new notification item
		const newNotification = document.createElement("li");
		newNotification.textContent = data.message;
		notificationList.prepend(newNotification);

		// Update notification count
		let count = parseInt(notificationBadge.textContent) || 0;
		notificationBadge.textContent = count + 1;
		notificationBadge.style.display = "block";
	});
});
