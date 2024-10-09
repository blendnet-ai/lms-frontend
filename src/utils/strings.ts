export class StringUtil {
  static convertKebabToTitleCase = (str: string) => {
    return str
      .split("-") // Split the string by hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join the words with spaces
  };

  static replaceNewlinesWithSpacesOutsideCodeBlocks(text: string): string {
    return text.replace(/(```[\s\S]*?```)|\n/g, (match, codeBlock) => {
      if (codeBlock) {
        return `\n${codeBlock}\n`;
      }
      return "&nbsp;\n\n";
    });
  }

  static replaceNewlinesWithOneSpaceOutsideCodeBlocks(text: string): string {
    return text.replace(/(```[\s\S]*?```)|\n/g, (match, codeBlock) => {
      if (codeBlock) {
        return `\n${codeBlock}\n`;
      }
      return "\n\n";
    });
  }
}
