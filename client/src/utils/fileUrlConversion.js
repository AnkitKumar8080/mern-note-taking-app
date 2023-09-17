// accepts a file and converts to dataURL
export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function dataUrlToFile(dataUrl, fileName) {
  return new Promise((resolve, reject) => {
    // split the data url to get the base 64 enc data
    const base64Data = dataUrl.split(",")[1];
    // convert the base64 to binary data
    const binaryData = window.atob(base64Data);
    // create a unit8Array to hold the binary data
    const uint8Array = new Uint8Array(binaryData.length);
    // populate the uint8Array with binary data
    for (let i = 0; i < binaryData.length; i++)
      uint8Array[i] = binaryData.charCodeAt(i);

    // create a blob from the uint8array
    const blob = new Blob([uint8Array]);
    // create a file from blob
    const file = new File([blob], fileName, { type: blob.type });
    resolve(file);
  });
}
