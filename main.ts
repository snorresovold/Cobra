import Parser from "./frontend/parser.ts";
import { evaluate } from "./frontend/interpreter.ts";

function repl() {
    const parser = new Parser();
    console.log("Cobra v0.1")
    while (true) {

        const input = prompt("> ");
        // check for no user input or exit
        if (!input || input.includes("exit")) {
            Deno.exit(1)
        }

        const program = parser.produceAST(input);
        const result = evaluate(program)
        console.log(result)
    }
}
repl();