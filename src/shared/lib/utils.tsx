export const stripLocale = (path: string) => {
  const parts = path.split("/").filter(Boolean);
  if (parts[0]?.length === 2) {
    parts.shift();
  }
  return "/" + parts.join("/");
};

export const stripLocalePage = (path: string) => {
  const parts = path.split("/").filter(Boolean);
  if (parts[0]?.length === 2) {
    parts.shift();
  }
  return "page-" + parts.join("/");
};
