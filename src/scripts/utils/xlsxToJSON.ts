import * as XLSX from 'xlsx';

export default async function xlsxToJSON(file: File | null): Promise<any[]> {
  if (file === null) {
    console.error('File is null');
    return [];
  }
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target === null || event.target.result === null) {
        console.error('FileReader event target or result is null');
        reject([]);
        return;
      }
      const result = event.target.result as ArrayBuffer;
      const data = new Uint8Array(result);
      const workbook = XLSX.read(data, {
        type: 'array',
        cellDates: true,
        cellNF: false,
        cellText: false
      });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { dateNF: "MM/DD/YYYY" });
      console.log(jsonData);
      resolve(JSON.parse(JSON.stringify(jsonData )));
    };
    reader.readAsArrayBuffer(file);
  });
}