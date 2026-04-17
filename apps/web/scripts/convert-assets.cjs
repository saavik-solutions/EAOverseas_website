const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '../src/assets'),
  path.join(__dirname, '../public'),
  path.join(__dirname, '../public/images'),
  path.join(__dirname, '../src/features/landing/assets'),
  path.join(__dirname, '../src/shared/assets'),
  path.join(__dirname, '../../../packages/common/src/assets')
];

async function convertToWebp(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await convertToWebp(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(file)) {
      const outputPath = fullPath.replace(/\.(png|jpe?g)$/i, '.webp');
      
      try {
        await sharp(fullPath)
          .webp({ quality: 85 })
          .toFile(outputPath);
        console.log(`Converted: ${file} -> ${path.basename(outputPath)}`);
      } catch (err) {
        console.error(`Failed to convert ${file}:`, err.message);
      }
    }
  }
}

async function run() {
  console.log('Starting WebP conversion...');
  for (const dir of directories) {
    console.log(`Processing directory: ${dir}`);
    await convertToWebp(dir);
  }
  console.log('Conversion complete!');
}

run();
