import { greet } from './greeting';

export function checkGreeting(): boolean {
  return greet({ name: 'Ada' }, 'en') === 'Hello, Ada';
}
