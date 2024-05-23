export class CalculationsUtil {
  static countWords(text: string): number {
    if (!text) {
      return 0;
    }
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  }
}
