import { assertEquals } from 'https://deno.land/std/testing/asserts.ts'; 
import { TokenType, tokenize } from '../frontend/lexer.js'; 

Deno.test('Tokenize basic arithmetic expression', () => {
  const sourceCode = "(let x = 10 + 20)";
  const expectedTokens = [
    { type: TokenType.OpenParen, value: '(' },
    { type: TokenType.Let, value: 'let' },
    { type: TokenType.Identifier, value: 'x' },
    { type: TokenType.Equals, value: '=' },
    { type: TokenType.Number, value: '10' },
    { type: TokenType.BinaryOperator, value: '+' },
    { type: TokenType.Number, value: '20' },
    { type: TokenType.CloseParen, value: ')' },
    { type: TokenType.EOF, value: 'EndOfFile' },
  ];
  assertEquals(tokenize(sourceCode), expectedTokens);
});

Deno.test('Tokenize expression with a reserved keyword (const)', () => {
    const sourceCode = "const y = 30 * 2";
    const expectedTokens = [
      { type: TokenType.Const, value: 'const' },
      { type: TokenType.Identifier, value: 'y' },
      { type: TokenType.Equals, value: '=' },
      { type: TokenType.Number, value: '30' },
      { type: TokenType.BinaryOperator, value: '*' },
      { type: TokenType.Number, value: '2' },
      { type: TokenType.EOF, value: 'EndOfFile' },
    ];
    assertEquals(tokenize(sourceCode), expectedTokens);
  });