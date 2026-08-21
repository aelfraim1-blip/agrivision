import { SAMPLE_DATASET } from '../src/data/sampleDataset';
import { analyzeImageClientSide } from '../src/utils/clientAnalyzer';
import { classifyFromVisualMetadata } from '../src/utils/foliarClassifier';

console.log('🧪 Starting Classification Accuracy and Disambiguation Verification Suite...\n');

let passCount = 0;
let failCount = 0;

for (const item of SAMPLE_DATASET) {
  console.log(`[TESTING] Target: "${item.diseaseName}" (${item.crop})`);
  
  // 1. Test client analyzer
  const result = analyzeImageClientSide(item.sampleImageUrl, item.crop);
  
  // Check if result matches target disease
  const targetNorm = item.diseaseName.toLowerCase();
  const resultNorm = result.diseaseName.toLowerCase();
  
  let matches = false;
  if (targetNorm.includes('bacterial') && (resultNorm.includes('bacterial') || resultNorm.includes('blight') && !resultNorm.includes('sheath'))) {
    matches = true;
  } else if (targetNorm.includes('brown') && resultNorm.includes('brown')) {
    matches = true;
  } else if (targetNorm.includes('sheath') && resultNorm.includes('sheath')) {
    matches = true;
  } else if (targetNorm.includes('blast') && resultNorm.includes('blast')) {
    matches = true;
  } else if (targetNorm.includes('healthy') && resultNorm.includes('healthy')) {
    matches = true;
  } else if (targetNorm.includes('rust') && resultNorm.includes('rust')) {
    matches = true;
  } else if (targetNorm.includes('gray') && resultNorm.includes('gray')) {
    matches = true;
  } else if (targetNorm.includes('northern') && resultNorm.includes('northern')) {
    matches = true;
  }

  if (matches) {
    console.log(`  ✅ PASSED: Correctly diagnosed as "${result.diseaseName}"`);
    passCount++;
  } else {
    console.error(`  ❌ FAILED: Expected "${item.diseaseName}", but got "${result.diseaseName}"`);
    failCount++;
  }

  // Cross-reference differential check:
  if (result.referenceComparison) {
    console.log(`     Ref Exemplar Match: ${result.referenceComparison.referenceDiseaseName}`);
    console.log(`     Differential Excluded Items: ${result.referenceComparison.differentialAnalysis.length}`);
  }
}

// Test specific cross-confusion scenarios
// Comprehensive Edge-Case and Vice-Versa Ambiguity Test Matrix
console.log('\n🔬 Executing Deep Vice-Versa Ambiguity & Filename Test Matrix...');

const disambiguationTests = [
  // Bacterial Leaf Blight vs Brown Spot disambiguation
  {
    name: 'Rice Bacterial Leaf Blight - Marginal drying photo',
    input: 'data:image/jpeg;base64,sample_rice_blight_margin_wavy_yellow_ooze_xanthomonas',
    crop: 'Rice' as const,
    expectedDisease: 'Bacterial Leaf Blight',
    forbiddenDisease: 'Rice Brown Spot',
  },
  {
    name: 'Rice Brown Spot - Scattered sesame spot photo',
    input: 'data:image/jpeg;base64,sample_rice_brown_spot_circular_halo_bipolaris_sesame',
    crop: 'Rice' as const,
    expectedDisease: 'Rice Brown Spot',
    forbiddenDisease: 'Bacterial Leaf Blight',
  },
  // Sheath Blight vs Blast disambiguation
  {
    name: 'Rice Sheath Blight - Banded snake-skin photo',
    input: 'data:image/jpeg;base64,sample_rice_sheath_rhizoctonia_solani_banded_patch',
    crop: 'Rice' as const,
    expectedDisease: 'Rice Sheath Blight',
    forbiddenDisease: 'Rice Blast',
  },
  {
    name: 'Rice Blast - Diamond acute lesion photo',
    input: 'data:image/jpeg;base64,sample_rice_blast_pyricularia_diamond_spindle_ash',
    crop: 'Rice' as const,
    expectedDisease: 'Rice Blast',
    forbiddenDisease: 'Rice Sheath Blight',
  },
  // Corn Gray Leaf Spot vs Northern Corn Leaf Blight disambiguation
  {
    name: 'Corn Gray Leaf Spot - Rectangular vein-limited lesion',
    input: 'data:image/jpeg;base64,sample_corn_gray_spot_cercospora_rectangular_streaks',
    crop: 'Corn' as const,
    expectedDisease: 'Corn Gray Leaf Spot',
    forbiddenDisease: 'Northern Corn Leaf Blight',
  },
  {
    name: 'Northern Corn Leaf Blight - Cigar shaped large lesion',
    input: 'data:image/jpeg;base64,sample_corn_northern_blight_exserohilum_cigar_long',
    crop: 'Corn' as const,
    expectedDisease: 'Northern Corn Leaf Blight',
    forbiddenDisease: 'Corn Gray Leaf Spot',
  },
  // Corn Common Rust vs Gray Leaf Spot
  {
    name: 'Corn Common Rust - Powdery rust pustules',
    input: 'data:image/jpeg;base64,sample_corn_rust_puccinia_sorghi_pustule_cinnamon',
    crop: 'Corn' as const,
    expectedDisease: 'Corn Common Rust',
    forbiddenDisease: 'Corn Gray Leaf Spot',
  },
  // Healthy leaves
  {
    name: 'Healthy Rice Leaf - Clean green blade',
    input: 'data:image/jpeg;base64,sample_healthy_rice_clean_green_chlorophyll_canopy',
    crop: 'Rice' as const,
    expectedDisease: 'Healthy Rice Leaf',
    forbiddenDisease: 'Rice Brown Spot',
  },
  {
    name: 'Healthy Corn Leaf - Clean dark green canopy',
    input: 'data:image/jpeg;base64,sample_healthy_corn_clean_dark_green_midrib',
    crop: 'Corn' as const,
    expectedDisease: 'Healthy Corn Leaf',
    forbiddenDisease: 'Corn Common Rust',
  },
];

for (const test of disambiguationTests) {
  const res = analyzeImageClientSide(test.input, test.crop);
  const resultNorm = res.diseaseName.toLowerCase();
  
  // Extract distinctive terms ignoring common prefixes like 'Rice' / 'Corn'
  const extractKeyTerm = (name: string) => {
    return name
      .toLowerCase()
      .replace(/^rice\s+/i, '')
      .replace(/^corn\s+/i, '')
      .trim();
  };

  const expKey = extractKeyTerm(test.expectedDisease);
  const forbKey = extractKeyTerm(test.forbiddenDisease);

  const isExpected = resultNorm.includes(expKey) || (expKey === 'healthy leaf' && resultNorm.includes('healthy'));
  const isForbidden = resultNorm.includes(forbKey);

  if (isExpected && !isForbidden) {
    console.log(`  ✅ [PASS] ${test.name} -> "${res.diseaseName}" (Ruled out "${test.forbiddenDisease}")`);
    passCount++;
  } else {
    console.error(`  ❌ [FAIL] ${test.name} -> Expected "${test.expectedDisease}" (contains '${expKey}'), got "${res.diseaseName}", forbidden '${forbKey}'`);
    failCount++;
  }
}

console.log(`\n========================================`);
console.log(`TEST SUMMARY: ${passCount} Passed, ${failCount} Failed`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
}
