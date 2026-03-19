// ====================== COLONIAS DATA ======================
const COLONIAS = [
  { colonia: "Álamos", alcaldia: "Benito Juárez", precio: 48948, fecha: "2 de marzo de 2026" },
  { colonia: "Ampliación Granada", alcaldia: "Miguel Hidalgo", precio: 80895, fecha: "3 de marzo de 2026" },
  { colonia: "Anáhuac I Sección", alcaldia: "Miguel Hidalgo", precio: 65259, fecha: "18 de marzo de 2026" },
  { colonia: "Anzures", alcaldia: "Miguel Hidalgo", precio: 63423, fecha: "3 de marzo de 2026" },
  { colonia: "Condesa", alcaldia: "Cuauhtémoc", precio: 87181, fecha: "2 de marzo de 2026" },
  { colonia: "Cuauhtémoc", alcaldia: "Cuauhtémoc", precio: 81019, fecha: "3 de marzo de 2026" },
  { colonia: "Del Valle Centro", alcaldia: "Benito Juárez", precio: 60971, fecha: "2 de marzo de 2026" },
  { colonia: "Del Valle Norte", alcaldia: "Benito Juárez", precio: 61346, fecha: "2 de marzo de 2026" },
  { colonia: "Del Valle Sur", alcaldia: "Benito Juárez", precio: 81520, fecha: "2 de marzo de 2026" },
  { colonia: "Doctores", alcaldia: "Cuauhtémoc", precio: 55713, fecha: "3 de marzo de 2026" },
  { colonia: "Escandón I Sección", alcaldia: "Miguel Hidalgo", precio: 67430, fecha: "3 de marzo de 2026" },
  { colonia: "Escandón II Sección", alcaldia: "Miguel Hidalgo", precio: 71541, fecha: "3 de marzo de 2026" },
  { colonia: "Granada", alcaldia: "Miguel Hidalgo", precio: 84077, fecha: "3 de marzo de 2026" },
  { colonia: "Hipódromo", alcaldia: "Cuauhtémoc", precio: 85549, fecha: "3 de marzo de 2026" },
  { colonia: "Hipódromo Condesa", alcaldia: "Cuauhtémoc", precio: 85430, fecha: "3 de marzo de 2026" },
  { colonia: "Irrigación", alcaldia: "Miguel Hidalgo", precio: 67500, fecha: "18 de marzo de 2026" },
  { colonia: "Juárez", alcaldia: "Cuauhtémoc", precio: 98701, fecha: "23 de febrero de 2026" },
  { colonia: "Letrán Valle", alcaldia: "Benito Juárez", precio: 61811, fecha: "3 de marzo de 2026" },
  { colonia: "Nápoles", alcaldia: "Benito Juárez", precio: 72151, fecha: "3 de marzo de 2026" },
  { colonia: "Narvarte Oriente", alcaldia: "Benito Juárez", precio: 56048, fecha: "23 de febrero de 2026" },
  { colonia: "Narvarte Poniente", alcaldia: "Benito Juárez", precio: 58725, fecha: "23 de febrero de 2026" },
  { colonia: "Polanco", alcaldia: "Miguel Hidalgo", precio: 95534, fecha: "18 de marzo de 2026" },
  { colonia: "Portales Norte", alcaldia: "Benito Juárez", precio: 53328, fecha: "23 de febrero de 2026" },
  { colonia: "Portales Oriente", alcaldia: "Benito Juárez", precio: 51105, fecha: "23 de febrero de 2026" },
  { colonia: "Portales Sur", alcaldia: "Benito Juárez", precio: 53412, fecha: "23 de febrero de 2026" },
  { colonia: "Roma Norte", alcaldia: "Cuauhtémoc", precio: 89434, fecha: "23 de febrero de 2026" },
  { colonia: "Roma Sur", alcaldia: "Cuauhtémoc", precio: 73677, fecha: "23 de febrero de 2026" },
  { colonia: "San Miguel Chapultepec", alcaldia: "Miguel Hidalgo", precio: 64317, fecha: "3 de marzo de 2026" },
  { colonia: "San Pedro de los Pinos", alcaldia: "Benito Juárez", precio: 61680, fecha: "3 de marzo de 2026" },
  { colonia: "San Rafael", alcaldia: "Cuauhtémoc", precio: 65944, fecha: "2 de marzo de 2026" },
  { colonia: "Santa María la Ribera", alcaldia: "Cuauhtémoc", precio: 60832, fecha: "2 de marzo de 2026" },
  { colonia: "Verónica Anzures", alcaldia: "Miguel Hidalgo", precio: 70957, fecha: "18 de marzo de 2026" },
  { colonia: "Vértiz Narvarte", alcaldia: "Benito Juárez", precio: 59608, fecha: "2 de marzo de 2026" },
];


// ====================== UTILITIES ======================

function parseNum(str) {
  if (!str) return NaN;
  const cleaned = str.replace(/[^0-9.,]/g, '');
  const parts = cleaned.split(',');
  if (parts.length === 2 && parts[1].length <= 2 && !cleaned.includes('.')) {
    return parseFloat(parts[0].replace(/\./g, '') + '.' + parts[1]);
  }
  return parseFloat(cleaned.replace(/,/g, ''));
}

function formatCurrency(n) {
  if (isNaN(n) || !isFinite(n)) return '$0';
  return '$' + n.toLocaleString('es-MX', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatNumber(n, decimals) {
  if (isNaN(n) || !isFinite(n)) return '0';
  return n.toLocaleString('es-MX', {
    minimumFractionDigits: decimals || 0,
    maximumFractionDigits: decimals || 0
  });
}

function formatPct(n) {
  if (isNaN(n) || !isFinite(n)) return '0%';
  return (n >= 0 ? '+' : '') + n.toFixed(1) + '%';
}

function formatInputValue(input) {
  input.addEventListener('input', function() {
    const cursorPos = this.selectionStart;
    const rawBefore = this.value;
    const digitsOnly = this.value.replace(/[^0-9.]/g, '');
    const dotIndex = digitsOnly.indexOf('.');
    let intPart, decPart;
    if (dotIndex !== -1) {
      intPart = digitsOnly.slice(0, dotIndex);
      decPart = digitsOnly.slice(dotIndex);
    } else {
      intPart = digitsOnly;
      decPart = '';
    }
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + decPart;
    this.value = formatted;
    const diff = formatted.length - rawBefore.length;
    this.setSelectionRange(cursorPos + diff, cursorPos + diff);
  });
}

// Normalize string for searching (remove accents, lowercase)
function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}


// ====================== DOM ======================

const form = document.getElementById('calcForm');
const resultsEl = document.getElementById('results');
const residualGrid = document.getElementById('residualGrid');
const comparisonBarContainer = document.getElementById('comparisonBarContainer');
const btnReset = document.getElementById('btnReset');

const coloniaInput = document.getElementById('coloniaInput');
const coloniaDropdown = document.getElementById('coloniaDropdown');
const coloniaInfo = document.getElementById('coloniaInfo');
const coloniaTag = document.getElementById('coloniaTag');
const coloniaClear = document.getElementById('coloniaClear');
const precioM2Input = document.getElementById('precioM2');
const sliderSection = document.getElementById('sliderSection');
const ajusteSlider = document.getElementById('ajusteSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderRef = document.getElementById('sliderRef');
const sliderAdj = document.getElementById('sliderAdj');

// Setup formatted inputs
formatInputValue(precioM2Input);
formatInputValue(document.getElementById('superficie'));
formatInputValue(document.getElementById('niveles'));
formatInputValue(document.getElementById('areaLibre'));
formatInputValue(document.getElementById('precioOferta'));


// ====================== COLONIA SELECTOR ======================

let selectedColonia = null;
let dropdownOpen = false;

function renderDropdown(query) {
  const q = normalize(query.trim());
  let matches;

  if (q === '') {
    matches = COLONIAS;
  } else {
    matches = COLONIAS.filter(c =>
      normalize(c.colonia).includes(q) || normalize(c.alcaldia).includes(q)
    );
  }

  coloniaDropdown.innerHTML = '';

  if (matches.length === 0) {
    const li = document.createElement('li');
    li.className = 'dropdown-empty';
    li.textContent = 'No se encontró la colonia';
    coloniaDropdown.appendChild(li);
  } else {
    matches.forEach(c => {
      const li = document.createElement('li');
      li.className = 'dropdown-item';
      li.innerHTML = `
        <span class="dropdown-colonia">${c.colonia}</span>
        <span class="dropdown-meta">${c.alcaldia} · ${formatCurrency(c.precio)}/m²</span>
      `;
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        selectColonia(c);
      });
      coloniaDropdown.appendChild(li);
    });
  }

  coloniaDropdown.classList.add('open');
  dropdownOpen = true;
}

function selectColonia(c) {
  selectedColonia = c;
  coloniaInput.value = '';
  coloniaDropdown.classList.remove('open');
  dropdownOpen = false;

  // Show tag
  coloniaTag.textContent = `${c.colonia} — ${c.alcaldia} · ${formatCurrency(c.precio)}/m²`;
  coloniaInfo.classList.remove('hidden');
  coloniaInput.parentElement.parentElement.querySelector('.input-wrapper').classList.add('hidden');

  // Set price
  applyAdjustedPrice();

  // Show slider
  sliderSection.classList.remove('hidden');
  ajusteSlider.value = 0;
  updateSliderDisplay();
}

function clearColonia() {
  selectedColonia = null;
  coloniaInfo.classList.add('hidden');
  coloniaInput.parentElement.parentElement.querySelector('.input-wrapper').classList.remove('hidden');
  coloniaInput.value = '';
  coloniaInput.focus();
  sliderSection.classList.add('hidden');
  precioM2Input.value = '';
  precioM2Input.readOnly = false;
}

function applyAdjustedPrice() {
  if (!selectedColonia) return;
  const adj = parseInt(ajusteSlider.value);
  const adjustedPrice = Math.round(selectedColonia.precio * (1 + adj / 100));
  precioM2Input.value = adjustedPrice.toLocaleString('es-MX');
  precioM2Input.readOnly = true;
}

function updateSliderDisplay() {
  const adj = parseInt(ajusteSlider.value);
  sliderValue.textContent = adj === 0 ? '0% (sin ajuste)' : `${adj}%`;
  sliderValue.className = 'slider-value' + (adj < 0 ? ' slider-value--negative' : '');

  if (selectedColonia) {
    sliderRef.textContent = `Referencia: ${formatCurrency(selectedColonia.precio)}/m²`;
    const adjustedPrice = Math.round(selectedColonia.precio * (1 + adj / 100));
    if (adj === 0) {
      sliderAdj.textContent = '';
    } else {
      sliderAdj.textContent = `Ajustado: ${formatCurrency(adjustedPrice)}/m²`;
    }
    sliderAdj.className = 'slider-adj' + (adj < 0 ? ' slider-adj--negative' : '');
  }
}

// Events for colonia search
coloniaInput.addEventListener('input', () => {
  renderDropdown(coloniaInput.value);
});

coloniaInput.addEventListener('focus', () => {
  renderDropdown(coloniaInput.value);
});

coloniaInput.addEventListener('blur', () => {
  setTimeout(() => {
    coloniaDropdown.classList.remove('open');
    dropdownOpen = false;
  }, 150);
});

// Keyboard navigation in dropdown
coloniaInput.addEventListener('keydown', (e) => {
  const items = coloniaDropdown.querySelectorAll('.dropdown-item');
  const active = coloniaDropdown.querySelector('.dropdown-item--active');
  let idx = Array.from(items).indexOf(active);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!dropdownOpen) renderDropdown(coloniaInput.value);
    idx = Math.min(idx + 1, items.length - 1);
    items.forEach(i => i.classList.remove('dropdown-item--active'));
    if (items[idx]) {
      items[idx].classList.add('dropdown-item--active');
      items[idx].scrollIntoView({ block: 'nearest' });
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    idx = Math.max(idx - 1, 0);
    items.forEach(i => i.classList.remove('dropdown-item--active'));
    if (items[idx]) {
      items[idx].classList.add('dropdown-item--active');
      items[idx].scrollIntoView({ block: 'nearest' });
    }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (active) {
      const colName = active.querySelector('.dropdown-colonia').textContent;
      const match = COLONIAS.find(c => c.colonia === colName);
      if (match) selectColonia(match);
    }
  } else if (e.key === 'Escape') {
    coloniaDropdown.classList.remove('open');
    dropdownOpen = false;
  }
});

coloniaClear.addEventListener('click', clearColonia);

// Slider events
ajusteSlider.addEventListener('input', () => {
  applyAdjustedPrice();
  updateSliderDisplay();
});


// ====================== CALCULATION ======================

const RESIDUALS = [
  { pct: 16, label: 'Residual 16%' },
  { pct: 18, label: 'Residual 18%' },
  { pct: 20, label: 'Residual 20%' },
  { pct: 22, label: 'Residual 22%' },
];

function calculate(precioM2, superficie, niveles, areaLibrePct, precioOferta) {
  const areaLibreFrac = areaLibrePct / 100;
  const areaConstruiblePB = superficie * (1 - areaLibreFrac);
  const m2Construibles = areaConstruiblePB * niveles;
  const valorProyecto = m2Construibles * precioM2;

  const residuals = RESIDUALS.map(r => {
    const valor = valorProyecto * (r.pct / 100);
    const diffAbsolute = valor - precioOferta;
    const diffPct = ((valor - precioOferta) / precioOferta) * 100;
    return { ...r, valor, diffAbsolute, diffPct };
  });

  return { areaConstruiblePB, m2Construibles, valorProyecto, residuals };
}

function getSignalColor(diffPct) {
  if (diffPct >= 10) return 'green';
  if (diffPct >= -10) return 'yellow';
  return 'red';
}


// ====================== RENDER ======================

function render(data, precioM2, superficie, niveles, precioOferta) {
  document.getElementById('bSuperficie').textContent = formatNumber(superficie, 2) + ' m²';
  document.getElementById('bAreaConstruible').textContent = formatNumber(data.areaConstruiblePB, 2) + ' m²';
  document.getElementById('bNiveles').textContent = niveles;
  document.getElementById('bM2Total').textContent = formatNumber(data.m2Construibles, 2) + ' m²';
  document.getElementById('bPrecioM2').textContent = formatCurrency(precioM2) + '/m²';
  document.getElementById('bValorTotal').textContent = formatCurrency(data.valorProyecto);

  document.getElementById('resultsSummary').textContent =
    formatNumber(data.m2Construibles, 0) + ' m² construibles × ' +
    formatCurrency(precioM2) + '/m² = ' + formatCurrency(data.valorProyecto) + ' valor del proyecto';

  // Residual cards
  residualGrid.innerHTML = '';
  data.residuals.forEach(r => {
    const color = getSignalColor(r.diffPct);
    const arrow = r.diffAbsolute >= 0 ? '↑' : '↓';
    const diffLabel = r.diffAbsolute >= 0
      ? formatCurrency(r.diffAbsolute) + ' sobre la oferta'
      : formatCurrency(Math.abs(r.diffAbsolute)) + ' bajo la oferta';

    const card = document.createElement('div');
    card.className = `residual-card residual-card--${color}`;
    card.innerHTML = `
      <span class="residual-pct">${r.label}</span>
      <span class="residual-value">${formatCurrency(r.valor)}</span>
      <div class="residual-diff">
        <span class="residual-badge">${arrow} ${formatPct(r.diffPct)}</span>
      </div>
      <span class="residual-diff" style="font-weight:400;">${diffLabel}</span>
    `;
    residualGrid.appendChild(card);
  });

  // Comparison bars
  comparisonBarContainer.innerHTML = '';
  const allValues = data.residuals.map(r => r.valor).concat([precioOferta]);
  const maxVal = Math.max(...allValues) * 1.15;

  const offerRow = createCompRow('Precio de oferta', precioOferta, precioOferta, maxVal, 'primary');
  comparisonBarContainer.appendChild(offerRow);

  data.residuals.forEach(r => {
    const color = getSignalColor(r.diffPct);
    const row = createCompRow(r.label, r.valor, precioOferta, maxVal, color);
    comparisonBarContainer.appendChild(row);
  });

  resultsEl.classList.remove('hidden');
  resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createCompRow(label, value, offerValue, maxVal, color) {
  const row = document.createElement('div');
  row.className = 'comp-row';
  const fillPct = Math.min((value / maxVal) * 100, 100);
  const markerPct = (offerValue / maxVal) * 100;

  if (color === 'primary') {
    row.innerHTML = `
      <div class="comp-row-header">
        <span class="comp-row-label" style="color:var(--color-primary)">${label}</span>
        <span class="comp-row-value">${formatCurrency(value)}</span>
      </div>
      <div class="comp-bar-track">
        <div class="comp-bar-fill" style="width:${fillPct}%;background:var(--color-primary);opacity:0.35;"></div>
      </div>
    `;
    return row;
  }

  const diff = value - offerValue;
  const diffPctVal = ((diff) / offerValue) * 100;

  row.innerHTML = `
    <div class="comp-row-header">
      <span class="comp-row-label">${label}</span>
      <span class="comp-row-value">${formatCurrency(value)}</span>
    </div>
    <div class="comp-bar-track">
      <div class="comp-bar-fill comp-bar-fill--${color}" style="width:${fillPct}%;"></div>
      <div class="comp-bar-marker" style="left:${markerPct}%;"></div>
    </div>
    <div class="comp-row-diff comp-row-diff--${color}">${formatPct(diffPctVal)} vs oferta</div>
  `;
  return row;
}


// ====================== EVENTS ======================

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const precioM2 = parseNum(precioM2Input.value);
  const superficie = parseNum(document.getElementById('superficie').value);
  const niveles = parseNum(document.getElementById('niveles').value);
  const areaLibre = parseNum(document.getElementById('areaLibre').value);
  const precioOferta = parseNum(document.getElementById('precioOferta').value);

  if ([precioM2, superficie, niveles, areaLibre, precioOferta].some(isNaN)) {
    alert('Por favor, completa todos los campos con valores numéricos válidos.');
    return;
  }
  if (areaLibre < 0 || areaLibre >= 100) {
    alert('El porcentaje de área libre debe estar entre 0 y 99.');
    return;
  }

  const data = calculate(precioM2, superficie, niveles, areaLibre, precioOferta);
  render(data, precioM2, superficie, niveles, precioOferta);
});

btnReset.addEventListener('click', function() {
  resultsEl.classList.add('hidden');
  form.reset();
  clearColonia();
  sliderSection.classList.add('hidden');
  precioM2Input.readOnly = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ====================== THEME TOGGLE ======================
(function(){
  const t = document.querySelector('[data-theme-toggle]');
  const r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  updateIcon();

  t && t.addEventListener('click', () => {
    d = d === 'dark' ? 'light' : 'dark';
    r.setAttribute('data-theme', d);
    t.setAttribute('aria-label', 'Cambiar a modo ' + (d === 'dark' ? 'claro' : 'oscuro'));
    updateIcon();
  });

  function updateIcon() {
    if (!t) return;
    t.innerHTML = d === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();
