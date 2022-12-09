import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";
import Environment from "./runtime/environment.ts";
import Parser from "./frontend/parser.ts";

function App() {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
      </head>
      <body>
        <h1>Hello world</h1>
      </body>
    </html>
  );
}



async function testing(req) {
  const parser = new Parser();
  const env = new Environment();
  const html = renderSSR(<App />)
  switch (req.method) {
    case "GET": {
      return new Response(html, {
        headers: {
          "content-type": "text/html",
        },
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
serve(testing);
