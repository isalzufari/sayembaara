function generateRandomFileName(fileType) {
  const currentEpochTimestamp = Math.floor(new Date().getTime() / 1000);
  const randomInt = Math.floor(Math.random() * 1000) + 1;
  return `${currentEpochTimestamp}_${randomInt}.${fileType}`;
}

module.exports = generateRandomFileName;
