---
author: grgur
comments: true



title: Efficient DOM and CSS Operations

categories:
- Development
- CSS
- DOM
- JavaS
- Performance
---

Eventually, the output of our web applications end up displayed as a part of user interface (UI). In our previous post, [JavaScript Performance Tips & Tricks](http://moduscreate.com/javascript-performance-tips-tricks/), we have covered several techniques for optimising JavaScript code. JavaScript is also capable of accessing DOM nodes and using CSS to query or style elements. While there are multiple approaches to each, we are about to show the most performant ones.





### CSS Selectors CSS selectors are often the method of choice for querying through DOM hierarchy. Working with CSS in most cases provides for the fastest way of manipulating views. No wonder Sencha Touch 2 no longer employs JavaScript-powered rendering techniques in favor of CSS-based painting. There are multitude of ways to find DOM nodes using CSS queries. Not all are equal in terms of performance, either. A good thing is that a rule of thumb that ensures the major performance hop actually exists.





**CSS selectors are read from right to left** - this is the most underestimated fact about them. Let's have an imaginary document with several menus, in total of 100 menu items (.menuitem). Compare these two selectors.




    
    div#nav ul.menu > li.menuitem





vs




    
    .menuitem





The first selector will have to work in the following fashion:







  1. Collect all 100 menu items with CSS class .menuitem


  2. Narrow down to all menu items that are actually list items (LI)


  3. Narrow down to those that are under an element with CSS .menu


  4. Narrow down to those which CSS .menu class belongs to  a UL element


  5. Narrow down to those items that fall under element of ID #nav


  6. Finally, narrow the above to those elements with ID nav that are indeed DIV elements






  Phew! That's a lot of work! As you can imagine, the second example is a lot faster. We might as well choose and additional class name for menu items and query by it. Let's try another example.







  Here we have a bit more nesting and we are about to find out which selectors work best for finding nested elements.





    
    <div id="div1">
        <div id="div2">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <ul id="menu">
                                <li class="first">Item 1</li>
                                <li>Item 2</li>
                                <li>Item 3</li>
                                <li>Item 4</li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>





Now let's see how selectors stack up. Note that the values in the chart represent operations per second, so





**higher is better**. [![CSS Selector Comparison](http://moduscreate.com/wp-content/uploads/2012/07/css-selectors-comparison.png)](http://moduscreate.com/efficient-dom-and-css/css-selectors-comparison/) This CSS selector comparison chart clearly shows how browsers reward careful optimisation with performance. Virtually in every case did querying by ID yield fastest response. Then comes querying by node type, CSS class names to follow. In effect, the better you describe the selection, the more you're having a browser work. A good thing to remember.





### Dynamically Updating CSS Styles Not always are we in liberty to simply assign a CSS class to a DOM node. This specifically holds true in advanced user interfaces such as those controlled by complex frameworks. Although developers often find it disgusting, fiddling with the style attribute is the only way out. Again, there is more than one way to assign a style to an element. If you are about to set a single style, e.g. width, you are usually best of setting





`target.style.width = '400px';`. However, what if you have to assign more than one style? If we keep up to the same notion, we would do something like this:




    
    target.style.width      = '400px';
    target.style.margin     = '10px';
    target.style.color      = '#336699';
    target.style.background = '#996633';
    target.style.border     = '1px solid red';
    target.style.padding    = '1px';





As an outcome, you are telling the browser to restyle the element as many as six times. Wouldn't it be easier and faster to do this in a single try?




    
    target.style.cssText = ''.concat(
        'width      : 400px;',
        'margin     : 10px;',
        'color      : #336699;',
        'background : #996644;',
        'border     : 1px solid red;',
        'padding    : 1px;',
    );





Not only that it's faster, but it's also cleaner and prettier. Let's compare the performance impact.





[![Setting multiple CSS styles through cssText property](http://moduscreate.com/wp-content/uploads/2012/07/csstext.png)](http://moduscreate.com/efficient-dom-and-css/csstext/) Again higher is better, proving that sending a single command to a browser will be quicker than having JavaScript talk to the browser many times.





### Appending Elements to DOM Dynamic DOM manipulation is the pivotal point of virtually all web application and a vast majority of modern web sites. Appending DOM nodes seems to be one of the most expensive operations, which is why it deserves a good look at. We are about to add a div element with 1000 nested span nodes. Completely programatically through JavaScript, the code would like this:




    
    var target = document.getElementById('target'),
        i = 0,
        span,
        b;
    
    for (; i<1000; i++) {
        span = document.createElement('span');
        b = span.appendChild(document.createElement('b'));
    
        b.appendChild( document.createTextNode(i) );
    
        target.appendChild(span);
    }





This piece of code will sure do what we needed. But as I said previously, the more steps in JavaScript communication with the browser, the poorer is performance. All we need to observe here is the loop that repeats a block of code for 1000 times. What happens repedeately is:







  1. Create a `SPAN` element (communication with DOM)


  2. Create a `B` element (communication with DOM)


  3. Append `B` to `SPAN` (communication with DOM)


  4. Create a text node (communication with DOM)


  5. Append text to `B` (more communication with DOM)


  6. Append `SPAN` to target (even more communication with DOM) You know where I'm getting to, don't you? To fight too much communication, I'll try with innerHTML. The goal is to work with strings and create the whole structure before sending it to the browser for parsing and laying out. 




    
    var target = document.getElementById('target'),
        html = '',
        i = 0;
    
    for (; i<1000; i++) {
        html = html.concat('<span><b>', i, '</b></span>');
    }
    
    target.innerHTML = html;





By eliminating extra communication steps, I sure gained some on speed. At least in majority of browsers. All of the code is constructed by simply concatenating strings inside the loop, then pushed as innerHTML to the target element. Browser will certainly do much faster keeping all the calculations to itself and not having to send any data outside or wait for more to come in from JavaScript. But, can we do better? You bet! In the next exercise we will create the nodes we needed in advance and clone them inside of the loop using





`cloneNode(true)`




    
    var target = document.getElementById('target'),
        span = document.createElement('span'),
        b = span.appendChild(document.createElement('b')),
        i = 0,
        node;
    
    for (; i<1000; i++) {
        node = span.cloneNode(true);
        target.appendChild(node);
    }





All nodes are created in this example, then only cloned (thing of it as copying a reference in memory with some overhead added). This particular trick will prove to be significantly faster than both of the previous tests. Another way of achieving the same result would be using





`DocumentFragment`. If I tried to explain it in a trivial way, I'd say that `DocumentFragment` will serve as a virtual Document that acts just as one but is not visible on screen. You can even use it to assign event listeners that would be copied when fragment is applied to DOM.




    
    var target = document.getElementById('target'),
        span = document.createElement('span'),
        b = span.appendChild(document.createElement('b')),
        fragment = document.createDocumentFragment(),
        i = 0;
    
    for (; i<1000; i++) {
        fragment.appendChild( span.cloneNode(true) );
    }
    
    target.appendChild(fragment);





You'll notice similarity between the last two examples. They both use node cloning, but the latter consumes all nodes behind the scenes, then appends the whole package to target at once. As you can imagine, this one should be extremely fast in all browsers. Never sieze expecting surprises, though :)





[![DOM Child Manipulation Comparison](http://moduscreate.com/wp-content/uploads/2012/07/dom.png)](http://moduscreate.com/efficient-dom-and-css/dom/) What an interesting chart! It's true that the last two snippets nail the performance big time. DocumentFragment wins with Chrome, loses by a small margin in Safari and Opera, while they rank similarly in other browsers. iOS 5.1 Safari on iPhone 4S proved that DocumentFragment was by a single op/sec slower than the DOM/cloneNode example. The examples provided may not reflect all real life  combination, but they illustrate how carefully chosen technique can dramatically improve performance. I am confident many of you have similar tips and tricks on performance to share, so please post your comments below.



