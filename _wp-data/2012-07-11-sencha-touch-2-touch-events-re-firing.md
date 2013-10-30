---
author: stan
comments: true



title: Sencha Touch 2 Touch Events Re-firing

categories:
- Development
- HTML5
- JavaScript
- Sencha Touch
---

While generally we try to avoid native browser alert() and confirm() we sometimes have no control over their use. I have come across a situation where working in a Native iOS app that a certain call caused a confirm dialog to pop up. This call was triggered from a tap event on a custom button.

**Here's an example of what happens:**






> 
This scenario was done on iOS Simulator 5.1 iPad mode with the app on the home screen.   

Mobile Safari exhibits the same results.  

Console logging/remote debugging is provided by [weinre](http://people.apache.org/~pmuellr/weinre/)



**The code behind this:**

    
    Ext.define("Storefront.view.Test", {
        extend : 'Ext.Container',
        xtype  : 'test',
        config : {
            centered : true,
            tpl      : '<div class="sf-button sf-button-main">Hello World</div>',
            data     : {}
        },
        initialize   : function() {
            this.callParent();
            this.element.on({
                tap        : this.onTap,
                touchstart : this.onTouchStart,
                touchend   : this.onTouchEnd,
                delegate   : '.sf-button'
            });
        },
        onTap        : function(evtObj) {
            alert('button tapped');
        },
        onTouchStart : function(evtObj) {
            console.log('touchstart fired ' + evtObj.getTime());
            var btn = evtObj.getTarget('.sf-button');
            if(btn) {
                Ext.fly(btn).addCls("sf-button-pressed-main");
            }
        },
        onTouchEnd   : function(evtObj) {
            console.log('touchend fired ' + evtObj.getTime());
            var btn = evtObj.getTarget('.sf-button');
            if(btn) {
                Ext.fly(btn).removeCls("sf-button-pressed-main");
            }
        }
    });


To alleviate this issue, all we have to do is wrap the alert in a `setTimeout`. The `setTimeout` forces the function to execute after the touch event cycle has fully completed.

    
    onTap        : function(evtObj) {
        setTimeout(function() {
            alert('button tapped');
        }, 0);
    }


Further reading:



	
  * [Mozilla MDN setTimeOut](https://developer.mozilla.org/en/DOM/window.setTimeout)

	
  * [How JavaScript Timers Work - John Resig](http://ejohn.org/blog/how-javascript-timers-work/)


