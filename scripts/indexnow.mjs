// Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam...).
// Bing's index feeds ChatGPT search, so this is the fastest way to get new
// pages seen there. Run after each deploy:  node scripts/indexnow.mjs
const HOST = "lumagridsolar.com";
const KEY = "eb72787c379252bdc8453553ebae0e2f"; // served at https://lumagridsolar.com/eb72787c379252bdc8453553ebae0e2f.txt

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (urlList.length === 0) throw new Error("No URLs found in sitemap");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${res.status}`);
