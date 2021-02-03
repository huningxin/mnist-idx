const mnist = require('mnist');
const idx = require('idx-data');

const { program } = require('commander');
program.version('0.0.1');

program
  .requiredOption('-d, --digit <digit>', 'The digit to generate');

program.parse(process.argv);

const options = program.opts();

const digit = options.digit;

const data = mnist[digit].get();

const buffer = new Uint8Array(data.length);

for (let i = 0; i < data.length; ++i) {
  buffer[i] = Math.floor(data[i]*255);
}

idx.saveBits(buffer, [1, 28, 28], digit + '.idx').then(() => {
  console.log(`Wrote digit ${digit} data to ${digit}.idx`);
}).catch((e) => console.log(e));
