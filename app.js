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

function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}


// ====================== DOM ======================

const form = document.getElementById('calcForm');
const resultsEl = document.getElementById('results');
const comparisonBarContainer = document.getElementById('comparisonBarContainer');
const btnReset = document.getElementById('btnReset');

const coloniaInput = document.getElementById('coloniaInput');
const coloniaDropdown = document.getElementById('coloniaDropdown');
const coloniaInfo = document.getElementById('coloniaInfo');
const coloniaTag = document.getElementById('coloniaTag');
const coloniaClear = document.getElementById('coloniaClear');
const coloniaSearchWrapper = document.getElementById('coloniaSearchWrapper');
const coloniaManualToggle = document.getElementById('coloniaManualToggle');
const precioM2Input = document.getElementById('precioM2');
const precioEditBtn = document.getElementById('precioEditBtn');
const sliderSection = document.getElementById('sliderSection');
const ajusteSlider = document.getElementById('ajusteSlider');
const sliderValue = document.getElementById('sliderValue');
const sliderRef = document.getElementById('sliderRef');
const sliderAdj = document.getElementById('sliderAdj');

const dynResidualSlider = document.getElementById('dynResidualSlider');
const dynResidualValue = document.getElementById('dynResidualValue');
const inverseGrid = document.getElementById('inverseGrid');
const explorerStatus = document.getElementById('explorerStatus');
const explorerValue = document.getElementById('explorerValue');
const explorerBadge = document.getElementById('explorerBadge');
const explorerDiff = document.getElementById('explorerDiff');
const explorerMarker = document.getElementById('explorerMarker');
const explorerMarkerLabel = document.getElementById('explorerMarkerLabel');
const explorerSliderWrap = document.getElementById('explorerSliderWrap');
const explorerSection = document.getElementById('residualExplorer');

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

  coloniaTag.textContent = `${c.colonia} — ${c.alcaldia} · ${formatCurrency(c.precio)}/m²`;
  coloniaInfo.classList.remove('hidden');
  coloniaSearchWrapper.classList.add('hidden');
  coloniaManualToggle.classList.add('hidden');

  // Show edit button on price, enable adjustment slider
  precioEditBtn.classList.remove('hidden');
  precioM2Input.parentElement.classList.remove('input-wrapper--manual');

  applyAdjustedPrice();
  sliderSection.classList.remove('hidden');
  ajusteSlider.value = 0;
  updateSliderDisplay();
}

function clearColonia() {
  selectedColonia = null;
  coloniaInfo.classList.add('hidden');
  coloniaSearchWrapper.classList.remove('hidden');
  coloniaManualToggle.classList.remove('hidden');
  coloniaInput.value = '';
  coloniaInput.focus();
  sliderSection.classList.add('hidden');
  precioM2Input.value = '';
  precioM2Input.readOnly = false;
  precioEditBtn.classList.add('hidden');
  precioM2Input.parentElement.classList.remove('input-wrapper--manual');
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

coloniaInput.addEventListener('input', () => renderDropdown(coloniaInput.value));
coloniaInput.addEventListener('focus', () => renderDropdown(coloniaInput.value));
coloniaInput.addEventListener('blur', () => {
  setTimeout(() => { coloniaDropdown.classList.remove('open'); dropdownOpen = false; }, 150);
});

coloniaInput.addEventListener('keydown', (e) => {
  const items = coloniaDropdown.querySelectorAll('.dropdown-item');
  const active = coloniaDropdown.querySelector('.dropdown-item--active');
  let idx = Array.from(items).indexOf(active);

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (!dropdownOpen) renderDropdown(coloniaInput.value);
    idx = Math.min(idx + 1, items.length - 1);
    items.forEach(i => i.classList.remove('dropdown-item--active'));
    if (items[idx]) { items[idx].classList.add('dropdown-item--active'); items[idx].scrollIntoView({ block: 'nearest' }); }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    idx = Math.max(idx - 1, 0);
    items.forEach(i => i.classList.remove('dropdown-item--active'));
    if (items[idx]) { items[idx].classList.add('dropdown-item--active'); items[idx].scrollIntoView({ block: 'nearest' }); }
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (active) { const m = COLONIAS.find(c => c.colonia === active.querySelector('.dropdown-colonia').textContent); if (m) selectColonia(m); }
  } else if (e.key === 'Escape') { coloniaDropdown.classList.remove('open'); dropdownOpen = false; }
});

coloniaClear.addEventListener('click', clearColonia);

// Manual price entry: skip colonia, go straight to price
coloniaManualToggle.addEventListener('click', () => {
  coloniaSearchWrapper.classList.add('hidden');
  coloniaManualToggle.classList.add('hidden');
  coloniaInfo.classList.add('hidden');
  coloniaDropdown.classList.remove('open');
  dropdownOpen = false;
  selectedColonia = null;

  // Enable manual price input
  precioM2Input.readOnly = false;
  precioM2Input.value = '';
  precioM2Input.parentElement.classList.add('input-wrapper--manual');
  precioM2Input.focus();
  sliderSection.classList.add('hidden');
  precioEditBtn.classList.add('hidden');

  // Show a "back to colonia" link in the colonia-info area
  coloniaTag.textContent = 'Precio manual — sin colonia';
  coloniaInfo.classList.remove('hidden');
});

// Edit price override when a colonia is selected
precioEditBtn.addEventListener('click', () => {
  precioM2Input.readOnly = false;
  precioM2Input.parentElement.classList.add('input-wrapper--manual');
  precioM2Input.focus();
  precioM2Input.select();
  // Hide slider since user is overriding
  sliderSection.classList.add('hidden');
  precioEditBtn.classList.add('hidden');
});

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

// Store last calculation params for dynamic slider
let lastCalcParams = null;

function calculate(precioM2, superficie, niveles, areaLibrePct, precioOferta) {
  const areaLibreFrac = areaLibrePct / 100;
  const areaConstruiblePB = superficie * (1 - areaLibreFrac);
  const m2Construibles = areaConstruiblePB * niveles;
  const valorProyecto = m2Construibles * precioM2;
  const precioM2Terreno = precioOferta / superficie;

  const residuals = RESIDUALS.map(r => {
    const valor = valorProyecto * (r.pct / 100);
    const diffAbsolute = valor - precioOferta;
    const diffPct = ((valor - precioOferta) / precioOferta) * 100;
    return { ...r, valor, diffAbsolute, diffPct };
  });

  return { areaConstruiblePB, m2Construibles, valorProyecto, precioM2Terreno, residuals };
}

function calculateInverse(precioM2, superficie, areaLibrePct, precioOferta) {
  // niveles_min = precioOferta / (superficie * (1 - areaLibre/100) * precioM2 * residualPct/100)
  const areaLibreFrac = areaLibrePct / 100;
  const areaConstruiblePB = superficie * (1 - areaLibreFrac);

  return RESIDUALS.map(r => {
    const nivelesMin = precioOferta / (areaConstruiblePB * precioM2 * (r.pct / 100));
    return { ...r, nivelesMin };
  });
}

function calculateDynamic(pctResidual) {
  if (!lastCalcParams) return null;
  const { precioM2, superficie, niveles, areaLibrePct, precioOferta } = lastCalcParams;
  const areaLibreFrac = areaLibrePct / 100;
  const areaConstruiblePB = superficie * (1 - areaLibreFrac);
  const m2Construibles = areaConstruiblePB * niveles;
  const valorProyecto = m2Construibles * precioM2;
  const valor = valorProyecto * (pctResidual / 100);
  const diffAbsolute = valor - precioOferta;
  const diffPct = ((valor - precioOferta) / precioOferta) * 100;
  return { valor, diffAbsolute, diffPct, pctResidual };
}

function getSignalColor(diffPct) {
  if (diffPct >= 10) return 'green';
  if (diffPct >= -10) return 'yellow';
  return 'red';
}

function getSignalLabel(diffPct) {
  if (diffPct >= 10) return 'Viable';
  if (diffPct >= -10) return 'Ajustado';
  return 'Inviable';
}


// ====================== RENDER ======================

function render(data, precioM2, superficie, niveles, precioOferta, areaLibre) {
  document.getElementById('bSuperficie').textContent = formatNumber(superficie, 2) + ' m²';
  document.getElementById('bAreaConstruible').textContent = formatNumber(data.areaConstruiblePB, 2) + ' m²';
  document.getElementById('bNiveles').textContent = niveles;
  document.getElementById('bM2Total').textContent = formatNumber(data.m2Construibles, 2) + ' m²';
  document.getElementById('bPrecioM2').textContent = formatCurrency(precioM2) + '/m²';
  document.getElementById('bPrecioM2Terreno').textContent = formatCurrency(data.precioM2Terreno) + '/m²';
  document.getElementById('bValorTotal').textContent = formatCurrency(data.valorProyecto);

  document.getElementById('resultsSummary').textContent =
    formatNumber(data.m2Construibles, 0) + ' m² construibles × ' +
    formatCurrency(precioM2) + '/m² = ' + formatCurrency(data.valorProyecto) + ' valor del proyecto';

  // Calculate the exact residual % that the offer price represents
  const offerResidualPct = (precioOferta / data.valorProyecto) * 100;
  // Clamp to slider range for marker, but store actual value
  lastCalcParams.offerResidualPct = offerResidualPct;

  // Set slider to offer's residual % (clamped to 10-45 range)
  const clampedPct = Math.min(45, Math.max(10, Math.round(offerResidualPct * 2) / 2));
  dynResidualSlider.value = clampedPct;
  updateDynamicResidual();
  updateExplorerMarker();

  // Inverse calculation
  const inverseData = calculateInverse(precioM2, superficie, areaLibre, precioOferta);
  renderInverse(inverseData, niveles);

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

  // Save to history
  saveToHistory(precioM2, superficie, niveles, areaLibre, precioOferta, data);
}

function renderInverse(inverseData, actualNiveles) {
  inverseGrid.innerHTML = '';
  inverseData.forEach(r => {
    const nMin = r.nivelesMin;
    const nMinCeil = Math.ceil(nMin * 10) / 10; // round up to 1 decimal
    const isFeasible = actualNiveles >= nMinCeil;
    const color = isFeasible ? 'green' : (nMinCeil <= actualNiveles * 1.3 ? 'yellow' : 'red');
    const statusLabel = isFeasible ? 'Viable' : (nMinCeil <= actualNiveles * 1.3 ? 'Ajustado' : 'Inviable');

    const card = document.createElement('div');
    card.className = `inverse-card inverse-card--${color}`;
    card.innerHTML = `
      <div class="inverse-card-header">
        <span class="inverse-label">${r.label}</span>
        <span class="residual-status residual-status--${color}">${statusLabel}</span>
      </div>
      <div class="inverse-value">
        <span class="inverse-number">${nMin.toFixed(1)}</span>
        <span class="inverse-unit">niveles mínimos</span>
      </div>
      <div class="inverse-compare">
        ${isFeasible
          ? `<span class="inverse-ok">✓ Permitidos: ${actualNiveles} niveles</span>`
          : `<span class="inverse-warn">⚠ Permitidos: ${actualNiveles} — faltan ${(nMinCeil - actualNiveles).toFixed(1)}</span>`
        }
      </div>
    `;
    inverseGrid.appendChild(card);
  });
}

function updateDynamicResidual() {
  const pct = parseFloat(dynResidualSlider.value);
  dynResidualValue.textContent = pct.toFixed(1) + '%';

  const result = calculateDynamic(pct);
  if (!result) return;

  const color = getSignalColor(result.diffPct);
  const statusLabel = getSignalLabel(result.diffPct);
  const arrow = result.diffAbsolute >= 0 ? '↑' : '↓';
  const diffLabel = result.diffAbsolute >= 0
    ? formatCurrency(result.diffAbsolute) + ' sobre la oferta'
    : formatCurrency(Math.abs(result.diffAbsolute)) + ' bajo la oferta';

  // Update explorer card
  explorerValue.textContent = formatCurrency(result.valor);
  explorerBadge.textContent = `${arrow} ${formatPct(result.diffPct)}`;
  explorerBadge.className = `explorer-badge explorer-badge--${color}`;
  explorerDiff.textContent = diffLabel;
  explorerStatus.textContent = statusLabel;
  explorerStatus.className = `residual-status residual-status--${color}`;

  // Update section border color
  explorerSection.className = `residual-explorer residual-explorer--${color}`;

  // Update slider track color via CSS custom property
  const sliderMin = 10, sliderMax = 45;
  const sliderPctFill = ((pct - sliderMin) / (sliderMax - sliderMin)) * 100;
  const colorVar = `var(--color-${color})`;
  dynResidualSlider.style.setProperty('--slider-fill', sliderPctFill + '%');
  dynResidualSlider.style.setProperty('--slider-color', colorVar);
}

function updateExplorerMarker() {
  if (!lastCalcParams || !lastCalcParams.offerResidualPct) return;
  const offerPct = lastCalcParams.offerResidualPct;
  const sliderMin = 10, sliderMax = 45;
  // Position marker relative to slider range (10-45)
  const markerPos = ((offerPct - sliderMin) / (sliderMax - sliderMin)) * 100;
  const clampedPos = Math.min(100, Math.max(0, markerPos));
  explorerMarker.style.left = clampedPos + '%';

  // If offer is outside range, flag it
  if (offerPct < sliderMin || offerPct > sliderMax) {
    explorerMarker.classList.add('explorer-marker--outside');
  } else {
    explorerMarker.classList.remove('explorer-marker--outside');
  }
  explorerMarkerLabel.textContent = `Oferta (${offerPct.toFixed(1)}%)`;
}

dynResidualSlider.addEventListener('input', updateDynamicResidual);

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
  const statusLabel = getSignalLabel(diffPctVal);

  row.innerHTML = `
    <div class="comp-row-header">
      <span class="comp-row-label">${label} <span class="comp-row-status comp-row-status--${color}">${statusLabel}</span></span>
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


// ====================== HISTORY (localStorage) ======================

const HISTORY_KEY = 'propya_calc_history';
const MAX_HISTORY = 5;

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
  } catch { return []; }
}

function saveToHistory(precioM2, superficie, niveles, areaLibre, precioOferta, data) {
  const history = getHistory();
  const colonia = selectedColonia ? selectedColonia.colonia : 'Manual';
  const incidencia = formatCurrency(data.precioM2Terreno) + '/m²';

  // Determine best/worst scenario
  const scenarios = data.residuals.map(r => ({
    label: r.pct + '%',
    color: getSignalColor(r.diffPct),
    statusLabel: getSignalLabel(r.diffPct)
  }));

  const entry = {
    timestamp: new Date().toISOString(),
    colonia,
    superficie: formatNumber(superficie, 0) + ' m²',
    niveles,
    areaLibre: areaLibre + '%',
    precioOferta: formatCurrency(precioOferta),
    incidencia,
    scenarios
  };

  history.unshift(entry);
  if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = getHistory();
  const historySection = document.getElementById('historySection');
  const historyList = document.getElementById('historyList');

  if (history.length === 0) {
    historySection.classList.add('hidden');
    return;
  }

  historySection.classList.remove('hidden');
  historyList.innerHTML = '';

  history.forEach((entry, i) => {
    const date = new Date(entry.timestamp);
    const timeStr = date.toLocaleString('es-MX', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' });

    const scenarioDots = entry.scenarios.map(s =>
      `<span class="hist-dot hist-dot--${s.color}" title="${s.label}: ${s.statusLabel}">${s.label}</span>`
    ).join('');

    const card = document.createElement('div');
    card.className = 'history-card';
    card.innerHTML = `
      <div class="hist-header">
        <span class="hist-colonia">${entry.colonia}</span>
        <span class="hist-time">${timeStr}</span>
      </div>
      <div class="hist-details">
        <span>${entry.superficie} · ${entry.niveles} niveles · ${entry.areaLibre} libre</span>
        <span>Oferta: ${entry.precioOferta}</span>
      </div>
      <div class="hist-row">
        <span class="hist-incidencia">Incidencia: ${entry.incidencia}</span>
        <div class="hist-scenarios">${scenarioDots}</div>
      </div>
    `;
    historyList.appendChild(card);
  });
}

document.getElementById('btnClearHistory').addEventListener('click', () => {
  localStorage.removeItem(HISTORY_KEY);
  renderHistory();
});

// Render history on load
renderHistory();


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

  // Store params for dynamic slider
  lastCalcParams = { precioM2, superficie, niveles, areaLibrePct: areaLibre, precioOferta };

  const data = calculate(precioM2, superficie, niveles, areaLibre, precioOferta);
  render(data, precioM2, superficie, niveles, precioOferta, areaLibre);
});

btnReset.addEventListener('click', function() {
  resultsEl.classList.add('hidden');
  form.reset();
  clearColonia();
  sliderSection.classList.add('hidden');
  precioM2Input.readOnly = false;
  precioM2Input.parentElement.classList.remove('input-wrapper--manual');
  precioEditBtn.classList.add('hidden');
  lastCalcParams = null;
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
