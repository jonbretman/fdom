describe('fdom', function () {

    var testElements = [];

    function makeHTML(html) {
        var el = document.createElement('div');
        el.innerHTML = html;
        var nodes = [].slice.call(el.childNodes);
        testElements = testElements.concat(nodes);
        return nodes;
    }

    function makeBodyHTML(html) {
        return makeHTML(html).map(function (el) {
            document.body.appendChild(el);
            return el;
        });

    }

    afterEach(function () {
        while (testElements.length) {
            var el = testElements.pop();
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        }
    });

    describe('query', function () {

        it('should perform the query in the given element', function () {
            var nodes = makeBodyHTML(
                '<div class="foo"></div>' +
                '<div class="foo bar"><span></span></div>' +
                '<div class="bar baz"></div>'
            );

            var result = fdom.query('.foo', null);
            expect(result).to.eql([nodes[0], nodes[1]]);
        });

        it('should be curriable', function () {
            var findFoo = fdom.query('.foo');
            var nodes = makeBodyHTML('<div class="foo"></div>');
            expect(findFoo(document)).to.eql(nodes);

            var el = document.createElement('div');
            el.appendChild(nodes[0]);
            expect(findFoo(el)).to.eql(nodes);
        });

    });

    describe('addClass', function () {

        it('should return the element', function () {
            var el = document.createElement('div');
            expect(fdom.addClass('foo', el)).to.equal(el);
        });

        it('should add the class to the element', function () {
            var el = document.createElement('div');
            expect(fdom.addClass('foo', el).className).to.equal('foo');
        });

        it('should be curriable', function () {
            var addFoo = fdom.addClass('foo');
            expect(addFoo(document.createElement('div')).className).to.equal('foo');
        });

    });

    describe('removeClass', function () {

        it('should return the element', function () {
            var el = document.createElement('div');
            expect(fdom.removeClass('foo', el)).to.equal(el);
        });

        it('should remove the class from the element', function () {
            var el = document.createElement('div');
            el.className = 'foo bar baz';
            expect(fdom.removeClass('bar', el).className).to.equal('foo baz');
        });

        it('should be curriable', function () {
            var removeFoo = fdom.removeClass('foo');
            var el = document.createElement('div');
            el.className = 'foo bar baz';
            expect(removeFoo(el).className).to.be.equal('bar baz');
        });

    });

    describe('hasClass', function () {

        it('should return true if the element has the class and false if it doesnt', function () {
            var el = document.createElement('div');
            el.className = 'foo bar baz';
            expect(fdom.hasClass('bar', el)).to.equal(true);
            expect(fdom.hasClass('bop', el)).to.equal(false);
        });

        it('should be curriable', function () {
            var hasFoo = fdom.hasClass('foo');
            var el = document.createElement('div');
            el.className = 'foo bar baz';
            expect(hasFoo(el)).to.equal(true);
            el.className = '';
            expect(hasFoo(el)).to.equal(false);
        });

    });

    describe('setHTML', function () {

        it('should set the innerHTML of the element', function () {
            var el = document.createElement('div');
            fdom.setHTML('<p>Hello</p>', el);
            expect(el.innerHTML).to.equal('<p>Hello</p>');
        });

        it('should return the element', function () {
            var el = document.createElement('div');
            fdom.setHTML('<p>Hello</p>', el);
            expect(fdom.setHTML('', el)).to.equal(el);
        });

        it('should be curriable', function () {
            var addHTML = fdom.setHTML('<p>Hello</p>');
            var el = document.createElement('div');
            addHTML(el);
            expect(el.innerHTML).to.equal('<p>Hello</p>');
        });

    });

    describe('getHTML', function () {

        it('should get the innerHTML of the element', function () {
            var el = document.createElement('div');
            el.innerHTML = '<p>Hello</p>';
            expect(fdom.getHTML(el)).to.equal('<p>Hello</p>');
        });

    });

    describe('setText', function () {

        it('should set the text content of the element', function () {
            var el = document.createElement('div');
            fdom.setText('<p>Hello</p>', el);
            expect(el.innerHTML).to.equal('&lt;p&gt;Hello&lt;/p&gt;');
        });

        it('should return the element', function () {
            var el = document.createElement('div');
            expect(fdom.setText('', el)).to.equal(el);
        });

        it('should be curriable', function () {
            var setText = fdom.setText('<p>Hello</p>');
            var el = document.createElement('div');
            setText(el);
            expect(el.innerHTML).to.equal('&lt;p&gt;Hello&lt;/p&gt;');
        });

    });

    describe('getText', function () {

        it('should get the text content of the element', function () {
            var el = document.createElement('div');
            el.innerHTML = '<p>Hello <span>world</span></p>';
            expect(fdom.getText(el)).to.equal('Hello world');
        });

    });

    describe('setStyle', function () {

        it('should set the style on the element', function () {
            var el = document.createElement('div');
            fdom.setStyle('color', 'red', el);
            expect(el.style.color).to.equal('red');
        });

        it('should return the element', function () {
            var el = document.createElement('div');
            expect(fdom.setStyle('display', 'block', el)).to.equal(el);
        });

        it('should be curriable', function () {
            var setStyle = fdom.setStyle('fontSize', '18px');
            var el = document.createElement('div');
            setStyle(el);
            expect(el.style.fontSize).to.equal('18px');
        });

    });

    describe('getStyle', function () {

        it('should get the value of the given style property', function () {
            var el = document.createElement('div');
            el.className = 'get-style-test-el';
            el.style.float = 'left';
            expect(fdom.getStyle('float', el)).to.equal('left');

            var style = document.createElement('style');
            style.innerHTML = '.get-style-test-el { width: 10px; }';
            document.querySelector('head').appendChild(style);

            document.body.appendChild(el);
            expect(fdom.getStyle('width', el)).to.equal('10px');
        });

    });

    describe('getProp', function () {

        it('should get the value of the property', function () {
            var el = document.createElement('input');
            el.type = 'email';
            expect(fdom.getProp('type', el)).to.equal('email');
        });

        it('should be curriable', function () {
            var getValue = fdom.getProp('value');
            var el = document.createElement('input');
            el.value = 'The value';
            expect(getValue(el)).to.equal('The value');
        });

    });

    describe('setProp', function () {

        it('should set the value of the property', function () {
            var el = document.createElement('input');
            fdom.setProp('type', 'email', el);
            expect(el.type).to.equal('email');
        });

        it('should be curriable', function () {
            var getValue = fdom.getProp('value');
            var el = document.createElement('input');
            el.value = 'The value';
            expect(getValue(el)).to.equal('The value');
        });

    });

    describe('hasProp', function () {

        it('should return true if the value of the property matches the given value', function () {
            var el = document.createElement('input');
            el.required = true;
            expect(fdom.hasProp('required', true, el)).to.equal(true);
            expect(fdom.hasProp('value', 'not the value', el)).to.equal(false);
        });

        it('should be curriable', function () {
            var isRequired = fdom.hasProp('required', true);
            var el = document.createElement('input');
            el.required = true;
            expect(isRequired(el)).to.equal(true);
        });

    });

    describe('getAttr', function () {

        it('should return the value of the attribute', function () {
            var el = document.createElement('div');
            el.setAttribute('some-attribute', 'some-value');
            expect(fdom.getAttr('some-attribute', el)).to.equal('some-value');
        });

        it('should be curriable', function () {
            var getClasses = fdom.getAttr('class');
            var el = document.createElement('div');
            el.className = 'one two three';
            expect(getClasses(el)).to.equal('one two three');
        });

    });

    describe('setAttr', function () {

        it('should set the attribute', function () {
            var el = document.createElement('div');
            fdom.setAttr('some-attribute', 'some-value', el);
            expect(el.getAttribute('some-attribute')).to.equal('some-value');
        });

        it('should be curriable', function () {
            var setAttr = fdom.setAttr('some-attribute', 'some-value');
            var el = document.createElement('div');
            setAttr(el);
            expect(el.getAttribute('some-attribute')).to.equal('some-value');
        });

    });

});
