export function censorWords(text: string): string {
  const map: Record<string, string> = {
    job: "j*b",
    employ: "empl*y",
    shower: "sh*wer",
  };
  // build a regex that matches any of the keys, case-insensitive
  const pattern = new RegExp(Object.keys(map).join("|"), "gi");

  return text.replace(pattern, (matched) => {
    // lookup lowercase key
    const replacement = map[matched.toLowerCase()];
    // preserve uppercase first letter if needed:
    if (matched[0] === matched[0].toUpperCase()) {
      return replacement[0].toUpperCase() + replacement.slice(1);
    }
    return replacement;
  });
}
