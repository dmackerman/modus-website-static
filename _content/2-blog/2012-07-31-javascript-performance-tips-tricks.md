---
author: grgur
comments: true
title: JavaScript Performance Tips & Tricks
categories:
    - Development
---

Some say spending time developing for performance is not worth it when hardware upgrades are usually a cheaper alternative. If I would tell them that spending 10 minutes reading this could save more than 50 new upgrades with simple code improvements that account for a 50x+ performance increase, do you think they would listen?

From rarely used and almost forbidden code snippets to commonly used methods and loops, I am about to show how to cut unnecessary milliseconds out of your JavaScript application.

All tests are measured in **ops/sec (higher is better)**, the widely known jsperf.com benchmarking style. In fact, benchmark.js was used to conduct the tests cross-browser. The tests were conducted on a 2011 MacBook Pro, 2.2 GHz i7 processor with 8GB RAM and a Vertex 3 SSD, all running on a 10.7.4 OS X Lion or Windows XP SP3 through Parallels 7.


######### Evaluation


****I can hear you saying "Oh but Crockford says eval is evil and I agree with him." I concur, but there are cases when evaluation is important, such as:



	
  * **Code caching**. Sometimes we choose to cache parts of our apps in the browser through one of the available web storage mechanisms.

	
  * **Deferred execution**. On mobile devices, JavaScript execution takes approximately **1ms for each 1kB** of code.

	
  * **Loading on demand**. Some architects choose to load application modules on demand to save on bandwidth and increase security measures.


`eval()` is the function available in JavaScript that is meant to be used for code evaluation. It accepts a string that should represent a section of code, properly formatted.

Let's examine the following code:

    
    var str = "",
        i = 0;
    for (; i<1000; i += 1) {
        str += "a";
    }


This simple loop appends a character to a string. Strings are immutable in JavaScript, thus str will be overwritten with each change. Now, let's change the code into a eval-compatible string.

    
    var strCode = 'var str="",i=0;for(;i<1000;i+=1){str+="a";}';


Ugly. Benchmarking `eval(strCode)` on Chrome 21 will output **97 ops/sec**. Make sure you make a mental note here.

Alternatively, let's do the same thing, but this time we will evaluate using a little trick:

    
    (new Function(strCode))()


Benchmarking this snippet in the same browser will output **5,256 ops/sec**, a staggering **54.2x (or 5,418%) speed increase**.

[![JavaScript Evaluation vs (new Function())()](../assets/uploads//2012/07/evaluation.png)](http://moduscreate.com/javascript-performance-tips-tricks/evaluation/)

Google Chrome's V8 engine is to 'blame' for such performance. Unfortunately or luckily, depending on how you look at it, not all browsers use V8. However, all browsers consistently report performance benefits with the latter approach, whether they are by as much as 5400% or 10% (IE6).


######### String Concatenation


This section is unique because we often use concatenation techniques for code readability and organisation benefits in addition to business logic purposes. In other words, we tend to intentionally sacrifice application performance in favour of prettier code. I'll stick to this notion to demonstrate the speed differences. Common concatenation principles include:

    
    foo = foo + bar;
    foo += bar;


The first one will turn out to be faster in all browsers, by a small margin (only Safari 5 will double the performance). That's good to know, sure, but there's more to come.

How many times have you seen something like this bit of code:

    
    Ext.create('MyView', {
        tpl: [
            '<div class="heading">',
                '<div class="firstname">',
                    '{firstname}',
                '</div>',
                '<div class="lastname">',
                    '{lastname}',
                '</div>',
            '</div>'
        ].join()
    });


I created an array of strings and used `Array.prototype.join` to combine them into one. Of course, it's much prettier than combining with a + sign, and the code is more readable, too.

`[].join()` is, naturally, slower in all browsers but Chrome. Just as the evaluation test above, Chrome is able to employ advanced caching techniques to deliver faster results for repeated actions. In other words, in real life `[].join()` will always be slower.

Let's rewrite that statement, persist the prettiness, and increase the performance:

    
    Ext.create('MyView', {
        tpl: ''.concat(
            '<div class="heading">',
                '<div class="firstname">',
                    '{firstname}',
                '</div>',
                '<div class="lastname">',
                    '{lastname}',
                '</div>',
            '</div>'
        )
    });


Instead of creating a new array, filling it up with strings and then joining it, I simply created an empty string and used `String.prototype.concat` method to append arguments to it. Visually it doesn't make a huge difference, the code is as pretty as it was. However, the latter performs significantly faster than any other form of concatenation.

[![JavaScript String Concatenation Chart](../assets/uploads//2012/07/concatenation.png)](http://moduscreate.com/javascript-performance-tips-tricks/concatenation/)

Look at the `''.concat()` bars skyrocketing so much that `[].join()` looks incredibly silly. In fact, the benefit is exponential across browsers.

**Up


######### Loops


When simple iterations are required, in other words repeating an action n times, we will often use a while instead of a for loop.

    
    for (var i = 0; i<1000; i++) {
        // do your stuff
    }


vs

    
    var i = 1000;
    while (i--) {
        // do your stuff
    }


Anyone who has to deal with (read: support) Internet Explorers will say that the while loop is faster. That is true for all IE9 and older. New browsers, however, cancel this out in favour of the for loop. Yet, the performance increase in percentage is higher than the one found in IEs.

[![For Loop vs While Loop - JavaScript Performance](../assets/uploads//2012/07/loops.png)](http://moduscreate.com/javascript-performance-tips-tricks/loops/)


######### Accessing Object Properties


Repeated access to nested object properties is, logically, going to introduce performance drawbacks. Here is what I mean:

    
    for (var i in App.view.tablet.Viewport) {
        console.log(App.view.tablet.Viewport[i]);
    }


Let's dissect the line inside the for loop. I am telling browser to access App object, then find view reference and access it, then find tablet and open it to access Viewport. That's four references so far plus the last one of the value of i. To reach each reference our JavaScript code communicates with the browser, the browser communicates through it's internal components to the OS and finally to reach the desired memory allocation in RAM. And we do this five times.

Instead, let's cache the static part, or the first four steps and see what it brings us:

    
    var vp = Ext.view.tablet.Viewport;
    for (var i in vp) {
        console.log(vp[i]);
    }


Not only that the code is shorter in total number of bytes, but it's faster.

[![Nested Object Properties](../assets/uploads//2012/07/nested_obj_props.png)](http://moduscreate.com/javascript-performance-tips-tricks/nested_obj_props/)


######### Reusing Array References


Often in our code we work with temporary references that get discarded in time. Arrays in particular can be reused, or should we say recycled, thus saving some of the precious processing time. This is how it's done:

    
    var foo = [1,2,3];
    
    // do something with foo, then reuse it to fill it with new values
    
    foo.length = 0;
    foo.push(5, 6, 7);


The advantage over creating a brand new array instance can be interesting, at least in some browsers.

[![Reusing Arrays for JavaScript Performance](../assets/uploads//2012/07/reuse_array.png)](http://moduscreate.com/javascript-performance-tips-tricks/reuse_array/)

Interestingly, Chrome is ridiculously fast with re-creating a new array, and it actually lost a great deal with the suggested approach. All other browsers, however, benefited greatly.


######### Optimising Events


JavaScript's event-driven nature is one of the major strengths of the language. At the same time, having an enormous number of events can be sub-optimal and degrade application performance significantly. Imagine 1000 nodes each listening for an event, then testing for each one of them in capturing and bubbling phase of event handling. Expensive. Here is what I mean:

    
    <ul id="menu">
        <li id="home">Home</li>
        <li id="products">Products</li>
        <li id="portfolio">Portfolio</li>
        <li id="shop">Shop</li>
        <li id="about">About</li>
        <li id="login">Log in</li>
        <li id="contacts">Contacts</li>
    </ul>



    
    document.getElementById('top').addEventListener('click',goHome);
    document.getElementById('products').addEventListener('click',goProducts);
    // ...
    document.getElementById('contacts').addEventListener('click',goContacts);


It this example, every list item is assigned an event listener. That gives us 7 event listeners in total, which in effect becomes difficult to manage, consumes more code, and more work for both developer and the interpreter.

In contrast, we could have done this:

    
    var menuHandler = function(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        if (target.id === 'home') {
            // go home
        }
        // else ...
    
    }
    document.getElementById('menu').addEventListener('click',menuHandler);


Here we assigned a single event listener that acts as a delegate for target element's child nodes. It much more effective, especially when the list of child nodes is big.

Event delegation is a very common need with Ext.Templates (or XTemplates) in Sencha Touch and Ext JS. It's also simple to use with built-in helpers. Let's have a quick look:

    
    Ext.createWidget('panel', {
        data: [
            {id: 'home',      name: 'Home',      url: 'index.html'},
            {id: 'products',  name: 'Products',  url: 'products.html'},
            {id: 'portfolio', name: 'Portfolio', url: 'portfolio.html'},
            {id: 'shop',      name: 'Shop',      url: 'shop.html'},
            {id: 'about',     name: 'About',     url: 'about.html'},
            {id: 'login',     name: 'Login',     url: 'login.html'},
            {id: 'contacts',  name: 'Contacts',  url: 'contacts.html'}
        ],
        tpl: ''.concat(
            '<ul id="menu">',
                '<tpl for=".">',
                    '<li id="{id}">{name}</li>',
                '</tpl>',
            '</ul>'
        ),
        listeners: {
            element: 'body',
            click: function(event, element) {
                // element represents the clicked-on list item
                console.log(element);
            }
        }
    });


In this example, the menu is rendered from a data set using Ext.XTemplate. A listener for click event is assigned to panel's body element. The handler attached to the event listener works with the element argument, which references the LI element user clicked on.

This approach also gives more power to the developer who can access the panel component directly with the `this` keyword when using proper scoping.


######### Conclusion


In this document, we went over some of the commonly used snippets and demonstrated how they can be improved to yield faster applications. This is especially important for mobile web applications and sites as the numbers of mobile clients has been on a significant rise (and will continue to do so), while mobile devices are not as powerful as desktops, hardware-wise.

Many of the optimisations recommended here also offer different tactics for different browsers. In other words, being browser aware will certainly help deliver top notch web application performance.

I suggest you take a look at [Efficient DOM and CSS Operations](http://moduscreate.com/efficient-dom-and-css/) post that discusses performance with HTML elements.

Do you have your own findings on the topics presented? Do you have additional suggestions to show? Please share your thoughts with the rest of us.
