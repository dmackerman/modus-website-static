---
author: jay
comments: true
title: 'Sencha Touch 2.0 Expert tip: Make the Carousel fire show events at the proper time!'
categories:
    - Development
    - Sencha Touch
---

Recently, I came across a requirement where I needed to know when a [Sencha Touch 2.0](http://www.sencha.com/products/touch) [Carousel Item](http://docs.sencha.com/touch/2-0/#!/api/Ext.carousel.Item) is shown to the user (active item 0) to render an advertisement and when an item is hidden, to remove that advertisement from view. What I've learned is that the Carousel currently does not fire show or hide events for child items. If you were to listen to the Item's `painted` event, you'd see that it will fire that event before it's actually visible to the user, which does not fulfill my requirement. To make this happen, we have to extend the carousel to fire the show event at two distinct times (see code below). This is somewhat of a hack, but the one of the cleanest ways to make this happen.




    
    Ext.define('AW.view.carousel.Stories', {
        extend : 'Ext.Carousel',
        xtype  : 'storiescarousel',
        cls    : 'storiescarousel',
        config : {
            flex      : 1,
            indicator : false
        },
    
        add : function() {
            this.callParent(arguments);
            this.getActiveItem().fireShowEvent();
        },
    
        onActiveItemAnimationEnd : function() {
            var me             = this,
                prevActiveItem = me.getActiveItem(),
                currentActiveItem;
    
            me.callParent(arguments);
    
            currentActiveItem = me.getActiveItem();
    
            (prevActiveItem != currentActiveItem) && currentActiveItem.fireShowEvent();
        },
    
        setOffsetAnimated: function(offset) {
            var me            = this,
                animDirection = me.animationDirection,
                prevItem      = me.getActiveItem();
    
            this.callParent(arguments);
    
            if (animDirection != 0) {
                prevItem.fireHideEvent();
            }
        }
    });
    





In the above example, we are extending Carousel and adding two extension methods, `add` and `onActiveItemAnimationEnd`. Both of them call upon the `activeItem` to execute its `fireShowEvent()` method. `fireShow` is a custom method that we implement as child items to our custom Carousel in our application. We'll cover this method in just a bit. We first extend the `add` method, because after all items are added, the Carousel will have initialized all of its items and set the proper active Item (via the `this.callParent()` method call). It is for this reason that we immediately execute `this.getActiveItem().fireShowEvent()`. We also extend `onActiveItemAnimationEnd` because the active item switch occurs either programmatically via the `animateActiveItem` method, or users swiping the Carousel. It so happens that the best time to figure out when a child item is being displayed is after the animation in either case, which is when `onActiveItemAnimationEnd` method is called on the base class. Again, we call upon the `activeItem` to fire it's custom `fireShowEvent`, but only if the animation actually occurs for a new item. The last method we extend is `setOffsetAnimated`. We extend it because it's a good vector to figure out if the Carousel item is being migrated off screen. We can figure out if the current item (known as `prevItem` in this method) is being swiped off screen if the `animationDirection` property is `!= 0`. When the carousel animates, it will either animate in either negative or positive direction with an absolute value 1. It only then do we call upon the item's `fireHideEvent` method. All of this won't work unless your Carousel child items actually have a `fireShowEvent` method. Here's the pattern to extend `Component` and the insides of `fireShowEvent` method.




    
    Ext.define('MyView.view.carousel.CarouselItem', {
        extend : 'Ext.Component',
        // rest of your code here
        fireShowEvent : function() {
            this.fireEvent('show', this);
        },
        fireHideEvent : function() {
            Ext.Function.defer(this.fireHideEvent, 500, this);
        },
        doFireHideEvent : function() {
            this.fireEvent('hide', this);
        }
    });
    





The extension is pretty simple, as is `fireShowEvent`. One could argue that the Carousel extension could actually invoke the firing of the `show` event. However it is architecturally better to let the view itself fire the event, rather than having it being fired from some other caller. It's worthwhile noting that the `fireHideEvent` delays the `hide` event firing via a deferred `doFireEvent` method call, by 1/2 second. We do this to allow the animation to complete in the Carousel before we allow the DOM to be manipulated off screen. With these two extensions, you can bootstrap your controllers to listen to the show event of a one or more child item and do things like dynamically inject or remove DOM for advertising or other cool stuff.



