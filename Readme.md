# Editable-Placeholder

  ContentEditable placeholder for use with nickjackson/editable


## Introduction

This component is a plugin to use with `nickjackson/editable`.


## Installation

    $ component install nickjackson/editable

## Example

```js
var Editable = require('editable')
  , Placeholder = require('editable-placeholder')
  , el = document.querySelector('h1')
  , display = true
  , ph = Placeholder('placeholder text here', display);
 
Editable(el).use(ph);
```

## API

### Placeholder(text, display);

* `text` - string you wish to be displayed in the placeholder
* `display` - display `text` on initalize (boolean)

Returns a wrapper function with the main argument requring an instance of `Editable`.

## Todo
* Test on other browsers. Currently only tested on Chrome OSX.

## License

  MIT