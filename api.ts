import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

const html = `
<form method="POST" action="/">
  <input type="text" name="name" placeholder="Your name">
  <button type="submit">Submit</button>
</form>
`;

async function handler(req: Request): Promise<Response> {
  switch (req.method) {
    case "GET": {
      return new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    case "POST": {
      const body = await req.formData();
      const name = body.get("name") || "anonymous";
      return new Response(`Hello ${name}!`);
    }

    default:
      return new Response("Invalid method", { status: 405 });
  }
}

serve(handler);
