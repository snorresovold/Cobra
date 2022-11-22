


export enum TokenType {
    Number,
    Identifier,
    Equals,
    OpenParen, CloseParen,
    BinaryOperator,
    Let,
}

export interface Token {
    value: string,
    type: TokenType,
}

function token (value = "", type: TokenType): Token {
    return {value, type};
}


// checks if src is alphabetic
function isAlpha (src: string) {
    return src.toUpperCase() != src.toLowerCase();
}

// checks if src int
function isInt (src: string) {
    const c = src.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
    return (c >= bounds[0] && c <= bounds[1]) // bounds[0] unicode index of 0
}


// simply builds tokens
export function tokenize (sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");
    
    // build each token until end of file
    while (src.length > 0){
        if (src[0] == "(") {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        } else if (src[0] == ")") {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        } else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/") {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] == "=") {
            tokens.push(token(src.shift(), TokenType.Equals));
        } else {
            // handle multi char tokens

            // Build number token
            if (isInt(src[0])) {
                let num = "";
                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }
            }

        }
    }
    return tokens;
}