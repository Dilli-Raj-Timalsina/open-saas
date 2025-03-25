import { v4 as uuidv4 } from 'uuid';

export function generateUUID(length: number = 15): string {
  return uuidv4().replace(/-/g, '').substring(0, length);
}
