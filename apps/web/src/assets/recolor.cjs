const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const targetColor = { r: 11, g: 52, b: 146, alpha: 1 };

async function recolorImage(fileName) {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) return;
    
    try {
        const metadata = await sharp(filePath).metadata();
        
        // Create solid blue image of same size
        const blueOverlay = await sharp({
            create: {
                width: metadata.width,
                height: metadata.height,
                channels: 4,
                background: targetColor
            }
        }).png().toBuffer();

        const tempFile = filePath + '.temp.' + metadata.format;
        
        // Use the original image to mask the solid blue layer
        // 'dest-in' keeps the parts of the destination (blue) that overlap with the source (original logo)
        await sharp(blueOverlay)
            .composite([{ input: filePath, blend: 'dest-in' }])
            .toFormat(metadata.format)
            .toFile(tempFile);
            
        // Overwrite original
        fs.unlinkSync(filePath);
        fs.renameSync(tempFile, filePath);
        console.log('Successfully recolored:', fileName);
    } catch (err) {
        console.error('Error processing', fileName, err);
    }
}

async function run() {
    await recolorImage('logo.png');
    await recolorImage('logo.webp');
    await recolorImage('LOGO 1X1.png');
    await recolorImage('LOGO 1X1.webp');
    
    // Some components might use logo.jpg but it doesn't have transparency, skip it or it will be fully blue.
}

run();
