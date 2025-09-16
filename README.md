# Personal Website & Blog Engine

This repository contains the source code for a personal website, portfolio, and blog, originally built for [aayushgautam.xyz](https://aayushgautam.xyz).

Built with Next.js, React, and TypeScript, and deployed via GitHub Actions.

## Content Management

All content is managed by adding files to the `posts/` directory. The site is statically generated, so the build process handles the discovery and rendering of new content.

### Adding a New Blog Post

1.  **Create a Markdown File:** Create a new `.md` file inside the `posts/` directory.
2.  **Name the File:** The filename must follow the format `YYYY-MM-DD-your-post-title.md`.
3.  **Add Frontmatter:** At the top of the file, add the required frontmatter:
    ```yaml
    ---
    title: "Your Awesome Blog Post Title"
    date: "YYYY-MM-DD"
    ---
    ```
4.  **Write Content:** Write your blog post content below the frontmatter using Markdown.

#### Creating a Draft

To create a draft post that is only visible in your local development environment, append `-draft` to the filename.

-   **Example:** `YYYY-MM-DD-my-secret-post-draft.md`

Draft posts will show up when you run `npm run dev` but will be automatically excluded from the final production build when you publish the site.

### Adding a New Gallery Image

The gallery is generated from images that are processed during the build.

1.  **Prepare Your Image:** Get the source image you want to add (e.g., a `.jpg` or `.png`).
2.  **Name the Image File:** The filename is important and must follow the format `YYYY-MM-DD-Your-Image-Description.jpg`. The description part of the name will be used as the image title.
3.  **Add Image to `posts/`:** Place the named image file directly into the `posts/` directory.
4.  **Automatic Processing:** During the build process, a script will automatically optimize this image, resize it, and place the final version in the `public/images/` directory, from where it will be picked up by the gallery page. You do not need to do anything else.

## Running Locally

To run the website on your local machine:

1.  **Install Dependencies:**
    ```bash
    npm install
    ```
2.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:3000`. To see draft posts, you can optionally create a `.env.local` file and add the line `APP_ENV=development`.

## Publishing the Site

This site is configured for continuous deployment.

1.  **Commit and Push:** Commit all your changes (new posts, images, or code changes) and push them to the `main` branch.
    ```bash
    git add .
    git commit -m "Add new blog post"
    git push origin main
    ```
2.  **Automatic Deployment:** Pushing to the `main` branch automatically triggers a GitHub Actions workflow. This workflow builds the website, processes new content, and deploys the final static site to GitHub Pages.
3.  **Go Live:** Your changes will be live at your configured domain within a few minutes.

## License

If you wish to use my project code as a starting point for your own personal website, you are free to do so.