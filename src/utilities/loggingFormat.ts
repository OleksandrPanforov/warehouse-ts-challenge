import { ColorChange } from './colorChange.js';

function warning(message: string): string {
  return `${ColorChange.Yellow}[!] Warning: ${message}${ColorChange.Default}`;
}

function error(message: string): string {
  return `${ColorChange.Red}[X] Error: ${message}${ColorChange.Default}`;
}

function highlight(message: string): string {
  return `${ColorChange.Blue}[+] ${message}${ColorChange.Default}`;
}

function success(message: string): string {
  return `${ColorChange.Green}[✓] ${message}${ColorChange.Default}`;
}

export {
  warning, error, highlight, success,
};
