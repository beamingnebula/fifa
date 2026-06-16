import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const svgPath = join(__dirname, '../public/trophy.svg');
const publicDir = join(__dirname, '../public');

async function generate() {
  try {
    console.log('Generating PNG icons from trophy.svg...');

    // 192x192 icon
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(join(publicDir, 'trophy-192.png'));
    console.log('Created trophy-192.png');

    // 512x512 icon
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(join(publicDir, 'trophy-512.png'));
    console.log('Created trophy-512.png');

    // apple-touch-icon (180x180)
    await sharp(svgPath)
      .resize(180, 180)
      .png()
      .toFile(join(publicDir, 'apple-touch-icon.png'));
    console.log('Created apple-touch-icon.png');

    console.log('All icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
    process.exit(1);
  }
}

generate();
