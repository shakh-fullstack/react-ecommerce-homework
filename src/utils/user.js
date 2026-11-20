// "Azizbek Karimov" -> "AK"
export function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

// "Azizbek Karimov" -> "Azizbek K."
export function getShortName(name) {
  const [firstName, lastName] = name.split(" ").filter(Boolean);
  return lastName ? `${firstName} ${lastName[0].toUpperCase()}.` : firstName;
}
