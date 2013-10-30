---
author: jay
comments: true



title: Animating DataView and GridView records

categories:
- Development
- ExtJS
---

Often time as Ext JS developers, we are asked to create GridPanels and DataViews. With those come the tasks of adding and removing records, which is relatively simple. In this article, I'm going to show you how you can add some spice to your applications by implementing animations to your GridPanels and DataViews.





Pretend for a moment you have been given an assignment. You are to allow records from a DataView to be moved to an adjacent GridPanel. The rules are as such:






    
  * Users must be allowed to migrate records form the left DataView to the right GridPanel

    
  * After records have been moved to the GridPanel, they cannot be migrated back to the DataView. They can only be destroyed.





![](http://moduscreate.com/img/screencasts/2011-02-23_1444.png)





The question becomes, how can we do this? If we sit down and think about the first task, migrating records from left to right, we must consider the order of operation that must occur.






    
  * Get a collection of the selected nodes _and_ records in the DataView

    
  * Animate **out** the row representing the record in the DataView

    
  * Remove the records from the DataView store, all the while capturing a reference to that very record.

    
  * Add the records to the GridPanel store

    
  * Locate the indexes of the newly inserted records in the GridPanel

    
  * Somehow gain a reference to the HTML elements that represent the records in the GridPanel View

    
  * Animate the elements in.





Sound like a lot of work? With Ext JS It's actually surprisingly easy. Here is the handler for the "add to grid" button.




    
    // This is the handler for the 'add to grid' button
    var addToGrid = function() {
        var selNodes  = dataView.getSelectedNodes(),
            selRecs   = dataView.getRecords(selNodes),
            dvStore   = dataView.store,
            gridStore = gridPanel.store,
            gridView  = gridPanel.view,
            gridRowIdx,
            gridRowEl;
    
        // Loop through the selected nodes
        Ext.each(selNodes, function(selectedEl, idx) {
            // Animate and remove from store after animation
            Ext.get(selectedEl).slideOut('t', {
                callback : function() {
                    // remove from DataView store
                    var rec = selRecs[idx];
                    dvStore.remove(rec);
    
                    // Add to grid store
                    gridStore.add(rec);
                    gridRowIdx = gridStore.indexOf(rec);
                    gridRowEl  = gridView.getRow(gridRowIdx);
    
                    // Animate the newly added row.
                    Ext.get(gridRowEl).slideIn('t', {
                        callback : function(el) {
                            el.highlight();
                        }
                    });
                }
            });
        });
    };





As you can see in the code above, the trick to getting things done immediately after an animation is making use of callbacks, which are methods that are executed **after** something of interest has occurred. In our case, the animations will execute our callback methods to ensure that everything happens in the proper order.





Here is a video of it working:
Ouch! your browser does not support HTML5 video! :( you'll have to click the [this](http://moduscreate.com/img/screencasts/2011-02-23_1504.mp4) link to view the video.






There you have it. Adding simple animations implemented in DataViews and GridPanels can enhance the feel for our Ext JS applications, helping make a more pleasant experience for your users.





If you want to see the example visit [http://moduscreate.com/examples/566](http://moduscreate.com/examples/566). There you can add/remove records. You can view the page source to see how everything is setup.





### Read more.





To understand how Animations, data Stores, GridPanels, DataViews, work, check out my book,[Ext JS in Action](http://manning.com/garcia). You can get **40% off** by using coupon code "extjs40" at checkout.





### Like what you've read today?





Please register and leave a comment. The best fuel that drives us to write is involvement with our readers :).



