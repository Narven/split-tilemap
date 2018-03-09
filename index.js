//@ts-check
const argv = require('yargs').argv
const sharp = require('sharp');
const path = require('path');
const rimraf = require('rimraf');

var input = argv.input;
var width = argv.width;
var height = argv.height;
var spacer = argv.spacer || 0;

const image = sharp(input);
const outputFolder = path.join(__dirname, 'output');

image
  .metadata()
  .then(function(metadata) {
    var imageWidth = metadata.width;
    var imageHeight = metadata.height;

    console.log("Image width:" + imageWidth)
    console.log("Image height:" + imageHeight)

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

        var file = "output-" + y + "-" + x + ".png";
        var output = path.join(outputFolder, file);

        image
          .extract(options)
          .toFile(output, function(err) {
            if (err) {
              console.log("Error: ", err.message, x, y)
            } else {
              console.log("Splited: ", output);
            }
          });
      }
    }

  })
  .catch(function(err) {
    throw new Error(err.message)
  })
