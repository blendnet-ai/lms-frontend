export function extractCodeFromString(str: string) {
  const languageRegex = {
    python: /```python([\s\S]*?)```/,
    js: /```js([\s\S]*?)```/,
    java: /```java([\s\S]*?)```/,
    cpp: /```cpp([\s\S]*?)```/,
    c: /```c([\s\S]*?)```/,
  };

  let detectedLanguage = null;
  let codeBlock = null;

  // Loop through the languages and check if the string contains one of them
  for (const [lang, regex] of Object.entries(languageRegex)) {
    const match = str.match(regex);
    if (match) {
      detectedLanguage = lang; // Store the detected language
      codeBlock = match[1].trim(); // Extract and store the code block
      break; // Exit once the first match is found
    }
  }

  return {
    language: detectedLanguage,
    code: codeBlock,
  };
}
