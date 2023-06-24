export const normalizeName = (name: string) => {
  if (!name.includes("-")) {
    return name;
  }
  return name.replace("-", " ");
}
