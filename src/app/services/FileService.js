import csv from 'ya-csv';
import fs from 'fs';

export const removeFile = (file) => {
  return new Promise((resolve) => {
    fs.unlink(file, () => {});
    resolve();
  });
};

const convertCSV = async (file, newFile) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = csv.createCsvFileReader(file, {
        separator: ';',
        quote: '"',
      });

      const writer = csv.createCsvFileWriter(newFile);

      reader.addListener('data', (data) => {
        const string = data.toString().replace(/\./g, '_');
        const array = string.split(',');
        writer.writeRecord(array);
      });

      reader.addListener('end', async () => {
        resolve();
      });

      reader.addListener('error', () => {
        reject();
      });
    } catch (error) {
      reject();
    }
  });
};

export default convertCSV;
