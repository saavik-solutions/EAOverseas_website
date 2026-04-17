const fs = require('fs');
const content = fs.readFileSync('src/features/landing/components/hero/HeroSlides.tsx', 'utf8');

const components = content.split(/export const /);

components.forEach(comp => {
  const nameMatch = comp.match(/(\w+)/);
  if (!nameMatch) return;
  const name = nameMatch[1];
  
  const returnBlock = comp.match(/return \(\s*([\s\S]*?)\s*\);/);
  if (!returnBlock) return;
  
  const inner = returnBlock[1].trim();
  // Simple check for multiple siblings at depth 0
  let depth = 0;
  let count = 0;
  const tags = inner.match(/<(\/?[A-Za-z0-9]+)/g) || [];
  
  tags.forEach(tag => {
    if (tag.startsWith('</')) {
      depth--;
    } else {
      if (depth === 0) count++;
      depth++;
    }
  });
  
  console.log(`${name}: Top-level element count = ${count}`);
});
