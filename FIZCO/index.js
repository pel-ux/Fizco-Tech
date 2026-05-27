/* ==============================================
   FIZCOTECH GADGETS STORE — index.js
   ============================================== */

const brands = [
  {
    name: "Apple", tag: "iOS",
    phones: [
      { model: "iPhone 15 Pro Max",   badge: "Flagship", camera: "48MP Triple",  ram: "8GB",  storage: "256GB–1TB",   price: "" },
      { model: "iPhone 15 Pro",       badge: "Pro",      camera: "48MP Triple",  ram: "8GB",  storage: "128GB–1TB",   price: "" },
      { model: "iPhone 15",           badge: "Standard", camera: "48MP Dual",    ram: "6GB",  storage: "128GB–512GB", price: "" },
      { model: "iPhone 15 Plus",      badge: "Plus",     camera: "48MP Dual",    ram: "6GB",  storage: "128GB–512GB", price: "" },
      { model: "iPhone SE (3rd Gen)", badge: "Budget",   camera: "12MP Single",  ram: "4GB",  storage: "64GB–256GB",  price: "" },
    ]
  },
  {
    name: "Samsung", tag: "Android",
    phones: [
      { model: "Galaxy S24 Ultra", badge: "Flagship",  camera: "200MP Quad",  ram: "12GB", storage: "256GB–1TB",   price: "" },
      { model: "Galaxy S24+",      badge: "Plus",      camera: "50MP Triple", ram: "12GB", storage: "256GB–512GB", price: "" },
      { model: "Galaxy S24",       badge: "Standard",  camera: "50MP Triple", ram: "8GB",  storage: "128GB–256GB", price: "" },
      { model: "Galaxy Z Fold 5",  badge: "Foldable",  camera: "50MP Triple", ram: "12GB", storage: "256GB–1TB",   price: "" },
      { model: "Galaxy A55 5G",    badge: "Mid-Range", camera: "50MP Triple", ram: "8GB",  storage: "128GB–256GB", price: "" },
    ]
  },
  {
    name: "Google", tag: "Android",
    phones: [
      { model: "Pixel 8 Pro", badge: "Flagship",  camera: "50MP Triple", ram: "12GB", storage: "128GB–1TB",   price: "" },
      { model: "Pixel 8",     badge: "Standard",  camera: "50MP Dual",   ram: "8GB",  storage: "128GB–256GB", price: "" },
      { model: "Pixel 8a",    badge: "Mid-Range", camera: "64MP Dual",   ram: "8GB",  storage: "128GB–256GB", price: "" },
      { model: "Pixel Fold",  badge: "Foldable",  camera: "48MP Triple", ram: "12GB", storage: "256GB–512GB", price: "" },
      { model: "Pixel 7a",    badge: "Budget",    camera: "64MP Dual",   ram: "8GB",  storage: "128GB",       price: "" },
    ]
  },
  {
    name: "OnePlus", tag: "Android",
    phones: [
      { model: "OnePlus 12",        badge: "Flagship",  camera: "50MP Triple", ram: "12GB", storage: "256GB–512GB", price: "" },
      { model: "OnePlus 12R",       badge: "Pro",       camera: "50MP Triple", ram: "8GB",  storage: "128GB–256GB", price: "" },
      { model: "OnePlus Open",      badge: "Foldable",  camera: "48MP Triple", ram: "16GB", storage: "512GB",       price: "" },
      { model: "OnePlus Nord 4",    badge: "Mid-Range", camera: "50MP Dual",   ram: "8GB",  storage: "128GB–256GB", price: "" },
      { model: "OnePlus Nord CE 4", badge: "Budget",    camera: "50MP Dual",   ram: "8GB",  storage: "128GB",       price: "" },
    ]
  },
];

/* ── Hamburger nav ────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

/* ── Brand stack cards ────────────────────────── */
function buildBrandBlock(brand) {
  const block = document.createElement('div');
  block.className = 'brand-block';

  const label = document.createElement('div');
  label.className = 'brand-label';
  label.innerHTML = `
    <div class="brand-dot"></div>
    <span class="brand-name-text">${brand.name}</span>
    <span class="brand-count">${brand.phones.length} models</span>
  `;
  block.appendChild(label);

  const stackWrap = document.createElement('div');
  stackWrap.className = 'stack-wrap';

  let current = 0;
  const total = brand.phones.length;

  const cards = brand.phones.map((phone, i) => {
    const card = document.createElement('div');
    card.className = 'phone-card hidden';
    card.innerHTML = `
      <div>
        <div class="card-top">
          <div class="card-model">${phone.model}</div>
          <div class="card-badge">${phone.badge}</div>
        </div>
        <div class="card-specs">
          <div class="spec-row"><span>Camera</span><span class="spec-val">${phone.camera}</span></div>
          <div class="spec-row"><span>RAM</span><span class="spec-val">${phone.ram}</span></div>
          <div class="spec-row"><span>Storage</span><span class="spec-val">${phone.storage}</span></div>
        </div>
      </div>
      <div class="card-bottom">
        <div class="card-price">${phone.price}</div>
        <div class="card-page-indicator">${i + 1} / ${total}</div>
      </div>
    `;
    stackWrap.appendChild(card);
    return card;
  });

  function applyLayers() {
    cards.forEach(c => { c.className = 'phone-card hidden'; });
    cards[current].className = 'phone-card active';
    if (total > 1) cards[(current + 1) % total].className = 'phone-card depth-1';
    if (total > 2) cards[(current + 2) % total].className = 'phone-card depth-2';
  }

  const dotsEl = document.createElement('div');
  dotsEl.className = 'dots';
  brand.phones.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' on' : '');
    dotsEl.appendChild(dot);
  });

  function updateDots() {
    dotsEl.querySelectorAll('.dot').forEach((d, i) => {
      d.className = 'dot' + (i === current ? ' on' : '');
    });
  }

  function goNext() { current = (current + 1) % total; applyLayers(); updateDots(); }
  function goPrev() { current = (current - 1 + total) % total; applyLayers(); updateDots(); }

  applyLayers();
  block.appendChild(stackWrap);

  const controls = document.createElement('div');
  controls.className = 'stack-controls';

  const upBtn = document.createElement('button');
  upBtn.className = 'arrow-btn';
  upBtn.innerHTML = '&#8593;';
  upBtn.title = 'Previous';
  upBtn.onclick = goPrev;

  const downBtn = document.createElement('button');
  downBtn.className = 'arrow-btn';
  downBtn.innerHTML = '&#8595;';
  downBtn.title = 'Next';
  downBtn.onclick = goNext;

  controls.appendChild(dotsEl);
  controls.appendChild(upBtn);
  controls.appendChild(downBtn);
  block.appendChild(controls);

  return block;
}

const brandsGrid = document.getElementById('brandsGrid');
brands.forEach(brand => brandsGrid.appendChild(buildBrandBlock(brand)));

/* ── Photo Slider ─────────────────────────────── */
const track      = document.getElementById('track');
const dotsWrap   = document.getElementById('dots');
const slides     = track.querySelectorAll('.slide');
const slideTotal = slides.length;
let sliderCurrent = 0;
let autoInterval;

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', `Go to slide ${i + 1}`);
  d.onclick = () => goTo(i);
  dotsWrap.appendChild(d);
});

document.getElementById('slidePrev').onclick = () => { goTo(sliderCurrent - 1); resetAuto(); };
document.getElementById('slideNext').onclick = () => { goTo(sliderCurrent + 1); resetAuto(); };

function goTo(index) {
  sliderCurrent = (index + slideTotal) % slideTotal;
  const slideWidth = slides[0].offsetWidth + 16;
  track.style.transform = `translateX(-${sliderCurrent * slideWidth}px)`;
  dotsWrap.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === sliderCurrent)
  );
}

function startAuto() { autoInterval = setInterval(() => goTo(sliderCurrent + 1), 3000); }
function stopAuto()  { clearInterval(autoInterval); }
function resetAuto() { stopAuto(); startAuto(); }

track.addEventListener('mouseenter', stopAuto);
track.addEventListener('mouseleave', startAuto);

let touchStartX = 0;
track.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
  stopAuto();
}, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) goTo(diff > 0 ? sliderCurrent + 1 : sliderCurrent - 1);
  startAuto();
});

startAuto();