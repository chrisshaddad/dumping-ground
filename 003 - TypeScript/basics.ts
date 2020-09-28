//Basic types

function add(
  n1: number,
  n2: number,
  showResult: boolean = false,
  phrase: string = '',
) {
  const result = n1 + n2;

  if (showResult) {
    console.log(result);
  }

  return result;
}

const number1 = 5;
const number2 = 9;

const newNum = add(number1, number2);

console.log(newNum);
