import { serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
    const url = new URL(req.url);
    if (url.pathname === "/iptv.txt") {
        return await serveFile(req, "./iptv.txt");
    }
    return await serveFile(req, "./index.html");
});