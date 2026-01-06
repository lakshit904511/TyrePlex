const fs = require("fs");
const path = require("path");

exports.readJSON = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return data ? JSON.parse(data) : [];
};

exports.writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};
