function convertToEmbedLink(youtubeLink: string): string {
  if (!youtubeLink) {
    return "";
  }

  const videoId = youtubeLink.split("watch?v=")[1];
  if (!videoId) {
    return "";
  }

  return youtubeLink.split("watch?v=")[0] + "embed/" + videoId;
}

export default convertToEmbedLink;
