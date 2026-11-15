// Oxfmt owns these spellings. The file is committed exactly as oxfmt prints it (format:check
// guards that) and must lint clean: a style rule that disagrees with the formatter would fail
// every formatted repository.
export const OPEN_BRACKET = 0x5b;
export const MASK = 0xffn;
export const LARGE = 1e5;
export const OCTAL = 0o17;
export const BINARY = 0b1010;
export const RATIO = 0.5;
export const EMPTY_ARRAY: readonly number[] = [];
export const EMPTY_OBJECT: Readonly<Record<string, never>> = {};
export const QUOTED = { key: 'value' };
