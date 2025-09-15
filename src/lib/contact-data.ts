import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface ResumeData {
  name: string;
  tagline?: string;
  contact: {
    email: string;
    linkedin?: string;
    telegram?: string;
    github?: { [key: string]: string };
  };
}

export function getContactData() {
  const resumesDir = path.join(process.cwd(), 'data');
  console.log(resumesDir)
  const filenames = fs.readdirSync(resumesDir);

  const latestResumeFile = filenames
    .filter((name) => name.endsWith('.yaml'))
    .sort()
    .pop();

  if (!latestResumeFile) {
    return null; // Or throw an error, depending on desired behavior
  }

  const filePath = path.join(resumesDir, latestResumeFile);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = yaml.load(fileContents) as ResumeData;

  return data;
}
