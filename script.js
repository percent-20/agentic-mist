// Mist Landing Page
// Scroll reveals, terminal typing, mobile nav, copy buttons, waitlist

(function () {
  'use strict';

  // ========================================
  // Scroll Reveal (IntersectionObserver)
  // ========================================
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ========================================
  // Terminal Typing Effect
  // ========================================
  var terminalBody = document.getElementById('terminal-body');

  if (terminalBody) {
    var lines = terminalBody.querySelectorAll('.t-line');

    if (lines.length > 0) {
      // Hide all lines initially
      lines.forEach(function (line) {
        line.style.width = '0';
        line.style.borderRight = 'none';
      });

      var lineIndex = 0;
      var delays = [60, 40, 40, 50, 40]; // ms per character per line
      var pauseBetween = 300; // ms pause between lines

      function getTextLength(el) {
        return el.textContent.length;
      }

      function typeLine(index) {
        if (index >= lines.length) return;

        var line = lines[index];
        var len = getTextLength(line);
        var charDelay = delays[index] || 40;
        var duration = len * charDelay;

        // Show cursor
        line.style.borderRight = '2px solid #8b5cf6';
        line.style.transition = 'width ' + duration + 'ms steps(' + len + ', end)';
        line.style.width = '100%';

        setTimeout(function () {
          // Remove cursor
          line.style.borderRight = 'none';
          line.classList.add('typed');

          // Type next line after pause
          setTimeout(function () {
            typeLine(index + 1);
          }, pauseBetween);
        }, duration);
      }

      // Start typing when terminal is visible
      var terminalEl = terminalBody.closest('.hero-terminal');
      if (terminalEl && 'IntersectionObserver' in window) {
        var termObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                setTimeout(function () { typeLine(0); }, 500);
                termObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 }
        );
        termObserver.observe(terminalEl);
      } else {
        // Fallback: show all lines
        lines.forEach(function (line) {
          line.style.width = '100%';
          line.style.borderRight = 'none';
        });
      }
    }
  }

  // ========================================
  // Mobile Nav Toggle
  // ========================================
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

  // ========================================
  // Nav Scroll Effect
  // ========================================
  var nav = document.getElementById('nav');
  if (nav) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.scrollY;
      if (scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      lastScroll = scrollY;
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

  // ========================================
  // Waiting List Form (Formspree)
  // ========================================
  var form = document.getElementById('waitlist-form');
  var note = document.getElementById('waitlist-note');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var data = new FormData(form);
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }

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
            if (submitBtn) {
              submitBtn.textContent = 'Join Waiting List';
              submitBtn.disabled = false;
            }
          }
        })
        .catch(function () {
          note.textContent = 'Network error. Please try again.';
          if (submitBtn) {
            submitBtn.textContent = 'Join Waiting List';
            submitBtn.disabled = false;
          }
        });
    });
  }
})();
