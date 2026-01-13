// Remove tudo que não é número
export function onlyNumbers(value: string) {
  return value.replace(/\D/g, "");
}

// Máscara de CPF: 000.000.000-00
export function maskCPF(value: string) {
  const numbers = onlyNumbers(value).slice(0, 11);

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, "$1.$2");
  if (numbers.length <= 9)
    return numbers.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");

  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Máscara de data: dd/mm/aaaa
export function maskDate(value: string) {
  const numbers = onlyNumbers(value).slice(0, 8);

  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return numbers.replace(/(\d{2})(\d+)/, "$1/$2");

  return numbers.replace(/(\d{2})(\d{2})(\d+)/, "$1/$2/$3");
}
