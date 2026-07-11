# Fiesta Party Hire Yeppoon Website

Static Netlify and GitHub Pages website for Fiesta Party Hire Yeppoon.

## Files

- `index.html` - main website page
- `styles.css` - visual styling and responsive layout
- `script.js` - navigation, reveal animations, and gallery preview
- `assets/` - logo, QR code, website images, and catalogue copy
- `assets/catalogue/fiesta-party-hire-yeppoon-product-catalogue.pdf` - product catalogue PDF
- `assets/catalogue/index.html` - digital catalogue version
- `netlify.toml` - Netlify publishing configuration
- `_headers` - Netlify production security and cache rules
- `404.html` - branded page-not-found screen
- `robots.txt` - search crawler access rules
- `.nojekyll` - keeps GitHub Pages from processing the site with Jekyll

## Deploy To Netlify With Drag And Drop

1. Sign in to Netlify and open the Sites page.
2. Choose `Add new site`, then `Deploy manually`.
3. Drag the complete `fiesta-website-github` folder into Netlify Drop.
4. Wait for the deploy to finish, then open the generated Netlify URL.

Do not upload only `index.html`. The `assets`, video, catalogue, CSS, JavaScript, `404.html`, and `netlify.toml` files must be uploaded together.

This is a media-rich catalogue folder. A Git-connected deploy is recommended because a browser drag-and-drop upload may take longer.

## Deploy To Netlify From Git

1. Push the complete folder to a Git repository.
2. In Netlify, choose `Add new site`, then `Import an existing project`.
3. Select the repository.
4. If this folder is the repository root, leave the base directory empty and use `.` as the publish directory.
5. If the repository contains the wider Codex workspace, use `outputs/fiesta-website-github` as the base directory and `.` as the publish directory.
6. Leave the build command empty because the website is static.
7. Deploy the site.

## Netlify Settings

- Build command: leave empty
- Publish directory: `.`
- Functions directory: not required
- Package installation: not required
- Node.js: not required

## Upload To GitHub Pages

1. Create a new GitHub repository.
2. Upload all files and folders from this `fiesta-website-github` folder.
3. In GitHub, open `Settings`.
4. Go to `Pages`.
5. Under `Build and deployment`, choose `Deploy from a branch`.
6. Select the `main` branch and `/root` folder.
7. Save and wait for GitHub Pages to publish the website.

## Notes

- The site is static HTML, CSS, and JavaScript only.
- All links use relative paths except the Facebook link.
- The product catalogue PDF is included under `assets/catalogue`.
- The digital catalogue version is also kept under `assets/catalogue`.
- Both MP4 files are included under `assets/video`.
- The website uses optimized H.264 MP4 copies with fast-start metadata and real extracted poster frames.
- Each published video file is below 10 MB for more reliable Netlify delivery.
- The original high-bitrate video copies are preserved outside the publish folder under `outputs/fiesta-video-originals`.
- Netlify serves the custom `404.html` automatically.
- Production security and cache headers are configured in `_headers`.
- No prices, package inclusions, dimensions, or unsupported availability claims were added.
