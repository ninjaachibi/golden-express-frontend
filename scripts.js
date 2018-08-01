const fs = require('fs');


/* READS FROM A FILE AND ADDS PROPERTIES TO THE FILE, THEN WRITES IT TO A NEW FILE*/
// let rawdata = fs.readFileSync('./public/Inventory/Fresh_Meat.json', 'utf8');
let rawdata = require('./public/Inventory/Fresh_Meat.json');

// rawdata = JSON.stringify(rawdata);

console.log(rawdata, typeof rawdata);
// console.log(JSON.parse(rawdata), typeof JSON.parse(rawdata));

rawdata.forEach((item) => {
  item['aisle'] = 'meat';
})
console.log('after', rawdata);

let data = JSON.stringify(rawdata, null, 2);

fs.writeFileSync('./public/New_Inventory/new_meat.json', data)
console.log('new file written to');
