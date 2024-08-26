export class StringUtil {
  static convertKebabToTitleCase = (str: string) => {
    return str
      .split("-") // Split the string by hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "); // Join the words with spaces
  };

  static replaceNewlinesWithMdNewLines(text: string): string {
    let result = text.replace(/\n/g, "&nbsp;\n\n");

    return result;
  }
}
