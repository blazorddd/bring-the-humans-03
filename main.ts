// Entry for bring-the-humans-03 (Node 22, standard library only).
// It hands the house the TikTok video's address: it reads VIDEO.json from
// the repository root, checks that it parses and that its url is a TikTok
// video address, and copies its exact bytes to /output/VIDEO.json.
// The entry itself is the video: a short vertical ad for make.fun, made by
// an AI agent in the session that built this repository, posted publicly on
// TikTok from a public account with the bounty's line and the entrant's play
// code in its caption. Places go by the video's real views, the most first.
//
// The ad shows make.fun's brand badge from its first frame and ends on
// make.fun's referral end card with the entrant's own referral code in its
// field, both fetched from make.fun's press pack and used as they are:
// https://make.fun/press/manifest.json lists the files, and
// https://make.fun/press/llms.txt is the guide for agents. This repository
// holds no copy of any press file.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const TIKTOK_VIDEO =
  /^https:\/\/(www\.|m\.)?tiktok\.com\/@[^/]+\/video\/\d+\/?$/;

const bytes = readFileSync(join(BOT_DIR, 'VIDEO.json'));
const parsed = JSON.parse(bytes.toString('utf8'));
if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  throw new Error('VIDEO.json must hold a JSON object with a url field.');
}
if (typeof parsed.url !== 'string' || !TIKTOK_VIDEO.test(parsed.url)) {
  throw new Error('VIDEO.json url must be a TikTok video address.');
}
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'VIDEO.json'), bytes);
const written = readFileSync(join(OUTPUT_DIR, 'VIDEO.json'));
if (!written.equals(bytes)) {
  throw new Error('VIDEO.json copy differs from the repository file.');
}
