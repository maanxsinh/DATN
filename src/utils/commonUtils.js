const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const bufferToBase64 = (img) => {
  const imageShow = new Buffer(img, "base64").toString("binary");
  return imageShow;
};

module.exports = {
  getBase64: getBase64,
  bufferToBase64: bufferToBase64,
};
