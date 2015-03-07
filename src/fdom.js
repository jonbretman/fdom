(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.fdom = factory();
    }
}(this, function () {

    var slice = [].slice;

    function curriable(arrity, fn) {
        return function () {
            var args = slice.call(arguments);
            if (args.length < arrity) {
                return function () {
                    return fn.apply(null, args.concat(slice.call(arguments)));
                };
            }
            return fn.apply(null, args);
        };
    }

    function makeHTML(html) {
        if (typeof html === 'string') {
            var el = document.createElement('div');
            el.innerHTML = html;
            return el.childNodes[0];
        }
        return html;
    }

    return {

        query: curriable(2, function (selector, element) {
            return slice.call((element || document).querySelectorAll(selector));
        }),

        addClass: curriable(2, function (className, element) {
            element.classList.add(className);
            return element;
        }),

        removeClass: curriable(2, function (className, element) {
            element.classList.remove(className);
            return element;
        }),

        hasClass: curriable(2, function (className, element) {
            return element.classList.contains(className);
        }),

        setHTML: curriable(2, function (html, element) {
            element.innerHTML = html;
            return element;
        }),

        getHTML: function(element) {
            return element.innerHTML;
        },

        setText: curriable(2, function (text, element) {
            element.textContent = text;
            return element;
        }),

        getText: function (element) {
            return element.textContent;
        },

        setStyle: curriable(3, function (prop, value, element) {
            element.style[prop] = value;
            return element;
        }),

        getStyle: curriable(2, function (prop, element) {
            return element.style[prop] || getComputedStyle(element, null)[prop];
        }),

        getProp: curriable(2, function (prop, element) {
            return element[prop];
        }),

        setProp: curriable(2, function (prop, value, element) {
            element[prop] = value;
            return element;
        }),

        hasProp: curriable(3, function (prop, value, element) {
            return element[prop] === value;
        }),

        getAttr: curriable(2, function (key, element) {
            return element.getAttribute(key);
        }),

        setAttr: curriable(2, function (key, value, element) {
            element.setAttribute(key, value);
            return element;
        }),

        hasAttr: curriable(3, function (name, value, element) {
            return element.getAttribute(name) === value;
        }),

        remove: function(element) {
            var parent = element.parentNode;
            if (parent) {
                parent.removeChild(element);
            }
            return element;
        },

        append: curriable(2, function (toAppend, element) {
            element.appendChild(makeHTML(toAppend));
            return element;
        }),

        prepend: curriable(2, function (toPrepend, element) {
            element.insertBefore(makeHTML(toPrepend), element.childNodes[0]);
            return element;
        }),

        flatten: function(target, arr) {
            return (target || []).concat(arr);
        }

    };

}));
