import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

import Parser from "./frontend/parser.ts";
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";

const html = `
<form method="POST" action="/">
  <input type="text" name="name" placeholder="Do some math">
  <button type="submit">Submit</button>
</form>
`;

async function handler(req: Request): Promise<Response> {
    const parser = new Parser();
    const env = new Environment();
    
    switch (req.method) {
        case "GET": {
        return new Response(html, {
            headers: { "content-type": "text/html; charset=utf-8" },
        });
        }

        case "POST": {
        const body = await req.formData();
        const name = body.get("name") || "anonymous";
        const program = parser.produceAST(name?.toString());
        const result = evaluate(program, env);
        return new Response(JSON.stringify(result))
        }

        default:
        return new Response("Invalid method", { status: 405 });
    }
}

serve(handler);
