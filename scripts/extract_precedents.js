// Prints the precedent templates from lessons.js as JSON (used by build_precedents.py).
global.window = {};
require("../lessons.js");
const l = window.LESSONS.find((x) => x.id === "precedents");
const re = /<div class="prec" data-title="([^"]+)">[\s\S]*?<pre>([\s\S]*?)<\/pre>/g;
const un = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const out = [];
let m;
while ((m = re.exec(l.html))) out.push({ title: m[1], text: un(m[2]) });
process.stdout.write(JSON.stringify(out, null, 1));
