// ============================================================
//  LIL' FASHION FINDS & CONSIGNS -- Main script
//  Relies on STORE config from data.js (loaded first in HTML).
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. HAMBURGER MENU ──────────────────────────────────
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      drawer.classList.toggle('is-open', !expanded);
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('is-open');
      });
    });

    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !drawer.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('is-open');
      }
    });
  }

  // ── 2. CYCLING WORD ANIMATION ──────────────────────────
  const words = ['lovely', 'unique', 'cozy', 'one-of-a-kind', 'yours'];
  const cycleEl = document.getElementById('cycle-word');

  if (cycleEl) {
    cycleEl.innerHTML = words
      .map((w, i) => `<span class="${i === 0 ? 'active' : ''}">${w}</span>`)
      .join('');

    const spans = cycleEl.querySelectorAll('span');
    let current = 0;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      setInterval(() => {
        spans[current].classList.remove('active');
        current = (current + 1) % spans.length;
        spans[current].classList.add('active');
      }, 2200);
    }
  }

  // ── 3. RENDER MONTHLY SALES FROM DATA ─────────────────
  const salesGrid = document.getElementById('sales-grid');
  if (salesGrid && typeof STORE !== 'undefined' && STORE.monthlySales) {
    salesGrid.innerHTML = STORE.monthlySales.map(sale => `
      <div class="sale-card sale-card--${sale.color} reveal" role="listitem">
        <div class="sale-icon" aria-hidden="true">${getSaleIcon(sale.icon)}</div>
        <div class="sale-tag">${sale.tag}</div>
        <h3>${sale.name}</h3>
        <p>${sale.description}</p>
      </div>
    `).join('');
  }

  // ── 4. RENDER HOURS FROM DATA ──────────────────────────
  const hoursBody = document.getElementById('hours-table-body');
  const footerHours = document.getElementById('footer-hours');
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  if (hoursBody && typeof STORE !== 'undefined' && STORE.hours) {
    hoursBody.innerHTML = STORE.hours.map(row => {
      const isToday = row.day === todayName;
      const isClosed = !row.open;
      const hoursText = isClosed ? 'Closed' : `${row.open} - ${row.close}`;
      const cls = isToday ? 'today-row' : (isClosed ? 'closed-row' : '');
      return `<tr class="${cls}">
        <td>${row.day}${isToday ? ' <span style="font-size:.75rem;color:var(--blush)">Today</span>' : ''}</td>
        <td>${hoursText}</td>
      </tr>`;
    }).join('');
  }

  if (footerHours && typeof STORE !== 'undefined' && STORE.hours) {
    footerHours.innerHTML = STORE.hours.map(row => {
      const isClosed = !row.open;
      const hoursText = isClosed ? 'Closed' : `${row.open} - ${row.close}`;
      return `<div class="footer-hours-row">
        <span class="day">${row.day.slice(0,3)}</span>
        <span>${hoursText}</span>
      </div>`;
    }).join('');
  }

  // ── 5. POPULATE CONTACT DETAILS FROM DATA ─────────────
  if (typeof STORE !== 'undefined') {
    document.querySelectorAll('[data-store="phone"]').forEach(el => {
      el.textContent = STORE.phone;
      if (el.tagName === 'A') el.href = `tel:${STORE.phone.replace(/\D/g,'')}`;
    });
    document.querySelectorAll('[data-store="email"]').forEach(el => {
      el.textContent = STORE.email;
      if (el.tagName === 'A') el.href = `mailto:${STORE.email}`;
    });
    document.querySelectorAll('[data-store="address"]').forEach(el => {
      el.textContent = `${STORE.address}, ${STORE.city}, ${STORE.state} ${STORE.zip}`;
    });
    document.querySelectorAll('[data-store="footer-address"]').forEach(el => {
      el.textContent = `${STORE.address}, ${STORE.city}, ${STORE.state} ${STORE.zip}`;
    });

    const mapFrame = document.getElementById('map-embed');
    if (mapFrame) mapFrame.src = STORE.mapEmbedUrl;

    const fbLink = document.getElementById('social-fb');
    const igLink = document.getElementById('social-ig');
    if (fbLink && STORE.social.facebook !== '#') fbLink.href = STORE.social.facebook;
    if (igLink) igLink.href = STORE.social.instagram;
  }

  // ── 6. CONTACT FORM ───────────────────────────────────
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');

  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const submitBtn = form.querySelector('.form-submit');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Hide previous messages
      successMsg.hidden = true;
      errorMsg.hidden   = true;

      // If the action still has the placeholder, show a helpful note
      if (form.action.includes('YOUR_FORM_ID')) {
        successMsg.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Thanks for your message! (Heads up to the site owner: connect Formspree to make this form actually send. See the OWNER comment in index.html.)</span>
        `;
        successMsg.hidden = false;
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
        return;
      }

      try {
        const data = new FormData(form);
        const res  = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          successMsg.hidden = false;
          form.reset();
        } else {
          errorMsg.hidden = false;
        }
      } catch {
        errorMsg.hidden = false;
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Send Message`;
    });
  }

  // ── 6b. DYNAMIC SCHEDULE WIDGET ───────────────────────
  renderDynamicSchedule();

  // Refresh automatically at 12:01 AM each night
  scheduleMidnightRefresh(renderDynamicSchedule);

  // ── 7. SCROLL REVEAL ──────────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // ── DYNAMIC SCHEDULE HELPERS ───────────────────────────

  function getScheduleForDate(d) {
    if (!STORE.monthlySchedule) return undefined;
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (key in STORE.monthlySchedule) return STORE.monthlySchedule[key];
    // fall back to typical hours by day-of-week
    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' });
    const row = STORE.hours.find(r => r.day === dayName);
    if (!row || !row.open) return null;
    return { open: row.open, close: row.close };
  }

  function shortTime(t) {
    return t.replace(':00','').replace(' AM','a').replace(' PM','p');
  }

  function renderDynamicSchedule() {
    const el = document.getElementById('dynamic-schedule');
    if (!el || typeof STORE === 'undefined') return;

    const now   = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Today's info
    const todayEntry = getScheduleForDate(today);
    const todayOpen  = todayEntry && todayEntry.open;
    const todayLabel = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

    let todayHTML;
    if (todayOpen) {
      const eventBadge = todayEntry.event
        ? `<span class="schedule-event-badge">★ ${todayEntry.event}</span>`
        : '';
      todayHTML = `
        <div class="schedule-today-card schedule-today-card--open">
          <div class="schedule-today-dot"></div>
          <div class="schedule-today-main">
            <div class="schedule-today-label">Open Today</div>
            <div class="schedule-today-hours">${todayEntry.open} - ${todayEntry.close}</div>
            <div class="schedule-today-date">${todayLabel}</div>
          </div>
          ${eventBadge}
        </div>`;
    } else {
      todayHTML = `
        <div class="schedule-today-card schedule-today-card--closed">
          <div class="schedule-today-dot"></div>
          <div class="schedule-today-main">
            <div class="schedule-today-label">Closed Today</div>
            <div class="schedule-today-hours">See you soon!</div>
            <div class="schedule-today-date">${todayLabel}</div>
          </div>
        </div>`;
    }

    // Current week (Mon - Sun)
    const dayOfWeek = today.getDay(); // 0=Sun..6=Sat
    const diffToMon = (dayOfWeek === 0) ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMon);

    const DAY_ABBRS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

    let weekCells = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const isToday = d.toDateString() === today.toDateString();
      const entry   = getScheduleForDate(d);
      const isOpen  = entry && entry.open;
      const hasEvent = isOpen && entry.event;

      let cls = 'schedule-day';
      if (isToday)   cls += ' schedule-day--today';
      else if (!isOpen) cls += ' schedule-day--closed';
      else if (hasEvent) cls += ' schedule-day--event';

      const hoursDisplay = isOpen
        ? `${shortTime(entry.open)}-${shortTime(entry.close)}`
        : 'Closed';

      const eventDot = hasEvent ? '<span class="sched-event-dot"></span>' : '';

      weekCells += `
        <div class="${cls}" aria-label="${DAY_ABBRS[i]} ${d.getDate()}: ${isOpen ? entry.open + ' to ' + entry.close : 'Closed'}">
          <span class="sched-name">${DAY_ABBRS[i]}</span>
          <span class="sched-num">${d.getDate()}</span>
          <span class="sched-hours">${hoursDisplay}</span>
          ${eventDot}
        </div>`;
    }

    // Check if we have specific schedule data for this month
    const monthKey = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}`;
    const hasMonthData = STORE.monthlySchedule && Object.keys(STORE.monthlySchedule).some(k => k.startsWith(monthKey));
    const fallbackNote = hasMonthData ? '' :
      `<p class="schedule-fallback-note">Showing typical hours -- check our <a href="https://www.facebook.com/61564913969899" target="_blank" rel="noopener noreferrer" style="color:var(--blush);">Facebook</a> for this month's exact schedule!</p>`;

    el.innerHTML = `
      ${todayHTML}
      <div class="schedule-week">
        <h4 class="schedule-week-title">This Week</h4>
        <div class="schedule-week-grid">${weekCells}</div>
        ${fallbackNote}
      </div>`;
  }

  function scheduleMidnightRefresh(fn) {
    const now      = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 1, 0); // 12:01 AM
    const ms       = tomorrow - now;
    setTimeout(() => {
      fn();
      scheduleMidnightRefresh(fn);
    }, ms);
  }

  // ── HELPERS ────────────────────────────────────────────
  function getSaleIcon(name) {
    const icons = {
      tag: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/></svg>`,
      bag: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
      heart: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      sparkle: `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2l1.8 7.6L22 12l-8.2 2.4L12 22l-1.8-7.6L2 12l8.2-2.4z"/></svg>`,
    };
    return icons[name] || icons.sparkle;
  }

});
