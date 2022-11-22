package main

import (
	"fmt"
	"os"

	"github.com/snorresovold/cobra/lexer"
)

const (
	EOF = iota
	ILLEGAL
	IDENT
	INT
	SEMI // ;

	// Infix ops
	ADD // +
	SUB // -
	MUL // *
	DIV // /

	ASSIGN // =
)

func main() {
	file, err := os.Open("input.cobra")
	if err != nil {
		panic(err)
	}

	lexer := lexer.NewLexer(file)

	for {
		pos, tok, lit := lexer.Lex()
		if tok == EOF {
			break
		}
		fmt.Println(pos, tok, lit)
	}
}
