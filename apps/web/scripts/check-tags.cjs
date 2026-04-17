const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('src/features/landing/components/hero/HeroSlides.tsx', 'utf8');

const components = content.split(/export const /);

components.forEach(comp => {
  const nameMatch = comp.match(/(\w+)/);
  if (!nameMatch) return;
  const name = nameMatch[1];
  
  const divOpen = (comp.match(/<div/g) || []).length;
  const divClose = (comp.match(/<\/div/g) || []).length;
  
  console.log(`${name}: Open=${divOpen}, Close=${divClose}`);
});
