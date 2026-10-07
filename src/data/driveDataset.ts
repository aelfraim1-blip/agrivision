import driveCatalogData from './driveDatasetCatalog.json';

export interface DriveSampleImage {
  id: string;
  name: string;
}

export interface DriveClassInfo {
  className: string;
  crop: 'Rice' | 'Corn';
  folderId: string;
  driveUrl: string;
  totalCount: number;
  sampleImages: DriveSampleImage[];
  scientificName: string;
  category: 'Fungal' | 'Bacterial' | 'Viral' | 'Healthy' | 'Fungal / Oomycete';
  distinguishingFeatures: string[];
}

export const GOOGLE_DRIVE_DATASET_CONFIG = {
  name: 'Data Sets_PALA-IS',
  rootFolderId: '1-1OBHWaDE2EpQCnEST5WlkRHktzK0lBu',
  rootDriveUrl: 'https://drive.google.com/drive/folders/1-1OBHWaDE2EpQCnEST5WlkRHktzK0lBu',
  riceFolderId: '1l_PDv7kih8gUEp9NsypeUiVI-8U1rNjK',
  riceDriveUrl: 'https://drive.google.com/drive/folders/1l_PDv7kih8gUEp9NsypeUiVI-8U1rNjK',
  cornFolderId: '11oh-6yCYOljSjQPxDD8jxqDgU4np35cD',
  cornDriveUrl: 'https://drive.google.com/drive/folders/11oh-6yCYOljSjQPxDD8jxqDgU4np35cD',
  totalClasses: 23,
  totalImagesEstimated: 1100,
  syncStatus: 'Verified & Connected',
};

// Strongly-typed map of the 23 classes
export const DRIVE_CLASSES: DriveClassInfo[] = [
  // 14 Rice Classes
  {
    className: 'Bacterial Leaf Blight',
    crop: 'Rice',
    folderId: '1zTr72PRj-rsXQ4VrMS1FRFxAzBYZvg6R',
    driveUrl: 'https://drive.google.com/drive/folders/1zTr72PRj-rsXQ4VrMS1FRFxAzBYZvg6R',
    totalCount: driveCatalogData.rice['Bacterial Leaf Blight']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Bacterial Leaf Blight']?.sampleImages || [],
    scientificName: 'Xanthomonas oryzae pv. oryzae',
    category: 'Bacterial',
    distinguishingFeatures: [
      'Wavy yellow to white lesions starting at leaf margins and tips',
      'Progresses longitudinally down blade edges into bleached necrosis',
      'Milky bacterial ooze beads on lesions under morning humidity',
    ],
  },
  {
    className: 'Bacterial Leaf Streak',
    crop: 'Rice',
    folderId: '1TNUtrZk5SwjFji-5HArPOeF6p3Qg2eOB',
    driveUrl: 'https://drive.google.com/drive/folders/1TNUtrZk5SwjFji-5HArPOeF6p3Qg2eOB',
    totalCount: driveCatalogData.rice['Bacterial Leaf Streak']?.totalCount || 0,
    sampleImages: driveCatalogData.rice['Bacterial Leaf Streak']?.sampleImages || [],
    scientificName: 'Xanthomonas oryzae pv. oryzicola',
    category: 'Bacterial',
    distinguishingFeatures: [
      'Fine interveinal water-soaked translucent narrow streaks',
      'Confined between leaf veins, turning yellowish-brown to dark brown',
      'Tiny amber-yellow resinous exudate droplets along streak lines',
    ],
  },
  {
    className: 'Bakanae',
    crop: 'Rice',
    folderId: '1W6N09SXc5zprwPyM7vrC84BklMxICZrP',
    driveUrl: 'https://drive.google.com/drive/folders/1W6N09SXc5zprwPyM7vrC84BklMxICZrP',
    totalCount: driveCatalogData.rice['Bakanae']?.totalCount || 0,
    sampleImages: driveCatalogData.rice['Bakanae']?.sampleImages || [],
    scientificName: 'Fusarium fujikuroi',
    category: 'Fungal',
    distinguishingFeatures: [
      'Abnormal tall, slender, spindly seedling elongation ("foolish seedling")',
      'Pale chlorotic yellowish-green leaves with sparse roots',
      'Premature death or completely sterile empty panicles',
    ],
  },
  {
    className: 'Brown Spot',
    crop: 'Rice',
    folderId: '150ry4HHFdHH4MmaQiPpGlIX_66r48mbT',
    driveUrl: 'https://drive.google.com/drive/folders/150ry4HHFdHH4MmaQiPpGlIX_66r48mbT',
    totalCount: driveCatalogData.rice['Brown Spot']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Brown Spot']?.sampleImages || [],
    scientificName: 'Bipolaris oryzae',
    category: 'Fungal',
    distinguishingFeatures: [
      'Discrete, isolated small circular-to-oval spots (1-5mm, sesame-like)',
      'Prominent bright yellow chlorotic halo around each individual spot',
      'Evenly distributed over entire leaf blade (NOT streaks or bands)',
    ],
  },
  {
    className: 'False Smut',
    crop: 'Rice',
    folderId: '1d4AmcoL0oM50vivuJqEtf1u34Fxn6Vqo',
    driveUrl: 'https://drive.google.com/drive/folders/1d4AmcoL0oM50vivuJqEtf1u34Fxn6Vqo',
    totalCount: driveCatalogData.rice['False Smut']?.totalCount || 79,
    sampleImages: driveCatalogData.rice['False Smut']?.sampleImages || [],
    scientificName: 'Ustilaginoidea virens',
    category: 'Fungal',
    distinguishingFeatures: [
      'Individual grains transformed into large velvety yellow-green spore balls',
      'Velvety masses turn olive-green to dark black with powdery spores',
      'Affects panicle grains during flowering and grain-filling stage',
    ],
  },
  {
    className: 'Grassy Stunt Virus',
    crop: 'Rice',
    folderId: '1AlWFCH2YDMahqemMABLOB6vFLmI8YvZp',
    driveUrl: 'https://drive.google.com/drive/folders/1AlWFCH2YDMahqemMABLOB6vFLmI8YvZp',
    totalCount: driveCatalogData.rice['Grassy Stunt Virus']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Grassy Stunt Virus']?.sampleImages || [],
    scientificName: 'Rice grassy stunt tenuivirus (RGSV)',
    category: 'Viral',
    distinguishingFeatures: [
      'Severe stunting and excessive tillering producing dense grassy rosette',
      'Erect, very narrow pale green leaves with small rusty brown speckles',
      'Inability to flower or produce productive panicles',
    ],
  },
  {
    className: 'Healthy Rice plant',
    crop: 'Rice',
    folderId: '13vGEXA3lVduT8uLIKfOtCpi7Lt8d5rEy',
    driveUrl: 'https://drive.google.com/drive/folders/13vGEXA3lVduT8uLIKfOtCpi7Lt8d5rEy',
    totalCount: driveCatalogData.rice['Healthy Rice plant']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Healthy Rice plant']?.sampleImages || [],
    scientificName: 'Oryza sativa',
    category: 'Healthy',
    distinguishingFeatures: [
      'Uniform rich emerald-green leaf blade with no lesions or spots',
      'Intact midrib structure with high chlorophyll photosynthetic vitality',
      'Strong upright turgid posture indicating healthy vascular flow',
    ],
  },
  {
    className: 'Narrow Brown Spot',
    crop: 'Rice',
    folderId: '1OnFoJikf0YlbcEh8m_joem8W98AeBqBq',
    driveUrl: 'https://drive.google.com/drive/folders/1OnFoJikf0YlbcEh8m_joem8W98AeBqBq',
    totalCount: driveCatalogData.rice['Narrow Brown Spot']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Narrow Brown Spot']?.sampleImages || [],
    scientificName: 'Cercospora oryzae',
    category: 'Fungal',
    distinguishingFeatures: [
      'Short linear narrow brown lesions strictly parallel between leaf veins',
      'Typically 1-2 mm wide and 5-10 mm long, confined interveinally',
      'Appears predominantly on upper canopy leaves near maturity stage',
    ],
  },
  {
    className: 'Ragged Stunt Virus',
    crop: 'Rice',
    folderId: '13yJePn4Nfswnpb3mh66NgUtFRrxY6EJq',
    driveUrl: 'https://drive.google.com/drive/folders/13yJePn4Nfswnpb3mh66NgUtFRrxY6EJq',
    totalCount: driveCatalogData.rice['Ragged Stunt Virus']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Ragged Stunt Virus']?.sampleImages || [],
    scientificName: 'Rice ragged stunt rhabdovirus (RRSV)',
    category: 'Viral',
    distinguishingFeatures: [
      'Ragged, torn, notched leaf blade margins with serrated edges',
      'Deformed, twisted leaves with gall-like vein swellings on sheaths',
      'Incomplete panicle emergence with twisted sterile spikelets',
    ],
  },
  {
    className: 'Rice Blast',
    crop: 'Rice',
    folderId: '1C0AdiESP8d7BzS7etsA855ALA-lLBxuD',
    driveUrl: 'https://drive.google.com/drive/folders/1C0AdiESP8d7BzS7etsA855ALA-lLBxuD',
    totalCount: driveCatalogData.rice['Rice Blast']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Rice Blast']?.sampleImages || [],
    scientificName: 'Pyricularia oryzae / Magnaporthe oryzae',
    category: 'Fungal',
    distinguishingFeatures: [
      'Diamond-shaped or spindle-shaped lesions with acute pointed ends',
      'Ash-gray or whitish necrotic center surrounded by dark brown/red border',
      'Lesions coalesce rapidly causing whole leaf blade collapse and drying',
    ],
  },
  {
    className: 'Sheath Blight',
    crop: 'Rice',
    folderId: '1R8wUxFv6JVZQhgumkPn1dhUH998nmZsf',
    driveUrl: 'https://drive.google.com/drive/folders/1R8wUxFv6JVZQhgumkPn1dhUH998nmZsf',
    totalCount: driveCatalogData.rice['Sheath Blight']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Sheath Blight']?.sampleImages || [],
    scientificName: 'Rhizoctonia solani',
    category: 'Fungal',
    distinguishingFeatures: [
      'Irregular banded snake-skin or cloud-like patches on lower leaf sheaths',
      'Bleached grayish-white to straw centers with wavy dark brown borders',
      'Starts near water line and climbs vertically up sheaths causing lodging',
    ],
  },
  {
    className: 'Sheath Rot',
    crop: 'Rice',
    folderId: '1z0Vk3XToZlfJ2jVBKCCMcspTu5HiUTyC',
    driveUrl: 'https://drive.google.com/drive/folders/1z0Vk3XToZlfJ2jVBKCCMcspTu5HiUTyC',
    totalCount: driveCatalogData.rice['Sheath Rot']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Sheath Rot']?.sampleImages || [],
    scientificName: 'Sarocladium oryzae',
    category: 'Fungal',
    distinguishingFeatures: [
      'Oblong or irregular lesions with gray centers on uppermost flag leaf sheaths',
      'Encloses and rots young emerging panicles ("rotten neck")',
      'White powdery mycelial growth inside affected leaf sheaths',
    ],
  },
  {
    className: 'Stem Rot',
    crop: 'Rice',
    folderId: '1VbOwNVv2vZmacD8ujrrtXW1YmNhS74U2',
    driveUrl: 'https://drive.google.com/drive/folders/1VbOwNVv2vZmacD8ujrrtXW1YmNhS74U2',
    totalCount: driveCatalogData.rice['Stem Rot']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Stem Rot']?.sampleImages || [],
    scientificName: 'Sclerotium oryzae',
    category: 'Fungal',
    distinguishingFeatures: [
      'Dark black necrotic lesions on outer leaf sheaths right at water line',
      'Internal culm tissue rots, causing severe stem collapse and lodging',
      'Small black round sclerotial bodies visible inside hollow stem lumen',
    ],
  },
  {
    className: 'Tungro',
    crop: 'Rice',
    folderId: '1HMiSDn9EgVxrC9-W5FtpO6gQSD3cXt5C',
    driveUrl: 'https://drive.google.com/drive/folders/1HMiSDn9EgVxrC9-W5FtpO6gQSD3cXt5C',
    totalCount: driveCatalogData.rice['Tungro']?.totalCount || 50,
    sampleImages: driveCatalogData.rice['Tungro']?.sampleImages || [],
    scientificName: 'Rice tungro bacilliform virus (RTBV) + RTSV',
    category: 'Viral',
    distinguishingFeatures: [
      'Distinct bright yellow to orange-yellow discoloration starting at leaf tips',
      'Severe plant stunting, delayed flowering, and reduced tiller count',
      'Transmitted by green leafhopper (Nephotettix virescens) vectors',
    ],
  },

  // 9 Corn Classes
  {
    className: 'Corn Bacterial Leaf Blight',
    crop: 'Corn',
    folderId: '1fMkmwrnodQdedF6z1sfm6HcEKcYBNpc6',
    driveUrl: 'https://drive.google.com/drive/folders/1fMkmwrnodQdedF6z1sfm6HcEKcYBNpc6',
    totalCount: driveCatalogData.corn['1. Bacterial Leaf Blight']?.totalCount || 50,
    sampleImages: driveCatalogData.corn['1. Bacterial Leaf Blight']?.sampleImages || [],
    scientificName: 'Pantoea stewartii / Pseudomonas spp.',
    category: 'Bacterial',
    distinguishingFeatures: [
      'Long water-soaked chlorotic streaks that become necrotic and brown',
      'Vascular discoloration inside node bundles',
      'Leaf wilting and drying during warm dry spells',
    ],
  },
  {
    className: 'Corn Brown Spot',
    crop: 'Corn',
    folderId: '1vJzY0SjO3OEJYjr16Ji7CCO8LMJjOxbz',
    driveUrl: 'https://drive.google.com/drive/folders/1vJzY0SjO3OEJYjr16Ji7CCO8LMJjOxbz',
    totalCount: driveCatalogData.corn['2. Brown Spot']?.totalCount || 50,
    sampleImages: driveCatalogData.corn['2. Brown Spot']?.sampleImages || [],
    scientificName: 'Physoderma maydis',
    category: 'Fungal',
    distinguishingFeatures: [
      'Small circular yellowish-brown spots arranged in distinct bands across leaf',
      'Ruptured leaf epidermises releasing reddish-brown powdery sporangia',
      'Prominent on midribs and leaf sheaths',
    ],
  },
  {
    className: 'Corn Common Rust',
    crop: 'Corn',
    folderId: '1UcAPl-y22bpqJ-IbmBwprRH7-OmTmbpb',
    driveUrl: 'https://drive.google.com/drive/folders/1UcAPl-y22bpqJ-IbmBwprRH7-OmTmbpb',
    totalCount: driveCatalogData.corn['3. Common Rust']?.totalCount || 150,
    sampleImages: driveCatalogData.corn['3. Common Rust']?.sampleImages || [],
    scientificName: 'Puccinia sorghi',
    category: 'Fungal',
    distinguishingFeatures: [
      'Golden-brown to cinnamon-red oval powdery pustules on both leaf surfaces',
      'Pustules erupt releasing brick-red urediniospores upon contact',
      'Severe infection leads to leaf yellowing, tissue necrosis, and defoliation',
    ],
  },
  {
    className: 'Corn Downy Mildew',
    crop: 'Corn',
    folderId: '1ZF293jml30zptHA09-AoeTZQoq6eRFUn',
    driveUrl: 'https://drive.google.com/drive/folders/1ZF293jml30zptHA09-AoeTZQoq6eRFUn',
    totalCount: driveCatalogData.corn['4. Downy Mildew']?.totalCount || 50,
    sampleImages: driveCatalogData.corn['4. Downy Mildew']?.sampleImages || [],
    scientificName: 'Peronosclerospora spp.',
    category: 'Fungal / Oomycete',
    distinguishingFeatures: [
      'Systemic chlorotic striping and pale yellowing running parallel to veins',
      'White downy cotton-like sporulation on the underside of leaves on humid mornings',
      'Stunting, erect narrow leaves, and sterile tassel development',
    ],
  },
  {
    className: 'Corn Gray Leaf Spot',
    crop: 'Corn',
    folderId: '1R6ufOmzkkgJGBUa9IQg9Fqyuy2P-Z1q_',
    driveUrl: 'https://drive.google.com/drive/folders/1R6ufOmzkkgJGBUa9IQg9Fqyuy2P-Z1q_',
    totalCount: driveCatalogData.corn['5. Gray Leaf Spot']?.totalCount || 50,
    sampleImages: driveCatalogData.corn['5. Gray Leaf Spot']?.sampleImages || [],
    scientificName: 'Cercospora zeae-maydis',
    category: 'Fungal',
    distinguishingFeatures: [
      'Strictly rectangular blocky tan-to-gray lesions confined between parallel veins',
      'Sharp straight vertical margins bounded by veins with square ends',
      'Lesions coalesce into large necrotic blighted blocks on leaf canopy',
    ],
  },
  {
    className: 'Healthy Corn Leaf',
    crop: 'Corn',
    folderId: '1mKLBttv7TRLiOHhmbqt1DcARA4fbbi99',
    driveUrl: 'https://drive.google.com/drive/folders/1mKLBttv7TRLiOHhmbqt1DcARA4fbbi99',
    totalCount: driveCatalogData.corn['6. Healthy ']?.totalCount || 150,
    sampleImages: driveCatalogData.corn['6. Healthy ']?.sampleImages || [],
    scientificName: 'Zea mays',
    category: 'Healthy',
    distinguishingFeatures: [
      'Vigorous dark green broad leaf blade with crisp clean margins',
      'Prominent central white midrib vein without lesions or rust pustules',
      'High chlorophyll density with healthy photosynthetic turgor',
    ],
  },
  {
    className: 'Maize Streak Virus',
    crop: 'Corn',
    folderId: '1aMnnqrpPjwY5_YXQc039Xp8b4pm-Cw8-',
    driveUrl: 'https://drive.google.com/drive/folders/1aMnnqrpPjwY5_YXQc039Xp8b4pm-Cw8-',
    totalCount: driveCatalogData.corn['7. Maize Streak Virus']?.totalCount || 50,
    sampleImages: driveCatalogData.corn['7. Maize Streak Virus']?.sampleImages || [],
    scientificName: 'Maize streak mastrevirus (MSV)',
    category: 'Viral',
    distinguishingFeatures: [
      'Narrow continuous or broken yellow stripes running parallel to veins',
      'Uniform chlorotic striping covering young leaf growth',
      'Severe plant stunting, sterile tassels, and heavy yield loss',
    ],
  },
  {
    className: 'Northern Corn Leaf Blight',
    crop: 'Corn',
    folderId: '1H9RlDVYnn2gU3qUIz9wB7RcgXX2gOcXi',
    driveUrl: 'https://drive.google.com/drive/folders/1H9RlDVYnn2gU3qUIz9wB7RcgXX2gOcXi',
    totalCount: driveCatalogData.corn['8. Northern Leaf Blight']?.totalCount || 150,
    sampleImages: driveCatalogData.corn['8. Northern Leaf Blight']?.sampleImages || [],
    scientificName: 'Exserohilum turcicum',
    category: 'Fungal',
    distinguishingFeatures: [
      'Large elliptical cigar-shaped lesions (2.5 to 15 cm long) with rounded ends',
      'Grayish-green to tan necrotic centers with dark olivaceous spores in damp air',
      'Rapid canopy loss causing early plant death and stalk lodging',
    ],
  },
  {
    className: 'Corn Sheath Blight',
    crop: 'Corn',
    folderId: '1dGAu0ZEGhF4yCiIwTmxxe7ciDW6Ch1Jl',
    driveUrl: 'https://drive.google.com/drive/folders/1dGAu0ZEGhF4yCiIwTmxxe7ciDW6Ch1Jl',
    totalCount: driveCatalogData.corn['9. Sheath Blight']?.totalCount || 50,
    sampleImages: driveCatalogData.corn['9. Sheath Blight']?.sampleImages || [],
    scientificName: 'Rhizoctonia solani',
    category: 'Fungal',
    distinguishingFeatures: [
      'Irregular banded lesions with straw-colored centers and dark brown margins on sheaths',
      'Brown sclerotia bodies attached to affected basal leaf sheath tissues',
      'Spreads upwards causing stalk breakage and premature lodging',
    ],
  },
];

/**
 * Returns safe image URL through our server proxy to avoid CORS issues
 */
export function getDriveImageUrl(fileId: string): string {
  return `/api/drive-image?id=${fileId}`;
}

/**
 * Returns direct Google Drive thumbnail URL
 */
export function getDirectDriveThumbnail(fileId: string, size = 400): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}
