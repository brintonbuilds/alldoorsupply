/* All Door Supply — Main JS */

(function () {
  'use strict';

  /* --- Mobile nav toggle ---------------------------------- */
  const nav = document.querySelector('.nav');
  const hamburger = document.getElementById('hamburger');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
      const expanded = nav.classList.contains('nav--open');
      hamburger.setAttribute('aria-expanded', expanded);
    });
  }

  /* Close mobile nav on link click */
  document.querySelectorAll('.nav__mobile a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Keep review links inert while preserving their visual styling */
  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
    });
  });

  /* --- Scroll: transparent hero nav ----------------------- */
  if (nav && nav.classList.contains('nav--hero')) {
    var heroSection = document.querySelector('.hero');
    var navScrolled = false;

    function updateNavState() {
      /* Compact: trigger at 60px */
      nav.classList.toggle('nav--compact', window.scrollY > 60);

      /* Background: switch to solid once hero is past */
      var threshold = heroSection
        ? heroSection.offsetHeight - nav.offsetHeight
        : window.innerHeight * 0.8;
      var should = window.scrollY > threshold;
      if (should !== navScrolled) {
        navScrolled = should;
        nav.classList.toggle('nav--scrolled', should);
        nav.style.boxShadow = should ? '0 2px 12px rgba(0,0,0,0.12)' : 'none';
      }
    }

    window.addEventListener('scroll', updateNavState, { passive: true });
    updateNavState();

  } else {
    /* --- Scroll: nav shadow + compact (non-hero pages) ---- */
    var scrolled = false;
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav--compact', window.scrollY > 60);

      var should = window.scrollY > 8;
      if (should !== scrolled) {
        scrolled = should;
        nav.style.boxShadow = should
          ? '0 2px 12px rgba(0,0,0,0.12)'
          : 'none';
      }
    }, { passive: true });
  }

})();
