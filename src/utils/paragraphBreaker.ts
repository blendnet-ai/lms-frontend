function splitIntoParagraphs(text: string): string[] {
  // TO Check if the input is a string
  if (typeof text !== "string") {
    console.error("Input is not a string");
    return [];
  }

  // Split by \n
  const paragraphs = text
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");
  return paragraphs;
}

export default splitIntoParagraphs;
