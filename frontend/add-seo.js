import fs from 'fs';
import path from 'path';

const pagesDir = './src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx') && f !== 'Home.jsx');

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if SEO is already imported
  if (content.includes('import SEO')) return;

  // Add import
  const importStatement = "import SEO from '../components/SEO';\n";
  const firstImportMatch = content.match(/^import /m);
  if (firstImportMatch) {
    content = content.replace(/^import /m, importStatement + 'import ');
  } else {
    content = importStatement + content;
  }

  // Find the return statement and the first <div> or wrapper
  // This is a naive approach but works for standard React components
  const pageName = file.replace('.jsx', '');
  // Format the title nicely: TermsOfService -> Terms Of Service
  const title = pageName.replace(/([A-Z])/g, ' $1').trim();
  
  const returnRegex = /return\s*\(\s*(<[^>]+>)/;
  const match = content.match(returnRegex);
  
  if (match) {
    const replacement = `return (\n    <>\n      <SEO title="${title}" />\n      ${match[1]}`;
    content = content.replace(returnRegex, replacement);
    
    // We also need to close the <> we just opened at the very end of the component return.
    // Instead of parsing perfectly, it's safer to just inject it inside the first tag.
    // Let's modify the approach: inject it right after the first matched tag in the return.
    
    const tagMatch = match[1];
    const newTag = `${tagMatch}\n      <SEO title="${title}" />`;
    // Re-read content and do a simple string replace
    let freshContent = fs.readFileSync(filePath, 'utf8');
    freshContent = freshContent.replace(/^import /m, importStatement + 'import ');
    freshContent = freshContent.replace(returnRegex, `return (\n    ${newTag}`);
    
    fs.writeFileSync(filePath, freshContent, 'utf8');
    console.log(`Added SEO to ${file}`);
  }
});
