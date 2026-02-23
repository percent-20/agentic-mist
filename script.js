// Mist Landing Page
(function () {
  'use strict';

  // ========================================
  // Scroll Reveal
  // ========================================
  var reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  // ========================================
  // Terminal Typing Effect
  // ========================================
  var terminal = document.getElementById('terminal-body');

  if (terminal) {
    var lines = terminal.querySelectorAll('.t-line');
    var delays = [0, 600, 1100, 1700, 2400];

    if (lines.length) {
      function showLines() {
        lines.forEach(function (line, i) {
          setTimeout(function () {
            line.classList.add('typed');
          }, delays[i] || i * 500);
        });
      }

      // Wait until terminal is visible
      var termEl = terminal.closest('.hero-terminal');
      if (termEl && 'IntersectionObserver' in window) {
        var tio = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              setTimeout(showLines, 400);
              tio.unobserve(e.target);
            }
          });
        }, { threshold: 0.25 });
        tio.observe(termEl);
      } else {
        lines.forEach(function (l) { l.classList.add('typed'); });
      }
    }
  }

  // ========================================
  // Nav
  // ========================================
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  // ========================================
  // Copy Buttons
  // ========================================
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;
      navigator.clipboard.writeText(text).then(function () {
        var orig = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = orig;
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // ========================================
  // Waitlist Form
  // ========================================
  var form = document.getElementById('waitlist-form');
  var note = document.getElementById('waitlist-note');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (res.ok) {
            form.style.display = 'none';
            note.textContent = "You're on the list. We'll email you when SafeRoom ships.";
            note.className = 'waitlist-note waitlist-success';
          } else {
            note.textContent = 'Something went wrong. Try again.';
            if (btn) { btn.textContent = 'Join Waiting List'; btn.disabled = false; }
          }
        })
        .catch(function () {
          note.textContent = 'Network error. Try again.';
          if (btn) { btn.textContent = 'Join Waiting List'; btn.disabled = false; }
        });
    });
  }
})();
