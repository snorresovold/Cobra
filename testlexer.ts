enum TokenType {
    OpenParen
    CloseParen
    BinaryOperator
}

function token(value = "", type: TokenType): Token {
	return { value, type };
}

function tokenize(sourcecode: string): Token[]{
    const tokens = new Array<Token>()
    const src = sourcecode.split("")

    while (src.length > 0) {
        if (src[0] == "(") {
            tokens.push(token(src.shift(), TokenType.OpenParen))
        }}
    return tokens;
}

const source = await Deno.readTextFile("./input.cobra")
for (const token of tokenize(source)) {
    console.log(token);
}