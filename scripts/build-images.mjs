
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const postsDirectory = path.join(process.cwd(), 'posts');
const publicImagesDirectory = path.join(process.cwd(), 'public/images');

async function optimizeImages() {
  try {
    // Ensure the public/images directory exists
    await fs.mkdir(publicImagesDirectory, { recursive: true });

    const fileNames = await fs.readdir(postsDirectory);

    for (const fileName of fileNames) {
      const extension = path.extname(fileName).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.gif'].includes(extension)) {
        const inputPath = path.join(postsDirectory, fileName);
        const outputPath = path.join(publicImagesDirectory, fileName);

        console.log(`Optimizing ${fileName}...`);

        await sharp(inputPath)
          .resize(800) // Resize to a max width of 800px
          .jpeg({ quality: 80 }) // Convert to JPEG with 80% quality
          .toFile(outputPath);

        console.log(`Successfully optimized ${fileName}`);
      }
    }
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();
