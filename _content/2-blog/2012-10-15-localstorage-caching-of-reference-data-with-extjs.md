---
author: aaron
comments: true



title: localStorage Caching of Reference Data with ExtJS

categories:
    - Development
---

Do you have a ton of reference data that needs to load with your app? Lots of combo boxes with mostly static data? Previously I had used a custom store extension to handle caching of the data in memory. That approach involved flipping between use of a MemoryProxy and a RestProxy depending upon whether the data was cached or not. As I found later on, this breaks down when you need to administer that reference data. Why? Because with a MemoryProxy, there's no way to make remote calls for create, update and destroy operations of course! #facePalm





So with my new administration requirements I needed a new approach. And that meant using a custom proxy, rather than a custom store. What I needed was the ability to write a simple store configuration as below, have it pull from the cache whenever possible on read operations and perform normal REST behavior on all write operations.




    
    
    Ext.define('MyApp.store.reference.Country', {
        extend: 'Ext.data.Store',
        model: 'MyApp.model.reference.Country',
        proxy: {
            type: 'cachedrest',
            cacheName: 'Country',
            url: 'api/country',
            useLocalStorage: true
        }
    });
    





_Note: I'm not attempting to reconcile stale data at this time. I will be incorporating a system for clearing and updating the cache at a later time. But you will see that clearing the cache should not introduce any significant complexity into the proxy or store configurations._





In the above, I can then choose to use localStorage or memory for caching and this store will behave normally (i.e. fire all the correct events and maintain the normal store/proxy API). So I can use `autoLoad: true` and `store.load()`, listen for `beforeload` and `load` events and so forth. Let's now take a look at what this proxy will look like. I've only included the "in memory" functionality to just demonstrate the basics of how this works.




    
    
    Ext.define('MyApp.data.CachedRestProxy', {
        extend: 'Ext.data.proxy.Rest',
        alias : 'proxy.cachedrest',
    
        useLocalStorage: true,
    
        read: function(operation, callback, scope) {
            var cachedResponse = this.getCachedResponse();
    
            if (!cachedResponse) {
                this.callParent(arguments);
            } else {
                this.processResponse(true, operation, null, cachedResponse, callback, scope, true);
            }
        },
    
        getCachedResponse: function() {
            var response = MyApp.data[this.cacheName];
            if (response) {
                return Ext.decode(response);
            }
        },
    
        setCachedResponse: function(response) {
            MyApp.data[this.cacheName] = response;
        },
    
        processResponse: function(success, operation, request, response, callback, scope, isCached) {
            // Only cache successful responses that didn't come from the cache
            if (success === true && !isCached) {
                this.setCachedResponse(response.responseText);
            }
    
            this.callParent(arguments);
        }
    }, function() {
        Ext.ns('MyApp.data');
    });
    





Basically, we're just overriding the `read` behavior to do the following: if there's data in the cache, process it; otherwise let the RestProxy do its standard work. Whenever a successful, remote read operation is performed, overwrite the data in the cache.





Now we'll look at incorporating localStorage. First, we'll add a config option called `useLocalStorage`, allowing us to use localStorage for some stores but not for others. Then we'll use that configuration in our `getCachedResponse()` and `setCachedResponse()`. Of course we'll also have to consider browsers that do not support localStorage and automatically have those behave as if `useLocalStorage` is false.




    
    
        getCachedResponse: function() {
            var response;
    
            if (this.useLocalStorage && window.localStorage) {
                response = localStorage[this.cacheName];
            } else {
                response = MyApp.data[this.cacheName];
            }
    
            if (response) {
                return Ext.decode(response);
            }
        },
    
        setCachedResponse: function(response) {
            if (this.useLocalStorage && window.localStorage) {
                localStorage[this.cacheName] = response;
            } else {
                MyApp.data[this.cacheName] = response;
            }
        }
    





Lastly, we're going to want a way to force reading of fresh data. We'll want to be able to say `store.load({forceRequest:true});`. To accomplish this, we'll make a small change to `read()` as follows:




    
    
        read: function(operation, callback, scope) {
            var cachedResponse = this.getCachedResponse();
    
            // Perform normal RestProxy behavior if fresh data is requested or no cached data exists.
            // Otherwise simply process the cached data.
            if (operation.forceRequest || !cachedResponse) {
                this.callParent(arguments);
            } else {
                this.processResponse(true, operation, null, cachedResponse, callback, scope, true);
            }
        }
    





And that's it! Hope this is helpful for you all and please stay tuned as I'll surely be adding another post around expiring data in localStorage and clearing my reference data cache.



