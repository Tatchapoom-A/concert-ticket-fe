export function getCookie(name: string) {
  if (typeof document === "undefined") return null
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1]
}