/* ============================================================
   Aurum Grand Hotel — script.js
   ============================================================ */

/* ── Room Data ─────────────────────────────────────────────── */
const ROOMS = {
  'classic-single': {
    name: 'Classic Single',
    emoji: '🛏️',
    price: 120,
    desc: 'An intimate retreat with refined furnishings, a plush king bed, and garden views. Perfect for the solo traveller.',
    amenities: ['King Bed', 'Garden View', 'Wi-Fi', 'Mini Bar'],
  },
  'classic-double': {
    name: 'Classic Double',
    emoji: '🛏️',
    price: 180,
    desc: 'Spacious comfort with twin beds and warm interiors. Ideal for couples or companions seeking classic luxury.',
    amenities: ['Twin Beds', 'City View', 'Wi-Fi', 'Mini Bar'],
  },
  'deluxe-double': {
    name: 'Deluxe Double',
    emoji: '✨',
    price: 260,
    desc: 'Elevated elegance with upgraded linens, panoramic city views, and a dedicated concierge service.',
    amenities: ['King Bed', 'Panoramic View', 'Concierge', 'Jacuzzi', 'Wi-Fi'],
  },
  'grand-suite': {
    name: 'Grand Suite',
    emoji: '🏛️',
    price: 420,
    desc: 'A full suite experience featuring a private lounge, walk-in wardrobe, butler service, and ocean views.',
    amenities: ['King Bed', 'Private Lounge', 'Butler Service', 'Ocean View', 'Jacuzzi'],
  },
  'presidential-suite': {
    name: 'Presidential Suite',
    emoji: '👑',
    price: 750,
    desc: 'The pinnacle of luxury. A two-room suite with a private dining area, personal chef option, and rooftop access.',
    amenities: ['2 Bedrooms', 'Private Dining', 'Rooftop Access', 'Personal Chef', 'Rolls-Royce Transfer'],
  },
  'penthouse': {
    name: 'Penthouse',
    emoji: '🌟',
    price: 1200,
    desc: 'A full-floor private penthouse with 360° city panoramas, a private pool, and dedicated round-the-clock staff.',
    amenities: ['Private Pool', '360° Views', 'Private Staff', 'Home Theatre', 'Helipad Access'],
  },
};

/* ── Particles ─────────────────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx    = canvas.getContext('2d');
  let particles = [];
  const GOLD = 'rgba(201,168,76,';

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function mkParticle() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 1.2 + 0.3,
      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.45 + 0.1,
      life: 0,
      maxLife: Math.random() * 300 + 200,
    };
  }

  for (let i = 0; i < 45; i++) {
    const p = mkParticle(); p.y = Math.random() * canvas.height; particles.push(p);
  }

  (function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.life++; p.y -= p.speedY; p.x += p.speedX;
      const fade = p.life < 60 ? p.life / 60 : p.life > p.maxLife - 60 ? (p.maxLife - p.life) / 60 : 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = GOLD + (p.opacity * fade) + ')';
      ctx.fill();
      if (p.life >= p.maxLife || p.y < -10) particles[i] = mkParticle();
    });
    requestAnimationFrame(loop);
  })();
})();

/* ── Room Cards ─────────────────────────────────────────────── */
(function buildRoomCards() {
  const grid = document.getElementById('roomCards');
  Object.entries(ROOMS).forEach(([key, room]) => {
    const card = document.createElement('div');
    card.className = 'room-card';
    card.dataset.key = key;
    card.innerHTML = `
      <div class="room-card-emoji">${room.emoji}</div>
      <div class="room-card-name">${room.name}</div>
      <div class="room-card-price">from $${room.price} / night</div>
      <div class="room-card-check">&#10003;</div>
    `;
    card.addEventListener('click', () => selectRoom(key));
    grid.appendChild(card);
  });
})();

function selectRoom(key) {
  document.querySelectorAll('.room-card').forEach(c => c.classList.remove('selected'));
  const card = document.querySelector(`.room-card[data-key="${key}"]`);
  if (card) card.classList.add('selected');
  document.getElementById('roomType').value = key;
  clearError('roomTypeError');
  showRoomPreview(key);
  updateSidebar();
}

function showRoomPreview(key) {
  const room    = ROOMS[key];
  const preview = document.getElementById('roomPreview');
  document.getElementById('previewEmoji').textContent = room.emoji;
  document.getElementById('previewName').textContent  = room.name;
  document.getElementById('previewDesc').textContent  = room.desc;
  const amenDiv = document.getElementById('previewAmenities');
  amenDiv.innerHTML = room.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('');
  preview.classList.remove('hidden');
}

/* ── Multi-Step State ───────────────────────────────────────── */
let currentStep = 1;
const TOTAL_STEPS = 4;

function showStep(n) {
  const panels = document.querySelectorAll('.step-panel');
  panels.forEach(p => {
    if (p.id === `step-${n}`) {
      p.classList.remove('hidden');
      p.classList.add('slide-in');
    } else {
      p.classList.add('hidden');
      p.classList.remove('slide-in');
    }
  });

  // Progress indicators
  document.querySelectorAll('.step-item').forEach(item => {
    const s = parseInt(item.dataset.step);
    item.classList.remove('active', 'done');
    if (s === n)  item.classList.add('active');
    if (s < n)    item.classList.add('done');
  });

  // Connectors
  for (let i = 1; i <= 3; i++) {
    const conn = document.getElementById(`conn-${i}`);
    conn.classList.toggle('active', i < n);
  }

  // Buttons
  document.getElementById('btnBack').classList.toggle('hidden', n === 1);
  document.getElementById('btnNext').classList.toggle('hidden', n === TOTAL_STEPS);
  document.getElementById('btnSubmit').classList.toggle('hidden', n !== TOTAL_STEPS);

  // Build review on step 4
  if (n === TOTAL_STEPS) buildReview();
}

/* ── Navigation ─────────────────────────────────────────────── */
document.getElementById('btnNext').addEventListener('click', () => {
  if (!validateStep(currentStep)) return;
  currentStep++;
  showStep(currentStep);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.getElementById('btnBack').addEventListener('click', () => {
  currentStep--;
  showStep(currentStep);
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Validation per step ────────────────────────────────────── */
function validateStep(step) {
  let valid = true;
  if (step === 1) {
    if (!checkinEl.value)  { showError('checkinError',  'Please select a check-in date.');  valid = false; } else clearError('checkinError');
    if (!checkoutEl.value) { showError('checkoutError', 'Please select a check-out date.'); valid = false; }
    else if (checkoutEl.value <= checkinEl.value) { showError('checkoutError', 'Check-out must be after check-in.'); valid = false; }
    else clearError('checkoutError');
  }
  if (step === 2) {
    if (!document.getElementById('roomType').value) { showError('roomTypeError'); valid = false; } else clearError('roomTypeError');
  }
  if (step === 3) {
    const name  = document.getElementById('guestName').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    if (!name)  { showError('guestNameError');  valid = false; } else clearError('guestNameError');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('guestEmailError'); valid = false; } else clearError('guestEmailError');
    if (parseInt(document.getElementById('adults').value) < 1) { showError('adultsError'); valid = false; } else clearError('adultsError');
  }
  return valid;
}

/* ── Date Logic ─────────────────────────────────────────────── */
const today      = new Date().toISOString().split('T')[0];
const checkinEl  = document.getElementById('checkin');
const checkoutEl = document.getElementById('checkout');

checkinEl.min  = today;
checkoutEl.min = today;

checkinEl.addEventListener('change', () => {
  if (checkinEl.value) {
    const d = new Date(checkinEl.value);
    d.setDate(d.getDate() + 1);
    checkoutEl.min = d.toISOString().split('T')[0];
    if (checkoutEl.value && checkoutEl.value <= checkinEl.value) checkoutEl.value = '';
  }
  updateNightSummary();
  updateSidebar();
});
checkoutEl.addEventListener('change', () => { updateNightSummary(); updateSidebar(); });

function getNights() {
  if (!checkinEl.value || !checkoutEl.value) return 0;
  return Math.max(0, Math.round((new Date(checkoutEl.value) - new Date(checkinEl.value)) / 86400000));
}

function updateNightSummary() {
  const n = getNights();
  const s = document.getElementById('staySummary');
  if (n > 0) {
    document.getElementById('nightCount').textContent  = n;
    document.getElementById('nightPlural').textContent = n === 1 ? '' : 's';
    s.classList.remove('hidden');
  } else {
    s.classList.add('hidden');
  }
}

/* ── Counter ────────────────────────────────────────────────── */
function changeCount(field, delta) {
  const input   = document.getElementById(field);
  const display = document.getElementById(field + 'Display');
  let val = Math.max(field === 'adults' ? 1 : 0, Math.min(4, parseInt(input.value) + delta));
  input.value = val;
  display.textContent = val;
  display.classList.remove('bump');
  void display.offsetWidth;
  display.classList.add('bump');
  updateSidebar();
}

/* Live input → sidebar */
document.getElementById('guestName').addEventListener('input', updateSidebar);
document.getElementById('guestEmail').addEventListener('input', updateSidebar);

/* ── Sidebar Update ─────────────────────────────────────────── */
function updateSidebar() {
  const nights  = getNights();
  const roomKey = document.getElementById('roomType').value;
  const adults  = parseInt(document.getElementById('adults').value);
  const children= parseInt(document.getElementById('children').value);
  const name    = document.getElementById('guestName').value.trim();
  const email   = document.getElementById('guestEmail').value.trim();

  const hasAny  = nights > 0 || roomKey || name;
  document.getElementById('sidebarEmpty').classList.toggle('hidden', hasAny);
  document.getElementById('sidebarContent').classList.toggle('hidden', !hasAny);

  // Dates
  if (nights > 0) {
    const ci = checkinEl.value, co = checkoutEl.value;
    setVal('sum-dates-val', formatDate(ci) + ' → ' + formatDate(co));
    setVal('sum-nights-val', nights + ' night' + (nights > 1 ? 's' : ''));
  }

  // Room
  if (roomKey && ROOMS[roomKey]) {
    const r = ROOMS[roomKey];
    document.getElementById('sum-room-icon').textContent = r.emoji;
    setVal('sum-room-val', r.name);
    setVal('sum-room-rate', '$' + r.price + ' / night');
  }

  // Guests
  let guestStr = adults + ' adult' + (adults > 1 ? 's' : '');
  if (children > 0) guestStr += ', ' + children + ' child' + (children > 1 ? 'ren' : '');
  setVal('sum-guests-val', guestStr);

  // Name
  if (name)  setVal('sum-name-val', name);
  if (email) setVal('sum-email-val', email);

  // Price
  const total = calcTotal();
  if (total > 0) {
    document.getElementById('sidebarPriceWrap').classList.remove('hidden');
    document.getElementById('sidebarTotal').textContent = '$' + total.toLocaleString();
  }
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (!el || el.textContent === val) return;
  el.textContent = val;
  el.classList.remove('updated');
  void el.offsetWidth;
  el.classList.add('updated');
}

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function calcTotal() {
  const nights  = getNights();
  const roomKey = document.getElementById('roomType').value;
  if (!nights || !roomKey) return 0;
  const base     = ROOMS[roomKey].price * nights;
  const tax      = Math.round(base * 0.12);
  const service  = Math.round(base * 0.05);
  return base + tax + service;
}

/* ── Review Builder ─────────────────────────────────────────── */
function buildReview() {
  const nights  = getNights();
  const roomKey = document.getElementById('roomType').value;
  const adults  = parseInt(document.getElementById('adults').value);
  const children= parseInt(document.getElementById('children').value);
  const name    = document.getElementById('guestName').value.trim();
  const email   = document.getElementById('guestEmail').value.trim();
  const special = document.getElementById('specialRequests').value.trim();
  const room    = ROOMS[roomKey];

  const rows = [
    { key: 'Dates',  val: formatDate(checkinEl.value) + ' → ' + formatDate(checkoutEl.value) + '  (' + nights + ' nights)' },
    { key: 'Room',   val: room.emoji + '  ' + room.name },
    { key: 'Guests', val: adults + ' adult' + (adults > 1 ? 's' : '') + (children ? ', ' + children + ' child' + (children > 1 ? 'ren' : '') : '') },
    { key: 'Guest',  val: name + '  |  ' + email },
  ];
  if (special) rows.push({ key: 'Requests', val: special });

  document.getElementById('reviewContent').innerHTML = rows.map(r => `
    <div class="review-row">
      <div class="flex-1">
        <p class="review-key">${r.key}</p>
        <p class="review-val">${r.val}</p>
      </div>
    </div>
  `).join('');

  // Price lines
  const base    = room.price * nights;
  const tax     = Math.round(base * 0.12);
  const service = Math.round(base * 0.05);
  const total   = base + tax + service;

  document.getElementById('priceLines').innerHTML = `
    <div class="price-row"><span>${room.name} × ${nights} night${nights>1?'s':''}</span><span>$${base.toLocaleString()}</span></div>
    <div class="price-row"><span>Taxes (12%)</span><span>$${tax.toLocaleString()}</span></div>
    <div class="price-row"><span>Service charge (5%)</span><span>$${service.toLocaleString()}</span></div>
  `;
  document.getElementById('totalPrice').textContent = '$' + total.toLocaleString();
}

/* ── Error Helpers ──────────────────────────────────────────── */
function showError(id, msg) {
  const el = document.getElementById(id);
  if (msg) el.textContent = msg;
  el.classList.add('visible');
  const input = el.previousElementSibling || el.parentElement?.querySelector('input,select,textarea');
  if (input && input.classList.contains('luxury-input')) {
    input.classList.add('shake');
    input.addEventListener('animationend', () => input.classList.remove('shake'), { once: true });
  }
}
function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('visible');
}

// Live clear
['checkin','checkout','roomType','guestName','guestEmail'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input',  () => clearError(id + 'Error'));
  el.addEventListener('change', () => clearError(id + 'Error'));
});

// Label brighten on focus
document.querySelectorAll('.luxury-input').forEach(input => {
  const label = input.closest('.field-group')?.querySelector('.field-label');
  if (!label) return;
  input.addEventListener('focus', () => label.style.color = '#e8d5a3');
  input.addEventListener('blur',  () => label.style.color = '');
});

/* ── Submit ─────────────────────────────────────────────────── */
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!validateStep(3)) return;

  const btnText   = this.querySelector('.btn-text');
  const btnLoader = this.querySelector('.btn-loader');
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');

  setTimeout(() => {
    const banner = document.getElementById('successBanner');
    banner.style.display = 'block';
    banner.classList.add('visible');
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    document.getElementById('btnSubmit').disabled = true;
    setTimeout(() => { banner.classList.remove('visible'); banner.style.display = 'none'; }, 7000);
  }, 900);
});

/* ── Init ───────────────────────────────────────────────────── */
showStep(1);