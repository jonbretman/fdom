# fdom - Functional DOM stuff

An experiment in a different approach to doing DOM operations to the standard jQuery style API that takes advantage of the standard array iteration methods.

## What is it?
`fdom` is just a load of functions that can be used to operate on single DOM elements or to create a function that can be passed to array iteration methods. For example the `addClass` method can be used like this:

```js
fdom.addClass('foo', someElement); // will return someElement
```

Or if called without the second argument it will return a function that will accept the remaining argument and add the class `foo` to it and return it.

```js
var addFoo = fdom.addClass('foo');

addFoo(someElement); // will return someElement
```

This currying style can then be used to do jQuery-like chainable operations using standard array iteration methods.


```js
// jquery
$('.foo')
    .addClass('new-class')
    .html('<p></p>')
    .find('.bar')
    .removeClass('old-class')

// fdom
fdom.query('foo', document.body)
    .map(fdom.addClass('new-class'))
    .map(fdom.setHTML('<p></p>'))
    .map(fdom.query('.bar'))
    .reduce(fdom.flatten))
    .map(fdom.removeClass('old-class'));
```
