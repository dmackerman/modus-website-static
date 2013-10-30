---
author: jay
comments: true



title: 'QuickTip: Prevent Ext JS Buttons from stealing focus'

categories:
- Development
- ExtJS
---

I've recently been tasked with creating a Touch Screen POS (Point of Sale) payment module, which requires users to enter values via button press.  The workflow is simple.  Focus a field, enter data.  Perform that loop until you're done, then press the confirmation button.





The rub with this requirement is that buttons automatically **steal** focus.  One approach is to manually try to manage what input field was last focused, and will have to create all types of spaghetti code just to overcome this focus issue.





A better approach is to prevent the problem from happening in the first place.  This means that we'll have to somehow intercept the mousedown and mouseup events.  In order to do _that_, you will have to override two methods in the ExtJS Button class.





If you want to check this out on your own, I've attached code below. The easiest thing to do is to drop it in any Ext JS page via firebug.

Here is quick video demonstrating the override in action.





Ouch! your browser does not support HTML5 video! :(  you'll have to click the [this](http://moduscreate.com/img/screencasts/2011-02-09_1513.mp4) link to view the video.






In that video, we can see that even when mashing on the keyboard and button with the overrides, the focus is retained in the text area.  But, you're probably interested in seeing a real-world use-case.





Below is a video that demonstrates a very early working copy of module I'm developing, that utilizes the overrides.





Ouch! your browser does not support HTML5 video! :(  you'll have to click the [this](http://moduscreate.com/img/screencasts/2011-02-09_1513.mp4) link to view the video.






In the video above, I am pressing number keys along with clicking on instances of Ext.Button to demonstrate the consistent focus of the input fields on the screen.





  






## The big picture





To solve this application wide, you _could_ create a plugin or a mixin, but I think the best approach is to create an override that injects a new behavior for all Button instances, allowing you to simply set a flag to turn on the behavior with a simple config property.





Below is the code that you can use in your application today to include this behavior.







# Read more.





To understand how inline extensions work, check out our article titled "[how to extend and override with out creating an extension or override](http://moduscreate.com/202/how-to-extend-and-override-without-creating-an-extension-or-override)".





# Like what you've read today?





Please register and leave a comment.  The best fuel that drives us to write is  involvement with our readers :).





# Looking for Ext JS or Sencha Touch professional services?





TDG-i specializes in high-end software development with Ext JS and Sencha Touch.  To learn more about who we are and what we do, check out our [professional services](/pro-services) and [about-us](/about) pages.



