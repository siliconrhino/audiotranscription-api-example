import { setTimeoutPromise } from './utils';
import {
  createTranscript,
  fetchPresignedUploadParams,
  fetchTranscript,
  fetchTranscriptOutput,
  uploadFile,
} from './requests';

(async function () {
  const presignedUploadParams = await fetchPresignedUploadParams();

  await uploadFile(presignedUploadParams);

  let transcript = await createTranscript(presignedUploadParams.key);

  console.log('created transcript: ', transcript);

  while (transcript.status === 'processing') {
    console.log('polling for transcript status changes...');

    await setTimeoutPromise(5000);

    transcript = await fetchTranscript(transcript.transcriptId);
  }

  console.log(`transcript status changed to: ${transcript.status}`);

  if (transcript.status === 'completed') {
    const output = await fetchTranscriptOutput(transcript.transcriptId);

    console.log(`transcript output: `, output);
  }
})();
