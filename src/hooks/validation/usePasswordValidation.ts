// src/hooks/validation/usePasswordValidation.ts
export function usePasswordValidation(password: string) {
  const rules = {
    min: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isStrong = Object.values(rules).every(Boolean);

  return {
    rules,
    isStrong,
  };
}
