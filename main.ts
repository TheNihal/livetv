import { serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
    const url = new URL(req.url);

    // Block direct access to the playlist and source files
    if (
        url.pathname === "/iptv.txt" ||
        url.pathname === "/main.ts" ||
        url.pathname === "/deno.json" ||
        url.pathname === "/deno.lock"
    ) {
        return new Response("Not Found", { status: 404 });
    }

    // Serve playlist content internally at /api/ch
    if (url.pathname === "/api/ch") {
        return await serveFile(req, "./iptv.txt");
    }

    return await serveFile(req, "./index.html");
});