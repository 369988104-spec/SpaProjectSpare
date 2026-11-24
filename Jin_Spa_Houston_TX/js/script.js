(function () {
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    var nav = document.querySelector('.nav');
    var burger = document.querySelector('.nav__burger');
    var mobile = document.querySelector('.nav__mobile');

    function updateScrolled() {
      if (!nav) return;
      nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    }
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });

    if (burger && mobile) {
      burger.addEventListener('click', function () {
        burger.classList.toggle('open');
        mobile.classList.toggle('active');
      });
      mobile.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          burger.classList.remove('open');
          mobile.classList.remove('active');
        });
      });
    }

    document.querySelectorAll('[data-scroll-target]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var target = link.getAttribute('data-scroll-target');
        if (!target) return;
        var currentPage = (location.pathname.split('/').pop() || 'index.html');
        if (currentPage !== 'index.html' && currentPage !== '') return;
        var el = document.getElementById(target);
        if (el) {
          event.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    if (location.hash && location.hash.length > 1) {
      var id = decodeURIComponent(location.hash.slice(1));
      setTimeout(function () {
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  });
})();
