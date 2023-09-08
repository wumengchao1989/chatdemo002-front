import { BlobServiceClient } from "@azure/storage-blob";
const blobSasUrl =
  " https://lcpocstorageaccount.blob.core.windows.net/?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2023-09-08T15:01:59Z&st=2023-09-08T07:01:59Z&spr=https&sig=EmDRKCYLdKczAOcjhgfVLUh1kgU5XytrG1lNdDA3050%3D";
const blobServiceClient = new BlobServiceClient(blobSasUrl);
console.log("create client");
// Create a unique name for the container by
// appending the current time to the file name
const containerName = "poccontainer";
// Get a container client from the BlobServiceClient
const containerClient = blobServiceClient.getContainerClient(containerName);
export default containerClient;
