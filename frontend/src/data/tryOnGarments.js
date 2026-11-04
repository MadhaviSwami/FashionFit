// Garments offered on the Virtual Try-On page ("Choose an outfit").
// Images live in frontend/public/style-guide/my-photos/ (the photos you added).
//
// To add another garment: put the photo in that folder and add an entry below.
//   category: 'upper_body' (tops, shirts, kurtis) | 'lower_body' (pants, skirts) | 'dresses'
//   description: a short text that helps the AI understand colour, pattern and style.

export const TRYON_CATEGORY_LABELS = {
  upper_body: 'Top / upper body',
  lower_body: 'Bottom / lower body',
  dresses: 'Dress / full length',
}

export const GARMENT_GROUPS = [
  { key: 'tops', label: 'Tops' },
  { key: 'kurtis', label: 'Kurtis' },
  { key: 'bottoms', label: 'Bottoms' },
]

const photo = (file) => `/style-guide/my-photos/${file}`

export const TRYON_GARMENTS = [
  {
    id: 'green-wrap-top',
    name: 'Green wrap top',
    group: 'tops',
    category: 'upper_body',
    image: photo('wrap-top.jpg'),
    description: 'sage green sleeveless linen wrap top with a side tie',
  },
  {
    id: 'black-sweetheart-top',
    name: 'Black sweetheart-neck top',
    group: 'tops',
    category: 'upper_body',
    image: photo('sweetheart-top.jpg'),
    description: 'black fitted top with sweetheart neckline and short puff sleeves',
  },
  {
    id: 'floral-empire-top',
    name: 'Floral empire-waist top',
    group: 'tops',
    category: 'upper_body',
    image: photo('empire-top.jpg'),
    description: 'cream floral print long-sleeve V-neck empire-waist top',
  },
  {
    id: 'beige-oversized-tee',
    name: 'Beige oversized tee',
    group: 'tops',
    category: 'upper_body',
    image: photo('boxy-top.jpg'),
    description: 'beige oversized boxy t-shirt with a small black embroidered logo',
  },
  {
    id: 'black-square-neck-top',
    name: 'Black square-neck top',
    group: 'tops',
    category: 'upper_body',
    image: photo('belted-top.jpg'),
    description: 'black fitted long-sleeve square-neck ribbed top with flared cuffs',
  },
  {
    id: 'cream-peplum-top',
    name: 'Cream ruffle peplum top',
    group: 'tops',
    category: 'upper_body',
    image: photo('peplum-top.jpg'),
    description: 'cream linen peplum top with ruffle sleeves, square neck and small red embroidered bows',
  },
  {
    id: 'wine-v-neck-top',
    name: 'Wine V-neck top',
    group: 'tops',
    category: 'upper_body',
    image: photo('vneck-top.jpg'),
    description: 'wine red satin V-neck top with three-quarter sleeves and lace trim at the neckline',
  },
  {
    id: 'red-printed-kurti',
    name: 'Red printed high-neck kurti',
    group: 'kurtis',
    category: 'upper_body',
    image: photo('yoke-kurti.jpg'),
    description: 'maroon red floral print sleeveless high-neck flared A-line kurti',
  },
  {
    id: 'wide-leg-joggers',
    name: 'Wide-leg joggers',
    group: 'bottoms',
    category: 'lower_body',
    image: photo('joggers.jpg'),
    description: 'wide-leg jogger pants with elastic waist and drawstring',
  },
  {
    id: 'blue-low-rise-jeans',
    name: 'Blue low-rise jeans',
    group: 'bottoms',
    category: 'lower_body',
    image: photo('low-rise-jeans.jpg'),
    description: 'mid-blue washed low-rise straight-leg denim jeans',
  },
  {
    id: 'brown-high-waist-trousers',
    name: 'Brown high-waisted trousers',
    group: 'bottoms',
    category: 'lower_body',
    image: photo('high-waist-trousers.jpg'),
    description: 'chocolate brown high-waisted wide-leg formal trousers',
  },
]

export function getGarment(id) {
  return TRYON_GARMENTS.find((g) => g.id === id) || null
}
