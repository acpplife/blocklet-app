declare module 'cookie' {
  export function serialize(name: string, value: string, options: Record<string, any>): string;
  export function parse(cookieHeader: string): { [key: string]: string };
}
