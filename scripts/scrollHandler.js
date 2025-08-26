document.addEventListener("DOMContentLoaded", function () {
    const navbarLinks = document.querySelectorAll("#navbar a");
    const sections = document.querySelectorAll("section");
  
    function updateActiveLink() {
      let currentSection = null;
  
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
  
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
          currentSection = section.id;
        }
      });
  
      navbarLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === currentSection) {
          link.classList.add("active");
        }
      });
    }
  
    window.addEventListener("scroll", updateActiveLink);



const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2 // Adjust as needed: percentage of target visible to trigger
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('hidden');
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

    
  });
  