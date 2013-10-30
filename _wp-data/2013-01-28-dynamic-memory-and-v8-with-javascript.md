---
author: Mike
comments: true



title: Dynamic Memory and V8 with JavaScript

categories:
- Development
- JavaScript
- Performance
- SilkJS
---

One of the key elements of the JavaScript language is its dynamic memory implementation. While the ECMA speciﬁcation may describe in gross terms how dynamic memory works, there is no guarantee that the JavaScript engines or their implementations will work exactly the same way.





What we programmers expect is the basic behavior that when we use the `new` keyword to instantiate an object and then later completely dereference that object, a garbage collector will come along and reclaim the memory. This is what the spec tells us will be done.





It is not so simple, though. In a language like C, you have `malloc()` and `free()` to allocate and deallocate memory. The programmer knows when some dynamically created thing is no longer needed. In JavaScript, the programmer may know when some object is no longer needed as well, and can dereference it. For example, in JavaScript you might do something like:




    
    var thingy = new Thing();
    doSomethingWith(thingy);
    thingy = null;
    





You might think you’re completely dereferencing `thingy`, but maybe you’re not! What happens if another method somewhere, `doSomethingWith()`, stores a reference to `thingy` elsewhere? You now have 2 references to `thingy` and setting one `thingy`reference to null does not deference all references to `thingy`. Or better yet:




    
    thingy.self = thingy;
    





Now you have two references to `thingy` in what’s known as a circular reference. Another form of circular reference is:




    
    otherThingy.other = thingy;
    thingy.other = otherThingy;
    





Setting either `otherThingy` or `thingy` to null does not eliminate all the references to them. So the garbage collector algorithm already needs to be clever about what it’s doing. The last example with circular reference implies that a good garbage collector will do something beyond reference counting and determine when an allocated item is not reachable through any variable in the program.





The cleverness of the garbage collector does not have to stop at ﬁguring out when something can be freed. If a program is constantly allocating the same object type and freeing the same object type, the garbage collector can reuse memory no longer referenced for one such object for the creation of a new one.





The spec also does not completely tell us is what language constructs and expressions other than using the `new` keyword may also be allocating memory. This memory also needs to be garbage collected at some point.





Here are a few examples of the more obvious constructs that allocate memory without using the new keyword:




    
    function x() { return 10; }         // a function object
    var x = function() { return 20; };  // a function object
    var a = [ 1, 2, 3 ];                // an array object
    var o = { a: 1, b: 2 };             // an Object
    var a2 = [ 4, 5, 6 ];               // an array object
    var a3 = a.concat(a2);              // an array object
    





A common programming practice is to implement factory methods that might allocate objects and return them. There’s one built into every browser:




    
    var element = document.createElement(‘img’); // allocate an IMG element
    element = null;                              // dereference (free) it
    





Here is a less obvious construct that may or may not allocate memory:




    
    var s = ‘some string’;                    // allocates a String object
    s += ‘ another string’;                   // how many String objects now?
    s += ‘ yet another’ + ‘ yet yet another’; // how many?
    





You see, it’s up to the implementation to decide how to implement strings. The ECMA spec only says that strings are immutable. So even this is questionable:




    
    s = s.substr(0, 8);
    





The `substr()` method is not guaranteed to allocate a new String because it could reference the existing string, only needing to store the 0 and 8 to identify the actual bit of the new string.





The garbage collector must also deal with the issue of fragmentation. Consider the following code fragment:




    
    var a = [ 1, 2, 3 ], 
    b = [ 4, 5, 6 ], 
    c = [ 7, 8, 9 ], 
    d;
    
    b = null;
    d = [ 10, 11, 12, 13 ];
    





The var declarations allocate 3 arrays of 3 integers. After we declare the arrays, we free the middle array; in memory you have array followed by freed memory followed by array. The freed memory is big enough to hold a 3 integer array. The third line allocates a new array but of four integers. The freed memory between the a and c arrays is not big enough for the new array so it is allocated elsewhere.





There is a hole in the memory space big enough to hold a 3 integer array. If the program runs long enough and allocates and frees lots of items, it likely will reach a point where no new item can be allocated because the only available chunks of memory are too small.





To resolve this situation, the garbage collector might physically move memory around to eliminate the holes. Our JavaScript programs don’t have to know about the memory being moved around since the engine will assure when we access a variable by name that we’re getting the right value. Moving memory takes time, though. If the garbage collector kicks in at the wrong time, and there’s no guarantees when it will kick in, your application can have a very noticeable pause in it.





Online documentation, other than source code, for the V8 engine’s garbage collector is extremely limited. The best written explanation I could ﬁnd is here:





[https://developers.google.com/v8/design#garb_coll](https://developers.google.com/v8/design#garb_coll)





> 
  
> 
> # Efficient Garbage Collection
> 
> 
  
  
> 
> V8 reclaims memory used by objects that are no longer required in a process known as garbage collection. To ensure fast object allocation, short garbage collection pauses, and no memory fragmentation V8 employs a stop-the-world, generational, accurate, garbage collector. This means that V8:
> 
> 
  
  
> 
> 
  
>   * stops program execution when performing a garbage collection cycle.
> 
  
>   * processes only part of the object heap in most garbage collection cycles. This minimizes the impact of stopping the application.
> 
  
>   * always knows exactly where all objects and pointers are in memory. This avoids falsely identifying objects as pointers which can result in memory leaks.
> 
  
  
  
> 
> In V8, the object heap is segmented into two parts: new space where objects are created, and old space to which objects surviving a garbage collection cycle are promoted. If an object is moved in a garbage collection cycle, V8 updates all pointers to the object.
> 
> 






I was working on a simple 2D video game engine and demo for a recent JSMag article I wrote. It occurred to me that the JavaScript garbage collector could kick in at any time and my game would freeze for as long as the garbage collector might take to run. I don’t see how I can eliminate the need for garbage collection entirely, because of the various language constructs and expressions that may allocate and dereference memory beyond my control. However, I do ﬁgure it might be possible to reduce the amount of allocation and dereferencing to the point where the garbage collector kicks in every few hours rather than so often that it’s annoyingly noticeable.





Sometimes your intuition tells you one algorithm is superior to others, but the computer tells you that you’re wrong!





The linked list data structure has been around for decades and is one of the most important concepts in programming. Yet I’ve not seen linked lists used in JavaScript, and I’ve both written and read an awful lot of code the past several years.





Consider this class I wrote for [SilkJS](http://www.silkjs.net/):




    
    (function() {
        "use strict";
    
        var List = function() {
            this.next = this; this.prev = this;
        };
        List.prototype.extend({
            addHead: function(o) {
                this.append(o, this);
            },
            addTail: function(o) {
                this.append(o, this.prev);
            },
            remHead: function() {
                return this.next === this ? false : this.remove(this.next);
            },
            remTail: function() {
                return this.prev === this ? false : this.remove(this.prev);
            },
            append: function(node, after) {
                node.next = after.next; node.prev = after; after.next.prev = node; after.next = node;
            },
            remove: function(node) {
                node.next.prev = node.prev; node.prev.next = node.next; return node;
            },
            each: function(fn) {
                for (var node = this.next; node !== this; node = node.next) {
                    fn(node);
                }
            },
            empty: function() {
                return this.next === this;
            }
        }); exports.List = List;
    }());
    





What’s nice about this implementation is that your list “nodes” may be any arbitrary JavaScript object. The only catch is the List class adds members “next” and “prev” to each node, so you can’t have your own members with those names.





In a video game like Asteroids, you ﬂy your ship around and ﬁre bullets at the asteroids and enemy ships. You are limited to 4 bullets on the screen at a time. Let’s consider three different strategies for managing the bullet objects in JavaScript.





First, you might call `new Bullet()` each time the user presses the “ﬁre” key. When the bullet hits an asteroid or enemy or times out, it is no longer needed so the code dereferences it and it gets garbage collected. You’d think that over time, there’d be a lot of freed `Bullet` objects and the garbage collector might take a noticeable amount of time to reclaim the memory. Fragmentation is likely since the game might be allocating all kinds of things all the while; new smaller asteroids when one is hit, the strings to display the score, etc.





Second, you might pre-allocate 4 `Bullet` objects and keep them on a free List. When the user presses the “ﬁre” button, you remove a Bullet from the head of the free List and use it. When you’d normally dereference the `Bullet`, you instead add it back to the free List. With this scheme, you’re not allocating a new `Bullet` using the JavaScript memory management routines each time one is ﬁred, and the `Bullets` are always referenced so they’re never garbage collected.





And third, you might pre-allocate the 4 `Bullet` objects as in the previous scheme, but use an array to track the free `Bullet` objects. That is, use `array.push()` to free a `Bullet`, and `array.pop()` to allocate one. This has the effect of not allocating and freeing the `Bullets` all the time. But maybe the JavaScript engine is doing some allocation and deallocation behind the scenes that we don’t know about?





The only way to really ﬁnd out is to write some test code and see what happens. I wrote a single JavaScript source ﬁle and ran it through SilkJS ([http://silkjs.net](http://silkjs.net)) to measure both the execution speed and memory usage characteristics of the three approaches. SilkJS just happens to have some nice functionality to facilitate the measurements, and it’s built on top of V8.





I ran the tests on my iMac. The ps command displays the status of processes running in the system. By executing:




    
    $ ps -lc | grep silkjs
    





We get a line that looks something like this:




    
    501  8933   337     4006   0   31   0   3049932  24872 -     R+
    0 ttys000    0:11.88 silkjs
    





The number we care about is the 24872 one, which is the RSS size, or Resident Set Size, of the silkjs program. As code is loaded and compiled, the RSS size will increase. As the program allocates memory the RSS size will increase. When the V8 garbage collector runs, the RSS size should decrease. Though the operating system may have its own means to deal with memory management that can affect the readings, this is the best I can come up with.





I wrote the following test program, test.js, to experiment with the three strategies.




    
    var v8 = require('builtin/v8'),
         console = require('console'),
         process = require('builtin/process'),
         rusage = process.rusage,
         List = require('List').List,
         counter = 0;
    
     function MyClass() {
         this.construct();
     }
     MyClass.prototype.construct = function () {
         this.counter = ++counter;
     }
    
     function MyClass2() {
         this.construct();
     }
     MyClass2.prototype.construct = function () {
         this.counter = ++counter;
         this.counter2 = ++counter;
     }
    
     var freeClasses = [];
     var freeClasses2 = [];
     (function () {
         for (i = 0; i < 5; i++) {
             freeClasses.push(new MyClass());
             freeClasses2.push(new MyClass2());
         }
     }());
    
     var freeList = new List();
     var freeList2 = new List();
     (function () {
         for (var i = 0; i < 5; i++) {
             freeList.addTail(new MyClass());
             freeList2.addTail(new MyClass2());
         }
     }());
    
     function run1() {
         var c;
         for (var i = 0; i < 1000000; i++) {
             c = new MyClass();
             c = new MyClass2();
         }
     }
    
     function run1() {
         var c;
         for (var i = 0; i < 1000000; i++) {
             c = new MyClass();
             c = new MyClass2();
         }
     }
    
     function run2() {
         for (var i = 0; i < 1000000; i++) {
             var c = freeClasses.pop();
             c.construct();
             freeClasses.push(c);
             c = freeClasses2.pop();
             c.construct();
             freeClasses2.push(c);
         }
     }
    
     function run3() {
         var i, c;
    
         for (i = 0; i < 1000000; i++) {
             c = freeList.remHead();
             c.construct();
             freeList.addTail(c);
             c = freeList2.remHead();
             c.construct();
             freeList2.addTail(c);
         }
     }
    
     function times(n, fn) {
         console.log(process.exec('ps -lc | grep silkjs').replace(/n$/, ''));
         var rss = rusage().time;
         for (var i = 0; i < n; i++) {
             fn();
         }
         console.log(process.exec('ps -lc | grep silkjs').replace(/n$/, ''));
         var diff = rusage().time - rss;
         console.log('elapsed = ' + diff);
     }
    
     function main() {
         var i;
         for (i = 0; i < 100; i++) {
             times(100, run3);
         }
         console.log('run 3 ' + process.exec('ps -lc | grep silkjs').replace(/n $/, ''));
     }





The variable declarations at the top load SilkJS’s `v8`, `console.Process`, and `List` modules. The `rusage()` function is used to time how long execution of various tests took.





I implemented two test classes, `MyClass` and `MyClass2`. For testing purposes, I didn’t want to instantiate the same sized objects each time; I wanted a mix of at least the two different objects to (in theory) add some potential fragmentation.





I then created two arrays of free objects, one of each type. I only instantiated 5 free objects of each type in the free object arrays. The tests do allocate many millions, even billions, of each object, but they are “freed” immediately. I could have gotten away with pre-allocating just one.





I then created two `Lists` of free objects, one of each type. I likewise instantiated 5 free objects of each type in the free lists.





When allocating objects from the free arrays or free `Lists`, there is a subtle difference from creating one with the new operator. In the latter case, new causes the class’ constructor to be called automatically. Note that I added a `construct()` method to the class’ prototypes and call those methods from the Function constructors. To assure the tests are fair, I want to allocate new objects from the arrays or `Lists` and call the `construct()` method.





I then implemented 3 test functions named `run1()`, `run2()`, and `run3()`. The functions each choose a different strategy for allocating and deallocating instances of `MyClass` and `MyClass2` objects. Each function allocates and deallocates one of each class type in a loop 1 million times.





The `run1()` function tests allocating and freeing objects using new and dereferencing each time. The `run2()` function uses `array.pop()` and `array.push()` to allocate and deallocate objects of each type, and also calls each’s `construct()` method within the loop. The `run3()` function uses the free Lists to allocate and deallocate objects of each type, also calling the `construct()` methods accordingly.





The `times()` function executes one of the tests n times. The `main()` function calls `times()` to execute one of the tests 100 times. So the test run is effectively instantiating 100 million of each class. Every time one of the run methods is executed, the output of the ps command is printed to show the information (RSS) of the silkjs process. Also, the amount of real time it took to execute the run function is printed.





I edited the `main()` function to call either the `run1()`, `run2()`, or `run3()` function for the test. I ran the program 3 times, one per test.





On to the results.





# run1





This test took 4 minutes, 18.5 seconds to run.





The initial RSS size was 17292 pages and this number steadily grew to 50004. Basically the RSS size tripled.





The execution time of each loop took longer and longer over time. The ﬁrst few million instantiations took about 1.9 seconds. The 8th time took 2.4 seconds, a big jump in execution time for no apparent reason. Toward the end of the test run, the times were on the order of 2.7 seconds.





# run2





This test took 6 minutes, 24.7 seconds to run. That it took 1.5 times longer to run than the ﬁrst test makes sense because the ﬁrst test did nothing but dereference objects to cause them to be garbage collected and this test has the extra step of manual deallocation (adding back to the free arrays).





The initial RSS size was 17292 pages and this number steadily grew to 33444. Basically the RSS size doubled.





The initial execution times per 1 million instantiations took about 2.6 seconds. As with the ﬁrst test, there is a mysterious jump in execution time the 8th run; it started taking 3.9 seconds per run. There was only a slight increase in execution time as the tests continued. The last one took 3.9 seconds, though some of the tests took a tad over 4 seconds.





# run3





This test took 13 minutes, 48 seconds to run. This is not surprising since there is the manual step of deallocation by adding freed objects to the free Lists and the code to manage the Lists’ previous and next values is signiﬁcant overhead in such a tight loop. In fact, the overhead seems to be about 7 minutes worth of time, when compared to run2.





The initial RSS size was 17292 pages and this number grew to 49948, not steadily but by large amounts once every several runs. The ﬁrst run took it to 18224. The 8th run took it to 25324. The 24th run took it to 33544. The 83rd run took it to 49948.





The initial execution time per 1 million instantiations took about 7.4 seconds. The time jumped during the 8th run to 8.1 seconds, then settled at 8.3 seconds per run the rest of the tests.





## Analysis





While the RSS size of the SilkJS process grew during all three tests, none of the tests came close to using much of my iMac’s memory. Maybe if I let the tests run for days, or even longer, I might have seen what happens when V8’s garbage collector has to deal with out of memory conditions.





For raw speed, just using the `new` operator and dereferencing objects to let the garbage collector do its thing is the winner. However, it uses the most memory and when the garbage collector kicks in, it’s going to have a lot more work to do and thus stop program execution for a longer time.





The best combination of speed and least memory used is clearly the array strategy according to these tests. I personally ﬁnd using the native JavaScript array methods to be elegant, concise, and fast. It’s also useful that the `array.sort()`, `array.push()`, `array.pop()`, `array.reverse()`, etc., modify the array in place. In theory, using these won’t cause any memory to be garbage collected. An active array can be sorted by some priority value to achieve a sorted list.





`Lists` may well be the best solution if you’re removing nodes from the middle of the `List` a lot, or randomly inserting nodes at various positions in the `List`. This avoids, if instead using the array strategy, using `array.indexOf()` to ﬁnd the index of a node and then `array.splice()` to remove the node. The `array.splice()` method also returns an array of removed nodes that would be allocated each call and need to be garbage collected at some point.





In theory, using `Lists` should be both fast and should use the least amount of allocated memory. The results are somewhat surprising, to say the least. To remove a node from a `List` requires just two assignments. To add a node to a `List` requires just four assignments.





Looking at my `List` implementation I see a few things that explain the speed and memory use characteristics.





The List implementation is elegant in its expression but calling a common `append()` method from both `addHead()` and `addTail()` has to be a performance hit in a tight loop like I implemented in the tests. When you consider that Objects are implemented as dictionaries or hashmaps internally, and that member variables are references to function objects, and that both the object hashmap and its prototype hashmap need to be searched, and that the member name has to be run through some hash function, it’s bound to be slow. Even if the function call overhead were removed, executing a line like:




    
    node.next = after.next;
    





is at least one hash function call to convert the string ‘next’ into an integer index, and potentially 4 hash function calls (node, next, after, next).





As far as memory usage goes, I ran an additional test that simply called an empty function in a loop 10 million times (x 100) and the RSS grew by over 2 megabytes. So the `List` class implementation that makes several function calls per operation is going to consume memory.





## Conclusion





In doing the research for this post, I ran across a great email in the v8-dev Google group by Jakob Kummerow, one of the Chromium developers. I quote it in full here:





[https://groups.google.com/forum/?fromgroups=#!topic/v8-dev/vqaaluoupeA](https://groups.google.com/forum/?fromgroups=#!topic/v8-dev/vqaaluoupeA)





> 
  
> 
> Basically, the issue you're hitting is the fact that JS arrays a way more complicated objects than C arrays. This is a necessary consequence of the specifications of these two languages. To be more specific, I can see two reasons why your code runs slow:
> 
> 
  
  
> 
> 1.) As you've guessed yourself in the comment section of the benchmark, sparsely filled JS arrays are represented as dictionaries (a.k.a. hashmaps) in memory. The reason is that it's completely legal JavaScript to create an empty array and then use only the billionth element of it -- it would be a huge waste of memory if a billion elements were actually allocated for that. On the other hand, fast access to array elements is only possible when the index can be used as memory offset, i.e. when the array is stored as an actual (C-like) array in memory. Every JS engine implementation will have some heuristics internally that decide when to use one representation over the other.
> 
> 
  
  
> 
> 2.) V8's optimizing compiler currently has no support for the "for...in" statement, meaning any function containing a for...in loop cannot be optimized. This, again, is due to the JS specification making it pretty complicated to enumerate all properties of an object.
> 
> 
  
  
> 
> So, here are a few suggestions how to make your code faster: - Use your arrays in a dense fashion by making index calculations yourself, just as you would in C, i.e., something along the lines of:
> 
> 





    
    var array = new Array(len);
    for (var i = n; i < n + len; i++) {
        do_something_with(array[i - n]);
    }
    





> 
  
> 
> As an alternative, use typed arrays (Float64Array and friends), as these will always allocate array-like memory (they don't have a dictionary mode). - When you create an array, always specify its size, thereby avoiding out-of- bounds accesses (which are legal, but slow). - Don't use for...in loops. To iterate over arrays, use "`for(i=0; i < array.length; i++) {...}`" instead.
> 
> 




