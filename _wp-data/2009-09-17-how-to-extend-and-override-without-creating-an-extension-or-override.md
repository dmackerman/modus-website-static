---
author: jay
comments: true



title: How to extend and override without creating an extension or override.

---

Many times Ext JS developers are required to extend or add functionality to a widget in the framework.Â     Some of the solutions include creating an actual extension using Ext.extend or even creating a plugin.Â  If the requirement is a only for a single-use and is relatively simple to implement, creating an extension or plugin class is overkill.Â Â  So the question is, what is the best solution for this type of situation?

I say it's override and extend on-the-fly at the configuration object, which is possible for just about every class in the framework. Â  We'll go into exactly how this works in just a bit.Â  Before that, I'd like for you to ponder a simple requirement, and we'll explore an extremely simple one-off solution.

**Requirement:** Display an Ext JS Window that when closed, a confirmation dialog is requested.Â  If the actor presses "yes", then the instance of Window actually closes with an alert confirming the window closing.Â  OK, I know that it sounds a little silly.Â  Trust me, in the nearly four years I've been developing applications with this framework, silly requirements like this have been presented to me.

OK, how do we solve this easily?Â  Here is an example that _extends_ the close method, and introduces a new method (alertClose) to the instance of Ext.Window to be created.

![](http://moduscreate.com/img/screencasts/2009-09-19_1016.png)

Here's how this works.Â  In the above code, we extend the **close** method.Â  The reason I choose the word "extend" is because, just like when creating an actual _extension_, we have the ability to call the Window.prototype.close method, which actually will complete the original execution flow.Â  If we chose not to call the prototype.close method, then this _technically_ would be an _override_.

The **close** method will display the Ext.MessageBox.confirm dialog.Â  The dialog's callback is an anonymous method that is scoped to the instance of Window that is being created.Â  It inspects the Button id, which defaults to 'yes' or 'no'.Â  If the actor clicks 'yes', then theÂ  newly added this.alertClose method is called,Â  alerting the actor that the window closed.Â  This isÂ  followed by an Ext.Window.prototype.close is call, actually closing (and destroying) the instance of Window that is created.

If the actor clicks the "no" button, then the confirmation dialog hides and all is well again.Â  Below is the UI flow of the code above.
![](http://moduscreate.com/img/screencasts/2009-09-17_1548.png)

I'm sure you're probably thinking: "Wait a minute?!Â  How the heck is that possible?"Â  It's possible because in _most_ classes, the following line exists in the constructor:
** Ext.apply(this, config);**

This line basically applies whatever is in the configuration object to the instance of the class (this), thus setting override parameters and methods.Â  This, of course, includes any _new_ methods, such as **alertClose** (above).

Here it is in Ext.Component (Ext.Window is a descendant of Ext.Component):
![](http://moduscreate.com/img/screencasts/2009-09-17_1558.png)

And there you have it, you now know how to extend and override a single instance of a class without creating an extension or override.

Extensions and plugins are not obsolete however.Â  They still retain their value and hold their place in this world.Â  After I write the "Extensions and Plugins" chapter of Ext JS in Action, I'll follow up with a somewhat comprehensive guide to constructing these.


and introduce the confirmation prompt.
