const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop();
  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  )
    return "video";
  if (fileExtension === "mp3" || fileExtension === "wav") return "audio";
  if (
    fileExtension === "png" ||
    fileExtension === "jpeg" ||
    fileExtension === "jpg" ||
    fileExtension === "gif"
  )
    return "image";
  return "file";
};

const transformImage = (url = "", width = 100) => url;
const getLast7days = () => {};

const getorSaveFromStorage = ({ key, value, get }) => {
  if (get)
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  else localStorage.setItem(key, JSON.stringify(value));
};
export { fileFormat, transformImage, getLast7days, getorSaveFromStorage };
