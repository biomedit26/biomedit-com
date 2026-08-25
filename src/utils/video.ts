// Shared helpers for the news collection's optional `videoUrl` field —
// used by both /news (grid thumbnails) and /news/[slug] (embedded player).
// Supports YouTube URLs (watch/embed/short/live formats) and falls back to
// treating anything else as a direct video file URL (e.g. a self-hosted .mp4).

export function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?v=([\w-]+)/,
    /youtube\.com\/embed\/([\w-]+)/,
    /youtube\.com\/live\/([\w-]+)/,
    /youtu\.be\/([\w-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function getVideoThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
