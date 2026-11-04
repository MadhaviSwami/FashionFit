// Content from the "Dress for Your Body Shape - Indian Style Guide" handbook.
// Per-shape advice (keys match SHAPES in bodyShape.js) plus reference tables.

const i = (label, text) => ({ label, text })

// ------------------------------------------------------------------ women
export const SHAPE_ADVICE = {
  hourglass: {
    identify: 'Bust and hips are almost equal; waist is at least 20-25 cm (8-10 in) smaller. Curves are evenly distributed top and bottom.',
    goal: 'Follow your natural lines. Highlight the waist and avoid anything boxy that hides your shape.',
    saree: [
      i('Best fabrics', 'Chiffon, georgette, crepe, satin, soft silk, mulmul - anything that drapes and clings gently.'),
      i('Drape', 'Classic Nivi drape with neat, tight pleats; pin the pallu narrow to show the waist. Mermaid/lehenga-style drapes also suit you.'),
      i('Blouse', 'Fitted, waist-length blouses; sweetheart, deep-U, V or boat necks. Elbow or 3/4 sleeves look elegant.'),
      i('Borders & prints', 'Thin-to-medium borders; small or medium motifs. A contrast belt/kamarbandh accentuates the waist beautifully.'),
      i('Skip', 'Very stiff fabrics (heavy organza, thick tissue) that add bulk, and overly broad borders.'),
    ],
    ethnic: [
      'Fitted Anarkalis that flare from the natural waist, A-line kurtas with waist darts.',
      'Lehenga with a fitted choli and a well-fitted (not boxy) kali or A-line skirt.',
      'Straight-cut fitted kurtas with churidar or cigarette pants; belted kurtas and peplum tops with sharara.',
      'Skip shapeless kaftans and very loose straight kurtas unless belted.',
    ],
    office: [
      'Wrap dresses, sheath dresses and belted shirt-dresses.',
      'Tailored blazers that nip in at the waist; tuck shirts into high-waist trousers or pencil skirts.',
      'Indo-western: fitted straight kurta + cigarette pants + a cotton/linen dupatta or a short tailored jacket.',
      'Cotton, linen-blend or handloom sarees (Chanderi, Maheshwari, Kota) with a crisp collared or boat-neck blouse.',
    ],
    casual: [
      'High-rise jeans with tucked-in tees, bodysuits or wrap tops.',
      'Fit-and-flare and wrap dresses, belted maxi dresses.',
      'Short kurtis with jeans, co-ord sets with a defined waist.',
      'Belts are your best accessory - use them on shirts, dresses and long jackets.',
    ],
    avoid: ['Boxy, oversized cuts with no shape', 'Drop-waist silhouettes', 'Very stiff, bulky fabrics', 'Empire waists that skip your natural waist'],
  },
  topHourglass: {
    identify: 'Bust is 5-10 cm (2-4 in) bigger than the hips, and the waist is clearly defined (about 23 cm / 9 in or more smaller than the bust). Shoulders may look a little broad.',
    goal: 'Keep the waist visible, avoid adding bulk to the bust, and add slight volume below the waist for balance.',
    saree: [
      i('Best fabrics', 'Soft chiffon, georgette, crepe and soft silk on top. You can wear medium-weight silks (Banarasi, soft Kanjeevaram) because a little volume at the hips balances you.'),
      i('Drape', "Nivi drape with slightly fuller pleats. Pin the pallu in narrow pleats so the waist shows, and don't spread a heavy pallu across the chest."),
      i('Blouse', 'A well-supported, princess-cut or padded blouse; V-neck, deep U or sweetheart necks; elbow or 3/4 sleeves. Keep embroidery at the neckline edge or back, not over the bust.'),
      i('Borders & prints', 'A medium-to-broad border or a printed pleat section adds weight below; keep the blouse simpler and darker than the pleats.'),
      i('Skip', 'High-neck and boat-neck blouses, puff sleeves, very heavy zardozi on the bust, and loose blouses that hide the waist.'),
    ],
    ethnic: [
      'Anarkalis fitted to the waist with a full flare; angrakha (wrap) kurtas with a V neckline.',
      'Lehenga with a simple, well-fitted choli and a voluminous or embellished skirt.',
      'V-neck or deep-U kurtas with waist darts, worn with sharara, gharara or palazzos.',
      'Drape the dupatta to one side or across the lower body, not bunched over the chest.',
    ],
    office: [
      'Wrap tops and V-neck blouses; single-breasted blazers with one button at the waist.',
      'A-line or flared skirts and wide-leg trousers to balance the bust.',
      'Wrap and fit-and-flare dresses; sheath dresses with a V neckline.',
      'Handloom or crepe sarees with a V-neck or collared blouse that has a deep notch.',
    ],
    casual: [
      'V-neck tees, wrap tops and button-downs in stretch fabric (no gaping).',
      'High-rise bootcut, flared or wide-leg jeans; A-line and pleated skirts.',
      'Fit-and-flare and wrap dresses; belted shirt dresses.',
      'Long pendants that create a vertical line; a good, supportive bra under everything.',
    ],
    avoid: ['High necks, boat necks and turtlenecks', 'Chest pockets, ruffles or heavy embroidery on the bust', 'Puff and cap sleeves', 'Skinny bottoms with a voluminous top'],
  },
  bottomHourglass: {
    identify: 'Hips are 5-10 cm (2-4 in) bigger than the bust, and the waist is clearly defined (about 25 cm / 10 in or more smaller than the hips). Curvy hips and thighs with a slimmer upper body.',
    goal: 'Show off the waist, add a little interest up top, and keep the hipline smooth.',
    saree: [
      i('Best fabrics', 'Chiffon, georgette, crepe, satin and soft silks that fall flat over the hips. Avoid stiff tissue or organza on the pleats.'),
      i('Drape', 'Nivi drape with flat, neatly pressed pleats tucked slightly to the side; spread the pallu a little wider over the shoulder. The mermaid drape works with shapewear.'),
      i('Blouse', 'The place for detail - embroidered, mirror-work or contrast blouses; boat, square or sweetheart necks; puff, cap or elbow sleeves.'),
      i('Borders & prints', 'Thin borders on the pleats; a heavier border or bold print on the pallu. Keep the lower half in darker or solid shades.'),
      i('Petticoat', 'A fishcut or mermaid shapewear petticoat; add a saree belt to show off the waist.'),
    ],
    ethnic: [
      'Anarkalis with a fitted bodice and an A-line flare from the natural waist.',
      'Peplum or belted kurtas with straight pants or soft palazzos.',
      'Lehenga with an embellished, fitted choli and a soft A-line skirt (not a heavy can-can).',
      'Kurtas with a decorated yoke or neckline and plain, darker bottoms.',
    ],
    office: [
      'Waist-length or belted blazers with defined shoulders.',
      'Tucked blouses with high-waist straight or wide-leg trousers in dark colours.',
      'Dark pencil or A-line skirts with lighter or patterned tops.',
      'Fit-and-flare and wrap dresses; collared kurtas with a belt.',
    ],
    casual: [
      'High-rise dark bootcut, straight or wide-leg jeans.',
      'Tucked-in printed, ruffled or off-shoulder tops; cropped and denim jackets.',
      'Wrap dresses, skater dresses and belted maxi dresses.',
      'Statement earrings and necklaces to draw the eye up.',
    ],
    avoid: ['Hip pockets and heavy detail on the hips', 'Light-wash skinny jeans', 'Tops and jackets that end at the widest point of the hips', 'Stiff, flared petticoats and heavy-border pleats'],
  },
  triangle: {
    identify: 'Hips are noticeably wider than the bust and shoulders (5 cm / 2 in or more). Waist is defined; weight tends to settle on hips and thighs.',
    goal: 'Draw the eye up and add volume to the shoulders; keep the lower half smooth and streamlined.',
    saree: [
      i('Best fabrics', 'Soft, flowing chiffon, georgette, crepe or soft silk for the lower half; avoid stiff tissue or heavy Kanjeevaram that puffs out at the hips.'),
      i('Drape', 'Nivi drape with pleats pressed flat and tucked slightly to the side; pin the pallu pleated and wide over the shoulder to broaden the top.'),
      i('Blouse', 'Make it the star - embellished, contrast or embroidered blouses; boat neck, off-shoulder, square neck or puff/cap sleeves to widen the shoulders.'),
      i('Borders & prints', 'A broad, heavy border on the pallu, plain or small motifs on the pleats. Darker colours below, brighter/patterned above.'),
      i('Petticoat', 'Choose a shapewear (fishcut/mermaid) petticoat instead of a flared cotton one for a smoother hipline.'),
    ],
    ethnic: [
      'A-line and flared Anarkalis that skim over the hips.',
      'Kurtas with yoke work, embroidered necklines or detailed shoulders; plain darker bottoms.',
      'Lehengas: embellished choli, A-line or panelled skirt in a softer fabric. Palazzos and straight pants over tight churidars.',
      'Carry dupattas across the shoulders to add width up top.',
    ],
    office: [
      'Structured blazers with defined shoulders; bright or patterned tops with dark tailored trousers.',
      'A-line or straight skirts in dark solids; wide-leg or bootcut trousers to balance hips.',
      'Kurtas with collars or detailed necklines, paired with dark straight pants.',
      'Handloom sarees with a dark, plain body and a statement collar or boat-neck blouse.',
    ],
    casual: [
      'Dark wash bootcut, flared or straight jeans; avoid light-wash skinny jeans.',
      'Off-shoulder, Bardot, ruffled, puff-sleeve or striped (horizontal) tops.',
      'A-line skirts and dresses; denim or cropped jackets that end at the waist.',
      'Statement earrings and necklaces to draw attention upward.',
    ],
    avoid: ['Hip pockets, cargo pants and heavy embellishment around hips', 'Skinny bottoms with short tops', 'Stiff, flared petticoats and heavy-border pleats', 'Tops that end exactly at the widest part of the hips'],
  },
  round: {
    identify: 'Waist is similar to or wider than bust and hips; weight is carried around the tummy and upper body. Legs and arms are often slender.',
    goal: 'Create a vertical line, elongate the torso, and draw focus to the face, neckline and legs.',
    saree: [
      i('Best fabrics', 'Light, fluid chiffon, georgette, crepe, soft cotton and mulmul. Avoid stiff silks and tissue, which add bulk at the middle.'),
      i('Drape', 'Nivi drape with the pallu left open (not pinned tight) and falling to cover the midriff; Bengali/Gujarati drapes with the pallu in front also work well.'),
      i('Blouse', 'V-neck or deep U-neck to elongate; 3/4 sleeves; slightly longer blouse length so less tummy shows. Avoid very high necks.'),
      i('Borders & prints', 'Thin borders and small, vertical or all-over prints. Solid darker shades or monochrome sarees are very slimming.'),
      i('Tip', 'Tie the saree slightly above the navel (at the natural waist) and choose a shapewear petticoat.'),
    ],
    ethnic: [
      'Empire-waist Anarkalis and A-line kurtas that flow from under the bust.',
      'Long straight kurtas with side slits, worn with straight pants or palazzos.',
      'Long jackets or open shrugs over kurtas create a strong vertical line.',
      'Lehengas: a longer choli (or jacket-style top) with a soft A-line skirt; drape the dupatta vertically.',
    ],
    office: [
      'Single-breasted, longline blazers worn open; V-neck blouses and shirts.',
      'Straight or slightly flared trousers; knee-length A-line or straight skirts to show the legs.',
      'Empire or shift dresses; tunic-length kurtas over slim straight pants.',
      'Soft cotton or linen sarees in solid or small prints with V-neck blouses.',
    ],
    casual: [
      'Flowy tunics, peplum tops, wrap tops and V-neck tees in soft fabrics.',
      'Straight-leg or bootcut jeans with a mid-to-high rise; shorts or skirts that show off slim legs.',
      'Long cardigans, shirt jackets and kimonos worn open.',
      'Kaftans and empire-line maxi dresses.',
    ],
    avoid: ['Tight, clingy fabrics at the midsection', 'Belts at the natural waist; crop tops', 'Boxy short jackets and high/turtle necks', 'Heavy embellishment around the tummy'],
  },
  rectangle: {
    identify: 'Bust, waist and hips are within about 5 cm (2 in) of each other; little waist definition. Often an athletic or slim, straight frame.',
    goal: 'Create the illusion of curves: define a waist and add volume at the bust and hips.',
    saree: [
      i('Best fabrics', 'You can carry structure well - Kanjeevaram, Banarasi, organza, tissue, raw silk and stiff cottons add shape. Ruffle sarees are ideal.'),
      i('Drape', 'Nivi drape with fuller, fluffier pleats; try the butterfly/ruffled pallu, or a belted saree to create a waist.'),
      i('Blouse', 'Peplum blouses, corset-style, sweetheart, halter or high-neck blouses with interesting backs; puff and ruffled sleeves add curves.'),
      i('Borders & prints', 'Broad borders, bold prints and contrast colours work very well for you.'),
      i('Tip', 'A kamarbandh or saree belt instantly creates a waistline.'),
    ],
    ethnic: [
      'Anarkalis with lots of flare and kalis; angrakha (wrap) kurtas.',
      'Peplum kurtas with dhoti pants or sharara; layered and tiered kurtas.',
      'Lehengas with heavy flare, can-can and a short, detailed choli.',
      'Belted kurtas and jacket-style ethnic sets.',
    ],
    office: [
      'Belted blazers, peplum tops and wrap blouses.',
      'Pleated trousers, paper-bag waist pants and A-line or pleated skirts.',
      'Fit-and-flare dresses; structured kurtas with a contrast belt.',
      'Crisp handloom or silk-cotton sarees with a collared or puff-sleeve blouse.',
    ],
    casual: [
      'Ruffled, layered, peplum and wrap tops; boyfriend or mom jeans for a relaxed look.',
      'Tiered and skater dresses, belted shirt dresses.',
      'Layering with jackets, waistcoats and shrugs to add dimension.',
      'Bold prints, textures and colour-blocking.',
    ],
    avoid: ['Shapeless straight shifts with no waist', 'Very clingy outfits that emphasise straightness', 'Head-to-toe single-line cuts without layering', 'Drop-waist styles'],
  },
  invertedTriangle: {
    identify: 'Shoulders and/or bust are wider than the hips by 5 cm (2 in) or more. Often a strong upper body with slim hips and legs.',
    goal: 'Soften the shoulders and add volume and interest to the lower half.',
    saree: [
      i('Best fabrics', 'Soft, flowing fabrics on top; you can wear structured silks, organza and tissue - their volume at the hips balances you.'),
      i('Drape', 'Nivi drape with full, voluminous pleats; keep the pallu thin and loosely pleated, or let it fall open.'),
      i('Blouse', 'Simple, plain blouses; V-neck, deep U or halter necks to break shoulder width. Sleeveless or long, fitted sleeves - avoid puffs and cap sleeves.'),
      i('Borders & prints', 'Broad borders and bold prints on the pleats; keep the blouse and pallu area quieter.'),
      i('Skip', 'Boat necks, off-shoulder, heavy shoulder embroidery and padded blouses.'),
    ],
    ethnic: [
      'Flared Anarkalis, A-line kurtas, and kurtas with heavy hem detail.',
      'Sharara, gharara, palazzos, and dhoti or patiala pants for lower-body volume.',
      'Lehengas with heavy, flared skirts and a simple, plain choli.',
      'V-neck or deep U-neck kurtas; drape the dupatta to one side, not across both shoulders.',
    ],
    office: [
      'Single-breasted blazers without shoulder pads; V-neck blouses and wrap tops.',
      'Wide-leg, palazzo or pleated trousers; A-line, flared and pleated skirts.',
      'Fit-and-flare dresses; A-line kurtas with palazzos.',
      'Sarees with plain, V-neck blouses and patterned or bordered pleats.',
    ],
    casual: [
      'Wide-leg, flared or light-wash jeans; patterned skirts and printed palazzos.',
      'V-neck tees, scoop necks and raglan sleeves in darker solids on top.',
      'Skater and A-line dresses; maxi skirts with simple tops.',
      'Long pendants and scarves hanging vertically.',
    ],
    avoid: ['Shoulder pads, puff sleeves and epaulettes', 'Boat necks and off-shoulder tops', 'Heavy embellishment on the shoulders', 'Skinny bottoms with voluminous tops'],
  },

  // ------------------------------------------------------------------ men
  menRectangle: {
    identify: 'Shoulders are roughly in line with the waist and hips; a straight, often lean frame.',
    goal: 'Build shape: add width at the shoulders and a slight taper at the waist.',
    ethnic: [
      'Kurta-pajama with structured shoulders; layer a Nehru/Modi jacket to add dimension.',
      'Bandhgala and Jodhpuri suits with defined shoulders and a slightly tapered waist.',
      'Sherwanis with textured fabric, chest embroidery and a contour cut; pair with churidar.',
      'Dhoti / veshti / mundu: crisp silk-cotton with a gold or contrast border, worn with a well-fitted kurta or angavastram over one shoulder.',
      'Prints, brocades, layering with a stole/dupatta all work well.',
    ],
    office: [
      'Structured blazers with light shoulder padding; slim or tailored fits.',
      'Layer: shirt + V-neck sweater or waistcoat; textured fabrics (tweed, herringbone).',
      'Horizontal patterns and checks on shirts add width.',
      'Slim or tapered chinos and trousers.',
    ],
    casual: [
      'Layering: denim/bomber jackets, overshirts, cardigans.',
      'Crew-neck tees with chest graphics or horizontal stripes; Henleys.',
      'Slim-fit or straight jeans; cargo pants and shorts.',
      'Polo shirts and textured knits.',
    ],
    avoid: ['Very baggy, oversized clothes that hide shape', 'Overly skinny, clingy fits on a very slim frame', 'Vertical pinstripes everywhere (can lengthen a thin frame further)'],
  },
  menTriangle: {
    identify: 'Shoulders are narrower than the hips; weight tends to collect in the waist, hips and thighs.',
    goal: 'Broaden the shoulders and chest, keep the lower half clean and dark.',
    ethnic: [
      'Kurtas with detailed collars, yokes or shoulder embroidery; dark, straight pajamas or churidars.',
      'Nehru jackets and bandhgalas with structured shoulders; avoid hip-length cuts that end at the widest point.',
      'Sherwani with heavy upper-body work and a slightly longer length; straight-cut pants rather than tight churidar.',
      'Dhoti / veshti: plain, darker or cream body with minimal border; put the interest in the kurta or angavastram on the shoulder.',
    ],
    office: [
      'Blazers with structured, slightly padded shoulders and peak lapels.',
      'Light-coloured or patterned shirts with dark trousers.',
      'Straight or slightly relaxed trousers in dark solids; avoid pleats at the front.',
      'Crew-neck sweaters and layering above the waist.',
    ],
    casual: [
      'Horizontal-stripe tees, chest pockets, epaulette shirts, layered jackets.',
      'Dark-wash straight or relaxed-fit jeans; avoid skinny jeans and side pockets.',
      'Bomber and denim jackets ending at the waist.',
      'Bold coloured tops, neutral bottoms.',
    ],
    avoid: ['Skinny or tapered bottoms', 'Cargo pockets on the thighs', 'Tight tops that cling at the waist', 'Light, patterned trousers'],
  },
  menInvertedTriangle: {
    identify: 'Shoulders and chest are noticeably wider than the waist - the classic athletic V-shape.',
    goal: 'Keep the upper body proportionate and add a little weight to the lower half.',
    ethnic: [
      'Most kurtas, bandhgalas and sherwanis suit you; choose straight, well-fitted cuts.',
      'Avoid heavy shoulder embellishment; keep detail on the placket or hem.',
      'Pair kurtas with dhoti pants, Patiala salwar or straight pajama for lower-body volume.',
      'Dhoti / veshti / mundu suits you very well; a wider, contrast border adds balance at the bottom.',
    ],
    office: [
      'Unpadded or soft-shoulder blazers; V-neck sweaters and shirts with open collars.',
      'Straight or relaxed-fit trousers rather than very skinny ones; pleated trousers can add balance.',
      'Darker shirts with lighter trousers to balance the frame.',
      'Single-breasted suits with natural shoulders.',
    ],
    casual: [
      'V-neck and Henley tees; plain tops with lighter or patterned bottoms.',
      'Straight, relaxed or cargo trousers; chinos in lighter colours.',
      'Avoid extremely tight muscle tees and skinny jeans that exaggerate the V.',
      'Bermuda shorts and textured bottoms.',
    ],
    avoid: ['Shoulder pads and heavy epaulettes', 'Very tight tees with skinny jeans', 'Horizontal chest stripes', 'Boat-neck or wide-neck tops'],
  },
  oval: {
    identify: 'The waist/stomach is the widest part of the body; shoulders and hips are narrower than the middle.',
    goal: 'Create vertical lines, a clean drape over the stomach, and keep focus near the face.',
    ethnic: [
      'Long, straight kurtas (knee-length or longer) in solid or vertical-stripe fabric; side slits for ease.',
      'Open Nehru jacket over the kurta for a strong vertical line; avoid buttoning tight.',
      'Sherwanis and achkans in long, straight cuts with structured shoulders; darker, monochrome colours.',
      'Dhoti / veshti / mundu with a straight, well-fitting kurta that falls past the waist; tie the dhoti at the natural waist, not under the stomach.',
    ],
    office: [
      'Single-breasted, two-button blazers worn open or with one button; darker colours.',
      'Vertical pinstripes; monochrome shirt-and-trouser combinations.',
      'Mid-rise, flat-front trousers worn at the natural waist with suspenders or a matching belt.',
      'V-neck sweaters and open-collar shirts; untucked shirts with a straight hem for casual Fridays.',
    ],
    casual: [
      'Dark, plain, well-fitted tees (not tight, not oversized); V-necks.',
      'Open overshirts, unstructured jackets and long cardigans.',
      'Straight or relaxed-fit dark jeans; avoid low-rise.',
      'Shirts with a straight hem worn untucked.',
    ],
    avoid: ['Tight or clingy tops and slim-fit shirts', 'Horizontal stripes and big prints at the middle', 'Double-breasted jackets', 'Low-rise pants and wide belts'],
  },
  trapezoid: {
    identify: 'Shoulders and chest are a little wider than the waist and hips - a well-proportioned frame that suits most cuts.',
    goal: 'Maintain the balance; focus on fit and quality.',
    ethnic: [
      'Practically everything works: fitted kurtas, bandhgalas, Jodhpuris, sherwanis and Indo-western jackets.',
      'Try bold prints, brocades and contemporary cuts like asymmetric kurtas or draped sherwanis.',
      'Dhoti / veshti / mundu with a fitted kurta or simple shirt; angavastram on one shoulder for festivals.',
      'Ensure correct length: kurtas just above or at the knee, sherwanis below the knee.',
    ],
    office: [
      'Tailored or slim-fit suits; both single- and double-breasted work.',
      'Fitted shirts tucked into tapered trousers.',
      'Experiment with textures and pattern-on-pattern combinations.',
      'Chinos and blazers for smart-casual days.',
    ],
    casual: [
      'Fitted tees, polos, Henleys and denim jackets.',
      'Slim or straight jeans and chinos.',
      'Bombers, leather jackets and layered looks.',
      'Bold colours and prints - you have the freedom to experiment.',
    ],
    avoid: ['Poor fit - the only real risk for you', 'Extremely baggy clothing that hides the frame', 'Ill-proportioned lengths (kurtas too short/long)'],
  },
}

// ------------------------------------------------------------------ reference
export const MEASURE_GUIDE = {
  women: [
    i('Shoulders', 'Around the widest point of the shoulders.'),
    i('Bust', 'Around the fullest part of the chest.'),
    i('Waist', 'The narrowest part of the torso, usually just above the navel.'),
    i('Hips', 'Around the fullest part of the hips and seat.'),
  ],
  men: [
    i('Shoulders', 'Around the widest point of the shoulders.'),
    i('Chest', 'Under the arms, across the fullest part.'),
    i('Waist / stomach', 'At the navel - the widest point of the midsection.'),
    i('Hips', 'Around the fullest part of the seat.'),
  ],
}

export const SHAPE_PATTERNS = {
  women: [
    ['Hourglass', 'Bust ≈ Hips; Waist 20-25 cm (8-10 in) smaller', 'Clear, curvy waist; balanced top & bottom'],
    ['Top Hourglass', 'Bust > Hips by 5-10 cm (2-4 in); waist well defined', 'Curvy, fuller bust, slightly narrower hips'],
    ['Bottom Hourglass', 'Hips > Bust by 5-10 cm (2-4 in); waist well defined', 'Curvy, fuller hips, slightly smaller bust'],
    ['Pear', 'Hips > Bust by 5 cm (2 in) or more; waist not sharply defined', 'Narrow shoulders, fuller hips & thighs'],
    ['Apple', 'Waist ≥ Bust and Hips', 'Fuller middle, slimmer legs'],
    ['Rectangle', 'Bust, Waist, Hips within ~5 cm (2 in)', 'Straight up-and-down frame'],
    ['Inverted Triangle', 'Shoulders / Bust > Hips by 5 cm (2 in) or more', 'Broad shoulders, slim hips'],
  ],
  men: [
    ['Rectangle', 'Shoulders ≈ Waist ≈ Hips', 'Lean, straight frame'],
    ['Triangle', 'Hips / Waist > Shoulders', 'Narrow shoulders, wider lower body'],
    ['Inverted Triangle', 'Shoulders & Chest much > Waist', 'Athletic V-shape'],
    ['Oval', 'Waist / Stomach > Chest and Hips', 'Fuller midsection'],
    ['Trapezoid', 'Shoulders slightly > Waist', 'Balanced, mildly tapered'],
  ],
}

export const PRINCIPLES = [
  i('Fit beats everything', 'A well-tailored inexpensive outfit looks better than an ill-fitting designer one. Budget for a good tailor - especially for blouses, kurtas, trousers and blazers.'),
  i('Dark recedes, light advances', 'Use darker shades where you want less attention and lighter, brighter shades or prints where you want to draw the eye.'),
  i('Vertical lines lengthen', 'Long jackets, open shrugs, vertical stripes, a pallu falling straight, a long dupatta, or a long kurta all create height and slim the frame.'),
  i('Horizontal lines widen', 'Boat necks, horizontal stripes, broad borders and belts add width - use them where you want more volume.'),
  i('Fabric matters', 'Soft, fluid fabrics (chiffon, georgette, crepe, mulmul) skim the body. Stiff fabrics (organza, tissue, Kanjeevaram, raw silk, brocade) add structure and volume.'),
  i('Print scale follows body scale', 'Petite frames suit small to medium prints; taller or broader frames can carry large motifs and bold borders.'),
  i('Necklines frame the face', 'V and U necks elongate; boat and square necks broaden; high necks shorten the neck but look regal on long necks.'),
  i('Accessories direct the eye', 'Statement earrings or a neckpiece pull attention up; a waist belt or kamarbandh defines the middle; a pocket square or brooch adds interest to the chest.'),
]

export const SKIN_TONES = [
  i('Warm undertones (golden / olive)', 'Mustard, rust, maroon, emerald, coral, gold zari, ivory.'),
  i('Cool undertones (pink / bluish)', 'Royal blue, magenta, wine, teal, silver zari, pure white.'),
  i('Neutral', 'Most colours - try dusty pink, jade, peach, navy.'),
]
export const SKIN_TONE_TIP = 'Check your undertone by looking at your wrist veins in daylight: greenish = warm, bluish = cool, mixed = neutral.'

export const SAREE_FABRICS = [
  ['Chiffon / Georgette', 'Light, clingy, fluid', 'Pear, Apple, Hourglass; slimming for fuller figures', 'Parties, office, daily'],
  ['Crepe / Satin', 'Smooth drape, slight sheen', 'Hourglass, Apple, Pear', 'Evening, office'],
  ['Cotton / Handloom', 'Crisp, slight volume', 'Rectangle, Inverted Triangle, slim frames', 'Office, daily, summer'],
  ['Mulmul / Soft cotton', 'Very soft, minimal bulk', 'Apple, Pear, plus-size', 'Daily, casual, summer'],
  ['Chanderi / Maheshwari', 'Light, slightly structured', 'All shapes', 'Office, day functions'],
  ['Kanjeevaram / Banarasi', 'Heavy, structured, adds volume', 'Rectangle, Inverted Triangle, tall women', 'Weddings, festivals'],
  ['Organza / Tissue', 'Stiff, sheer, adds volume', 'Rectangle, slim and tall frames', 'Cocktails, receptions'],
  ['Linen', 'Structured, breathable', 'Rectangle, Hourglass, Inverted Triangle', 'Office, day events'],
]

export const SAREE_DRAPES = [
  ['Nivi (classic)', 'Pleats in front, pallu over left shoulder', 'All shapes - adjust pleat volume and pallu width'],
  ['Open pallu', 'Pallu left free-flowing, not pinned in pleats', 'Apple, Inverted Triangle'],
  ['Gujarati / Seedha pallu', 'Pallu brought over right shoulder to the front', 'Apple, Pear (covers midriff, highlights top)'],
  ['Bengali (Aatpoure)', 'Box pleats, pallu over both shoulders', 'Rectangle, Pear'],
  ['Mermaid / Lehenga style', 'Fitted at hips, flares at the bottom', 'Hourglass, Rectangle'],
  ['Butterfly', 'Thin pleated pallu, waist visible', 'Hourglass, slim Rectangle'],
  ['Belted / Pant saree', 'Saree cinched with a belt, or draped over pants', 'Rectangle, Hourglass; modern office looks'],
  ['Maharashtrian (Nauvari)', 'Dhoti-style, 9-yard drape', 'Inverted Triangle, Rectangle, tall women'],
]

export const PETTICOAT_NOTE =
  'A shapewear (fishcut / mermaid) petticoat gives a sleek line for Pear, Apple and plus-size figures. A flared cotton petticoat adds volume - good for Rectangle and Inverted Triangle. Always match the petticoat to the saree colour.'

export const NECKLINES = [
  ['V-neck / Deep U', 'Elongates neck and torso; narrows shoulders', 'Apple, Inverted Triangle, short neck, full bust'],
  ['Boat neck', 'Widens shoulders', 'Pear, Rectangle, narrow shoulders'],
  ['Sweetheart', 'Adds curves, feminine', 'Hourglass, Rectangle, small bust'],
  ['High neck / Collar', 'Regal, covers; shortens neck', 'Long necks, small bust, Rectangle; great for office'],
  ['Halter', 'Draws eyes in; shows shoulders', 'Inverted Triangle, Rectangle'],
  ['Off-shoulder', 'Broadens shoulders', 'Pear, Hourglass'],
  ['Square neck', 'Balances round faces; adds structure', 'Pear, Hourglass, round face'],
  ['Puff / Cap sleeves', 'Adds volume at shoulders', 'Pear, Rectangle (avoid for Inverted Triangle)'],
  ['Elbow / 3/4 sleeves', 'Slims upper arms; elegant', 'Apple, plus-size, all shapes'],
  ['Peplum blouse', 'Creates a waist and hip curve', 'Rectangle, Inverted Triangle'],
]

export const SIZE_NOTES = [
  {
    title: 'Petite (under 5\'2")',
    tips: ['Sarees in light fabrics, thin borders and small prints.', 'Tie the saree a little higher and wear heels.', 'Monochrome outfits and vertical lines add height.', 'Short or ankle-length kurtis; avoid calf-length cuts.', 'Cropped jackets and high-waist bottoms.'],
  },
  {
    title: 'Tall (above 5\'7")',
    tips: ['Broad borders, bold prints and heavy silks look stunning.', 'Floor-length Anarkalis, long jackets and layered looks.', 'Colour-blocking and contrast belts break the length.', 'Palazzos, culottes and wide-leg pants.', 'Flats and juttis work beautifully.'],
  },
  {
    title: 'Plus-size',
    tips: ['Fluid fabrics; avoid both very tight and tent-like fits.', 'Darker or jewel tones, medium-size prints.', 'V-necks, 3/4 sleeves and longer blouses.', 'Long, straight or A-line kurtas with slits.', 'Shapewear petticoat and well-fitted innerwear.'],
  },
]

export const MEN_ETHNIC = [
  ['Short kurta', 'Hip to mid-thigh; shoulder seam on the shoulder bone', 'Rectangle, Inverted Triangle, Trapezoid; casual/office'],
  ['Long kurta', 'Knee length or just below; straight with side slits', 'Oval, Triangle, shorter men want knee length'],
  ['Nehru / Modi jacket', 'Ends at hip; sits close to the body, not tight', 'All shapes (worn open for Oval)'],
  ['Bandhgala / Jodhpuri', 'Fitted, closed collar; structured shoulders', 'Rectangle, Trapezoid, Inverted Triangle'],
  ['Sherwani', 'Below the knee; tailored through the chest', 'All shapes; long straight cut for Oval'],
  ['Pathani suit', 'Relaxed fit, collar, full sleeves, salwar', 'Inverted Triangle, Trapezoid, tall men'],
  ['Dhoti / Veshti / Mundu', 'Tied at the natural waist; ankle length; crisp pleats', 'All shapes; contrast border balances Inverted Triangle'],
  ['Churidar', 'Fitted leg with gathers at ankle', 'Rectangle, Inverted Triangle, slim legs'],
  ['Straight pajama / Pants', 'Straight leg; clean drape', 'Triangle, Oval, heavier thighs'],
  ['Dhoti pants / Patiala', 'Volume at hips, tapered at ankle', 'Inverted Triangle, Rectangle'],
]

export const FIT_CHECKLIST = [
  'Shoulder seam sits at your shoulder edge.',
  'Sleeves end at the wrist bone (kurta) or show 1-1.5 cm of shirt cuff (blazer).',
  'Buttons do not pull or gape when seated.',
  'Trousers have a slight or no break at the shoe.',
  'Collar fits with two fingers of room.',
]

export const FOOTWEAR = [
  i('Ethnic', 'Mojaris, juttis, kolhapuris; brooch or pocket square on jackets; stole for weddings.'),
  i('Office', 'Oxfords, derbies, loafers; belt matching shoes.'),
  i('Casual', 'Sneakers, loafers, chelsea boots, sandals.'),
  i('Always', 'A good watch suits every shape and occasion.'),
]

export const CHEAT_SHEET = {
  women: {
    columns: ['Saree', 'Ethnic', 'Office', 'Casual'],
    rows: [
      ['Hourglass', 'Soft chiffon/georgette; tight pleats; fitted blouse; belt', 'Fitted Anarkali, belted kurta', 'Wrap dress, belted blazer', 'High-rise jeans + tucked tee'],
      ['Top Hourglass', 'Fuller pleats, narrow pinned pallu; V/sweetheart supported blouse', 'Flared Anarkali, angrakha, sharara', 'Wrap top + A-line skirt', 'V-neck tee + bootcut jeans'],
      ['Bottom Hourglass', 'Flat pleats, wider pallu; embroidered boat/square-neck blouse; belt', 'Fitted-bodice Anarkali, peplum kurta', 'Belted blazer + dark trousers', 'Tucked top + dark high-rise jeans'],
      ['Pear', 'Plain flat pleats, wide pallu; statement blouse; shapewear petticoat', 'A-line Anarkali, detailed yoke', 'Structured blazer + dark trousers', 'Off-shoulder top + dark bootcut'],
      ['Apple', 'Light fabric, open pallu, V-neck; longer blouse', 'Empire Anarkali, long kurta + jacket', 'Long open blazer, V-neck', 'Flowy tunic + straight jeans'],
      ['Rectangle', 'Kanjeevaram/organza, fluffy pleats, peplum blouse, belt', 'Flared Anarkali, peplum + sharara', 'Peplum top, pleated pants', 'Ruffles, layers, tiered dress'],
      ['Inverted Triangle', 'Plain V-neck blouse, thin pallu, heavy-border pleats', 'Flared kurta + sharara/palazzo', 'Unpadded blazer + wide-leg pants', 'V-neck tee + flared jeans'],
    ],
  },
  men: {
    columns: ['Ethnic', 'Office', 'Casual'],
    rows: [
      ['Rectangle', 'Layered kurta + Nehru jacket; textured sherwani', 'Padded blazer, layered knits', 'Jackets, stripes, Henleys'],
      ['Triangle', 'Detailed-collar kurta, dark straight pajama', 'Structured shoulders, dark trousers', 'Chest detail, dark straight jeans'],
      ['Inverted Triangle', 'Straight kurta + dhoti pants; contrast-border veshti', 'Soft-shoulder blazer, relaxed trousers', 'V-neck tee, light chinos'],
      ['Oval', 'Long straight kurta, open Nehru jacket', 'Open single-breasted blazer, pinstripes', 'Dark tees, open overshirts'],
      ['Trapezoid', 'Almost anything - focus on fit', 'Tailored suits, any style', 'Fitted basics, bold prints'],
    ],
  },
}
