//Function return types can be avoided, unless explicitly needed to be infered
function add(n1: number, n2: number): number {
  return n1 + n2;
}

let arbitraryFunctionValue: Function;

arbitraryFunctionValue = add;

//Can be used as a function type to be assed as a parameter
let parseStringsToNumber: (text1: string, text2: string) => number;

//Incorrect syntax
//parseStringsToNumber = add;
