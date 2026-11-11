# Sofia Naushad — Portfolio

A responsive, light editorial portfolio built with Next.js 15, React 19 and TypeScript. The content is sourced from `src/lib/data.ts`, based on the supplied Master CV. The hero video and portrait are generated from the supplied introduction recording.

## Run locally

Requirements: Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. For a production build:

```bash
npm run build
npm start
```

## Sections

| Order | Section | Content |
|---|---|---|
| 01 | About | CV summary, developer ID card, contact facts |
| 02 | Skills | CV skill inventory with family filters and inspector |
| 03 | Work | Six CV projects, descriptions, features, tech and available links |
| 04 | Certifications | Three CV certifications |
| 05 | Experience | Two internships and two education entries |
| 06 | Achievements | CV achievements and AIVA research publication |
| 07 | Contact | CV email, phone, GitHub and LinkedIn |

## Content source of truth

Edit `src/lib/data.ts` to update the profile, navigation, skills, projects, experience, education, certifications and achievements. The website intentionally omits details not present in the CV (for example, missing project repositories and certification URLs). The hero heading uses the title confirmed for this portfolio. The resume download points to `public/resume/Sofia_Naushad_Master_CV.pdf`.

## Hero video pipeline

The source recording was 1920×1080, 30 FPS, approximately 10.1 seconds, with AAC audio. The supplied subject is centred. The asset script uses a configurable crop (`CROP`) and creates:

- `public/hero/hero.mp4` — H.264 video with AAC audio
- `public/hero/hero.webm` — VP9 video with Opus audio
- `public/portrait-bust.webp` — portrait still for the developer ID
- `public/og.jpg` — 1200×630 social preview

To rebuild from the original video, keep it at `assets/source-intro.mp4` and run:

```bash
python -m pip install numpy pillow
python scripts/build-hero-assets.py
```

The script also requires `ffmpeg` and `ffprobe` on PATH. Adjust `CROP = (x, y, width, height)` in the script if the source framing changes. It creates a 0.5-second picture crossfade at the loop seam and performs the audio crossfade in NumPy without FFmpeg `acrossfade`. The player starts muted, accepts an explicit visitor interaction to enable audio, and pauses/mutes when the hero is less than 35% visible.

## Design and implementation notes

- Monochrome warm-paper palette, responsive layouts, keyboard focus styles and reduced-motion support.
- Navigation tracks the active section; mobile navigation closes with Escape and locks page scrolling while open.
- Project panels are accessible disclosure buttons; the mock product panels are labelled **Illustrative UI** and are not real screenshots.
- Skills and projects are represented using text/CSS marks rather than third-party logos, avoiding unlicensed logo artwork.
- Native CSS smooth scrolling is used; `lenis` is included as a dependency for optional future integration but is not required by the current implementation.
- Fonts use local system fallbacks (`Arial`, Georgia and monospace) because font files/licenses were not included with the supplied materials. To self-host Inter Tight, Instrument Serif and JetBrains Mono, add their licensed `.woff2` files under `src/fonts` and declare them with `@font-face` in `globals.css`.

## Free hosting

The project can be deployed on Vercel's free Hobby tier: push the project to a Git repository, import it into Vercel, keep the default Next.js build settings (`npm run build`), and deploy. Static media is served from `public/`.

## Verification

Run `npm run build` locally before deployment. Test at desktop and mobile widths, check the video audio interaction and loop, keyboard operation, and `document.documentElement.scrollWidth === window.innerWidth`. No Lighthouse or Playwright score is claimed by this source delivery; those checks should be run in the deployment/browser environment.

## Credits and licences

- Portfolio content, CV PDF and intro recording: supplied by Sofia Naushad.
- Hero assets: generated locally from the supplied recording with FFmpeg, NumPy and Pillow.
- No third-party brand-logo assets are bundled. The illustrative interface panels are original CSS/HTML representations and are not product screenshots.
