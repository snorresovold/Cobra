/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";

import Parser from "./frontend/parser.ts";
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";

function App() {
  return (
    <html>
      <head>
        <title>Hello from JSX</title>
      </head>
      <body>
        <h1>Hello world</h1>
          <form method="POST" action="/">
            <input type="text" name="name" placeholder="Do some math" />
            <button type="submit">Submit</button>
          </form>
      </body>
    </html>
  );
}

async function handler(req) {
  const parser = new Parser();
  const env = new Environment();
     

  const html = renderSSR(<App />);
  switch (req.method) {
    case "GET": {
      return new Response(html, {
        headers: {"content-type": "text/html; charset=utf-8"}
      })
    }
    case "POST": {
      const body = await req.formData();
      const name = body.get("name") || "anonymous";
      const program = parser.produceAST(name?.toString());
      const result = evaluate(program, env);
      return new Response(JSON.stringify(result))
    }
  }
}

serve(handler);