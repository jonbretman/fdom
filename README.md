# fdom - Functional DOM stuff

A set of curriable functions for working with the DOM.

## What?
Say you have an element and you want to add a class to it. The raw DOM API's work quite well here.
```js
document.querySelector('.foo').classList.add('special');
```

But what if you want to work with more than one element?
```js
[].slice.call(document.querySelectorAll('.foo')).forEach(function (element) {
    element.classList.add('special');
});;
```

Ugh! With ES6 this is a little nicer:
```js
for (let element of document.querySelectorAll('.foo')) {
    element.classList.add('special');
}
```

But chaining operations is still not possible, the same thing with `fdom` would be:
```js
// create some methods for doing the things you want to do once
var findFoo = fdom.query('.foo');
var addSpecialClass = fdom.addClass('special');

// use them
findFoo(document).forEach(addSpecialClass);
```

You can then use standard array methods to chain operations:
```js
var findInputs = fdom.query('input');
var isText = fdom.hasProp('type', 'text');
var isRequired = fdom.hasProp('required', true);
var getValue = fdom.getProp('value');

var values = findInputs(document)
                 .filter(isText)
                 .filter(isRequired)
                 .map(getValue);
```

## Really?
I dunno, you tell me.

## Why is this better than jQuery/Zepto/etc...
Most DOM libraries work by creating an array-like object (sometimes referred to as a collection) which have methods which work on all the elements in the object/collection. This approach does create a very clean API, however it also has to re-invent the wheel a little bit by implementing standard array methods or copying them into the prototype and making sure that the elements in the objects are integer indexed and there is a `length` property.

The approach with `fdom` is different in that no special library specific objects are created, you are working with actual arrays, and therefor the methods that arrays have e.g. `map`, `forEach`, `filter`, `indexOf` etc...

Ultimately it isn't a fair comparison to look at libraries like jQuery as they support older browsers whereas `fdom` assumes things like `classList` are available/polyfilled.
