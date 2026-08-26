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
  spotsType: 'rust' | 'blight' | 'blast' | 'spots' | 'streaks' | 'sheath-blight' | 'healthy' | 'streak-virus' | 'downy-mildew'
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
    // Elongated banded streaks / snake-skin irregular vertical lesions with grayish-white centers and dark reddish-brown borders
    spotsSVG = `
      <g stroke="#78350f" stroke-width="2" fill="#e2e8f0" opacity="0.95">
        <!-- Elongated vertical sheath streak 1 -->
        <path d="M 182,120 Q 212,110 218,145 Q 224,190 205,210 Q 180,200 178,160 Z" />
        <!-- Elongated vertical sheath streak 2 (large banded patch) -->
        <path d="M 172,215 Q 218,195 226,240 Q 220,290 195,305 Q 170,285 170,250 Z" />
        <!-- Lower sheath vertical banded streak -->
        <path d="M 180,300 Q 216,290 222,330 Q 206,365 186,355 Q 172,335 180,300 Z" />
      </g>
      <!-- Bleached straw-white inner streak center -->
      <g fill="#f8fafc" opacity="0.75">
        <path d="M 188,135 Q 206,130 210,152 Q 212,180 198,192 Q 185,185 186,160 Z" />
        <path d="M 180,230 Q 210,215 215,248 Q 210,278 190,288 Q 178,272 178,252 Z" />
      </g>
      <!-- Dark necrotic wavy streak borders -->
      <path d="M 182,120 Q 212,110 218,145 M 224,190 Q 205,210 178,160" stroke="#451a03" stroke-width="3" fill="none" opacity="0.8"/>
      <path d="M 172,215 Q 218,195 226,240 M 220,290 Q 195,305 170,250" stroke="#451a03" stroke-width="3.5" fill="none" opacity="0.85"/>
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
    // Discrete circular dark brown spots with prominent yellow chlorotic halos (Rice Brown Spot)
    spotsSVG = `
      <!-- Bright yellow circular halos for individual spots -->
      <g fill="#fef08a" opacity="0.9">
        <circle cx="195" cy="95" r="9"/>
        <circle cx="212" cy="140" r="11"/>
        <circle cx="182" cy="180" r="10"/>
        <circle cx="218" cy="225" r="12"/>
        <circle cx="185" cy="265" r="9"/>
        <circle cx="208" cy="305" r="11"/>
        <circle cx="192" cy="345" r="8"/>
        <circle cx="178" cy="135" r="7"/>
        <circle cx="215" cy="185" r="8"/>
      </g>
      <!-- Dark brown circular spot centers -->
      <g fill="${spotColor}">
        <circle cx="195" cy="95" r="4.5"/>
        <circle cx="212" cy="140" r="5.5"/>
        <circle cx="182" cy="180" r="5"/>
        <circle cx="218" cy="225" r="6"/>
        <circle cx="185" cy="265" r="4.5"/>
        <circle cx="208" cy="305" r="5.5"/>
        <circle cx="192" cy="345" r="4"/>
        <circle cx="178" cy="135" r="3.5"/>
        <circle cx="215" cy="185" r="4"/>
      </g>
    `;
  } else if (spotsType === 'streak-virus') {
    // Continuous bright yellow/white broken streaks
    spotsSVG = `
      <g fill="#fef08a" opacity="0.8">
        <rect x="195" y="60" width="4" height="60" rx="1" transform="rotate(-5 195 60)"/>
        <rect x="210" y="110" width="3" height="85" rx="1" transform="rotate(-3 210 110)"/>
        <rect x="180" y="150" width="5" height="120" rx="2" transform="rotate(-8 180 150)"/>
        <rect x="215" y="220" width="4" height="100" rx="1" transform="rotate(-5 215 220)"/>
        <rect x="188" y="280" width="3" height="75" rx="1" transform="rotate(-4 188 280)"/>
      </g>
    `;
  } else if (spotsType === 'downy-mildew') {
    // Pale chlorotic streaks with white fuzzy mold-like center
    spotsSVG = `
      <g fill="#d9f99d" opacity="0.6">
        <rect x="180" y="80" width="35" height="140" rx="10" transform="rotate(-5 180 80)"/>
        <rect x="190" y="200" width="28" height="120" rx="10" transform="rotate(-3 190 200)"/>
      </g>
      <g fill="#f8fafc" opacity="0.7">
        <path d="M 185,90 Q 200,150 190,210 Q 180,150 185,90 Z" />
        <path d="M 195,210 Q 210,260 200,310 Q 190,260 195,210 Z" />
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

  return `data:image/svg+xml;base64,${btoa(svgString.trim())}`;
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
    description: 'Elongated banded streaks and irregular snake-skin or cloud-like lesions with bleached grayish-white centers and dark chocolate borders along leaf sheaths and blades.',
    keySymptoms: [
      'Elongated vertical banded streaks and cloud-like patches',
      'Bleached grayish-white centers framed by dark chocolate-brown margins',
      'Starts on lower leaf sheaths and spreads vertically up the stem and blade',
      'Continuous banded necrotic streaks causing lodging',
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
    description: 'Multiple small, discrete, isolated circular-to-oval brown spots (1-5 mm, sesame-seed size) with bright yellow halos across the leaf blade.',
    keySymptoms: [
      'Numerous small discrete circular-to-oval spots',
      'Prominent bright yellow chlorotic halo framing each individual spot',
      'Uniformly peppered across leaf blade (never forms continuous elongated streaks)',
      'Premature leaf yellowing and reduced grain filling',
    ],
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
    id: 'rice-bacterial-leaf-streak-01',
    crop: 'Rice',
    diseaseName: 'Bacterial Leaf Streak',
    scientificName: 'Xanthomonas oryzae pv. oryzicola',
    category: 'Bacterial',
    severity: 'Moderate',
    description: 'Fine translucent water-soaked streaks between leaf veins turning yellowish-brown with tiny amber bacterial exudates.',
    keySymptoms: ['Translucent interveinal water-soaked streaks', 'Amber bacterial droplets', 'Yellowish-brown elongation'],
    sampleImageUrl: createLeafSVG('Rice', 'Leaf Streak', '#0f172a', '#ca8a04', '#ca8a04', 'streak'),
  },
  {
    id: 'rice-bakanae-01',
    crop: 'Rice',
    diseaseName: 'Bakanae Disease',
    scientificName: 'Fusarium fujikuroi',
    category: 'Fungal',
    severity: 'Severe',
    description: 'Abnormal slender elongation of seedlings with pale yellowish-green leaves and sparse root systems.',
    keySymptoms: ['Abnormal tall spindly seedlings', 'Pale yellowish-green leaves', 'Sterile empty panicles'],
    sampleImageUrl: createLeafSVG('Rice', 'Bakanae', '#0f172a', '#65a30d', '#ca8a04', 'bakanae'),
  },
  {
    id: 'rice-false-smut-01',
    crop: 'Rice',
    diseaseName: 'False Smut',
    scientificName: 'Ustilaginoidea virens',
    category: 'Fungal',
    severity: 'Moderate',
    description: 'Individual grains transformed into velvety green spore balls turning olive-green to black velvet.',
    keySymptoms: ['Velvety green spore balls on grains', 'Olive-green to black velvet masses', 'Infected spikelets on panicle'],
    sampleImageUrl: createLeafSVG('Rice', 'False Smut', '#0f172a', '#15803d', '#15803d', 'smut'),
  },
  {
    id: 'rice-grassy-stunt-virus-01',
    crop: 'Rice',
    diseaseName: 'Grassy Stunt Virus',
    scientificName: 'Rice grassy stunt tenuivirus',
    category: 'Viral',
    severity: 'Severe',
    description: 'Severe stunting and excessive tillering giving a grassy rosette appearance with narrow pale green leaves.',
    keySymptoms: ['Excessive tillering rosette appearance', 'Erect narrow pale green leaves', 'Rusty brown spots'],
    sampleImageUrl: createLeafSVG('Rice', 'Grassy Stunt', '#0f172a', '#16a34a', '#a16207', 'stunt'),
  },
  {
    id: 'rice-narrow-brown-spot-01',
    crop: 'Rice',
    diseaseName: 'Narrow Brown Spot',
    scientificName: 'Cercospora oryzae',
    category: 'Fungal',
    severity: 'Mild',
    description: 'Short linear narrow brown lesions confined strictly between parallel leaf veins near maturity.',
    keySymptoms: ['Linear narrow brown lesions', 'Confined between parallel veins', 'Upper leaf blade spotting'],
    sampleImageUrl: createLeafSVG('Rice', 'Narrow Brown', '#0f172a', '#b45309', '#b45309', 'narrow'),
  },
  {
    id: 'rice-ragged-stunt-virus-01',
    crop: 'Rice',
    diseaseName: 'Ragged Stunt Virus',
    scientificName: 'Rice ragged stunt rhabdovirus',
    category: 'Viral',
    severity: 'Severe',
    description: 'Ragged torn notched leaf blades with serrated edges and dark vein swellings on leaf sheaths.',
    keySymptoms: ['Ragged torn serrated leaf edges', 'Twisted deformed leaves', 'Dark vein swellings on sheaths'],
    sampleImageUrl: createLeafSVG('Rice', 'Ragged Stunt', '#0f172a', '#15803d', '#b45309', 'ragged'),
  },
  {
    id: 'rice-sheath-rot-01',
    crop: 'Rice',
    diseaseName: 'Sheath Rot',
    scientificName: 'Sarocladium oryzae',
    category: 'Fungal',
    severity: 'Moderate',
    description: 'Oblong lesions with gray centers and reddish-brown margins enclosing young rotting panicles.',
    keySymptoms: ['Oblong lesions on upper sheaths', 'Gray centers with reddish margins', 'Rotten unemerged panicles'],
    sampleImageUrl: createLeafSVG('Rice', 'Sheath Rot', '#0f172a', '#b45309', '#78350f', 'rot'),
  },
  {
    id: 'rice-stem-rot-01',
    crop: 'Rice',
    diseaseName: 'Stem Rot',
    scientificName: 'Sclerotium oryzae',
    category: 'Fungal',
    severity: 'Severe',
    description: 'Black lesions on outer leaf sheaths near water line with rotting internal culm and tiny black sclerotia.',
    keySymptoms: ['Black lesions near water line', 'Lodging and weak culm', 'Tiny round black sclerotia inside'],
    sampleImageUrl: createLeafSVG('Rice', 'Stem Rot', '#0f172a', '#1e293b', '#78350f', 'stemrot'),
  },
  {
    id: 'rice-tungro-01',
    crop: 'Rice',
    diseaseName: 'Rice Tungro',
    scientificName: 'Rice tungro bacilliform virus',
    category: 'Viral',
    severity: 'Severe',
    description: 'Yellow to orange-yellow leaf discoloration starting from tips downwards with marked stunting.',
    keySymptoms: ['Yellow to orange-yellow leaf discoloration', 'Marked plant stunting', 'Reduced tillering and sterile grains'],
    sampleImageUrl: createLeafSVG('Rice', 'Tungro Virus', '#0f172a', '#ca8a04', '#ea580c', 'tungro'),
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
    id: 'corn-downy-mildew-01',
    crop: 'Corn',
    diseaseName: 'Corn Downy Mildew',
    scientificName: 'Peronosclerospora spp.',
    category: 'Fungal/Oomycete',
    severity: 'Severe',
    description: 'Systemic infection causing chlorotic streaks and white downy growth on the underside of leaves.',
    keySymptoms: ['Chlorotic striping', 'White downy mold on lower surface', 'Stunted growth'],
    sampleImageUrl: createLeafSVG('Corn', 'Downy Mildew', '#022c22', '#15803d', '#d9f99d', 'downy-mildew'),
  },
  {
    id: 'corn-maize-streak-virus-01',
    crop: 'Corn',
    diseaseName: 'Maize Streak Virus',
    scientificName: 'Mastrevirus (MSV)',
    category: 'Viral',
    severity: 'Severe',
    description: 'Characterized by narrow, parallel, continuous or broken yellow streaks along the veins of corn leaves.',
    keySymptoms: ['Narrow yellow/white streaks', 'Streaks running parallel to veins', 'Stunting if infected early'],
    sampleImageUrl: createLeafSVG('Corn', 'Maize Streak Virus', '#022c22', '#15803d', '#fef08a', 'streak-virus'),
  },
  {
    id: 'corn-bacterial-blight-01',
    crop: 'Corn',
    diseaseName: 'Bacterial Leaf Blight',
    scientificName: 'Pantoea stewartii / Pseudomonas spp.',
    category: 'Bacterial',
    severity: 'Moderate',
    description: 'Long, water-soaked, chlorotic or necrotic streaks along the leaves.',
    keySymptoms: ['Water-soaked streaks', 'Necrotic lesions', 'Chlorotic halo'],
    sampleImageUrl: createLeafSVG('Corn', 'Bacterial Blight', '#022c22', '#15803d', '#fef08a', 'streaks'),
  },
  {
    id: 'corn-brown-spot-01',
    crop: 'Corn',
    diseaseName: 'Brown spot',
    scientificName: 'Physoderma maydis',
    category: 'Fungal/Oomycete',
    severity: 'Moderate',
    description: 'Small, circular, yellowish-brown spots often forming bands across the leaf.',
    keySymptoms: ['Small circular spots', 'Bands on leaves', 'Dark brown pustules'],
    sampleImageUrl: createLeafSVG('Corn', 'Brown Spot', '#022c22', '#15803d', '#713f12', 'spots'),
  },
  {
    id: 'corn-sheath-blight-01',
    crop: 'Corn',
    diseaseName: 'Sheath Blight',
    scientificName: 'Rhizoctonia solani',
    category: 'Fungal/Oomycete',
    severity: 'Severe',
    description: 'Elliptical or irregular lesions with light-colored centers and dark brown margins on the lower leaf sheaths.',
    keySymptoms: ['Elliptical lesions', 'Light centers', 'Dark margins'],
    sampleImageUrl: createLeafSVG('Corn', 'Sheath Blight', '#022c22', '#15803d', '#a16207', 'sheath-blight'),
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
