const AzureBlobAPI = {
  uploadFile: async (uploadUrl: string, file: File, contentType: string) => {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": contentType,
      },
      body: file,
    });
    return response.ok;
  },
};

export default AzureBlobAPI;
