// Theme toggle + scroll reveal
(function () {
  // ---- Theme Toggle ----
  function getPreferred() {
    var saved = localStorage.getItem('theme');
    if (saved) return saved;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  // Apply on load (backup — inline script in <head> handles FOUC)
  apply(getPreferred());

  // Toggle button
  document.addEventListener('DOMContentLoaded', function () {
    // Initialize Lucide icons (self-hosted, loaded with defer)
    if (window.lucide) lucide.createIcons();

    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        apply(current === 'dark' ? 'light' : 'dark');
      });
    }

    // ---- Nav scroll: show name on scroll ----
    var navEl = document.querySelector('nav');
    if (navEl) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 60) {
          navEl.classList.add('scrolled');
        } else {
          navEl.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    // ---- Scroll Reveal (IntersectionObserver) ----
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('revealed'); });
      return;
    }

    // Wait two frames so elements paint in their hidden state first
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var staggerDelay = 0;

        var observer = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              // Stagger elements that are already visible on first observation
              var el = entry.target;
              var delay = parseInt(el.getAttribute('data-reveal-delay')) || 0;
              if (delay) {
                setTimeout(function () { el.classList.add('revealed'); }, delay);
              } else {
                el.classList.add('revealed');
              }
              observer.unobserve(el);
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        reveals.forEach(function (el) {
          // Check if element is already in viewport — stagger it
          var rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.setAttribute('data-reveal-delay', staggerDelay);
            staggerDelay += 120;
          }
          observer.observe(el);
        });
      });
    });
  });
})();
