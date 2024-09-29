const extractYouTubeId = (url: string) => {
  let videoId = null;

  // Match regular YouTube URLs
  const youtubeRegex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=))([^?&\s]+)/;

  // Match shortened youtu.be URLs
  const shortUrlRegex = /youtu\.be\/([^?&\s]+)/;

  // Test for regular YouTube URL
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[1]) {
    videoId = youtubeMatch[1];
  }
  // Test for short URL
  else {
    const shortUrlMatch = url.match(shortUrlRegex);
    if (shortUrlMatch && shortUrlMatch[1]) {
      videoId = shortUrlMatch[1];
    }
  }

  return videoId;
};

export default extractYouTubeId;
