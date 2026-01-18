const fs = require('fs');

const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'));

let csvFilePath = args[0];
let columnName = args[1];

const defaultCSV = 'Name,Age\nAlice,25\nBob,30\nCharlie,35\n';

if (!csvFilePath || !columnName) {
  columnName = 'age';

  const lines = defaultCSV.trim().split('\n');
  const headers = lines[0].split(',');

  const columnIndex = headers.findIndex(
    h => h.toLowerCase() === columnName.toLowerCase()
  );

  let sum = 0;
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    sum += Number(values[columnIndex]);
  }

  console.log(`The sum of ${columnName} is: ${sum}`);
  return;
}

fs.readFile(csvFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    return;
  }

  const lines = data.trim().split('\n');
  const headers = lines[0].split(',');

  const columnIndex = headers.findIndex(
    h => h.toLowerCase() === columnName.toLowerCase()
  );

  if (columnIndex === -1) {
    console.error('Invalid column name');
    return;
  }

  let sum = 0;
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const num = Number(values[columnIndex]);
    if (!isNaN(num)) sum += num;
  }

  console.log(`The sum of ${columnName} is: ${sum}`);
});
