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

test("styles Latest Drop header like the Just arrived header", () => {
  const latestDropContainer = /Latest Drop Section \*\/}\n      <section className="w-full bg-\[#fcfaf7\] py-10 md:py-16">\n        <div className="mx-auto max-w-\[1500px\] px-4 md:px-8 xl:px-12">/.test(homeSource);
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
