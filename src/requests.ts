import * as fs from 'fs';
import {
  IPresignedUploadParameters,
  ITranscript,
  ITranscriptCreateRequest,
  ITranscriptOutput,
} from './types';
import { API_BASE_URL, TEST_FILE, API_HEADERS } from './config';

export async function fetchFromATAPI<T>(
  input: string | URL | Request,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(input, init);
  const json = await res.json();

  if (!res.ok) {
    const helpText =
      res.status === 401 ? 'Ensure you are using a valid API key' : '';
    throw new Error(
      `API request failed: ${res.status}, ${res.statusText}, ${JSON.stringify(
        json,
        null,
        2,
      )}\n\n${helpText}\n`,
    );
  }

  return json;
}

export async function fetchPresignedUploadParams(): Promise<IPresignedUploadParameters> {
  return fetchFromATAPI(
    `${API_BASE_URL}/uploads/presignedPost?fileExtension=${TEST_FILE.extension}`,
    {
      headers: API_HEADERS,
    },
  );
}

export async function uploadFile(
  presignedUploadParams: IPresignedUploadParameters,
): Promise<void> {
  const formData = new FormData();

  for (const formField of presignedUploadParams.formFields) {
    formData.append(formField.name, formField.value);
  }

  const testFile = new Blob([fs.readFileSync(TEST_FILE.path)]);
  formData.append('file', testFile);

  const response = await fetch(presignedUploadParams.url, {
    method: 'POST',
    body: formData,
  });
}

export async function createTranscript(fileKey: string): Promise<ITranscript> {
  const transcriptCreateRequest: ITranscriptCreateRequest = {
    title: `API example app demo`,
    audioFileType: 'file',
    audioFileLocation: fileKey,
    doDiarization: false,
  };

  const response: ITranscript = await fetchFromATAPI(
    `${API_BASE_URL}/transcripts`,
    {
      method: 'POST',
      body: JSON.stringify(transcriptCreateRequest),
      headers: API_HEADERS,
    },
  );

  return response;
}

export async function fetchTranscript(
  transcriptId: string,
): Promise<ITranscript> {
  const response: ITranscript = await fetchFromATAPI(
    `${API_BASE_URL}/transcripts/${transcriptId}`,
    {
      headers: API_HEADERS,
    },
  );

  return response;
}

export async function fetchTranscriptOutput(
  transcriptId: string,
): Promise<ITranscriptOutput> {
  const response: ITranscriptOutput = await fetchFromATAPI(
    `${API_BASE_URL}/transcripts/${transcriptId}/output`,
    {
      headers: API_HEADERS,
    },
  );

  return response;
}
