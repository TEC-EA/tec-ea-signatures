const fs = require('fs');
const path = require('path');

const [firstNameRaw, lastNameRaw, jobTitle] = process.argv.slice(2);

// Function to capitalize the first letter
function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

const firstName = capitalize(firstNameRaw);
const lastName = capitalize(lastNameRaw);

const folderName = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`;
const outputDir = path.join('employee', folderName);

// Read template
const template = fs.readFileSync('template/signature-template.html', 'utf8');

// Replace placeholders
const html = template
  .replace('{{FULL_NAME}}', `${firstName} ${lastName}`)
  .replace('{{JOB_TITLE}}', jobTitle);

// Create employee folder if it doesn't exist
fs.mkdirSync(outputDir, { recursive: true });

// Write the generated signature
fs.writeFileSync(path.join(outputDir, 'index.html'), html);

console.log(`Signature created for ${firstName} ${lastName} at ${outputDir}`);
