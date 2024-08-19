//About us
document.addEventListener("DOMContentLoaded", function() {
    const aboutUs = document.querySelector(".Our-progs");
    const aboutContainer = document.querySelector('.prog');
    const dotsContainer = document.querySelector(".dotz");
    const aboutTexts = aboutUs.querySelectorAll(".prog-text");
    let imagesPerGroup;
    let numGroups;
    let currentIndex = 0;
    let autoScrollInterval;
  
    function updateDimensions() {
      const isMobile = window.innerWidth <= 600;
      const isTablet = window.innerWidth <= 1024 && window.innerWidth > 600;
      imagesPerGroup = isMobile ? 1 : isTablet ? 2 : 4; // 1 image per group on mobile, 2 on tablet, 4 on desktop
      numGroups = Math.ceil(aboutTexts.length / imagesPerGroup);
  
      // Set aboutUs width based on the number of images
      const imageWidth = aboutTexts[0].offsetWidth + parseInt(window.getComputedStyle(aboutTexts[0]).marginRight);
      const aboutUsWidth = imagesPerGroup * imageWidth; // Adjust aboutUs width for mobile and tablet
      aboutUs.style.width = `${aboutUsWidth}px`;
  
      updateDots();
      updateAboutUs();
    }
  
    // Create dots
    function updateDots() {
      dotsContainer.innerHTML = "";
      for (let i = 0; i < numGroups; i++) {
        const dot = document.createElement("span");
        dot.dataset.index = i;
        dot.addEventListener("click", () => {
          currentIndex = i;
          updateAboutUs();
          updateDots();
        });
        dotsContainer.appendChild(dot);
      }
      updateActiveDot();
    }
  
    function updateAboutUs() {
      const imageWidth = aboutTexts[0].offsetWidth + parseInt(window.getComputedStyle(aboutTexts[0]).marginRight);
      const maxOffset = aboutUs.scrollWidth - aboutContainer.clientWidth;
      let offset;
      if (currentIndex === numGroups - 1) {
        offset = -maxOffset;
      } else {
        offset = -currentIndex * imagesPerGroup * imageWidth;
        if (offset < -maxOffset) {
          offset = -maxOffset;
        }
      }
      aboutUs.style.transform = `translateX(${offset}px)`;
      aboutUs.style.transition = 'transform 1.5s ease-in-out'; // Add animation
    }
  
    function updateActiveDot() {
      dotsContainer.querySelectorAll("span").forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }
  
    function autoScroll() {
      currentIndex = (currentIndex + 1) % numGroups;
      updateAboutUs();
      updateActiveDot();
    }
  
    // Initial update
    updateDimensions();
  
    // Auto scroll every 3 seconds
    autoScrollInterval = setInterval(autoScroll, 9000);
  
    // Touch event handling
    let startX = 0;
    let isDragging = false;
  
    aboutUs.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      isDragging = true;
      clearInterval(autoScrollInterval); // Pause auto-scroll on touch
    });
  
    aboutUs.addEventListener("touchmove", (e) => {
      if (isDragging) {
        const touchX = e.touches[0].pageX;
        const deltaX = touchX - startX;
        const imageWidth = aboutTexts[0].offsetWidth + parseInt(window.getComputedStyle(aboutTexts[0]).marginRight);
        aboutUs.style.transform = `translateX(${-currentIndex * imagesPerGroup * imageWidth + deltaX}px)`;
      }
    });
  
    aboutUs.addEventListener("touchend", (e) => {
      isDragging = false;
      const touchX = e.changedTouches[0].pageX;
      const deltaX = touchX - startX;
      const imageWidth = aboutTexts[0].offsetWidth + parseInt(window.getComputedStyle(aboutTexts[0]).marginRight);
  
      if (Math.abs(deltaX) > imageWidth / 2) {
        if (deltaX > 0) {
          currentIndex = Math.max(currentIndex - 1, 0);
        } else {
          currentIndex = Math.min(currentIndex + 1, numGroups - 1);
        }
      }
  
      updateAboutUs();
      updateActiveDot();
      autoScrollInterval = setInterval(autoScroll, 3000); // Resume auto-scroll
    });
  
    window.addEventListener("resize", updateDimensions);
  });