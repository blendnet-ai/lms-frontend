const pdfPreviewLinkConverter = (pdfLink: string) => {
  const pdfLinkArray = pdfLink.split("/");
  const pdfId = pdfLinkArray[pdfLinkArray.length - 2];
  return `https://drive.google.com/file/d/${pdfId}/preview`;
};

export default pdfPreviewLinkConverter;
