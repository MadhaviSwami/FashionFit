// Visual style guide: what to wear / avoid for each women's body shape,
// for tops, bottoms, kurtis and sarees. Each item has a label, a photo (see stylePhotos.json and
// public/style-guide/my-photos/) and, where the catalogue has something similar,
// a product to link to.

export const ITEMS = {
  // ---------------------------------------------------------------- tops
  vneckTop: { label: 'V-neck top' },
  boatNeckTop: { label: 'Boat-neck top' },
  sweetheartTop: { label: 'Sweetheart neckline' },
  highNeckTop: { label: 'High-neck top' },
  offShoulderTop: { label: 'Off-shoulder top' },
  puffSleeveTop: { label: 'Puff-sleeve top' },
  peplumTop: { label: 'Peplum top' },
  wrapTop: { label: 'Wrap top' },
  boxyTop: { label: 'Boxy oversized tee' },
  beltedTop: { label: 'Tucked-in top with belt' },
  cropTop: { label: 'Crop top' },
  bodyconTop: { label: 'Tight bodycon top' },
  yokeTop: { label: 'Embellished neckline' },
  empireTop: { label: 'Empire-waist top' },
  printTop: { label: 'Bright printed top' },

  // ---------------------------------------------------------------- kurtis
  alineKurti: { label: 'A-line kurti' },
  anarkali: { label: 'Anarkali' },
  straightKurti: { label: 'Straight fitted kurti' },
  angrakha: { label: 'Angrakha (wrap) kurti' },
  kalidar: { label: 'Kalidar (paneled) kurti' },
  empireKurti: { label: 'Empire-waist kurti' },
  shortKurti: { label: 'Short kurti' },
  slitKurti: { label: 'Front-slit kurti' },
  asymKurti: { label: 'Asymmetric-hem kurti' },
  peplumKurti: { label: 'Peplum kurti' },
  kaftanKurti: { label: 'Boxy kaftan kurti' },
  yokeKurti: { label: 'Heavy-yoke high-neck kurti' },
  beltedKurti: { label: 'Belted straight kurti' },

  // ---------------------------------------------------------------- sarees
  chiffonSaree: { label: 'Chiffon / georgette saree' },
  openPalluSaree: { label: 'Open pallu drape' },
  stiffSaree: { label: 'Stiff organza / cotton saree' },
  broadBorderSaree: { label: 'Broad-border saree' },
  stiffBroadSaree: { label: 'Stiff silk with heavy border' },
  beltSaree: { label: 'Saree with waist belt' },
  puffBlouseSaree: { label: 'Puff-sleeve blouse' },
  boatBlouseSaree: { label: 'Boat-neck blouse' },
  vBlouseSaree: { label: 'Deep V-neck blouse' },
  highNeckBlouseSaree: { label: 'High-neck blouse' },
  smallPrintSaree: { label: 'Small-print saree' },
  bigPrintSaree: { label: 'Large bold prints' },

  // ---------------------------------------------------------------- bottoms
  wideLegPants: { label: 'Wide-leg trousers' },
  palazzo: { label: 'Palazzo pants' },
  bootcutJeans: { label: 'Bootcut / flared jeans' },
  straightJeans: { label: 'Straight-leg jeans' },
  skinnyJeans: { label: 'Skinny jeans' },
  highWaistTrousers: { label: 'High-waisted trousers' },
  cigarettePants: { label: 'Cigarette pants' },
  alineSkirt: { label: 'A-line skirt' },
  pencilSkirt: { label: 'Pencil skirt' },
  pleatedSkirt: { label: 'Pleated skirt' },
  joggers: { label: 'Baggy joggers' },
  lowRiseJeans: { label: 'Low-rise jeans' },
}

function e(item, why) {
  return { item, why }
}

// Wear / avoid picks for each women's body shape, following the
// "Dress for Your Body Shape - Indian Style Guide" handbook.
export const STYLE_GUIDE = {
  hourglass: {
    tops: {
      wear: [e('wrapTop', 'Wrap tops follow your curves and mark your waist.'), e('sweetheartTop', 'A sweetheart neck adds feminine curves to a balanced frame.'), e('beltedTop', 'Tuck in and belt - belts are your best accessory.'), e('peplumTop', 'Fitted at the waist with a soft flare; lovely with sharara too.')],
      avoid: [e('boxyTop', 'Boxy, oversized cuts hide your shape.'), e('empireTop', 'Empire waists skip your natural waist.')],
    },
    bottoms: {
      wear: [e('highWaistTrousers', 'Tuck shirts into high-waist trousers to show your waist.'), e('pencilSkirt', 'Follows your curves - ideal for office.'), e('straightJeans', 'High-rise jeans with a tucked-in tee or bodysuit.')],
      avoid: [e('joggers', 'Baggy bottoms with baggy tops lose your shape.'), e('lowRiseJeans', 'Sit below the waist you want to highlight.')],
    },
    kurtis: {
      wear: [e('anarkali', 'Fitted Anarkalis that flare from the natural waist.'), e('beltedKurti', 'Belted kurtas define your waist.'), e('straightKurti', 'Straight-cut fitted kurtas with churidar or cigarette pants.'), e('peplumKurti', 'Peplum tops with sharara follow your curves.')],
      avoid: [e('kaftanKurti', 'Shapeless kaftans hide your waist.'), e('empireKurti', 'Empire waists skip your natural waist.')],
    },
    sarees: {
      wear: [e('chiffonSaree', 'Chiffon, georgette, crepe and satin drape and cling gently.'), e('beltSaree', 'A contrast belt/kamarbandh accentuates the waist beautifully.'), e('vBlouseSaree', 'Fitted, waist-length blouses with sweetheart, deep-U or V necks.')],
      avoid: [e('stiffSaree', 'Very stiff fabrics (heavy organza, thick tissue) add bulk.'), e('broadBorderSaree', 'Overly broad borders overwhelm a balanced frame.')],
    },
  },
  topHourglass: {
    tops: {
      wear: [e('vneckTop', 'V-necks keep the bust from looking heavy.'), e('wrapTop', 'Wrap tops keep the waist visible.'), e('beltedTop', 'A belt at the waist draws the eye down from the bust.')],
      avoid: [e('highNeckTop', 'High necks and turtlenecks make the bust look fuller.'), e('boatNeckTop', 'Boat necks widen an already full top.'), e('puffSleeveTop', 'Puff and cap sleeves add bulk up top.')],
    },
    bottoms: {
      wear: [e('wideLegPants', 'Wide-leg trousers add volume below to balance the bust.'), e('alineSkirt', 'A-line and flared skirts balance your top half.'), e('bootcutJeans', 'High-rise bootcut or flared jeans.')],
      avoid: [e('skinnyJeans', 'Skinny bottoms with a voluminous top look top-heavy.'), e('cigarettePants', 'Too slim to balance a fuller bust.')],
    },
    kurtis: {
      wear: [e('anarkali', 'Anarkalis fitted to the waist with a full flare.'), e('angrakha', 'Angrakha (wrap) kurtas with a V neckline.'), e('alineKurti', 'V-neck kurtas with waist darts, worn with sharara or palazzos.')],
      avoid: [e('yokeKurti', 'High-neck kurtas and heavy yoke work add bulk to the bust.'), e('straightKurti', 'A tight churidar with a loose top looks top-heavy.')],
    },
    sarees: {
      wear: [e('vBlouseSaree', 'A supported V, deep-U or sweetheart blouse with elbow sleeves.'), e('broadBorderSaree', 'A medium-to-broad border adds weight below.'), e('chiffonSaree', 'Soft fabrics on top; pin the pallu narrow so the waist shows.')],
      avoid: [e('highNeckBlouseSaree', 'High-neck blouses make the bust look heavier.'), e('boatBlouseSaree', 'Boat-neck blouses widen the top.'), e('puffBlouseSaree', 'Puff sleeves add volume where you are fuller.')],
    },
  },
  bottomHourglass: {
    tops: {
      wear: [e('offShoulderTop', 'Tucked-in off-shoulder tops add interest up top.'), e('boatNeckTop', 'Boat and square necks balance fuller hips.'), e('wrapTop', 'Wrap styles show off the waist.'), e('printTop', 'Tucked-in printed or ruffled tops draw the eye up.')],
      avoid: [e('bodyconTop', 'Tops that end at the widest point of the hips.'), e('boxyTop', 'Boxy, hip-length cuts hide your waist.')],
    },
    bottoms: {
      wear: [e('bootcutJeans', 'High-rise dark bootcut jeans balance the hips.'), e('wideLegPants', 'Dark high-waist wide-leg trousers keep the hipline smooth.'), e('pencilSkirt', 'Dark pencil or A-line skirts with lighter tops.')],
      avoid: [e('skinnyJeans', 'Light-wash skinny jeans highlight the hips.'), e('pleatedSkirt', 'Volume and detail at the hips adds width.')],
    },
    kurtis: {
      wear: [e('anarkali', 'A fitted bodice with an A-line flare from the natural waist.'), e('peplumKurti', 'Peplum kurtas with straight pants or soft palazzos.'), e('beltedKurti', 'Belted kurtas show off the waist.'), e('yokeKurti', 'A decorated yoke or neckline with plain, darker bottoms.')],
      avoid: [e('shortKurti', 'A tight churidar with a short kurta ends at the hips.'), e('straightKurti', 'Clingy straight cuts sit tight on the hips.')],
    },
    sarees: {
      wear: [e('chiffonSaree', 'Soft fabrics with flat, side-tucked pleats fall flat over the hips.'), e('boatBlouseSaree', 'An embroidered boat, square or sweetheart blouse - the place for detail.'), e('beltSaree', 'A saree belt shows off your waist.'), e('puffBlouseSaree', 'Puff, cap or elbow sleeves add interest up top.')],
      avoid: [e('stiffSaree', 'Stiff tissue or organza on the pleats adds volume.'), e('broadBorderSaree', 'A heavy border at the hips widens them.')],
    },
  },
  triangle: {
    tops: {
      wear: [e('offShoulderTop', 'Off-shoulder and Bardot tops widen the shoulders.'), e('boatNeckTop', 'Boat necks broaden the top half.'), e('puffSleeveTop', 'Puff sleeves add volume at the shoulders.'), e('printTop', 'Bright, patterned or striped tops draw the eye up.')],
      avoid: [e('bodyconTop', 'Tops that end exactly at the widest part of the hips.'), e('cropTop', 'Short tops with skinny bottoms highlight the hips.')],
    },
    bottoms: {
      wear: [e('bootcutJeans', 'Dark-wash bootcut or flared jeans balance the hips.'), e('alineSkirt', 'A-line skirts in dark solids skim the hips.'), e('wideLegPants', 'Dark wide-leg trousers create a long, balanced line.')],
      avoid: [e('skinnyJeans', 'Light-wash skinny jeans highlight hips and thighs.'), e('pleatedSkirt', 'Heavily detailed skirts add bulk below.')],
    },
    kurtis: {
      wear: [e('alineKurti', 'A-line kurtas skim over the hips.'), e('anarkali', 'Flared Anarkalis flow over the lower body.'), e('yokeKurti', 'Yoke work or embroidered necklines draw the eye up.')],
      avoid: [e('shortKurti', 'A tight churidar with a short kurta ends at the hips.'), e('straightKurti', 'Clingy straight cuts and hem embroidery at the hips.')],
    },
    sarees: {
      wear: [e('chiffonSaree', 'Soft chiffon/georgette with flat pleats keeps the hips smooth.'), e('boatBlouseSaree', 'Make the blouse the star: boat neck, off-shoulder or square neck.'), e('puffBlouseSaree', 'Puff or cap sleeves widen the shoulders.'), e('openPalluSaree', 'A wide pleated pallu over the shoulder broadens the top.')],
      avoid: [e('stiffBroadSaree', 'Stiff Kanjeevaram or tissue puffs out at the hips.'), e('broadBorderSaree', 'A heavy border on the pleats widens the lower half.')],
    },
  },
  round: {
    tops: {
      wear: [e('vneckTop', 'V-necks elongate the torso.'), e('empireTop', 'Empire lines flow from under the bust.'), e('wrapTop', 'Soft wrap tops in fluid fabric.'), e('peplumTop', 'Flowy peplum tops skim the midsection.')],
      avoid: [e('cropTop', 'Crop tops expose the midsection.'), e('beltedTop', 'Belts at the natural waist cut across the widest part.'), e('highNeckTop', 'High and turtle necks shorten the torso.'), e('bodyconTop', 'Tight, clingy fabrics at the midsection.')],
    },
    bottoms: {
      wear: [e('straightJeans', 'Mid-to-high rise straight-leg jeans.'), e('bootcutJeans', 'Bootcut jeans balance the frame.'), e('alineSkirt', 'Knee-length A-line skirts show off slim legs.')],
      avoid: [e('lowRiseJeans', 'Low-rise jeans sit under the tummy.')],
    },
    kurtis: {
      wear: [e('empireKurti', 'Empire-waist kurtas flow from under the bust.'), e('alineKurti', 'A-line kurtas skim the midsection.'), e('slitKurti', 'Long straight kurtas with slits create a vertical line.'), e('kaftanKurti', 'Flowing kaftans are comfortable and slimming.')],
      avoid: [e('beltedKurti', 'Belted kurtas draw attention to the waist.'), e('shortKurti', 'Short, tight kurtis cling at the middle.')],
    },
    sarees: {
      wear: [e('openPalluSaree', 'Leave the pallu open, falling over the midriff.'), e('chiffonSaree', 'Light chiffon, georgette, crepe and mulmul add no bulk.'), e('vBlouseSaree', 'V or deep-U blouses with 3/4 sleeves elongate.'), e('smallPrintSaree', 'Thin borders and small, all-over prints.')],
      avoid: [e('stiffSaree', 'Stiff silks and tissue add bulk at the middle.'), e('highNeckBlouseSaree', 'Very high necks shorten the torso.'), e('broadBorderSaree', 'Broad borders at the waist widen the middle.'), e('beltSaree', 'Belts at the natural waist emphasise the middle.')],
    },
  },
  rectangle: {
    tops: {
      wear: [e('peplumTop', 'Peplum tops create a waist and hip curve.'), e('wrapTop', 'Wrap tops create curves.'), e('beltedTop', 'A belt instantly defines a waist.'), e('puffSleeveTop', 'Puff and ruffled sleeves add curves up top.')],
      avoid: [e('boxyTop', 'Boxy shifts with no waist look straight.'), e('bodyconTop', 'Very clingy outfits emphasise straightness.')],
    },
    bottoms: {
      wear: [e('pleatedSkirt', 'Pleated and A-line skirts add curves at the hips.'), e('highWaistTrousers', 'Pleated or paper-bag waist trousers define a waist.'), e('bootcutJeans', 'Flares add shape; boyfriend or mom jeans for a relaxed look.')],
      avoid: [e('joggers', 'Shapeless straight cuts with nothing to define the waist.'), e('lowRiseJeans', 'Drop-waist and low-rise styles skip the waist.')],
    },
    kurtis: {
      wear: [e('anarkali', 'Anarkalis with lots of flare and kalis.'), e('angrakha', 'Angrakha (wrap) kurtas create a waistline.'), e('peplumKurti', 'Peplum kurtas with dhoti pants or sharara.'), e('beltedKurti', 'Belted kurtas and jacket-style sets.')],
      avoid: [e('straightKurti', 'Long straight shapeless kurtas.'), e('kaftanKurti', 'Dull, unlayered single-tone sets.')],
    },
    sarees: {
      wear: [e('stiffBroadSaree', 'Kanjeevaram and Banarasi silks add shape.'), e('stiffSaree', 'Organza, tissue and stiff cottons add structure.'), e('beltSaree', 'A kamarbandh or saree belt instantly creates a waistline.'), e('puffBlouseSaree', 'Peplum, corset or puff-sleeve blouses add curves.')],
      avoid: [e('chiffonSaree', 'Plain limp sarees with no waist definition (add a belt if you love them).')],
    },
  },
  invertedTriangle: {
    tops: {
      wear: [e('vneckTop', 'V-neck and scoop necks break up shoulder width.'), e('wrapTop', 'Wrap tops soften the shoulders.'), e('peplumTop', 'A peplum adds a curve at the hips.')],
      avoid: [e('puffSleeveTop', 'Puff sleeves and epaulettes widen the shoulders.'), e('boatNeckTop', 'Boat necks exaggerate broad shoulders.'), e('offShoulderTop', 'Off-shoulder tops draw attention to shoulder width.')],
    },
    bottoms: {
      wear: [e('wideLegPants', 'Wide-leg and flared bottoms add lower-body volume.'), e('palazzo', 'Printed palazzos balance a strong upper body.'), e('pleatedSkirt', 'Pleated, A-line and flared skirts add shape below.')],
      avoid: [e('skinnyJeans', 'Skinny bottoms with voluminous tops look top-heavy.'), e('pencilSkirt', 'Too narrow to balance your shoulders.')],
    },
    kurtis: {
      wear: [e('anarkali', 'Flared Anarkalis add volume below.'), e('kalidar', 'Kurtas with heavy hem detail and flare.'), e('alineKurti', 'A-line kurtas with palazzos or sharara.')],
      avoid: [e('yokeKurti', 'Heavy yoke or shoulder work adds width up top.'), e('straightKurti', 'Tight churidars keep everything narrow below.')],
    },
    sarees: {
      wear: [e('stiffSaree', 'Structured silks, organza and tissue add volume at the hips.'), e('broadBorderSaree', 'Broad borders and bold prints on the pleats.'), e('vBlouseSaree', 'Plain V-neck, deep-U or halter blouses.'), e('openPalluSaree', 'Keep the pallu thin and loose, or let it fall open.')],
      avoid: [e('puffBlouseSaree', 'Puff and cap sleeves broaden the shoulders.'), e('boatBlouseSaree', 'Boat-neck and off-shoulder blouses widen the top.')],
    },
  },
}

// Search phrase used for "Shop this look" links (Amazon, Myntra, Meesho...).
// Items not listed use "women <label>".
const SHOP_QUERIES = {
  sweetheartTop: 'women sweetheart neck top',
  boxyTop: 'women oversized t-shirt',
  beltedTop: 'women top with belt',
  yokeTop: 'women embellished neckline top',
  printTop: 'women printed top',
  alineKurti: 'a-line kurti',
  anarkali: 'anarkali kurta women',
  straightKurti: 'straight kurti women',
  angrakha: 'angrakha kurti',
  kalidar: 'kalidar kurta women',
  empireKurti: 'empire waist kurti',
  shortKurti: 'short kurti for jeans',
  slitKurti: 'front slit kurti',
  asymKurti: 'asymmetric kurti',
  peplumKurti: 'peplum kurti',
  kaftanKurti: 'kaftan kurti',
  yokeKurti: 'high neck kurti',
  beltedKurti: 'belted kurti',
  chiffonSaree: 'chiffon georgette saree',
  openPalluSaree: 'georgette saree',
  stiffSaree: 'organza saree',
  broadBorderSaree: 'broad border silk saree',
  stiffBroadSaree: 'banarasi silk saree',
  beltSaree: 'saree with belt',
  puffBlouseSaree: 'puff sleeve saree blouse',
  boatBlouseSaree: 'boat neck saree blouse',
  vBlouseSaree: 'deep v neck saree blouse',
  highNeckBlouseSaree: 'high neck saree blouse',
  smallPrintSaree: 'small print saree',
  bigPrintSaree: 'bold print saree',
  bootcutJeans: 'women bootcut jeans',
  wideLegPants: 'women wide leg trousers',
}

export function shopQuery(itemKey) {
  const item = ITEMS[itemKey]
  if (!item) return ''
  return SHOP_QUERIES[itemKey] || `women ${item.label.replace(/\(.*?\)/g, '').replace(/\//g, ' ').trim().toLowerCase()}`
}

// Pinterest pins shown (with Pinterest's official embed) for a body shape.
// Add a pin: copy the number from its URL, e.g. pinterest.com/pin/1085297210223776610/
export const PINTEREST_INSPIRATION = {
  triangle: [
    '1085297210223776610', // dresses for a pear-shaped body
    '1101270915154251551', // ultimate guide to choosing tops for pear shape
  ],
}

// "boatNeckTop" -> "boat-neck-top.jpg": the file name to use for your own photo
// in frontend/public/style-guide/my-photos/
export function photoFileName(itemKey) {
  return `${itemKey.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}.jpg`
}

export const GUIDE_TABS = [
  { key: 'tops', label: 'Tops' },
  { key: 'bottoms', label: 'Bottoms' },
  { key: 'kurtis', label: 'Kurtis' },
  { key: 'sarees', label: 'Sarees' },
]
