// Run with: node update-feeds.js 
const fs = require("fs");
(async () => {
  const txt = await (await fetch("https://www.openphish.com/feed.txt")).text();
  const hosts = [...new Set(txt.split(/\r?\n/).map(l => { try { return new URL(l).hostname; } catch {} }).filter(Boolean))];
  const feed = { source: "OpenPhish community feed", updated: new Date().toISOString().slice(0, 10), hosts };
  fs.writeFileSync("feeds.js", "window.FEED=" + JSON.stringify(feed) + ";");
  console.log(hosts.length, "hosts written to feeds.js");
})();
