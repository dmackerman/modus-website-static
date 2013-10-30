---
author: jay
comments: true



title: Ext.ux.TDGi.iconMgr - a utility class for managing icons and CSS

---

The [old Icon class](http://moduscreate.com/41/famfamfam-icons-packaged-with-css-for-use-with-ext-2x) was static, requiring users to manage CSS files.Â  Thus, was not really a fix, but just a convenience.

Here comes [Ext.ux.TDGi.iconMgr](http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr/).Â  A utility class that automatically sets styles forÂ  you.Â  It creates and appends to a stylesheet in the dom, eliminating the need to manage CSS entirely.Â  The icon set contains images in PNG and GIF (IE6), and automatically selects which to use.

example: [http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr/](http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr/)

Icon Sources:
[http://www.famfamfam.com/lab/icons/silk/](http://www.famfamfam.com/lab/icons/silk/) and [http://www.damieng.com/icons/silkcompanion](http://www.damieng.com/icons/silkcompanion)

**Example usage:**
**Ext.ux.TDGi.iconMgr and Ext.ux.TDGi.iconBrowser Classes**
It also comes with an icon browser, which I will eventually segment images by letter.
![](http://moduscreate.com/img/screencasts/2008-07-14_2032.png)Download: [zip](http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr/TDGi.iconMgr.zip) or  [tar-gzip (tgz)](http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr/TDGi.iconMgr.tgz)
