import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface ResumeData {
  name: string;
  contact: {
    email: string;
    location?: string;
    linkedin?: string;
    telegram?: string;
    github?: {
      personal: string;
      rockx?: string;
      bedrock?: string;
    };
    website?: string;
  };
  tagline?: string;
  summary: string;
  skills: {
    [key: string]: string[];
  } | Array<{
    name: string;
    items: string[];
  }>;
  experience: Array<{
    company: string;
    display_name?: string;
    role: string;
    location?: string;
    start_date: string;
    end_date: string;
    bullets: string[];
  }>;
  education: Array<{
    degree: string;
    university?: string;
    institution?: string;
    period: string;
    location?: string;
  }>;
  projects?: Array<{
    name: string;
    timeline: string;
    guide?: string;
    description: string;
    bullets?: string[];
    keywords?: string[];
  }>;
  open_source?: Array<{
    name: string;
    url: string;
    description: string;
  }>;
  interests?: string[];
  achievements?: string[];
}

export function getResumeData() {
  const resumesDir = path.join(process.cwd(), 'data'); // Read from data/ directory
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
