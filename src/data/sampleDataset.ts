import { SampleDatasetItem } from '../types';

/**
 * Helper to generate realistic crop leaf SVG data URLs
 */
function createLeafSVG(
  crop: 'Rice' | 'Corn',
  disease: string,
  bgColor: string,
  leafColor: string,
  spotColor: string,
  spotsType: 'rust' | 'blight' | 'blast' | 'spots' | 'streaks' | 'sheath-blight' | 'healthy'
): string {
  const isRice = crop === 'Rice';
  const width = 400;
  const height = 400;

  let spotsSVG = '';

  if (spotsType === 'rust') {
    // Cinnamon/rust colored pustules scattered along leaf
    spotsSVG = `
      <g fill="${spotColor}" opacity="0.9">
        <ellipse cx="200" cy="120" rx="6" ry="14" transform="rotate(-10 200 120)"/>
        <ellipse cx="215" cy="160" rx="8" ry="18" transform="rotate(5 215 160)"/>
        <ellipse cx="185" cy="210" rx="7" ry="15" transform="rotate(-15 185 210)"/>
        <ellipse cx="205" cy="260" rx="9" ry="20" transform="rotate(8 205 260)"/>
        <ellipse cx="190" cy="310" rx="6" ry="12" transform="rotate(-5 190 310)"/>
        <ellipse cx="220" cy="230" rx="5" ry="12" transform="rotate(12 220 230)"/>
        <ellipse cx="175" cy="170" rx="8" ry="16" transform="rotate(-8 175 170)"/>
      </g>
      <g fill="#9a3412" opacity="0.7">
        <circle cx="200" cy="120" r="3"/>
        <circle cx="215" cy="160" r="4"/>
        <circle cx="185" cy="210" r="3.5"/>
        <circle cx="205" cy="260" r="4.5"/>
      </g>
    `;
  } else if (spotsType === 'blast') {
    // Spindle-shaped/diamond lesions with gray centers and dark reddish margins
    spotsSVG = `
      <g fill="${spotColor}" stroke="#7f1d1d" stroke-width="2.5">
        <polygon points="200,100 212,125 200,150 188,125"/>
        <polygon points="185,180 202,210 185,240 168,210"/>
        <polygon points="210,250 225,280 210,310 195,280"/>
        <polygon points="190,320 200,340 190,360 180,340"/>
      </g>
      <g fill="#e5e7eb" opacity="0.85">
        <polygon points="200,112 206,125 200,138 194,125"/>
        <polygon points="185,195 194,210 185,225 176,210"/>
        <polygon points="210,265 217,280 210,295 203,280"/>
      </g>
    `;
  } else if (spotsType === 'blight') {
    // Wavey translucent yellowish-white streaks along leaf margins
    spotsSVG = `
      <path d="M 215,60 Q 235,150 220,250 T 210,360 L 228,350 Q 248,240 230,140 Z" fill="${spotColor}" opacity="0.85"/>
      <path d="M 185,120 Q 165,200 175,290 L 165,285 Q 155,200 175,115 Z" fill="#fde047" opacity="0.8"/>
    `;
  } else if (spotsType === 'sheath-blight') {
    // Snake-skin / cloud-like irregular oval lesions with grayish-white centers and reddish brown borders
    spotsSVG = `
      <g stroke="#78350f" stroke-width="2.5" fill="#e5e7eb" opacity="0.9">
        <path d="M 185,150 Q 210,140 220,165 Q 215,195 185,190 Q 170,170 185,150 Z" />
        <path d="M 175,230 Q 205,215 225,245 Q 210,280 180,270 Q 165,250 175,230 Z" />
        <path d="M 190,300 Q 215,290 220,320 Q 200,345 185,335 Q 175,315 190,300 Z" />
      </g>
    `;
  } else if (spotsType === 'streaks') {
    // Rectangular, narrow grayish-brown lesions confined between leaf veins (Gray Leaf Spot)
    spotsSVG = `
      <g fill="${spotColor}" stroke="#451a03" stroke-width="1" opacity="0.9">
        <rect x="190" y="100" width="12" height="40" rx="2"/>
        <rect x="210" y="160" width="14" height="55" rx="2"/>
        <rect x="175" y="210" width="10" height="35" rx="2"/>
        <rect x="198" y="260" width="16" height="60" rx="2"/>
        <rect x="180" y="310" width="11" height="30" rx="2"/>
      </g>
    `;
  } else if (spotsType === 'spots') {
    // Round dark brown spots with yellow halos (Brown Spot)
    spotsSVG = `
      <g fill="#fef08a" opacity="0.8">
        <circle cx="200" cy="110" r="14"/>
        <circle cx="218" cy="180" r="16"/>
        <circle cx="180" cy="220" r="12"/>
        <circle cx="205" cy="280" r="18"/>
        <circle cx="190" cy="340" r="10"/>
      </g>
      <g fill="${spotColor}">
        <circle cx="200" cy="110" r="7"/>
        <circle cx="218" cy="180" r="8"/>
        <circle cx="180" cy="220" r="6"/>
        <circle cx="205" cy="280" r="9"/>
        <circle cx="190" cy="340" r="5"/>
      </g>
    `;
  }

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      <rect width="${width}" stroke="none" height="${height}" fill="${bgColor}"/>
      
      <!-- Leaf Shadow -->
      <path d="${
        isRice
          ? 'M 200,30 Q 240,180 215,370 L 185,370 Q 160,180 200,30 Z'
          : 'M 200,20 Q 270,160 225,380 L 175,380 Q 130,160 200,20 Z'
      }" fill="#000000" opacity="0.15" transform="translate(6, 6)"/>

      <!-- Base Leaf Shape -->
      <path d="${
        isRice
          ? 'M 200,30 Q 240,180 215,370 L 185,370 Q 160,180 200,30 Z'
          : 'M 200,20 Q 270,160 225,380 L 175,380 Q 130,160 200,20 Z'
      }" fill="${leafColor}" stroke="#15803d" stroke-width="2"/>

      <!-- Central Midrib Vein -->
      <path d="${
        isRice
          ? 'M 200,30 Q 202,180 200,370'
          : 'M 200,20 Q 203,180 200,380'
      }" fill="none" stroke="#86efac" stroke-width="${isRice ? 3 : 5}" opacity="0.85"/>

      <!-- Parallel Secondary Veins -->
      <path d="M 190,100 L 175,370 M 210,100 L 225,370" fill="none" stroke="#4ade80" stroke-width="1.5" opacity="0.5"/>
      <path d="M 180,150 L 168,370 M 220,150 L 232,370" fill="none" stroke="#22c55e" stroke-width="1" opacity="0.4"/>

      <!-- Disease Spots Overlay -->
      ${spotsSVG}

      <!-- Grid Frame Overlay for Smartphone Viewfinder feel -->
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="8 8" opacity="0.25"/>
    </svg>
  `;

  const base64 =
    typeof Buffer !== 'undefined'
      ? Buffer.from(svgString.trim()).toString('base64')
      : typeof btoa !== 'undefined'
      ? btoa(svgString.trim())
      : '';

  return `data:image/svg+xml;base64,${base64}`;
}

export const SAMPLE_DATASET: SampleDatasetItem[] = [
  {
    id: 'rice-blast-01',
    crop: 'Rice',
    diseaseName: 'Rice Blast (Magnaporthe oryzae)',
    scientificName: 'Pyricularia oryzae',
    category: 'Fungal',
    severity: 'Severe',
    description: 'Diamond-shaped necrotic lesions with gray ash centers and brown margins on rice leaf blades.',
    keySymptoms: ['Diamond or spindle-shaped leaf spots', 'Gray ash-colored centers', 'Dark reddish-brown borders', 'Leaf blade wilting'],
    sampleImageUrl: createLeafSVG('Rice', 'Rice Blast', '#0f172a', '#22c55e', '#b91c1c', 'blast'),
  },
  {
    id: 'rice-bacterial-blight-01',
    crop: 'Rice',
    diseaseName: 'Bacterial Leaf Blight',
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    category: 'Bacterial',
    severity: 'Moderate',
    description: 'Water-soaked translucent yellow streaks along leaf margins that rapidly turn brown and dry.',
    keySymptoms: ['Yellow to white wavy stripes along margins', 'Milky bacterial ooze drops in early morning', 'Drying up of leaf tip'],
    sampleImageUrl: createLeafSVG('Rice', 'Bacterial Blight', '#0f172a', '#16a34a', '#eab308', 'blight'),
  },
  {
    id: 'rice-sheath-blight-01',
    crop: 'Rice',
    diseaseName: 'Rice Sheath Blight',
    scientificName: 'Rhizoctonia solani',
    category: 'Fungal',
    severity: 'Severe',
    description: 'Oval to irregular snake-skin or cloud-like greenish-gray to white lesions with brown borders starting on lower leaf sheaths.',
    keySymptoms: [
      'Irregular oval snake-skin or cloud-like spots',
      'Greenish-gray or bleached white centers with dark brown borders',
      'Starts on lower leaf sheaths near water line and spreads upward',
      'Lesions enlarge and merge causing sheath rot and lodging',
    ],
    sampleImageUrl: createLeafSVG('Rice', 'Rice Sheath Blight', '#0f172a', '#16a34a', '#78350f', 'sheath-blight'),
  },
  {
    id: 'rice-brown-spot-01',
    crop: 'Rice',
    diseaseName: 'Rice Brown Spot',
    scientificName: 'Bipolaris oryzae',
    category: 'Fungal',
    severity: 'Moderate',
    description: 'Oval or circular brown lesions with distinct yellow halos, heavily impacting poor soil crops.',
    keySymptoms: ['Circular to oval dark brown spots', 'Yellow halo surrounding lesions', 'Reduced grain filling'],
    sampleImageUrl: createLeafSVG('Rice', 'Brown Spot', '#0f172a', '#15803d', '#78350f', 'spots'),
  },
  {
    id: 'rice-healthy-01',
    crop: 'Rice',
    diseaseName: 'Healthy Rice Leaf',
    scientificName: 'Oryza sativa',
    category: 'Healthy',
    severity: 'Healthy',
    description: 'Vibrant emerald green rice leaf blade without lesions, spots, or nutrient chlorosis.',
    keySymptoms: ['Uniform green coloration', 'Intact midrib structure', 'No fungal pustules or wilting'],
    sampleImageUrl: createLeafSVG('Rice', 'Healthy Rice', '#0f172a', '#16a34a', '#16a34a', 'healthy'),
  },
  {
    id: 'corn-rust-01',
    crop: 'Corn',
    diseaseName: 'Corn Common Rust',
    scientificName: 'Puccinia sorghi',
    category: 'Fungal',
    severity: 'Severe',
    description: 'Golden-brown to cinnamon red powdery pustules erupting on both upper and lower leaf surfaces.',
    keySymptoms: ['Cinnamon-brown oval pustules', 'Powdery urediniospores on touch', 'Early leaf senescence in warm humid weather'],
    sampleImageUrl: createLeafSVG('Corn', 'Common Rust', '#022c22', '#15803d', '#ea580c', 'rust'),
  },
  {
    id: 'corn-gray-spot-01',
    crop: 'Corn',
    diseaseName: 'Corn Gray Leaf Spot',
    scientificName: 'Cercospora zeae-maydis',
    category: 'Fungal',
    severity: 'Severe',
    description: 'Rectangular, tan-to-gray lesions strictly bounded by leaf veins causing premature leaf death.',
    keySymptoms: ['Rectangular vein-limited lesions', 'Tan to grayish brown coloration', 'Blighted canopy'],
    sampleImageUrl: createLeafSVG('Corn', 'Gray Leaf Spot', '#022c22', '#16a34a', '#78350f', 'streaks'),
  },
  {
    id: 'corn-northern-blight-01',
    crop: 'Corn',
    diseaseName: 'Northern Corn Leaf Blight',
    scientificName: 'Exserohilum turcicum',
    category: 'Fungal',
    severity: 'Moderate',
    description: 'Long elliptical cigar-shaped grayish-green to tan lesions on corn leaf blades.',
    keySymptoms: ['Cigar-shaped long lesions (1-6 inches)', 'Dark dark spore production inside lesions', 'Loss of photosynthetic leaf area'],
    sampleImageUrl: createLeafSVG('Corn', 'Northern Blight', '#022c22', '#15803d', '#a16207', 'blast'),
  },
  {
    id: 'corn-healthy-01',
    crop: 'Corn',
    diseaseName: 'Healthy Corn Leaf',
    scientificName: 'Zea mays',
    category: 'Healthy',
    severity: 'Healthy',
    description: 'Vigorous dark green corn leaf blade with clean leaf margins and prominent central white midrib.',
    keySymptoms: ['Deep green canopy', 'Clean leaf margins', 'Robust photosynthesizing tissue'],
    sampleImageUrl: createLeafSVG('Corn', 'Healthy Corn', '#022c22', '#16a34a', '#16a34a', 'healthy'),
  },
];
