export function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

// CPF 000.000.000-00
export function maskCPF(value: string) {
  const numbers = onlyNumbers(value).slice(0, 11);

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, "$1.$2");
  if (numbers.length <= 9)
    return numbers.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");

  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Data dd/mm/aaaa
export function maskDate(value: string) {
  const numbers = onlyNumbers(value).slice(0, 8);

  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return numbers.replace(/(\d{2})(\d+)/, "$1/$2");

  return numbers.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
}

// Validação REAL CPF
export function isValidCPF(cpf: string): boolean {
  const numbers = cpf.replace(/\D/g, "");

  if (numbers.length !== 11) return false;
  if (/^(\d)\1+$/.test(numbers)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i);
  }

  let first = (sum * 10) % 11;
  if (first === 10) first = 0;
  if (first !== parseInt(numbers[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i);
  }

  let second = (sum * 10) % 11;
  if (second === 10) second = 0;

  return second === parseInt(numbers[10]);
}
