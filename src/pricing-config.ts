/**
 * ============================================================================
 *  PRICING CONFIG — HVAC System Pricing Calculator (INTERNAL TOOL)
 * ============================================================================
 *
 *  ⚠️  ALL PRICES IN THIS FILE ARE PLACEHOLDERS. ⚠️
 *  They are ballpark Texas / Rio Grande Valley market numbers used only to
 *  make the calculator work out of the box. Replace every number below with
 *  Texas AC Plus's real pricing before quoting customers.
 *
 *  This is the ONLY file you need to touch to change pricing. The calculator
 *  page (src/components/PricingCalculatorPage.tsx) reads everything from here
 *  — no prices live anywhere else.
 *
 *  HOW TO EDIT:
 *   1. BASE_PRICES        — installed price for equipment + standard labor,
 *                           by system type → size → efficiency → brand tier.
 *                           Just change the dollar numbers.
 *   2. ADD_ONS            — flat prices for install-complexity extras.
 *                           Change `price`, `label`, or `note` freely.
 *   3. BRAND_TIER_LABELS  — swap the placeholder brand names for the brands
 *                           the company actually carries.
 *   4. Everything under "CALCULATOR BEHAVIOR" — margin slider range, quote
 *                           range %, etc.
 *
 *  After editing, redeploy the site (push to main) and the calculator picks
 *  up the new numbers automatically.
 * ============================================================================
 */

/* ── Types (no prices here — safe to ignore when editing) ────────────────── */

export type SystemTypeId =
  | 'ac_furnace'
  | 'heat_pump'
  | 'ac_only'
  | 'furnace_only'
  | 'mini_split';

export type EfficiencyId = 'standard' | 'mid' | 'high';
export type BrandTierId = 'good' | 'better' | 'best';

export interface AddOn {
  id: string;
  label: string;
  /** Flat price added to the quote when the box is checked. */
  price: number;
  /** Small helper text shown under the label (optional). */
  note?: string;
}

/* ══════════════════════════════════════════════════════════════════════════
   1. SYSTEM TYPES & SIZES
   ══════════════════════════════════════════════════════════════════════════ */

export const SYSTEM_TYPES: { id: SystemTypeId; label: string }[] = [
  { id: 'ac_furnace', label: 'AC + Gas Furnace' },
  { id: 'heat_pump', label: 'Heat Pump' },
  { id: 'ac_only', label: 'AC Only (Condenser + Coil)' },
  { id: 'furnace_only', label: 'Furnace Only' },
  { id: 'mini_split', label: 'Mini-Split' },
];

/** Tonnage options for everything except mini-splits. */
export const TONNAGE_OPTIONS = ['1.5', '2', '2.5', '3', '3.5', '4', '5'];

/** Mini-splits are sized by number of zones instead of tonnage. */
export const ZONE_OPTIONS = ['1', '2', '3', '4', '5'];

/* ══════════════════════════════════════════════════════════════════════════
   2. EFFICIENCY TIERS
   Furnace-only uses AFUE-style labels since SEER2 doesn't apply to furnaces.
   ══════════════════════════════════════════════════════════════════════════ */

export const EFFICIENCY_TIERS: { id: EfficiencyId; label: string }[] = [
  { id: 'standard', label: 'Standard — 14.3 SEER2' },
  { id: 'mid', label: 'Mid — 16 SEER2' },
  { id: 'high', label: 'High — 18+ SEER2 / Variable Speed' },
];

/** Label overrides for furnace-only (edit or add overrides for other types). */
export const EFFICIENCY_LABEL_OVERRIDES: Partial<
  Record<SystemTypeId, Record<EfficiencyId, string>>
> = {
  furnace_only: {
    standard: 'Standard — 80% AFUE',
    mid: 'Mid — 96% AFUE Two-Stage',
    high: 'High — 97%+ Variable Speed',
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   3. BRAND TIERS
   ⚠️ PLACEHOLDER BRAND NAMES — replace with the brands the company carries.
   ══════════════════════════════════════════════════════════════════════════ */

export const BRAND_TIER_LABELS: Record<BrandTierId, string> = {
  good: 'Good — [Brand A, e.g. Goodman]',
  better: 'Better — [Brand B, e.g. Rheem]',
  best: 'Best — [Brand C, e.g. Trane]',
};

/* ══════════════════════════════════════════════════════════════════════════
   4. BASE PRICE MATRIX  —  ⚠️ ALL PLACEHOLDER NUMBERS ⚠️
   Fully-installed price (equipment + standard labor + basic materials),
   BEFORE any add-ons and BEFORE the margin adjustment.

   Structure:  system type → size → efficiency tier → brand tier → price
     - For mini_split, the size key is the NUMBER OF ZONES ('1'–'5').
     - For everything else, the size key is TONNAGE ('1.5'–'5').

   To change a price, just edit the number. Example: the 3-ton AC + Gas
   Furnace, Standard efficiency, "Good" brand install is the `9000` in
   ac_furnace → '3' → standard → good.
   ══════════════════════════════════════════════════════════════════════════ */

export const BASE_PRICES: Record<
  SystemTypeId,
  Record<string, Record<EfficiencyId, Record<BrandTierId, number>>>
> = {
  ac_furnace: {
    '1.5': { standard: { good: 7800, better: 8750, best: 10000 }, mid: { good: 9600, better: 10750, best: 12300 }, high: { good: 12000, better: 13450, best: 15350 } },
    '2':   { standard: { good: 8200, better: 9200, best: 10500 }, mid: { good: 10000, better: 11200, best: 12800 }, high: { good: 12400, better: 13900, best: 15850 } },
    '2.5': { standard: { good: 8600, better: 9650, best: 11000 }, mid: { good: 10400, better: 11650, best: 13300 }, high: { good: 12800, better: 14350, best: 16400 } },
    '3':   { standard: { good: 9000, better: 10100, best: 11500 }, mid: { good: 10800, better: 12100, best: 13800 }, high: { good: 13200, better: 14800, best: 16900 } },
    '3.5': { standard: { good: 9600, better: 10750, best: 12300 }, mid: { good: 11400, better: 12750, best: 14600 }, high: { good: 13800, better: 15450, best: 17650 } },
    '4':   { standard: { good: 10200, better: 11400, best: 13050 }, mid: { good: 12000, better: 13450, best: 15350 }, high: { good: 14400, better: 16150, best: 18450 } },
    '5':   { standard: { good: 11200, better: 12550, best: 14350 }, mid: { good: 13000, better: 14550, best: 16650 }, high: { good: 15400, better: 17250, best: 19700 } },
  },
  heat_pump: {
    '1.5': { standard: { good: 8200, better: 9200, best: 10500 }, mid: { good: 10200, better: 11400, best: 13050 }, high: { good: 12700, better: 14200, best: 16250 } },
    '2':   { standard: { good: 8600, better: 9650, best: 11000 }, mid: { good: 10600, better: 11850, best: 13550 }, high: { good: 13100, better: 14650, best: 16750 } },
    '2.5': { standard: { good: 9000, better: 10100, best: 11500 }, mid: { good: 11000, better: 12300, best: 14100 }, high: { good: 13500, better: 15100, best: 17300 } },
    '3':   { standard: { good: 9500, better: 10650, best: 12150 }, mid: { good: 11500, better: 12900, best: 14700 }, high: { good: 14000, better: 15700, best: 17900 } },
    '3.5': { standard: { good: 10100, better: 11300, best: 12950 }, mid: { good: 12100, better: 13550, best: 15500 }, high: { good: 14600, better: 16350, best: 18700 } },
    '4':   { standard: { good: 10800, better: 12100, best: 13800 }, mid: { good: 12800, better: 14350, best: 16400 }, high: { good: 15300, better: 17150, best: 19600 } },
    '5':   { standard: { good: 11900, better: 13350, best: 15250 }, mid: { good: 13900, better: 15550, best: 17800 }, high: { good: 16400, better: 18350, best: 21000 } },
  },
  ac_only: {
    '1.5': { standard: { good: 5800, better: 6500, best: 7400 }, mid: { good: 7300, better: 8200, best: 9350 }, high: { good: 9300, better: 10400, best: 11900 } },
    '2':   { standard: { good: 6100, better: 6850, best: 7800 }, mid: { good: 7600, better: 8500, best: 9750 }, high: { good: 9600, better: 10750, best: 12300 } },
    '2.5': { standard: { good: 6500, better: 7300, best: 8300 }, mid: { good: 8000, better: 8950, best: 10250 }, high: { good: 10000, better: 11200, best: 12800 } },
    '3':   { standard: { good: 6900, better: 7750, best: 8850 }, mid: { good: 8400, better: 9400, best: 10750 }, high: { good: 10400, better: 11650, best: 13300 } },
    '3.5': { standard: { good: 7400, better: 8300, best: 9450 }, mid: { good: 8900, better: 9950, best: 11400 }, high: { good: 10900, better: 12200, best: 13950 } },
    '4':   { standard: { good: 7900, better: 8850, best: 10100 }, mid: { good: 9400, better: 10550, best: 12050 }, high: { good: 11400, better: 12750, best: 14600 } },
    '5':   { standard: { good: 8800, better: 9850, best: 11250 }, mid: { good: 10300, better: 11550, best: 13200 }, high: { good: 12300, better: 13800, best: 15750 } },
  },
  furnace_only: {
    '1.5': { standard: { good: 4600, better: 5150, best: 5900 }, mid: { good: 5800, better: 6500, best: 7400 }, high: { good: 7200, better: 8050, best: 9200 } },
    '2':   { standard: { good: 4800, better: 5400, best: 6150 }, mid: { good: 6000, better: 6700, best: 7700 }, high: { good: 7400, better: 8300, best: 9450 } },
    '2.5': { standard: { good: 5000, better: 5600, best: 6400 }, mid: { good: 6200, better: 6950, best: 7950 }, high: { good: 7600, better: 8500, best: 9750 } },
    '3':   { standard: { good: 5300, better: 5950, best: 6800 }, mid: { good: 6500, better: 7300, best: 8300 }, high: { good: 7900, better: 8850, best: 10100 } },
    '3.5': { standard: { good: 5600, better: 6250, best: 7150 }, mid: { good: 6800, better: 7600, best: 8700 }, high: { good: 8200, better: 9200, best: 10500 } },
    '4':   { standard: { good: 5900, better: 6600, best: 7550 }, mid: { good: 7100, better: 7950, best: 9100 }, high: { good: 8500, better: 9500, best: 10900 } },
    '5':   { standard: { good: 6400, better: 7150, best: 8200 }, mid: { good: 7600, better: 8500, best: 9750 }, high: { good: 9000, better: 10100, best: 11500 } },
  },
  /* Mini-split: keys are NUMBER OF ZONES, not tonnage. */
  mini_split: {
    '1': { standard: { good: 4500, better: 5050, best: 5750 }, mid: { good: 5250, better: 5900, best: 6700 }, high: { good: 6000, better: 6700, best: 7700 } },
    '2': { standard: { good: 7500, better: 8400, best: 9600 }, mid: { good: 9000, better: 10100, best: 11500 }, high: { good: 10500, better: 11750, best: 13450 } },
    '3': { standard: { good: 10500, better: 11750, best: 13450 }, mid: { good: 12750, better: 14300, best: 16300 }, high: { good: 15000, better: 16800, best: 19200 } },
    '4': { standard: { good: 13500, better: 15100, best: 17300 }, mid: { good: 16500, better: 18500, best: 21100 }, high: { good: 19500, better: 21850, best: 24950 } },
    '5': { standard: { good: 16500, better: 18500, best: 21100 }, mid: { good: 20250, better: 22700, best: 25900 }, high: { good: 24000, better: 26900, best: 30700 } },
  },
};

/* ══════════════════════════════════════════════════════════════════════════
   5. INSTALL COMPLEXITY ADD-ONS  —  ⚠️ ALL PLACEHOLDER NUMBERS ⚠️
   Flat prices added on top of the base price when checked.
   Edit `price`, `label`, or `note`; add/remove rows freely (each needs a
   unique `id`).
   ══════════════════════════════════════════════════════════════════════════ */

export const ADD_ONS: AddOn[] = [
  {
    id: 'new_ductwork',
    label: 'New ductwork',
    price: 5500, // PLACEHOLDER — flat full-replacement price (≈ $450–550/run × ~10–12 runs)
    note: 'Full duct replacement, flat rate',
  },
  {
    id: 'duct_mod',
    label: 'Duct modification / transition',
    price: 850, // PLACEHOLDER
    note: 'Plenum / transition work to fit new equipment',
  },
  {
    id: 'electrical',
    label: 'Electrical upgrade',
    price: 650, // PLACEHOLDER
    note: 'Breaker, disconnect, and/or whip',
  },
  {
    id: 'pad_platform',
    label: 'New pad or attic platform',
    price: 450, // PLACEHOLDER
  },
  {
    id: 'attic_install',
    label: 'Attic install upcharge',
    price: 950, // PLACEHOLDER — difficulty/labor upcharge for attic air handler or furnace
  },
  {
    id: 'smart_tstat',
    label: 'Smart thermostat upgrade',
    price: 400, // PLACEHOLDER — installed
  },
  {
    id: 'permit',
    label: 'Permit fee',
    price: 350, // PLACEHOLDER — varies by city
  },
  {
    id: 'crane',
    label: 'Crane needed (rooftop unit)',
    price: 800, // PLACEHOLDER
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   6. CALCULATOR BEHAVIOR
   ══════════════════════════════════════════════════════════════════════════ */

/** Margin/adjustment slider bounds and step, in percent. */
export const MARGIN_MIN = -10;
export const MARGIN_MAX = 20;
export const MARGIN_STEP = 1;

/** "Low–high" range option: final price ± this percent. */
export const RANGE_PERCENT = 5;

/** Round displayed final prices to the nearest ... (set to 1 to disable). */
export const ROUND_TO = 50;

/** Footnote shown at the bottom of the calculator. */
export const DISCLAIMER =
  'Internal use — prices are estimates and not a binding quote';
