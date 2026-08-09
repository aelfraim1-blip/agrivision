// Compute a fast, deterministic hash string for image content (base64 or URL)
export function getImageHash(imageDataUrl: string): string {
  if (!imageDataUrl) return 'empty_image';

  // Sample characters across the base64 string for speed & uniqueness
  const str = imageDataUrl;
  const len = str.length;
  if (len === 0) return 'empty_image';

  let hash = 0;
  // Sample up to 2000 characters evenly distributed across the image string
  const step = Math.max(1, Math.floor(len / 2000));

  for (let i = 0; i < len; i += step) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }

  return `img_${Math.abs(hash)}_${len}`;
}
