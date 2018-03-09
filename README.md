# split-tilemap

Small tool to split tilemaps into the individual images

## Get dependencies

`yarn` or `npm install`

## Run

Args:
* `input` - original tilemap image
* `width` - width of each final tile, default `32`
* `height` - height of each final tile, default `32`
* `spacer` - any space between the tilemap tiles?, default `0`
* `output` - output folder, default `./output`

Run `node index.js --input=spider.png --width=64 --height=64 --spacer=1`

## Credits

* `spider.png` image from [https://opengameart.org/content/lpc-spider](https://opengameart.org/content/lpc-spider)
