(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.fdom = factory();
    }
}(this, function () {

    var slice = [].slice;

    /**
     * Creates a version of `fn` that is continuously curriable until
     * all arguments have been fulfilled. e.g.
     *
     *     var fn = curriable(function (one, two, three) {
     *         return one + two + three;
     *     });
     *     var one = fn(1);
     *     var three = one(2);
     *     three(3); // -> returns `6`
     *
     * @param fn
     * @param [arrity] The arrity of the original function.
     * @param [existingArgs] The args provided so far.
     * @returns {Function}
     */
    function curriable(fn, arrity, existingArgs) {
        return function () {
            arrity = arrity || fn.length;
            var args = (existingArgs || []).concat(slice.call(arguments));
            if (args.length < arrity) {
                return curriable(fn, arrity, args);
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

        query: curriable(function (selector, element) {
            return slice.call((element || document).querySelectorAll(selector));
        }),

        addClass: curriable(function (className, element) {
            element.classList.add(className);
            return element;
        }),

        removeClass: curriable(function (className, element) {
            element.classList.remove(className);
            return element;
        }),

        hasClass: curriable(function (className, element) {
            return element.classList.contains(className);
        }),

        setHTML: curriable(function (html, element) {
            element.innerHTML = html;
            return element;
        }),

        getHTML: function(element) {
            return element.innerHTML;
        },

        setText: curriable(function (text, element) {
            element.textContent = text;
            return element;
        }),

        getText: function (element) {
            return element.textContent;
        },

        setStyle: curriable(function (prop, value, element) {
            element.style[prop] = value;
            return element;
        }),

        getStyle: curriable(function (prop, element) {
            return element.style[prop] || getComputedStyle(element, null)[prop];
        }),

        getProp: curriable(function (prop, element) {
            return element[prop];
        }),

        setProp: curriable(function (prop, value, element) {
            element[prop] = value;
            return element;
        }),

        hasProp: curriable(function (prop, value, element) {
            return element[prop] === value;
        }),

        getAttr: curriable(function (key, element) {
            return element.getAttribute(key);
        }),

        setAttr: curriable(function (key, value, element) {
            element.setAttribute(key, value);
            return element;
        }),

        hasAttr: curriable(function (name, value, element) {
            return element.getAttribute(name) === value;
        }),

        remove: function(element) {
            var parent = element.parentNode;
            if (parent) {
                parent.removeChild(element);
            }
            return element;
        },

        append: curriable(function (toAppend, element) {
            element.appendChild(makeHTML(toAppend));
            return element;
        }),

        prepend: curriable(function (toPrepend, element) {
            element.insertBefore(makeHTML(toPrepend), element.childNodes[0]);
            return element;
        }),

        flatten: function(target, arr) {
            return (target || []).concat(arr);
        }

    };

}));
