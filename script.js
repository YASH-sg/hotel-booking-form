/* ============================================================
   Aurum Grand Hotel — script.js
   ============================================================ */

/* ═══════════════════════════════════════════
   PARTICLES
═══════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const GOLD = 'rgba(201,168,76,';

  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  function mkParticle() {
    return {
      x:       Math.random() * canvas.width,
      y:       canvas.height + 10,
      size:    Math.random() * 1.1 + 0.3,
      speedY:  Math.random() * 0.35 + 0.12,
      speedX:  (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.4 + 0.08,
      life: 0,
      maxLife: Math.random() * 300 + 200,
    };
  }

  for (let i = 0; i < 50; i++) {
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

/* ═══════════════════════════════════════════
   NAV
═══════════════════════════════════════════ */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  mainNav.classList.toggle('scrolled', window.scrollY > 60);
});

document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('hidden');
});

document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
  link.addEventListener('click', () => document.getElementById('mobileMenu').classList.add('hidden'));
});

/* ═══════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-item').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════
   NAV SCROLL SPY
═══════════════════════════════════════════ */
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => {
        const active = link.getAttribute('href') === '#' + entry.target.id;
        link.style.color = active ? '#c9a84c' : '';
      });
    }
  });
}, { threshold: 0.35 });

document.querySelectorAll('section[id]').forEach(s => spyObserver.observe(s));

/* ═══════════════════════════════════════════
   ROOM DATA  (images from Unsplash)
═══════════════════════════════════════════ */
const ROOMS = {
  'classic-single': {
    name:  'Classic Single',
    price: 120,
    img:   'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=70&auto=format&fit=crop',
    desc:  'An intimate retreat with refined furnishings, a plush king bed, and garden views. Perfect for the solo traveller.',
    amenities: ['King Bed','Garden View','Wi-Fi','Mini Bar'],
  },
  'classic-double': {
    name:  'Classic Double',
    price: 180,
    img:   'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&q=70&auto=format&fit=crop',
    desc:  'Spacious comfort with twin beds and warm interiors. Ideal for couples or companions seeking classic luxury.',
    amenities: ['Twin Beds','City View','Wi-Fi','Mini Bar'],
  },
  'deluxe-double': {
    name:  'Deluxe Double',
    price: 260,
    img:   'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=70&auto=format&fit=crop',
    desc:  'Elevated elegance with upgraded linens, panoramic city views, and a dedicated concierge service.',
    amenities: ['King Bed','Panoramic View','Concierge','Jacuzzi','Wi-Fi'],
  },
  'grand-suite': {
    name:  'Grand Suite',
    price: 420,
    img:   'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&q=70&auto=format&fit=crop',
    desc:  'A full suite experience featuring a private lounge, walk-in wardrobe, butler service, and ocean views.',
    amenities: ['King Bed','Private Lounge','Butler Service','Ocean View','Jacuzzi'],
  },
  'presidential-suite': {
    name:  'Presidential Suite',
    price: 750,
    img:   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&q=70&auto=format&fit=crop',
    desc:  'The pinnacle of luxury. A two-room suite with a private dining area, personal chef option, and rooftop access.',
    amenities: ['2 Bedrooms','Private Dining','Rooftop Access','Personal Chef','Rolls-Royce Transfer'],
  },
  'penthouse': {
    name:  'Penthouse',
    price: 1200,
    img:   'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=400&q=70&auto=format&fit=crop',
    desc:  'A full-floor private penthouse with 360° city panoramas, a private pool, and dedicated round-the-clock staff.',
    amenities: ['Private Pool','360° Views','Private Staff','Home Theatre','Helipad Access'],
  },
};

/* ═══════════════════════════════════════════
   BUILD ROOM CARDS (step 2)
═══════════════════════════════════════════ */
(function buildRoomCards() {
  const grid = document.getElementById('roomCards');
  if (!grid) return;
  Object.entries(ROOMS).forEach(([key, room]) => {
    const card = document.createElement('div');
    card.className = 'room-card';
    card.dataset.key = key;
    card.innerHTML = `
      <div class="room-card-img-wrap">
        <img class="room-card-img" src="${room.img}" alt="${room.name}" loading="lazy"/>
      </div>
      <div class="room-card-body">
        <div class="room-card-name">${room.name}</div>
        <div class="room-card-price">from $${room.price} / night</div>
      </div>
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
  document.getElementById('previewImg').src  = room.img;
  document.getElementById('previewImg').alt  = room.name;
  document.getElementById('previewName').textContent = room.name;
  document.getElementById('previewDesc').textContent = room.desc;
  document.getElementById('previewAmenities').innerHTML =
    room.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('');
  preview.classList.remove('hidden');
}

/* ═══════════════════════════════════════════
   MULTI-STEP LOGIC
═══════════════════════════════════════════ */
let currentStep = 1;
const TOTAL_STEPS = 4;

function showStep(n) {
  document.querySelectorAll('.step-panel').forEach(p => {
    if (p.id === `step-${n}`) { p.classList.remove('hidden'); p.classList.add('slide-in'); }
    else { p.classList.add('hidden'); p.classList.remove('slide-in'); }
  });

  document.querySelectorAll('.step-item').forEach(item => {
    const s = parseInt(item.dataset.step);
    item.classList.remove('active','done');
    if (s === n) item.classList.add('active');
    if (s < n)  item.classList.add('done');
  });

  for (let i = 1; i <= 3; i++) {
    const conn = document.getElementById(`conn-${i}`);
    if (conn) conn.classList.toggle('active', i < n);
  }

  document.getElementById('btnBack').classList.toggle('hidden', n === 1);
  document.getElementById('btnNext').classList.toggle('hidden', n === TOTAL_STEPS);
  document.getElementById('btnSubmit').classList.toggle('hidden', n !== TOTAL_STEPS);

  if (n === TOTAL_STEPS) buildReview();
}

document.getElementById('btnNext').addEventListener('click', () => {
  if (!validateStep(currentStep)) return;
  currentStep++;
  showStep(currentStep);
  document.getElementById('reserve').scrollIntoView({ behavior:'smooth', block:'start' });
});

document.getElementById('btnBack').addEventListener('click', () => {
  currentStep--;
  showStep(currentStep);
  document.getElementById('reserve').scrollIntoView({ behavior:'smooth', block:'start' });
});

/* ═══════════════════════════════════════════
   VALIDATION
═══════════════════════════════════════════ */
function validateStep(step) {
  let valid = true;
  if (step === 1) {
    if (!checkinEl.value)  { showError('checkinError','Please select a check-in date.');  valid = false; } else clearError('checkinError');
    if (!checkoutEl.value) { showError('checkoutError','Please select a check-out date.'); valid = false; }
    else if (checkoutEl.value <= checkinEl.value) { showError('checkoutError','Check-out must be after check-in.'); valid = false; }
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

/* ═══════════════════════════════════════════
   DATE LOGIC
═══════════════════════════════════════════ */
const today     = new Date().toISOString().split('T')[0];
const checkinEl  = document.getElementById('checkin');
const checkoutEl = document.getElementById('checkout');

checkinEl.min  = today;
checkoutEl.min = today;

checkinEl.addEventListener('change', () => {
  if (checkinEl.value) {
    const d = new Date(checkinEl.value); d.setDate(d.getDate() + 1);
    checkoutEl.min = d.toISOString().split('T')[0];
    if (checkoutEl.value && checkoutEl.value <= checkinEl.value) checkoutEl.value = '';
  }
  updateNightSummary(); updateSidebar();
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
  } else { s.classList.add('hidden'); }
}

/* ═══════════════════════════════════════════
   COUNTER
═══════════════════════════════════════════ */
function changeCount(field, delta) {
  const input   = document.getElementById(field);
  const display = document.getElementById(field + 'Display');
  let val = Math.max(field === 'adults' ? 1 : 0, Math.min(4, parseInt(input.value) + delta));
  input.value = val; display.textContent = val;
  display.classList.remove('bump'); void display.offsetWidth; display.classList.add('bump');
  updateSidebar();
}

document.getElementById('guestName').addEventListener('input', updateSidebar);
document.getElementById('guestEmail').addEventListener('input', updateSidebar);

/* ═══════════════════════════════════════════
   SIDEBAR UPDATE
═══════════════════════════════════════════ */
function updateSidebar() {
  const nights   = getNights();
  const roomKey  = document.getElementById('roomType').value;
  const adults   = parseInt(document.getElementById('adults').value);
  const children = parseInt(document.getElementById('children').value);
  const name     = document.getElementById('guestName').value.trim();
  const email    = document.getElementById('guestEmail').value.trim();

  const hasAny = nights > 0 || roomKey || name;
  document.getElementById('sidebarEmpty').classList.toggle('hidden', hasAny);
  document.getElementById('sidebarContent').classList.toggle('hidden', !hasAny);

  if (nights > 0) {
    setVal('sum-dates-val', formatDate(checkinEl.value) + ' \u2192 ' + formatDate(checkoutEl.value));
    setVal('sum-nights-val', nights + ' night' + (nights > 1 ? 's' : ''));
  }

  if (roomKey && ROOMS[roomKey]) {
    const r = ROOMS[roomKey];
    setVal('sum-room-val',  r.name);
    setVal('sum-room-rate', '$' + r.price + ' / night');
  }

  let guestStr = adults + ' adult' + (adults > 1 ? 's' : '');
  if (children > 0) guestStr += ', ' + children + ' child' + (children > 1 ? 'ren' : '');
  setVal('sum-guests-val', guestStr);

  if (name)  setVal('sum-name-val',  name);
  if (email) setVal('sum-email-val', email);

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
  el.classList.remove('updated'); void el.offsetWidth; el.classList.add('updated');
}

function formatDate(str) {
  if (!str) return '';
  const d = new Date(str + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
}

function calcTotal() {
  const nights  = getNights();
  const roomKey = document.getElementById('roomType').value;
  if (!nights || !roomKey) return 0;
  const base    = ROOMS[roomKey].price * nights;
  return base + Math.round(base * 0.12) + Math.round(base * 0.05);
}

/* ═══════════════════════════════════════════
   REVIEW BUILDER
═══════════════════════════════════════════ */
function buildReview() {
  const nights   = getNights();
  const roomKey  = document.getElementById('roomType').value;
  const adults   = parseInt(document.getElementById('adults').value);
  const children = parseInt(document.getElementById('children').value);
  const name     = document.getElementById('guestName').value.trim();
  const email    = document.getElementById('guestEmail').value.trim();
  const special  = document.getElementById('specialRequests').value.trim();
  const room     = ROOMS[roomKey];

  const rows = [
    { key:'Dates',  val: formatDate(checkinEl.value) + ' \u2192 ' + formatDate(checkoutEl.value) + '  (' + nights + ' nights)' },
    { key:'Room',   val: room.name },
    { key:'Guests', val: adults + ' adult' + (adults > 1 ? 's' : '') + (children ? ', ' + children + ' child' + (children > 1 ? 'ren' : '') : '') },
    { key:'Guest',  val: name + '  |  ' + email },
  ];
  if (special) rows.push({ key:'Requests', val: special });

  document.getElementById('reviewContent').innerHTML = rows.map(r => `
    <div class="review-row">
      <div class="flex-1"><p class="review-key">${r.key}</p><p class="review-val">${r.val}</p></div>
    </div>
  `).join('');

  const base    = room.price * nights;
  const tax     = Math.round(base * 0.12);
  const service = Math.round(base * 0.05);
  const total   = base + tax + service;

  document.getElementById('priceLines').innerHTML = `
    <div class="price-row"><span>${room.name} &times; ${nights} night${nights > 1 ? 's' : ''}</span><span>$${base.toLocaleString()}</span></div>
    <div class="price-row"><span>Taxes (12%)</span><span>$${tax.toLocaleString()}</span></div>
    <div class="price-row"><span>Service charge (5%)</span><span>$${service.toLocaleString()}</span></div>
  `;
  document.getElementById('totalPrice').textContent = '$' + total.toLocaleString();
}

/* ═══════════════════════════════════════════
   ERROR HELPERS
═══════════════════════════════════════════ */
function showError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  if (msg) el.textContent = msg;
  el.classList.add('visible');
  const input = el.previousElementSibling || el.parentElement?.querySelector('input,select,textarea');
  if (input && input.classList.contains('luxury-input')) {
    input.classList.add('shake');
    input.addEventListener('animationend', () => input.classList.remove('shake'), { once:true });
  }
}
function clearError(id) {
  const el = document.getElementById(id); if (el) el.classList.remove('visible');
}

['checkin','checkout','roomType','guestName','guestEmail'].forEach(id => {
  const el = document.getElementById(id); if (!el) return;
  el.addEventListener('input',  () => clearError(id + 'Error'));
  el.addEventListener('change', () => clearError(id + 'Error'));
});

document.querySelectorAll('.luxury-input').forEach(input => {
  const label = input.closest('.field-group')?.querySelector('.field-label');
  if (!label) return;
  input.addEventListener('focus', () => label.style.color = '#e8d5a3');
  input.addEventListener('blur',  () => label.style.color = '');
});

/* ═══════════════════════════════════════════
   FORM SUBMIT
═══════════════════════════════════════════ */
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  if (!validateStep(3)) return;
  const btnText   = this.querySelector('.btn-text');
  const btnLoader = this.querySelector('.btn-loader');
  btnText.classList.add('hidden'); btnLoader.classList.remove('hidden');
  setTimeout(() => {
    const banner = document.getElementById('successBanner');
    banner.style.display = 'block'; banner.classList.add('visible');
    btnText.classList.remove('hidden'); btnLoader.classList.add('hidden');
    document.getElementById('btnSubmit').disabled = true;
    setTimeout(() => { banner.classList.remove('visible'); banner.style.display = 'none'; }, 7000);
  }, 900);
});

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
showStep(1);