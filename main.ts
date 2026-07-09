<<<<<<< HEAD
import { serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
    const url = new URL(req.url);
    if (url.pathname === "/iptv.txt") {
        return await serveFile(req, "./iptv.txt");
    }
    return await serveFile(req, "./index.html");
=======
import { serveFile } from "jsr:@std/http/file-server";

Deno.serve(async (req: Request) => {
    const url = new URL(req.url);
    if (url.pathname === "/iptv.txt") {
        return await serveFile(req, "./iptv.txt");
    }
    return await serveFile(req, "./index.html");
>>>>>>> 36ad3db5c8478c3039e5ae7962ca404b8c51e06e
});