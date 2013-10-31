---
author: grgur
comments: true



title: Orientation change zoom bug with Android and Sencha Touch 1 - FIXED

categories:
  - Development
---

Millions devices in the market rely on Android Browser as a platform for web application delivery, even through PhoneGap/Cordova deployments. Unfortunately, the browser is shipped with numerous bugs that prevent expected behavior to commence. One of the issues in particular involves **viewport (screen) scaling** to reset on orientation change.





The** orientation change** event on Android devices is one of the most peculiar of all. It only happens when device is rotated back to portrait. Yes, it never occurs in landscape mode. Oddly enough, it doesn't happen quite every time for portrait orientation, either. In other words, the bug is unpredictable and renders applications unusable.





Here's a quick snapshot of what we saw.





![Sencha Touch 1 rotation scaling bug](../assets/uploads//2012/09/2012-09-18_16442-620x337.png)





There are a couple of issues here. First, the meta viewport instruction resets on orientation change. The way to go with this is to listen for the orientation change event and reapply the meta tag. Before I demonstrate that, I want to point out another bug.





Many Android Browser builds chose not to honor the `width=device-width` part of the meta viewport tag. Although it's officially recognized as an Android bug, we have to wait for Google to replace the browser with Chrome. This is definitely not going to help with so many devices locked to the old versions of Android. Fear not, we have a solution for it.





The fix involves patching your viewport class. More precisely, that should be the view that stays persistent in all sections of your web application. If you have more than one, that apply the fix to all instances.




    
    App.view.Viewport = Ext.extend(Ext.Panel, {
        // 1 - activate orientation monitoring for this component
        monitorOrientation: true,
        initComponent : function() {
            // 2 - only trigger for the offending OSs
            if (Ext.is.Android) {
                // 3 - cache the meta tag reference
                var viewport = Ext.DomQuery.selectNode('meta[name=viewport]');
                this.on('orientationchange', function () {
                    // 4 - reset the viewport settings with a high-enough width
                    var reset =  'width=10000, initial-scale=1.0, '
                              + 'minimum-scale=1.0, maximum-scale=1.0, user-scalable=0';
                    viewport.setAttribute('content', reset);
                });
            }
            App.view.Viewport.superclass.initComponent.call(this);
        }
    };





The breakdown of the process looks like this:







  1. Make sure the component monitors orientation changes.


  2. Check that you are applying the fix for the right OS. It's not necessary to fix anything on browsers that don't reflect the issue so we limit the patch for Androids.


  3. Grab that meta tag reference and keep it in memory. In this way it will not be recreated with each orientation change.


  4. Reset the meta viewport tag.





Notice `width=10000` in section 4. In any other case, this should read `width=device-width`. Incidentally, that won't work in all versions of the Android Browser, thus we have to be more specific. To avoid other bugs with screen size calculations, we are safe leaving it a large number, something as large as 10000. No worries, the browser will understand it's boundaries and will limit itself to the maximum pixels available.





Here's a video demonstration of the bug and fix:



