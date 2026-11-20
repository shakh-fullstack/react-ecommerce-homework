export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

// "+998 90 123 45 67", "998901234567" yoki "90 123 45 67" — hammasi to'g'ri
export function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return (digits.length === 12 && digits.startsWith("998")) || digits.length === 9;
}
