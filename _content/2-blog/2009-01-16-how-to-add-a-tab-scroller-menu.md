---
author: jay
comments: true



title: How to add a tab scroller menu

---

I was writing about the limitations Tab Display Interface (TabPanel) and I wondered how we could make it better.  It dawned on me that we should be able to easily add a menu to the right of the scroll-right buttons.  So, I launched photoshop, and modified the existing scroll-right menu sprite (enlarged):
![](http://moduscreate.com/js/examples/ext/tdgiux/tabScrollerMenu/tabmenu.gif)

Next, I needed to come up with a solution on how to inject that sprite into the tab panels' stab strip.  I started by creating a bunch of CSS overrides **and** Ext.TabPanel overrides.  This clearly was not the best solution, as I thought it would be best to give developers the choice on whether they want to use it or not.  I then transformed things into an extension.   That didn't work well because the CSS overrides were still in place.  So, I decided to transform it again into a plugin, and this is where it really shines!

![](http://moduscreate.com/img/screencasts/2009-01-16_0931.png)
Download: [zip](http://moduscreate.com/js/examples/ext/tdgiux/tabScrollerMenu/tabScrollerMenu.zip) (contains related CSS and images);

Example page: [http://moduscreate.com/js/examples/ext/tdgiux/tabScrollerMenu/](http://moduscreate.com/js/examples/ext/tdgiux/tabScrollerMenu/)

**Example usage:**
**Plugin Source:**

