---
author: jay
comments: true



title: 'Sencha Touch 2 Tip: Register multiple events on the same element with one method call'

categories:
- Development
---

In order to create [sexy Sencha Touch 2.0 applications](http://www.sencha.com/apps/discover-music) you need to develop custom views. In order to allow users to with those custom views, you must register events on the element. 99% of the time, we need to register three events:







  * touchstart (to highlight item)


  * touchend (remove highlight)


  * tap (invoke some action)





The pattern below works, where we register these tree events on the same element:




    
    var me = this;
    me.element.on({
        scope    : me,
        tap      : 'onElementTap',
        delegate : '.saved-story'
    });
    
    me.element.on({
        scope      : me,
        touchstart : 'onElementTouchStart',
        delegate   : '.saved-story'
    });
    
    me.element.on({
        scope    : me,
        touchend : 'onElementTouchEnd',
        delegate : '.saved-story'
    });
    





... but, you'll notice that it's HUGE from a code perspective and actually quite wasteful.





You can actually make it much less wordy, by registering three event handlers on the same element:




    
    this.element.on({
        scope      : this,
        touchstart : 'onElementTouchStart',
        touchend   : 'onElementTouchEnd',
        tap        : 'onElementTap',
        delegate   : '.saved-story'
    });
    





The above code is less wordy and gets the job done in one method call :).



