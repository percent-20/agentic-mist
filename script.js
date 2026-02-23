// Mist Landing Page
(function () {
  'use strict';

  // ========================================
  // Bubbles Background
  // ========================================
  var bubblesContainer = document.getElementById('bubbles');

  if (bubblesContainer) {
    var colors = [
      'rgba(139, 92, 246, ',   // purple
      'rgba(167, 139, 250, ',  // blue
      'rgba(192, 132, 252, ',  // teal
      'rgba(34, 197, 94, ',    // green
      'rgba(233, 213, 255, ',  // light purple
    ];
    var bubbleCount = 40;

    function spawnBubble(immediate) {
      var bubble = document.createElement('div');
      bubble.className = 'bubble';

      var size = Math.random() * 50 + 8; // 8-58px
      var x = Math.random() * 100;
      var duration = Math.random() * 8 + 5; // 5-13s (faster)
      var opacity = Math.random() * 0.15 + 0.08; // 0.08-0.23
      var color = colors[Math.floor(Math.random() * colors.length)];

      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';
      bubble.style.left = x + '%';
      bubble.style.background = color + (opacity * 5) + ')';
      bubble.style.boxShadow = '0 0 ' + (size * 2) + 'px ' + color + (opacity * 2) + ')';
      bubble.style.setProperty('--bubble-opacity', opacity);
      bubble.style.animationDuration = duration + 's';

      // For initial load, start bubbles at random positions in the rise
      if (immediate) {
        bubble.style.animationDelay = -(Math.random() * duration) + 's';
      }

      bubblesContainer.appendChild(bubble);

      // When it reaches the top, remove and spawn a new one from bottom
      bubble.addEventListener('animationend', function () {
        bubble.remove();
        if (document.visibilityState !== 'hidden') {
          spawnBubble(false);
        }
      });
    }

    // Initial burst — stagger across the full rise so the screen is full immediately
    for (var i = 0; i < bubbleCount; i++) { spawnBubble(true); }
  }

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
