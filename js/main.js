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

  /* --- Scroll: translucent over the hero, solid once it has passed --
     Every page opens with a hero as the first block in <main>; the nav
     turns solid when that block's bottom edge reaches the nav's bottom
     edge, whatever the hero's height or the viewport size. */
  if (nav) {
    var hero = document.querySelector('main > :first-child');

    function updateNavState() {
      var pastHero = hero
        ? hero.getBoundingClientRect().bottom <= nav.offsetHeight
        : window.scrollY > 0;
      nav.classList.toggle('nav--scrolled', pastHero);
    }

    window.addEventListener('scroll', updateNavState, { passive: true });
    window.addEventListener('resize', updateNavState);
    updateNavState();
  }

})();
