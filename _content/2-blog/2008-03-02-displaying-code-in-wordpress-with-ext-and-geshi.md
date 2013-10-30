---
author: jay
comments: true



title: Displaying Code in Wordpress with EXT and GESHI

---

With about an hour's worth of effort, I added the ability to display code using [Ext](http://extjs.com) and [GESHI](http://geshi.org).  My goal was not to have to hack wordpress to accept javascript, and take full use of Ext's updater function.  Instead of embedding the code in wordpress, I simply put a custom xhtml tag like below.  Ext DomQuery finds the tags, and uses them to append panels to display the code.  Geshi simply formats it on the server side.   I found this to be much faster than any javascript syntax highlighter.  I'm going to look into filling the toolbar with download and copy to clipboard functions (using flash).

Example Html:
< tdgicode source="sourceTo/js.js" paneltitle="Test 1 Title" />

Example Javascript:

