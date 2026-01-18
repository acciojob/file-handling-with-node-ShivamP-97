const fs = require('fs');

const csvFilePath = process.argv[2];
const columnName = process.argv[3];

if (!csvFilePath || !columnName) {
  process.exit(1);
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
    if (!isNaN(num)) {
      sum += num;
    }
  }

  console.log(`The sum of ${columnName} is: ${sum}`);
});
