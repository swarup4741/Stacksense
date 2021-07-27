export const fileSize = (size) => {
  if (size / 1024 < 1) {
    return `${size} B`;
  } else if (size / Math.pow(1024, 2) < 1) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / Math.pow(1024, 2)).toFixed(2)} MB`;
  }
};
