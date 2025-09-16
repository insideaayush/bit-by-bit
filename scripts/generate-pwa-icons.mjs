import sharp from 'sharp';
import path from 'path';
import fs from 'fs/promises';

const iconSizes = [
  { width: 192, height: 192, name: 'icon-192x192.png' },
  { width: 512, height: 512, name: 'icon-512x512.png' },
  { width: 180, height: 180, name: 'apple-touch-icon.png' }, // For Apple devices
];

const sourceSvg = path.join(process.cwd(), 'public', 'icons', 'pwa-icon.svg');
const outputDir = path.join(process.cwd(), 'public', 'icons');

async function generateIcons() {
  try {
    await fs.mkdir(outputDir, { recursive: true });

    for (const size of iconSizes) {
      const outputPath = path.join(outputDir, size.name);
      await sharp(sourceSvg)
        .resize(size.width, size.height)
        .toFile(outputPath);
      console.log(`Generated ${size.name}`);
    }
    console.log('PWA icons generated successfully!');
  } catch (error) {
    console.error('Error generating PWA icons:', error);
  }
}

generateIcons();
