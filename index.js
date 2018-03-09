#!/usr/bin/env node
const sharp = require('sharp');
const path = require('path');
const rimraf = require('rimraf');

const argv = require('yargs')
  .usage( 'Usage: $0 <input>' )
  .command( 'input', 'Tilemap image', { alias: 'i' } )
  .required( 1, 'Tilemap image is required' )
  .option('w', {
    alias: 'width',
    demand: false,
    describe: 'Tile width',
    type: 'integer',
    default: 32
  })
  .option('h', {
    alias: 'height',
    demand: false,
    describe: 'Tile height',
    type: 'integer',
    default: 32
  })
  .option('s', {
    alias: 'spacer',
    demand: false,
    describe: 'Tilemap spacing between tiles',
    type: 'integer',
    default: 0
  })
  .option('o', {
    alias: 'output',
    demand: false,
    describe: 'Output folder',
    type: 'string',
    default: path.join(__dirname, 'output')
  })
  .help('?')
  .alias('?', 'help')
  .example('$0 spider.png -w=64 -h=64 -o=~/Documents', 'Generate all the tiles from the tilemap')
  .epilog('Copyright Pedro Luz <https://github.com/narven> 2018')
  .argv

const input = argv._[0];
const width = argv.width;
const height = argv.height;
const spacer = argv.spacer;
const output = argv.output;
const image = sharp(input);

image
  .metadata()
  .then(function(metadata) {
    var imageWidth = metadata.width;
    var imageHeight = metadata.height;

    console.log('Image width', imageWidth)
    console.log('Image height', imageHeight)

    for(var y = 0; y <= imageHeight; y += height) {

      for(var x = 0; x <= imageWidth; x += width) {

        if( x + width + spacer > imageWidth) continue
        if( y + height + spacer > imageHeight) continue

        var options = {
          left: x + spacer,
          top: y + spacer,
          width: width,
          height: height
        };

        var file = 'output-' + y + '-' + x + '.png';
        var dest = path.join(output, file);

        console.log(dest)

        image
          .extract(options)
          .toFile(dest, function(err) {
            if (err) {
              console.log('Error: ', err.message, x, y)
            } else {
              console.log('Splited: ', dest);
            }
          });
      }
    }

  })
  .catch(function(err) {
    throw new Error(err.message)
  })
