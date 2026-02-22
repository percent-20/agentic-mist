// Agentic Mist - Minimal JS
// Smooth scroll, mobile nav, copy buttons, waiting list form

(function () {
  'use strict';

  // Mobile nav toggle
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });

    // Close nav on link click
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }

  // Copy buttons
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;

      navigator.clipboard.writeText(text).then(function () {
        var original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 2000);
      });
    });
  });

  // Waiting list form
  var form = document.getElementById('waitlist-form');
  var note = document.getElementById('waitlist-note');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (res.ok) {
            form.style.display = 'none';
            note.textContent = "You're on the list! We'll email you when SafeRoom is ready.";
            note.className = 'waitlist-note waitlist-success';
          } else {
            note.textContent = 'Something went wrong. Please try again.';
          }
        })
        .catch(function () {
          note.textContent = 'Network error. Please try again.';
        });
    });
  }

  // Nav background on scroll
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        nav.style.borderBottomColor = 'rgba(30, 32, 48, 0.8)';
      } else {
        nav.style.borderBottomColor = 'rgba(30, 32, 48, 0.3)';
      }
    });
  }
})();
