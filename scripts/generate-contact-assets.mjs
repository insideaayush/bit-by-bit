import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import qrcode from 'qrcode';

async function generateContactAssets() {
  const dataDir = path.join(process.cwd(), 'data');
  let resumeDataYamlContent = '';

  try {
    const filenames = await fs.readdir(dataDir);
    const latestResumeFile = filenames
      .filter((name) => name.endsWith('.yaml'))
      .sort()
      .pop();

    if (!latestResumeFile) {
      console.error('Error: No resume YAML file found in data/ directory.');
      console.error('Please ensure your resume data is available in data/ for asset generation.');
      process.exit(1);
    }

    const filePath = path.join(dataDir, latestResumeFile);
    resumeDataYamlContent = await fs.readFile(filePath, 'utf8');

  } catch (e) {
    console.error('Error reading resume data from data/ directory:', e);
    process.exit(1);
  }

  let data;
  try {
    data = yaml.load(resumeDataYamlContent);
  } catch (e) {
    console.error('Error parsing resume data from data/ directory:', e);
    process.exit(1);
  }

  const contact = data.contact;
  const name = data.name;

  // --- Generate vCard --- //
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${name};;;;\nFN:${name}\n`;
  if (contact.email) vcard += `EMAIL;type=INTERNET;type=WORK;type=PREF:${contact.email}\n`;
  if (contact.phone) vcard += `TEL;type=CELL;type=VOICE;type=PREF:${contact.phone}\n`; // Assuming a 'phone' field might exist
  if (contact.linkedin) vcard += `URL;type=LinkedIn:${contact.linkedin}\n`;
  if (contact.website) vcard += `URL;type=Website:${contact.website}\n`;
  // Add other fields as needed, e.g., address, organization
  vcard += `END:VCARD`;

  const publicDir = path.join(process.cwd(), 'public');
  const vcardPath = path.join(publicDir, 'contact.vcf');
  const qrCodePath = path.join(publicDir, 'contact-qr.png');

  try {
    // --- Generate QR Code --- //
    await qrcode.toFile(qrCodePath, vcard, { type: 'png', errorCorrectionLevel: 'M', color: { dark: '#004d00', light: '#f0f0e0' } });
    console.log('Generated contact-qr.png');

  } catch (e) {
    console.error('Error generating contact assets:', e);
    process.exit(1);
  }
}

generateContactAssets();