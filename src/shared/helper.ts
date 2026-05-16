const languageExtensions: Record<string, string> = {
	cpp: 'cpp',
	go: 'go',
	elixir: 'ex',
	java: 'java',
	kotlin: 'kt',
	erlang: 'erl',
	python3: 'py',
	swift: 'swift',
	racket: 'rkt',
	python: 'py',
	rust: 'rs',
	javascript: 'js',
	ruby: 'rb',
	typescript: 'ts',
	csharp: 'cs',
	php: 'php',
	dart: 'dart',
	c: 'c',
	scala: 'scala',
};

// const languageNames = Object.keys(languageExtensions);

const getLanguageExtension = (language: string): string | undefined => {
	return languageExtensions[language];
};

const cleanWhitespace = (text: string): string => {
  return (
    text
      // Replace various types of spaces with regular spaces
      .replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, " ")
      // Remove zero-width characters
      .replace(/[\u200B-\u200D\u2060\uFEFF]/g, "")
      // Normalize line endings
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
  );
}
export { cleanWhitespace, getLanguageExtension };
