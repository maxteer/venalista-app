import 'shim';
import crypto from 'crypto';

export function generateHash(length = 16) {
  return crypto.randomBytes(length).toString('hex');
}
