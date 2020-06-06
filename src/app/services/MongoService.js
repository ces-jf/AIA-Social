import { promisify } from 'util';
import * as child_process from 'child_process';
import Sheet from '../models/Sheet';
import convertCSV, { removeFile } from './FileService';

const exec = promisify(child_process.exec);

//MongoImport
export default async (database, collection, oldFile, newFile, id) => {
  await convertCSV(oldFile, newFile);

  await removeFile(oldFile);

  const { error } = await exec(
    `mongoimport -d ${database} -c ${collection} --type csv --headerline --file ${newFile}`
  );

  if (error) {
    await removeFile(newFile);

    await Sheet.update({ status: 'Erro' }, { where: { id } });
    return;
  }

  await removeFile(newFile);

  await Sheet.update({ status: 'Sucesso' }, { where: { id } });
};

//MongoExport
export const MongoExport = async (database, collection, fileName, fields, filters, limit) => {

  console.log(`mongoexport -d ${database} -c ${collection} --type csv --out=${fileName} --fields ${fields} ${filters ? `--query ${"'" + filters + "'"}` : "--forceTableScan"} --limit=${limit}`);
  const { error } = await exec(
    `mongoexport -d ${database} -c ${collection} --type csv --out=${fileName} --fields ${fields} ${filters ? `--query=${filters}` : "--forceTableScan"} --limit=${limit}`
  );

  if (error) return false;
  else return true;
};