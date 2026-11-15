interface Person {
  readonly name: string;
  readonly nickname?: string;
}

const greetings = new Map<string, string>([['ko', '안녕하세요']]);

export function greet(person: Person, locale: string): string {
  const { name, nickname } = person;
  const greeting = greetings.get(locale) ?? 'Hello';
  return `${greeting}, ${nickname ?? name}`;
}

export async function loadGreeting(fetchName: () => Promise<string>): Promise<string> {
  const name = await fetchName();
  return greet({ name }, 'ko');
}
