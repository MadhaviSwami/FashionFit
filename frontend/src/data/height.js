// Height groups used after the body shape result.
// Women's groups and tips follow the style handbook ("Petite under 5'2"", "Tall above 5'7"").
// The handbook has no men's height section, so the men's groups use common
// Indian sizing cut-offs and general styling tips.

export const HEIGHT_RANGE_CM = { min: 120, max: 220 }

const WOMEN = {
  petite: {
    name: 'Petite',
    rule: "under 5'2\" (157 cm)",
    goal: 'Keep the eye moving up and down so you look taller.',
    tips: [
      'Sarees in light fabrics, thin borders and small prints.',
      'Tie the saree a little higher and wear heels.',
      'Monochrome outfits and vertical lines add height.',
      'Short or ankle-length kurtis; avoid calf-length cuts.',
      'Cropped jackets and high-waist bottoms.',
    ],
    // style guide items that suit / need care at this height
    good: ['highWaistTrousers', 'shortKurti', 'smallPrintSaree', 'chiffonSaree', 'cigarettePants', 'slitKurti', 'vneckTop'],
    caution: {
      broadBorderSaree: 'Broad borders can cut your height - choose a thinner border.',
      stiffBroadSaree: 'Heavy borders can overwhelm a petite frame.',
      bigPrintSaree: 'Very large prints can swamp a petite frame.',
      boxyTop: 'Oversized fits can make you look shorter.',
      kaftanKurti: 'Loose, boxy cuts can make you look shorter.',
      anarkali: 'Pick ankle length, not calf length, with heels.',
      palazzo: 'Wear them high-waisted with heels so they do not shorten you.',
      wideLegPants: 'Wear them high-waisted and long enough to cover heels.',
    },
  },
  average: {
    name: 'Average height',
    rule: "between 5'2\" and 5'7\" (157-170 cm)",
    goal: 'Your height suits most lengths - follow your body shape advice first.',
    tips: [
      'Most kurta and saree styles work; choose by body shape.',
      'Knee or just-below-knee kurta lengths are the safest choice.',
      'Medium prints and medium borders are well balanced on you.',
      'Add heels for a longer line, or flats for a relaxed look.',
    ],
    good: [],
    caution: {},
  },
  tall: {
    name: 'Tall',
    rule: "above 5'7\" (170 cm)",
    goal: 'You can carry volume, length and bold detail.',
    tips: [
      'Broad borders, bold prints and heavy silks look stunning.',
      'Floor-length Anarkalis, long jackets and layered looks.',
      'Colour-blocking and contrast belts break the length.',
      'Palazzos, culottes and wide-leg pants.',
      'Flats and juttis work beautifully.',
    ],
    good: ['broadBorderSaree', 'stiffBroadSaree', 'bigPrintSaree', 'anarkali', 'palazzo', 'wideLegPants', 'beltedTop', 'beltedKurti'],
    caution: {
      cropTop: 'Very cropped tops can look too short on a long torso.',
      shortKurti: 'Short kurtis may look cut-off - try hip length or longer.',
    },
  },
}

const MEN = {
  petite: {
    name: 'Shorter frame',
    rule: "under 5'7\" (170 cm)",
    goal: 'Clean, unbroken lines and a slim (not tight) fit add height.',
    tips: [
      'Tonal or monochrome outfits; same-colour kurta and pyjama.',
      'Short kurtas ending at the hip, not knee-length or longer.',
      'Slim or tapered trousers with no break at the ankle.',
      'Vertical stripes, V-necks and open collars lengthen the frame.',
      'Avoid oversized shirts and very long jackets.',
    ],
    good: [],
    caution: {},
  },
  average: {
    name: 'Average height',
    rule: "between 5'7\" and 6'0\" (170-183 cm)",
    goal: 'Most lengths work - follow your body shape advice first.',
    tips: ['Knee-length or short kurtas both work.', 'Choose fit by body shape - shoulders first.'],
    good: [],
    caution: {},
  },
  tall: {
    name: 'Tall',
    rule: "above 6'0\" (183 cm)",
    goal: 'You can carry length, layers and bolder pieces.',
    tips: [
      'Long kurtas, Pathani suits and sherwanis suit you.',
      'Layer with jackets, waistcoats and contrast colours.',
      'Wider trousers, chinos and textured fabrics.',
      'Avoid trousers and sleeves that are too short.',
    ],
    good: [],
    caution: {},
  },
}

export function heightGroup(cm, gender = 'women') {
  if (!cm || Number.isNaN(cm)) return null
  const table = gender === 'men' ? MEN : WOMEN
  const [low, high] = gender === 'men' ? [170, 183] : [157.5, 170.2]
  const key = cm < low ? 'petite' : cm > high ? 'tall' : 'average'
  return { key, cm, ...table[key] }
}

export function formatHeight(cm) {
  const totalIn = Math.round(cm / 2.54)
  return `${Math.floor(totalIn / 12)}'${totalIn % 12}" (${Math.round(cm)} cm)`
}

// form values -> cm (or NaN when empty / incomplete)
export function heightToCm({ unit, height, heightFt, heightIn }) {
  if (unit === 'cm') return height === '' || height == null ? NaN : Number(height)
  if (heightFt === '' || heightFt == null) return NaN
  return (Number(heightFt) * 12 + Number(heightIn || 0)) * 2.54
}
