import * as path from 'path';

const API_KEY = process.env.AT_API_KEY;
if (!API_KEY) {
  throw new Error('AT_API_KEY environment variable is required');
}

export const API_BASE_URL =
  process.env.AT_API_BASE_URL || 'https://api.audiotranscription.ai';

export const API_HEADERS = {
  'Content-type': 'application/json',
  Authorization: `Bearer ${API_KEY}`,
};

export const TEST_FILE = {
  path: path.resolve(path.join(__dirname, `../test-files/test-file.mp3`)),
  extension: 'mp3',
};
