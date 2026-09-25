/**
 * Parses user input video links or iframe embed codes
 * Supports YouTube (watch, youtu.be, shorts), Vimeo, direct MP4 video files, or raw iframe strings
 */

export interface ParsedVideo {
  type: 'youtube' | 'vimeo' | 'mp4' | 'iframe' | 'placeholder';
  src: string;
  originalInput: string;
}

export function parseVideoUrl(input: string): ParsedVideo {
  const trimmed = (input || '').trim();

  if (!trimmed) {
    return {
      type: 'placeholder',
      src: '',
      originalInput: ''
    };
  }

  // Check if it's an iframe code
  if (trimmed.includes('<iframe')) {
    const srcMatch = trimmed.match(/src=["'](.*?)["']/);
    if (srcMatch && srcMatch[1]) {
      return {
        type: 'iframe',
        src: srcMatch[1],
        originalInput: trimmed
      };
    }
  }

  // Direct MP4 or video file
  if (/\.(mp4|webm|ogg)($|\?)/i.test(trimmed)) {
    return {
      type: 'mp4',
      src: trimmed,
      originalInput: trimmed
    };
  }

  // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
  const ytShortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (ytShortsMatch && ytShortsMatch[1]) {
    return {
      type: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${ytShortsMatch[1]}?autoplay=1&rel=0`,
      originalInput: trimmed
    };
  }

  // YouTube youtu.be: https://youtu.be/VIDEO_ID
  const ytShortUrlMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (ytShortUrlMatch && ytShortUrlMatch[1]) {
    return {
      type: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${ytShortUrlMatch[1]}?autoplay=1&rel=0`,
      originalInput: trimmed
    };
  }

  // YouTube watch: https://www.youtube.com/watch?v=VIDEO_ID
  const ytWatchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]+)/);
  if (ytWatchMatch && ytWatchMatch[1]) {
    return {
      type: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${ytWatchMatch[1]}?autoplay=1&rel=0`,
      originalInput: trimmed
    };
  }

  // YouTube embed: https://www.youtube.com/embed/VIDEO_ID
  const ytEmbedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (ytEmbedMatch && ytEmbedMatch[1]) {
    return {
      type: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${ytEmbedMatch[1]}?autoplay=1&rel=0`,
      originalInput: trimmed
    };
  }

  // Vimeo: https://vimeo.com/123456789
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      src: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`,
      originalInput: trimmed
    };
  }

  // Fallback to iframe src if it looks like an HTTPS URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return {
      type: 'iframe',
      src: trimmed,
      originalInput: trimmed
    };
  }

  return {
    type: 'placeholder',
    src: '',
    originalInput: trimmed
  };
}
