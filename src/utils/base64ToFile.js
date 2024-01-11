const fs = require('fs');
const path = require('path');

const nameGenerator = require('./nameGenerator');

function extractBase64Info(base64String) {
  const matches = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-+.]+);base64,(.+)$/);

  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string format');
  }

  const mimeType = matches[1];
  const folder = mimeType.split('/')[0];
  const formatType = mimeType.split('/')[1];
  const base64Data = matches[2];

  const folderPath = `${folder}`;

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, nameGenerator(formatType));

  const binaryData = Buffer.from(base64Data, 'base64');

  fs.writeFileSync(filePath, binaryData);

  return filePath;
}

module.exports = extractBase64Info;
