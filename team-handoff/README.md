# VISTRX AI homepage handoff

Open `index.html` in a browser. The page is intentionally plain HTML and CSS so it can be edited without touching the React/Vinext components.

## Automatic sync

`team-handoff` is the editing source of truth. Before local development or a production build, the project automatically copies these files into `public/`:

- `index.html` → `public/index-static.html`
- `styles.css` → `public/styles.css`
- `vistrx-logo.jpg` → `public/vistrx-logo.jpg`

Run `pnpm run sync:standalone` to sync manually. `pnpm dev` and `pnpm build` run the sync automatically. A build still needs to be published before the changes appear on `vistrx.ai`.

## Video files

For the deployed site, place these two files in `public/video/`:

- `holography.mp4` for the current holographic display business
- `holography-game.mp4` for the future holographic game experience

Both video elements already use `autoplay`, `muted`, `loop`, `playsinline`, and `object-fit: cover`. The gradient backgrounds remain visible until the videos are added.

## Main edit points

- Navigation and page copy: `index.html`
- Colors, typography, spacing and responsive behavior: `styles.css`
- Logo asset: `vistrx-logo.jpg`
