// Read and minify HTML once at startup — served minified to all visitors
// so view-source shows a single compressed line, not readable code.
const rawHtml = await Deno.readTextFile("./index.html");

function minifyHtml(html: string): string {
  return html
    // Remove HTML comments (but not IE conditionals)
    .replace(/<!--(?!\[if)[\s\S]*?-->/g, "")
    // Remove whitespace between tags
    .replace(/>\s+</g, "><")
    // Collapse remaining whitespace runs to single space
    .replace(/\s{2,}/g, " ")
    .trim();
}

const minifiedHtml = minifyHtml(rawHtml);

Deno.serve((req: Request) => {
  const url = new URL(req.url);

  // Block direct access to source and data files
  if (
    url.pathname === "/iptv.txt" ||
    url.pathname === "/main.ts" ||
    url.pathname === "/deno.json" ||
    url.pathname === "/deno.lock"
  ) {
    return new Response("Not Found", { status: 404 });
  }

  // Secret playlist endpoint — reads from Deno Deploy env variable PLAYLIST
  // Set it in Deno Deploy dashboard > Settings > Environment Variables
  // Value: the full content of your iptv.txt (paste all lines there)
  if (url.pathname === "/api/ch") {
    const playlist = Deno.env.get("PLAYLIST") ?? "";
    return new Response(playlist, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  }

  // Serve minified HTML for every other path
  return new Response(minifiedHtml, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
});