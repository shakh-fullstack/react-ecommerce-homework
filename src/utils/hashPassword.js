// Parolni ochiq holda saqlamaslik uchun SHA-256 xeshga aylantiramiz.
// Eslatma: bu faqat backendsiz demo uchun. Haqiqiy loyihada parol serverda tekshiriladi.
export async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
