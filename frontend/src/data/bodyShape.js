// Body shape calculator.
//
// Women: follows the measurement rules in the "Dress for Your Body Shape -
// Indian Style Guide" handbook (see styleHandbook.js):
//   Apple            Waist >= Bust and Hips
//   Hourglass        Bust ≈ Hips (within 5 cm); waist 20+ cm smaller
//   Top Hourglass    Bust > Hips by 5-10 cm; waist well defined
//   Bottom Hourglass Hips > Bust by 5-10 cm; waist well defined
//   Pear             Hips > Bust (and shoulders) by 5 cm or more
//   Inverted Tri.    Bust > Hips by 5 cm or more (without a defined waist),
//                    or Shoulders > Hips by 5 cm or more (optional shoulders)
//   Rectangle        Bust, waist and hips close together
//
// Men: shoulders (optional), chest, waist and hips compared with simple ratios matching
// the handbook's descriptions (Oval, Triangle, Inverted Triangle, Trapezoid,
// Rectangle).
//
// These shapes are styling guides only. They say nothing about health, and
// every body shape is a good one.

const CM_PER_INCH = 2.54

export const RANGES = {
  cm: { min: 50, max: 200 },
  in: { min: 20, max: 80 },
}

export function toInches(value, unit) {
  return unit === 'cm' ? value / CM_PER_INCH : value
}

export function toCm(value, unit) {
  return unit === 'in' ? value * CM_PER_INCH : value
}

// Advice for each shape lives in styleHandbook.js (SHAPE_ADVICE).
export const SHAPES = {
  // ---- women
  hourglass: {
    name: 'Hourglass',
    summary: 'Balanced shoulders & hips, clearly defined waist.',
  },
  topHourglass: {
    name: 'Top Hourglass',
    summary: 'Defined waist, bust slightly fuller than hips.',
  },
  bottomHourglass: {
    name: 'Bottom Hourglass',
    summary: 'Defined waist, hips slightly fuller than bust.',
  },
  triangle: {
    name: 'Pear (Triangle)',
    summary: 'Hips wider than shoulders & bust.',
  },
  round: {
    name: 'Apple (Round)',
    summary: 'Fuller midsection, slimmer legs & arms.',
  },
  rectangle: {
    name: 'Rectangle (Straight)',
    summary: 'Shoulders, waist & hips about the same.',
  },
  invertedTriangle: {
    name: 'Inverted Triangle',
    summary: 'Broad shoulders/bust, narrower hips.',
  },

  // ---- men
  menRectangle: {
    name: 'Rectangle',
    summary: 'Shoulders, waist & hips about the same width.',
  },
  menTriangle: {
    name: 'Triangle (Pear)',
    summary: 'Hips/waist wider than shoulders.',
  },
  menInvertedTriangle: {
    name: 'Inverted Triangle',
    summary: 'Broad shoulders & chest, narrow waist.',
  },
  oval: {
    name: 'Oval (Round)',
    summary: 'Fuller midsection & chest.',
  },
  trapezoid: {
    name: 'Trapezoid',
    summary: 'Shoulders slightly wider than a moderate waist.',
  },
}

export const WOMEN_SHAPE_KEYS = ['hourglass', 'topHourglass', 'bottomHourglass', 'triangle', 'round', 'rectangle', 'invertedTriangle']
export const MEN_SHAPE_KEYS = ['menRectangle', 'menTriangle', 'menInvertedTriangle', 'oval', 'trapezoid']

// ---------------------------------------------------------------- calculation
const CLOSE = 5 // cm (2 in): "about the same"
const MAX_CURVY_DIFF = 10.2 // cm (4 in): upper limit for top/bottom hourglass
const DEFINED_WAIST = 20 // cm (8 in): waist this much smaller = clearly defined

function classifyWomen({ shoulders: s, bust: b, waist: w, hips: h }) {
  if (w >= b && w >= h) return 'round'
  const diff = b - h
  const defined = Math.max(b, h) - w >= DEFINED_WAIST
  let shape
  if (Math.abs(diff) < CLOSE) shape = defined ? 'hourglass' : 'rectangle'
  else if (diff > 0) shape = defined && diff <= MAX_CURVY_DIFF ? 'topHourglass' : 'invertedTriangle'
  else shape = defined && -diff <= MAX_CURVY_DIFF ? 'bottomHourglass' : 'triangle'

  if (s) {
    // Handbook: Inverted Triangle = shoulders (or bust) > hips by 5 cm or more.
    if ((shape === 'hourglass' || shape === 'rectangle') && s - h >= CLOSE) return 'invertedTriangle'
    // Handbook: Pear = hips wider than shoulders AND bust. If the shoulders
    // balance the hips, the figure reads as hourglass (curvy) or rectangle.
    if (shape === 'triangle' && s > h - CLOSE) return defined ? 'hourglass' : 'rectangle'
  }
  return shape
}

function classifyMen({ shoulders: s, bust: chest, waist: w, hips: h }) {
  if (w >= chest && w >= h) return 'oval'
  if (s) {
    // Handbook uses shoulders: Triangle = hips/waist wider than shoulders,
    // Inverted Triangle = shoulders much wider than waist, Trapezoid = slightly wider.
    if (h >= s || w >= s) return 'menTriangle'
    const ratio = s / w
    if (ratio >= 1.4) return 'menInvertedTriangle'
    if (ratio >= 1.2) return 'trapezoid'
    return 'menRectangle'
  }
  // Without shoulders, chest is used as the upper-body measurement.
  if (h > chest + CLOSE) return 'menTriangle'
  const ratio = chest / w
  if (ratio >= 1.25) return 'menInvertedTriangle'
  if (ratio >= 1.1) return 'trapezoid'
  return 'menRectangle'
}

/**
 * @param {{gender: 'women'|'men', unit: 'cm'|'in', bust: number, waist: number, hips: number}} m
 * @returns {{key: string, shape: object, inches: object}}
 */
export function calculateBodyShape(m) {
  const hasShoulders = typeof m.shoulders === 'number' && m.shoulders > 0
  const cm = {
    shoulders: hasShoulders ? toCm(m.shoulders, m.unit) : null,
    bust: toCm(m.bust, m.unit),
    waist: toCm(m.waist, m.unit),
    hips: toCm(m.hips, m.unit),
  }
  const inches = {
    shoulders: hasShoulders ? cm.shoulders / CM_PER_INCH : null,
    bust: cm.bust / CM_PER_INCH,
    waist: cm.waist / CM_PER_INCH,
    hips: cm.hips / CM_PER_INCH,
  }
  const key = m.gender === 'men' ? classifyMen(cm) : classifyWomen(cm)
  return { key, shape: SHAPES[key], inches }
}

/** Returns an object of field -> error message (empty when valid). */
export function validateMeasurements(m) {
  const { min, max } = RANGES[m.unit]
  const unitLabel = m.unit === 'cm' ? 'cm' : 'inches'
  const errors = {}
  const fields = [
    ['bust', m.gender === 'men' ? 'Chest' : 'Bust'],
    ['waist', 'Waist'],
    ['hips', 'Hips'],
  ]
  for (const [key, label] of fields) {
    const v = m[key]
    if (v === '' || v === null || v === undefined || Number.isNaN(v)) errors[key] = `${label} is required.`
    else if (v < min || v > max) errors[key] = `${label} should be between ${min} and ${max} ${unitLabel}.`
  }
  // shoulders are optional
  const s = m.shoulders
  if (s !== '' && s !== null && s !== undefined && !Number.isNaN(s) && (s < min || s > max)) {
    errors.shoulders = `Shoulders should be between ${min} and ${max} ${unitLabel}.`
  }
  return errors
}
