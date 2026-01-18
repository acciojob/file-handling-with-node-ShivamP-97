const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = process.argv[2];
const columnName = process.argv[3];

let sum = 0;
let columnKey = null;
let columnValidated = false;

if (!csvFilePath || !columnName) {
  process.exit(1);
}

const stream = fs.createReadStream(csvFilePath)
  .on('error', (err) => {
    console.error(`Error: ${err.message}`);
  })
  .pipe(csv())
  .on('headers', (headers) => {
    const found = headers.find(
      h => h.toLowerCase() === columnName.toLowerCase()
    );

    if (!found) {
      console.error('Invalid column name');
      stream.destroy();
      return;
    }

    columnKey = found;
    columnValidated = true;
  })
  .on('data', (data) => {
    if (!columnValidated) return;

    const value = parseFloat(data[columnKey]);
    if (!isNaN(value)) {
      sum += value;
    }
  })
  .on('end', () => {
    if (columnValidated) {
      console.log(`The sum of ${columnName} is: ${sum}`);
    }
  });
