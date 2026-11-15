import { readFile } from 'node:fs/promises';

export async function printFile(path: string): Promise<void> {
  const content = await readFile(path, 'utf8');
  console.log(content);
}
