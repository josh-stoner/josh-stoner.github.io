# josh-stoner.github.io

The source for Josh Stoner's portfolio site: case studies, writing, demos and app pages. It's served at https://josh-stoner.github.io/ by GitHub Pages.

## What it does

The site is plain static HTML, CSS and JavaScript. There's no framework, no package manifest and no build step in this repo.

- `index.html` is the home page, with sections for writing, work, how I work, and skill areas.
- `case-studies/` has long-form project write-ups, such as stonerOS, ClaudeUsage, and the performance feedback redesign.
- `writing/` has articles, including the "AI Brain" chapter series and the TeamOS series. Some articles come with an MP3 narration from `audio/`.
- `demos/` has interactive demos (currently `feedback-builder.html`).
- `klikwheel/` has the marketing page and privacy policy for the klikWheel app.
- `data-portrait.html` and `usage-audit.html` are standalone data pieces.

The home page, case studies and articles share `style.css` and `theme.js`. `theme.js` handles the light/dark toggle (saved in `localStorage`, defaulting to the system setting) and the scroll-reveal effect. The klikWheel pages, the demo and the two data pieces carry their own inline styles. Icons come from a local copy of Lucide (`lucide.min.js`), and fonts load from Google Fonts. Every page except the klikWheel pages includes a Google Analytics tag.

## Build and deploy

GitHub Pages publishes the `main` branch as it is. The `.nojekyll` file turns off Jekyll processing, so every file is served unchanged. To deploy, commit to `main` and push.

To preview locally, open `index.html` in a browser or serve the folder with any static file server.

Articles are written in the stonerOS repo, not here. Two stonerOS skills produce the files that get copied into this repo:

- `/build-html` converts a markdown article to HTML using the site's design system and makes an Open Graph image. The article goes into `writing/` and the image into `assets/og/`.
- `/build-audio` makes an MP3 narration with `edge-tts` (voice `en-US-BrianNeural`), saves it to `audio/`, and adds the audio player markup to the article's HTML.

Once an article is copied in, add a card for it to `index.html` and an entry to `sitemap.xml`.

## Project layout

```
index.html            Home page
style.css, theme.js   Shared styles, theme toggle, scroll reveal (main pages)
lucide.min.js         Icon library (vendored)
case-studies/         Case study pages
writing/              Articles
audio/                MP3 narrations for articles
demos/                Interactive demos
klikwheel/            klikWheel app page, privacy policy, screenshots
assets/images/        In-article figures
assets/og/            Open Graph share images
sitemap.xml, robots.txt, favicon.svg
```

## Author

Josh Stoner
