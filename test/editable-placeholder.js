var Editable = require('editable')
  , Placeholder = require('editable-placeholder')
  , trigger = require('trigger-event');

function createEditable(inner){
  var el = document.querySelector('.editables')
    , h1 = document.createElement('h1');

  el.innerHTML = '';
  h1.innerHTML = inner || '';
  el.appendChild(h1);
  return h1;
}



describe('editable-placeholder', function(){
  it('can show the placeholder on init', function(){
    var el = createEditable();
    Editable(el).use(Placeholder('the placeholder', true));
    expect(el.textContent).to.equal('the placeholder');
  })

  it('does not show the placeholder on init', function(){
    var el = createEditable();
    Editable(el).use(Placeholder('the placeholder', false));
    expect(el.textContent).to.not.equal('the placeholder');
  })

  it('can show the placeholder when empty onblur', function(){
    var el = createEditable();
    Editable(el).use(Placeholder('the placeholder'));
    el.focus();
    el.blur();
    expect(el.textContent).to.equal('the placeholder');
  })

  it('should not remove placeholder on focus', function(){
    var el = createEditable();
    Editable(el).use(Placeholder('the placeholder', true));
    el.focus();
    expect(el.textContent).to.equal('the placeholder');
  })

  it('should remove placeholder on keydown if validKey()', function(){
    var el = createEditable();
    Editable(el).use(Placeholder('the placeholder', true));

    trigger(el, 'keydown', {key: 'a'});
    expect(el.textContent).to.equal('');
  })

  it('should not remove placeholder on keydown of not .validKey()', function(){
    var el = createEditable();
    Editable(el).use(Placeholder('the placeholder', true));

    // just some.
    trigger(el, 'keydown', {key: 'ctrl'});
    trigger(el, 'keydown', {key: 'alt'});
    trigger(el, 'keydown', {key: 'esc'});

    expect(el.textContent).to.equal('the placeholder');
  })

  it('should have correct events to start', function(){
    var el = createEditable();
    var editable = Editable(el).use(Placeholder('the placeholder'));
    var ph = editable.placeholder;
    var events = ph.events._events;

    expect(events.blur).to.not.be.empty();
  })

  it('should have correct events on placeholder', function(){
    var el = createEditable();
    var editable = Editable(el).use(Placeholder('the placeholder', true));
    var ph = editable.placeholder;
    var events = ph.events._events;
    var keys = ['blur', 'contextmenu', 'keydown', 'mousedown', 'dragover', 'paste']
    expect(events).to.only.have.keys(keys);
  })

  // it('should have correct events on placeholder hide', function(){
  //   var el = createEditable();
  //   var editable = Editable(el).use(Placeholder('the placeholder', true));
  //   var ph = editable.placeholder;
  //   var events = ph.events._events;
  //   trigger(el, 'keydown', {key: 'a'});
  //   expect(events).to.only.have.keys('blur');
  // })
})