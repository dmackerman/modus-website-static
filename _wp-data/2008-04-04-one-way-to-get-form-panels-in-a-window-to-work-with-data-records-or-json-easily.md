---
author: jay
comments: true



title: One way to get form panels in a window to work with data records or json easily

---

Below is an example of how to get a formPanel to work inside of an Ext.Window really easily.  Simply call the class's .show() method with a json object or an instance of a Ext.Data.Record object and it will do the rest.  I realize that this should have probably been done in a 'module' or 'singleton' pattern but I wanted to exercise my use of classes and Ext.extend, etc.  In fact, the class could have been blown out more to accept any instance of a form, etc, but I started to get crunched on time.

[Click here to view the example](/js/examples/ext/formWindowExample/)
![formWindowExample illustrated](http://moduscreate.com/img/screencasts/2008-04-04_1432.png)

[Click here to download the file formWindow.zip](/js/examples/ext/formWindowExample/formWindow.zip).

**Example Code**
**Class**

