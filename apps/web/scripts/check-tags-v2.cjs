const fs = require('fs');
const content = fs.readFileSync('src/features/landing/components/hero/HeroSlides.tsx', 'utf8');

const lines = content.split('\n');
let balance = 0;
let inReturn = false;

lines.forEach((line, i) => {
  const opens = (line.match(/<div/g) || []).length;
  const closes = (line.match(/<\/div/g) || []).length;
  
  if (line.includes('return (')) inReturn = true;
  if (line.includes(');')) inReturn = false;
  
  balance += opens - closes;
  
  if (!inReturn && balance !== 0) {
    console.log(`Mismatch at line ${i+1}: Balance=${balance}`);
  }
});
