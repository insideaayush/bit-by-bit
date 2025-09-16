import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import qrcode from 'qrcode';

async function generateContactAssets() {
  const resumeDataYaml = process.env.RESUME_DATA_YAML;

  if (!resumeDataYaml) {
    console.error('Error: RESUME_DATA_YAML environment variable not found.');
    console.error('Please ensure your resume data is set as a GitHub Secret named RESUME_DATA_YAML.');
    process.exit(1);
  }

  let data;
  try {
    data = yaml.load(resumeDataYaml);
  } catch (e) {
    console.error('Error parsing RESUME_DATA_YAML:', e);
    process.exit(1);
  }

  const contact = data.contact;
  const name = data.name;

  // --- Generate vCard ---
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
    await fs.writeFile(vcardPath, vcard);
    console.log('Generated contact.vcf');

    // --- Generate QR Code ---
    await qrcode.toFile(qrCodePath, vcard, { type: 'png', errorCorrectionLevel: 'H' });
    console.log('Generated contact-qr.png');

  } catch (e) {
    console.error('Error generating contact assets:', e);
    process.exit(1);
  }
}

generateContactAssets();
