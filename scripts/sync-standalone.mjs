import { cpSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = resolve(projectRoot, 'team-handoff');
const publicDir = resolve(projectRoot, 'public');

mkdirSync(publicDir, { recursive: true });

const files = [
  ['index.html', 'index-static.html'],
  ['styles.css', 'styles.css'],
  ['vistrx-logo.jpg', 'vistrx-logo.jpg'],
];

for (const [sourceName, targetName] of files) {
  cpSync(resolve(sourceDir, sourceName), resolve(publicDir, targetName));
}

console.log('Standalone site synced from team-handoff to public.');
