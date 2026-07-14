import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const homeSource = readFileSync(new URL("./home.tsx", import.meta.url), "utf8");

test("renders a Just arrived section after Latest Drop", () => {
  const latestDropIndex = homeSource.indexOf("Latest Drop");
  const justArrivedIndex = homeSource.indexOf("Just arrived");

  assert.notEqual(latestDropIndex, -1);
  assert.notEqual(justArrivedIndex, -1);
  assert.ok(justArrivedIndex > latestDropIndex);
  assert.match(homeSource, /VIEW ALL/);
  assert.match(homeSource, /Available in \{product\.sizes\} size/);
  assert.match(homeSource, /text-\[clamp\(2\.4rem,6vw,5rem\)\]/);
  assert.match(homeSource, /flex snap-x snap-mandatory gap-3 overflow-x-auto pr-4 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:pr-0/);
});

test("renders a What's New section after the hero", () => {
  const heroIndex = homeSource.indexOf("Hero Section");
  const whatsNewIndex = homeSource.indexOf("What's New Section");
  const latestDropIndex = homeSource.indexOf("Latest Drop Section");

  assert.notEqual(heroIndex, -1);
  assert.notEqual(whatsNewIndex, -1);
  assert.notEqual(latestDropIndex, -1);
  assert.ok(whatsNewIndex > heroIndex);
  assert.ok(whatsNewIndex < latestDropIndex);
  assert.match(homeSource, /WHAT'S NEW/);
  assert.match(homeSource, /Jackets/);
  assert.match(homeSource, /Hoodies/);
  assert.match(homeSource, /T-Shirt/);
  assert.match(homeSource, /LAST FEW/);
  assert.match(homeSource, /const whatsNewProducts = \[/);
  assert.match(homeSource, /image: "\/new1\.webp"/);
  assert.match(homeSource, /image: "\/new2\.webp"/);
  assert.match(homeSource, /image: "\/new3\.webp"/);
  assert.match(homeSource, /image: "\/new4\.webp"/);
  assert.match(homeSource, /Quick add \$\{product\.title\} from What's New to cart/);
});

test("styles Latest Drop header like the Just arrived header", () => {
  const latestDropContainer = /Latest Drop Section \*\/}\n      <section className="w-full bg-\[#f6f6f6\] py-10 md:py-16">\n        <div className="mx-auto max-w-\[1500px\] px-4 md:px-8 xl:px-12">/.test(homeSource);
  const latestDropHeading = /className="text-\[clamp\(2\.4rem,6vw,5rem\)\] font-light leading-\[0\.95\] tracking-\[-0\.06em\] text-black"[\s\S]*?>\s*Latest Drop/.test(homeSource);
  const discoverMoreLink = /className="mt-2 shrink-0 border-b-2 border-black pb-1\.5 text-\[13px\] font-medium uppercase tracking-\[0\.22em\] text-black transition-opacity hover:opacity-60 md:mt-5 md:text-2xl md:tracking-\[0\.28em\]"[\s\S]*?>\s*Discover More/.test(homeSource);

  assert.equal(latestDropContainer, true);
  assert.equal(latestDropHeading, true);
  assert.equal(discoverMoreLink, true);
});

test("quick add button adds Just arrived products to cart without navigating", () => {
  assert.match(homeSource, /import \{ useCart \} from "@\/contexts\/cart-context";/);
  assert.match(homeSource, /const \{ addToCart \} = useCart\(\);/);
  assert.match(homeSource, /function quickAddJustArrived/);
  assert.match(homeSource, /event\.preventDefault\(\);/);
  assert.match(homeSource, /event\.stopPropagation\(\);/);
  assert.match(homeSource, /addToCart\(/);
  assert.match(homeSource, /type="button"/);
  assert.match(homeSource, /aria-label=\{`Quick add \$\{product\.title\} to cart`\}/);
  assert.match(homeSource, /h-10 w-10.*rounded-full.*md:h-12 md:w-12/);
});

test("uses the new public images for Just arrived products", () => {
  const justArrivedSource = homeSource.slice(
    homeSource.indexOf("const justArrivedProducts"),
    homeSource.indexOf("export default function Home"),
  );

  assert.match(justArrivedSource, /title: "Black Blazer Dress",[\s\S]*?image: "\/new1\.webp"/);
  assert.match(justArrivedSource, /title: "Black High Leggings",[\s\S]*?image: "\/new2\.webp"/);
  assert.match(justArrivedSource, /title: "Clean White Trouser",[\s\S]*?image: "\/new3\.webp"/);
  assert.match(justArrivedSource, /title: "Cocoa Brown Trouser",[\s\S]*?image: "\/new4\.webp"/);
});

test("uses the new public hero image", () => {
  assert.match(homeSource, /src="\/hero1\.webp"/);
});

test("renders a full-bleed editorial hero", () => {
  assert.match(homeSource, /className="w-full bg-\[#f6f6f6\] pt-0 pb-0"/);
  assert.match(homeSource, /className="w-full px-0"/);
  assert.match(homeSource, /className="relative min-h-\[640px\] w-full overflow-hidden bg-black md:min-h-\[760px\]"/);
  assert.match(homeSource, /md:items-center md:justify-center md:text-center/);
  assert.match(homeSource, /md:text-base md:tracking-\[0\.36em\]/);
  assert.match(homeSource, /md:text-\[clamp\(4rem,5vw,7rem\)\]/);
  assert.match(homeSource, /md:px-12 md:py-5 md:text-base/);
  assert.match(homeSource, /SS26 STATEMENT PIECES/);
  assert.match(homeSource, /Bold by<br \/>\n\s+design/);
  assert.match(homeSource, /DISCOVER MORE/);
  assert.doesNotMatch(homeSource, /Shop now/);
  assert.doesNotMatch(homeSource, /Discover New Arrival/);
});

test("uses reveal-style Framer animations on homepage sections", () => {
  assert.match(homeSource, /initial=\{\{ opacity: 0, y: 60, clipPath: "inset\(32% 0 0 0\)" \}\}/);
  assert.match(homeSource, /whileInView=\{\{ opacity: 1, y: 0, clipPath: "inset\(0% 0 0 0\)" \}\}/);
  assert.match(homeSource, /transition=\{\{ duration: 1, delay: index \* 0\.1, ease: \[0\.22, 1, 0\.36, 1\] \}\}/);
});
