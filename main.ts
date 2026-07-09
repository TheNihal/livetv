import { serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
    const url = new URL(req.url);

    // Block direct access to source files
    if (
        url.pathname === "/iptv.txt" ||
        url.pathname === "/main.ts" ||
        url.pathname === "/deno.json" ||
        url.pathname === "/deno.lock"
    ) {
        return new Response("Not Found", { status: 404 });
    }

    // Serve playlist at hidden endpoint by reading file directly
    if (url.pathname === "/api/ch") {
        const content = await Deno.readTextFile("./iptv.txt");
        return new Response(content, {
            headers: { "content-type": "text/plain; charset=utf-8" },
        });
    }

    return await serveFile(req, "./index.html");
});