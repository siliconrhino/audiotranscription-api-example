export interface ITranscriptCreateRequest {
  title: string;
  audioFileType: 'file' | 'url';
  audioFileLocation: string;
  doDiarization: boolean;
  language?: TranscriptLanguage;
}

export interface ITranscript {
  transcriptId: string;
  userId: string;
  title: string;
  status: 'processing' | 'completed' | 'failed';
  diarizationStatus: 'none' | 'processing' | 'completed' | 'failed';
  language: TranscriptLanguage | null;
  createdAt: string;
}

export interface ITranscriptOutput {
  transcriptNodes: {
    start: number;
    end: number;
    speakerId: number | null;
    text: string;
  }[];
  speakers: Record<number, string>;
}

export interface IPresignedUploadParameters {
  url: string;
  key: string;
  formFields: Array<{ name: string; value: string }>;
}

export type TranscriptLanguage =
  | 'autoDetect'
  | 'af'
  | 'ar'
  | 'hy'
  | 'az'
  | 'be'
  | 'bs'
  | 'bg'
  | 'ca'
  | 'zh'
  | 'hr'
  | 'cs'
  | 'da'
  | 'nl'
  | 'en'
  | 'et'
  | 'fi'
  | 'fr'
  | 'gl'
  | 'de'
  | 'el'
  | 'he'
  | 'hi'
  | 'hu'
  | 'is'
  | 'id'
  | 'it'
  | 'ja'
  | 'kn'
  | 'kk'
  | 'ko'
  | 'lv'
  | 'lt'
  | 'mk'
  | 'ms'
  | 'mr'
  | 'mi'
  | 'ne'
  | 'no'
  | 'fa'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'sr'
  | 'sk'
  | 'sl'
  | 'es'
  | 'sw'
  | 'sv'
  | 'tl'
  | 'ta'
  | 'th'
  | 'tr'
  | 'uk'
  | 'ur'
  | 'vi'
  | 'cy';
