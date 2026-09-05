/**
 * FreshPress - Laundry & Dry-Cleaning Pickup Service
 * Core Client-Side Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Theme Management (Light / Dark Mode with System Preference & Storage)
     ========================================================================== */
  const initTheme = () => {
    const savedTheme = localStorage.getItem('freshpress-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcons(currentTheme);

    // Watch for OS theme changes if user hasn't explicitly set preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('freshpress-theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeIcons(newTheme);
      }
    });
  };

  const updateThemeIcons = (theme) => {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fa-solid fa-sun';
          btn.setAttribute('aria-label', 'Switch to light mode');
          btn.setAttribute('title', 'Switch to light mode');
        } else {
          icon.className = 'fa-solid fa-moon';
          btn.setAttribute('aria-label', 'Switch to dark mode');
          btn.setAttribute('title', 'Switch to dark mode');
        }
      }
    });
  };

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('freshpress-theme', nextTheme);
      updateThemeIcons(nextTheme);
    });
  });

  initTheme();

  /* ==========================================================================
     2. RTL / LTR Direction Management
     ========================================================================== */
  const initDirection = () => {
    const savedDir = localStorage.getItem('freshpress-direction') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateRTLButtons(savedDir);
  };

  const updateRTLButtons = (dir) => {
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      btn.setAttribute('title', dir === 'rtl' ? 'Switch to Left-to-Right' : 'Switch to Right-to-Left');
    });
  };

  document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('dir') || 'ltr';
      const nextDir = current === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', nextDir);
      localStorage.setItem('freshpress-direction', nextDir);
      updateRTLButtons(nextDir);
    });
  });

  initDirection();

  /* ==========================================================================
     3. Header Sticky & Scroll Dynamics
     ========================================================================== */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ==========================================================================
     4. Mobile Navigation Drawer
     ========================================================================== */
  const drawerToggleBtns = document.querySelectorAll('.nav-toggle-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerCloseBtn = document.querySelector('.drawer-close-btn');

  const openDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  drawerToggleBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });

  /* ==========================================================================
     5. FAQ Accordions
     ========================================================================== */
  document.querySelectorAll('.accordion-header').forEach(headerBtn => {
    headerBtn.addEventListener('click', () => {
      const accordionItem = headerBtn.closest('.accordion-item');
      const content = accordionItem.querySelector('.accordion-content');
      const isExpanded = accordionItem.classList.contains('active');

      // Optional: close other sibling items in same accordion container
      const parentAccordion = accordionItem.closest('.accordion');
      if (parentAccordion && !parentAccordion.hasAttribute('data-multi-expand')) {
        parentAccordion.querySelectorAll('.accordion-item').forEach(item => {
          if (item !== accordionItem) {
            item.classList.remove('active');
            const siblingContent = item.querySelector('.accordion-content');
            if (siblingContent) siblingContent.style.maxHeight = null;
          }
        });
      }

      if (isExpanded) {
        accordionItem.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        accordionItem.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     6. Client-Side Form Validation
     ========================================================================== */
  document.querySelectorAll('form.needs-validation').forEach(form => {
    form.addEventListener('submit', (e) => {
      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        if (!input.checkValidity() || input.value.trim() === '') {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        }
      });

      if (!isValid) {
        e.preventDefault();
        e.stopPropagation();
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
      } else {
        // Handle demo feedback if not submitting to live Formspree endpoint
        if (form.getAttribute('data-demo-submit') === 'true') {
          e.preventDefault();
          const submitBtn = form.querySelector('button[type="submit"]');
          const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
          if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
          }

          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Request Received!';
            }
            form.reset();
            form.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
            const alertBox = form.querySelector('.form-alert-success');
            if (alertBox) {
              alertBox.style.display = 'block';
              setTimeout(() => { alertBox.style.display = 'none'; }, 6000);
            } else {
              alert('Thank you! Your pickup request has been scheduled. We will text you a confirmation shortly.');
            }
            if (submitBtn) {
              setTimeout(() => { submitBtn.innerHTML = originalText; }, 3500);
            }
          }, 900);
        }
      }
    });

    // Remove invalid on input
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid') && input.checkValidity()) {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        }
      });
    });
  });

  /* ==========================================================================
     7. Modal Dialog Controller
     ========================================================================== */
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-target');
      const modal = document.querySelector(modalId);
      if (modal) modal.classList.add('active');
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = closeBtn.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  /* ==========================================================================
     8. Interactive Zip Code Coverage Checker
     ========================================================================== */
  const zipForm = document.getElementById('zip-checker-form');
  const zipInput = document.getElementById('zip-input');
  const zipResult = document.getElementById('zip-result');

  // Sample covered zip codes across major metropolitan areas
  const validZips = ['10001', '10002', '10003', '90210', '90001', '94102', '94103', '60601', '60611', '75001', '30301', '02108', '98101', '33101'];

  if (zipForm && zipInput && zipResult) {
    zipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const zip = zipInput.value.trim();
      if (!zip) return;

      zipResult.innerHTML = '<div class="skeleton" style="height: 48px; border-radius: 8px;"></div>';
      
      setTimeout(() => {
        const isCovered = validZips.includes(zip) || zip.length === 5;
        if (isCovered) {
          zipResult.innerHTML = `
            <div style="background: var(--accent-light); color: var(--accent-hover); border: 1px solid var(--accent); padding: 14px 20px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
              <div>
                <strong><i class="fa-solid fa-circle-check"></i> Great News!</strong> Doorstep pickup is available in zip code <strong>${zip}</strong>!
                <div style="font-size: 0.85rem; margin-top: 2px;">Next available pickup window: <strong>Today, 4:00 PM - 7:00 PM</strong></div>
              </div>
              <a href="login.html" class="btn btn-accent btn-sm"><i class="fa-solid fa-calendar-check"></i> Book Now</a>
            </div>
          `;
        } else {
          zipResult.innerHTML = `
            <div style="background: var(--warning-light); color: #92400e; border: 1px solid var(--warning); padding: 14px 20px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
              <div>
                <strong><i class="fa-solid fa-location-dot"></i> Expanding Soon!</strong> We haven't launched in <strong>${zip}</strong> yet, but we are expanding rapidly.
              </div>
              <button type="button" class="btn btn-outline btn-sm" onclick="alert('Thank you! You have been added to our priority neighborhood waitlist.')">Get Notified</button>
            </div>
          `;
        }
      }, 400);
    });
  }

  /* ==========================================================================
     9. Interactive Laundry Basket Cost Estimator (Pricing Page)
     ========================================================================== */
  const estimatorContainer = document.querySelector('.pricing-estimator-container');
  if (estimatorContainer) {
    const qtyDisplays = estimatorContainer.querySelectorAll('.qty-display');
    const totalItemsEl = document.getElementById('calc-total-items');
    const totalPriceEl = document.getElementById('calc-total-price');
    const turnaroundEl = document.getElementById('calc-turnaround');

    const updateCalculations = () => {
      let totalQty = 0;
      let totalCost = 0;

      estimatorContainer.querySelectorAll('.clothing-item-card').forEach(card => {
        const price = parseFloat(card.getAttribute('data-price') || 0);
        const qty = parseInt(card.querySelector('.qty-display').textContent || 0, 10);
        totalQty += qty;
        totalCost += (price * qty);
      });

      if (totalItemsEl) totalItemsEl.textContent = totalQty;
      if (totalPriceEl) totalPriceEl.textContent = `$${totalCost.toFixed(2)}`;
      if (turnaroundEl) {
        turnaroundEl.textContent = totalQty > 15 ? '36 - 48 Hours' : 'Standard 24 Hours';
      }
    };

    estimatorContainer.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const isPlus = btn.classList.contains('qty-plus');
        const display = btn.parentElement.querySelector('.qty-display');
        let val = parseInt(display.textContent, 10);
        if (isPlus) {
          val++;
        } else if (val > 0) {
          val--;
        }
        display.textContent = val;
        updateCalculations();
      });
    });

    // Category filter pills in estimator
    const catPills = estimatorContainer.querySelectorAll('.category-pill');
    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.getAttribute('data-category');

        estimatorContainer.querySelectorAll('.clothing-item-card').forEach(card => {
          if (cat === 'all' || card.getAttribute('data-category') === cat) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
     10. Blog Filter & Search Controller
     ========================================================================== */
  const blogSearchInput = document.getElementById('blog-search-input');
  const blogCategoryPills = document.querySelectorAll('.blog-category-pill');
  const blogArticles = document.querySelectorAll('.blog-card-item');

  const filterBlogPosts = () => {
    const query = (blogSearchInput ? blogSearchInput.value.toLowerCase().trim() : '');
    const activePill = document.querySelector('.blog-category-pill.active');
    const selectedCat = activePill ? activePill.getAttribute('data-cat') : 'all';

    let matchCount = 0;
    blogArticles.forEach(article => {
      const title = (article.querySelector('.blog-title')?.textContent || '').toLowerCase();
      const snippet = (article.querySelector('.blog-snippet')?.textContent || '').toLowerCase();
      const cat = article.getAttribute('data-category') || '';

      const matchesQuery = !query || title.includes(query) || snippet.includes(query);
      const matchesCat = selectedCat === 'all' || cat === selectedCat;

      if (matchesQuery && matchesCat) {
        article.style.display = '';
        matchCount++;
      } else {
        article.style.display = 'none';
      }
    });

    const noResultsEl = document.getElementById('blog-no-results');
    if (noResultsEl) {
      noResultsEl.style.display = matchCount === 0 ? 'block' : 'none';
    }
  };

  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', filterBlogPosts);
  }

  blogCategoryPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      blogCategoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterBlogPosts();
    });
  });

  /* ==========================================================================
     11. Coming Soon Countdown Timer
     ========================================================================== */
  const countdownTimer = document.getElementById('countdown-timer');
  if (countdownTimer) {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30); // 30 days from today

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance < 0) {
        countdownTimer.innerHTML = '<h4>We are Live!</h4>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const dEl = document.getElementById('timer-days');
      const hEl = document.getElementById('timer-hours');
      const mEl = document.getElementById('timer-minutes');
      const sEl = document.getElementById('timer-seconds');

      if (dEl) dEl.textContent = String(days).padStart(2, '0');
      if (hEl) hEl.textContent = String(hours).padStart(2, '0');
      if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
      if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
    };

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  /* ==========================================================================
     12. Password Visibility Toggle
     ========================================================================== */
  document.querySelectorAll('.password-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const icon = btn.querySelector('i');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        }
      } else {
        input.type = 'password';
        if (icon) {
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      }
    });
  });

});
