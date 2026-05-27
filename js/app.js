// app.js — Baum Flooring
// GSAP + ScrollTrigger + Lenis smooth scroll

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  // ─── Lenis Smooth Scroll ──────────────────────────────────
  const lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ─── Nav: hide/show + scrolled ───────────────────────────
  const nav = document.getElementById('site-nav');
  let lastScroll = 0;

  lenis.on('scroll', ({ scroll }) => {
    nav.classList.toggle('scrolled', scroll > 60);
    if (scroll > lastScroll && scroll > 160) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }
    lastScroll = scroll;
  });

  // ─── Mobile nav burger ───────────────────────────────────
  const burger    = document.getElementById('nav-burger');
  const mobileNav = document.getElementById('mobile-nav');

  burger.addEventListener('click', () => mobileNav.classList.toggle('is-open'));

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('is-open'));
  });

  // ─── Hero Entrance ───────────────────────────────────────
  // Wrap each hero line's text in an inner span for the slide-up reveal
  document.querySelectorAll('.hero-line').forEach(line => {
    const text = line.innerHTML;
    line.innerHTML = `<span class="hero-line-inner">${text}</span>`;
  });

  // Set initial states
  gsap.set('.hero-label', { opacity: 0, y: 12 });
  gsap.set('.hero-sub',   { opacity: 0 });
  gsap.set('.hero-ctas',  { opacity: 0 });

  const heroTl = gsap.timeline({ delay: 0.15, defaults: { ease: 'power4.out' } });

  heroTl
    .to('.hero-label',      { opacity: 1, y: 0, duration: 0.65 })
    .to('.hero-line-inner', { y: '0%', duration: 1.1, stagger: 0.16 }, '-=0.25')
    .to('.hero-sub',        { opacity: 1, duration: 0.85 }, '-=0.55')
    .to('.hero-ctas',       { opacity: 1, duration: 0.7  }, '-=0.5');

  // ─── Hero BG parallax ────────────────────────────────────
  gsap.to('.hero-bg', {
    yPercent: 22,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // ─── Reusable: reveal headings on scroll ─────────────────
  function revealHeading(el) {
    gsap.fromTo(el,
      { opacity: 0, y: 36 },
      {
        opacity: 1, y: 0, duration: 1.0, ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  document.querySelectorAll('.section-heading').forEach(revealHeading);

  // ─── Section labels ───────────────────────────────────────
  document.querySelectorAll('.section-label').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 10 },
      {
        opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 89%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // ─── Trust strip ─────────────────────────────────────────
  gsap.to('.trust-item', {
    opacity: 1, y: 0, duration: 0.55, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.trust-strip',
      start: 'top 88%',
      toggleActions: 'play none none reverse'
    }
  });

  // ─── Waterproof intro text ────────────────────────────────
  gsap.to('.waterproof-intro', {
    opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.waterproof-header',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // ─── Stats count-up ───────────────────────────────────────
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const obj    = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 86%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });

  // ─── Waterproof stats fade in ─────────────────────────────
  gsap.to('.waterproof-stat', {
    opacity: 1, y: 0, duration: 0.75, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.waterproof-stats',
      start: 'top 83%',
      toggleActions: 'play none none reverse'
    }
  });

  // ─── Waterproof features ──────────────────────────────────
  gsap.to('.waterproof-feature', {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.waterproof-features',
      start: 'top 82%',
      toggleActions: 'play none none reverse'
    }
  });

  // ─── Collection cards ─────────────────────────────────────
  gsap.to('.collection-card', {
    opacity: 1, y: 0, duration: 1.0, stagger: 0.2, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.collections-grid',
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });

  // ─── Why Baum items — slide in from LEFT (different animation) ──
  gsap.to('.why-item', {
    opacity: 1, x: 0, duration: 0.85, stagger: 0.18, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.why-grid',
      start: 'top 82%',
      toggleActions: 'play none none reverse'
    }
  });

  // ─── Trade section ────────────────────────────────────────
  gsap.to('.trade-body', {
    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.trade-content',
      start: 'top 82%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.to('.trade-benefits', {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.trade-benefits',
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  });

  gsap.to('.trade-image-wrap', {
    opacity: 1, x: 0, duration: 1.0, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.trade-inner',
      start: 'top 78%',
      toggleActions: 'play none none reverse'
    }
  });

  // ─── Footer entrance ─────────────────────────────────────
  gsap.fromTo('.site-footer',
    { opacity: 0, y: 20 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: '.site-footer',
        start: 'top 96%',
        toggleActions: 'play none none none'
      }
    }
  );

  // ─── Email / Contact Popup ────────────────────────────────
  const overlay      = document.getElementById('email-popup-overlay');
  const popupClose   = document.getElementById('popup-close');
  const popupForm    = document.getElementById('popup-form');
  const popupLabel   = document.getElementById('popup-label');
  const popupTitle   = document.getElementById('popup-title');
  const popupSub     = document.getElementById('popup-sub');
  const popupSubmit  = document.getElementById('popup-submit');

  const popupContent = {
    stockist: {
      label: 'Stockist Enquiry',
      title: 'Find a Stockist',
      sub:   'Looking for Baum flooring near you? Get in touch and we\'ll point you to your nearest stockist.'
    },
    trade: {
      label: 'Trade Account',
      title: 'Apply for a Trade Account',
      sub:   'Complete the form below and our trade team will follow up with pricing and further information.'
    }
  };

  let popupMode = 'stockist';

  function openPopup(mode) {
    popupMode = mode;
    const content = popupContent[mode];
    popupLabel.textContent = content.label;
    popupTitle.textContent = content.title;
    popupSub.textContent   = content.sub;
    popupSubmit.textContent = 'Send Enquiry →';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open triggers
  const btnStockist       = document.getElementById('btn-stockist');
  const btnStockistMobile = document.getElementById('btn-stockist-mobile');
  const btnTrade          = document.getElementById('btn-trade');

  if (btnStockist)       btnStockist.addEventListener('click', () => openPopup('stockist'));
  if (btnStockistMobile) btnStockistMobile.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    openPopup('stockist');
  });
  if (btnTrade)          btnTrade.addEventListener('click', () => openPopup('trade'));

  // Close triggers
  popupClose.addEventListener('click', closePopup);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closePopup(); });

  // Form submit
  popupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = document.getElementById('popup-name').value.trim();
    const company = document.getElementById('popup-company').value.trim();
    const email   = document.getElementById('popup-email').value.trim();
    const message = document.getElementById('popup-message').value.trim();

    const subject = popupMode === 'trade'
      ? `Trade Account Application — ${company || name}`
      : `Stockist Enquiry — ${name}`;

    popupSubmit.disabled    = true;
    popupSubmit.textContent = '...';

    /*
      WEB3FORMS SETUP
      ─────────────────────────────────────────────────────────
      1. Go to https://web3forms.com/ and create a free account
      2. Get your Access Key and replace 'YOUR_ACCESS_KEY_HERE' below
      3. Forms will be sent to the email linked to that key
    */
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: 'YOUR_ACCESS_KEY_HERE',  // ← Replace this
        name, company, email, message, subject
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        popupForm.innerHTML = `<p class="popup-success">Thank you — we'll be in touch shortly.</p>`;
        setTimeout(closePopup, 2600);
      } else {
        popupSubmit.disabled    = false;
        popupSubmit.textContent = 'Send Enquiry →';
        alert('Something went wrong. Please try again or email info@baumflooring.ie directly.');
      }
    })
    .catch(() => {
      popupSubmit.disabled    = false;
      popupSubmit.textContent = 'Send Enquiry →';
      alert('Something went wrong. Please try again or email info@baumflooring.ie directly.');
    });
  });

});
