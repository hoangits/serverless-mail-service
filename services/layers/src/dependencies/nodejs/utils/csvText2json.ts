interface Csv2JsonOptions {
  allowWhiteSpace?: boolean;
  allowSpecialCharacter?: boolean;
}

const Csv2JsonOptionsDefault: Csv2JsonOptions = {
  allowWhiteSpace: true,
  allowSpecialCharacter: true,
};

const match = (content: string, options?: Csv2JsonOptions) => {
  const quoteChar = '"';
  const delimiter = ',';
  const regex = new RegExp(`\\s*(${quoteChar})?(.*?)\\1\\s*(?:${delimiter}|$)`, "gs");
  return [...content.matchAll(regex)].map((match) => {
    const { allowWhiteSpace, allowSpecialCharacter } = options;
    let result;
    if (!allowWhiteSpace && !allowSpecialCharacter) {
      result = match[2].replace(/[^\w\s]/gi, "").replace(/\s+/g, "");
    } else if (!allowWhiteSpace) {
      result = match[2].replace(/[^\w\s]/gi, "");
    } else if (!allowSpecialCharacter) {
      result = match[2].replace(/\s+/g, "");
    } else {
      result = match[2];
    }
    return result;
  }).filter((_, i, a) => i < a.length - 1);
};

export const csvToJsonImpl = (content: string, options: Csv2JsonOptions = Csv2JsonOptionsDefault) => {
  const lines = content.split("\n");
  const heads = match(lines.splice(0, 1)[0], { ...options, allowWhiteSpace: false, allowSpecialCharacter: false });

  return lines
    .map((line) => match(line, { ...options })
      .reduce((acc, cur, i) => ({
        ...acc,
        [heads[i] || `extra_${i}`]: cur || null,
      }), {}))
    .filter((element) => Object.keys(element).length > 0);
};
