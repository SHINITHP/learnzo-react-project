declare module 'iso-countries-languages' {
  export function getLangName(code: string): string;
  export function getLangNativeName(code: string): string;
  export function getSupportedLangs(): string[];
}
