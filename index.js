/**
 * Module dependencies.
 */

var events = require('events');


/**
 * Expose Placeholder wrapper for plugin support
 */

module.exports = function(message, show){
  return function(editable){
    return new Placeholder(editable, message, show);
  }
}


/**
 * expose Placeholder
 */

module.exports.Placeholder = Placeholder;


/**
 * Initializes Placeholder with `editable`,
 * `message` and whether or not it should `show`
 *
 * @param {Editable} editable
 * @param {String} message
 * @param {Boolean} show
 * @return {self}
 * @api private
 */

function Placeholder(editable, message, show){
  editable.placeholder = this;

  this.editable = editable;
  this.message = message;

  this.el = editable.el;

  this.events = events(this.el, this);
  this.events.bind('blur');

  editable.on('text', this.check.bind(this));
  editable.on('html', this.check.bind(this));
  editable.once('unbind', this.events.unbind.bind(this.events));

  if (show) this.show();
}


/**
 * Displays Placeholder and binds events
 *
 * @api private
 */

Placeholder.prototype.show = function(){
  this.showing = true;

  var edit = this.editable
    , events = this.events;

  edit.el.innerText = this.message;
  edit.classes.add('placeholder');

  events.bind('keydown');
  events.bind('contextmenu', 'refocus');
  events.bind('mousedown', 'refocus');
  events.bind('dragover', 'block');
  events.bind('paste', 'block');
}


/**
 * Hide Placeholder and unbind events
 *
 * @api private
 */

Placeholder.prototype.hide = function(){
  var edit = this.editable
    , events = this.events;

  edit.el.innerText = '';
  edit.classes.remove('placeholder');

  events.unbind('keydown');
  events.unbind('contextmenu');
  events.unbind('mousedown');
  events.unbind('dragover');
  events.unbind('paste');

  this.showing = false;
}


/**
 * Prevents default behaviour but also focusses.
 *
 * @return {Boolean}
 * @api private
 */

Placeholder.prototype.refocus = function(e){
  e.preventDefault();
  this.el.focus();
  return false;
}


/**
 * Prevents default behaviour
 *
 * @return {Boolean}
 * @api private
 */

Placeholder.prototype.block = function(e){
  e.preventDefault();
  return false;
}


/**
 * Checks key is a valid key, and that placeholder
 * is not already showing.
 *
 * @api private
 */

Placeholder.prototype.onkeydown = function(e){
  var key = e.keyCode;
  if (e.defaultPrevented) return;

  if (this.validKey(key) && this.showing) {
    this.hide();
  }
}


/**
 * Upon elemen loosing focus, call `.check()`
 * with current editable text.
 *
 * @api private
 */

Placeholder.prototype.onblur = function(){
  this.check(this.editable.text());
}


/**
 * Displays placeholder if not already showing,
 * and if `value` is blank.
 *
 * @param {String} value
 * @api private
 */

Placeholder.prototype.check = function(value){
  if (this.showing) return;
  if (value == '') this.show();
}


/**
 * Checks to see if `k` keyCode is an actionable
 * key. Something that is going to affect the
 * length of the textbox.
 *
 * @param {Number} k
 * @return {Boolean}
 * @api private
 */

Placeholder.prototype.validKey = function(k){
  return (k > 47 && k < 58)   || // number keys
    (k == 32 || k == 13)           || // spacebar && enter
    (k > 64 && k < 91)   || // letter keys
    (k > 95 && k < 112)  || // numpad keys
    (k > 185 && k < 193) || // ;=,-./` (in order)
    (k > 218 && k < 223);   // [\]' (in order)
}