/** Avatar palette, assigned by roster position so a rep keeps the same colour on every board. */
export const AVATAR_COLORS = [
  "#ff7a50",
  "#ffc23a",
  "#27d69c",
  "#9b7bff",
  "#ff5fa2",
  "#4cc3ff",
  "#b9dd4f",
  "#ff9f43",
] as const;

export function avatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length] ?? AVATAR_COLORS[0];
}

/** "Priya N." → "PN". Names on boards are always first name + last initial. */
export function initials(name: string): string {
  const [first = "", last = ""] = name.replace(/\./g, "").split(/\s+/);
  return `${first.charAt(0)}${last.charAt(0)}`;
}

export function firstName(name: string): string {
  return name.split(" ")[0] ?? name;
}
