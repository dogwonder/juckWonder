//From https://github.com/kaelig/google-spreadsheets-theo
const fs = require('fs');
const path = require('path');
const theo = require('theo');
const googleSpreadsheetsTheo = require('google-spreadsheets-theo');
 
const config = {
  // URL of the spreadsheet
  // spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1O0QOUUq8N-NfHmlGWa61TN6oOSdQMBaDq0lp6DsCReQ/edit#gid=0',
  spreadsheetUrl: 'https://docs.google.com/spreadsheets/d/1B4LmPqyO5rwwy6pGAeIQbS0cqbsgVZJ6wgLxZVDIaKo/edit#gid=0',
 
  // Each worksheet is for a different type of tokens (colors, spacing, typography…)
  worksheets: [
    {
      id: 1, // position of the worksheet (or "tab") in Google Spreadsheets
      name: 'colors',
    },
    {
      id: 2,
      name: 'spacing',
    },
    {
      id: 3,
      name: 'breakpoints',
    },
  ],
 
  // Output formats (see https://github.com/salesforce-ux/theo#formats)
  formats: [
    // Add formats below.
    // {
    //   transform: 'web',
    //   format: 'scss',
    // },
    // {
    //   transform: 'web',
    //   format: 'common.js',
    // },
    // {
    //   transform: 'android',
    //   format: 'android.xml',
    // },
    // {
    //   transform: 'raw',
    //   format: 'json',
    // },
    // {
    //   transform: 'ios',
    //   format: 'ios.json',
    // },
    {
      transform: 'web',
      format: 'custom-properties.css',
    },
  ],
 
  // Where the output files should be stored
  outputDirectory: './tokens/',
};
 
const convert = (name, transform, format, data) =>
  theo
    .convert({
      transform: {
        type: transform,
        file: `${name}.json`,
        data,
      },
      format: {
        type: format,
      },
    })
    .then((contents) => contents)
    .catch((error) => console.log(`Something went wrong: ${error}`));
 
const main = async (config) => {
  for ({id, name} of config.worksheets) {
    const data = await googleSpreadsheetsTheo(config.spreadsheetUrl, id);
 
    for ({transform, format} of config.formats) {
      const tokens = await convert(name, transform, format, data);
      const filename = `${config.outputDirectory}${name}.${format}`;
      await fs.promises
        .mkdir(path.dirname(filename), {recursive: true})
        .then(() => {
          fs.writeFileSync(filename, tokens);
        });
      console.log(`✔ Design tokens written to ${filename}`);
    }
  }
};
 
main(config);