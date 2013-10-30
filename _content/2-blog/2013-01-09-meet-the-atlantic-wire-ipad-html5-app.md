---
author: jay
comments: true



title: Meet the Atlantic Wire iPad HTML5 App

categories:
    - Design
    - Development
    - Industry
    - HTML5
    - Sencha Touch
---

# Introducing _The Atlantic Wire_ iPad App, Built with HTML5





_[The Atlantic Wire](http://touch.theatlanticwire.com)_ is an amazing iPad app built entirely with HTML5 using [Sencha Touch](http://www.sencha.com/products/touch).





The Modus Create team worked side by side with teams from Sencha and _The Atlantic_ to make this concept a reality.





HTML5 was a perfect fit for realizing _The Atlantic_’s business goal of easily delivering content over the web without compromising the user experience. We’ll explain how we built this application in this article.





Following on the heels of Sencha’s recent [Fastbook app](http://fb.html5isready.com), _The Atlantic Wire_ mobile web experience highlights once again that 2013 is the year for HTML5!





## The UX and Design





As the days of the 3-column ’companion website’ die out, publishers are looking to increase content engagement with magazine like experiences. _The Atlantic Wire_ app provides a dashboard-like UX for its readers, containing many engagement focused features enabling readers to self curate content. The app presents an orientation driven reading experience with different interaction models for portrait and landscape modes. The visual design elements are inspired by the existing _The Atlantic Wire_ branding and provide a clean, content focused design.





Readers consume articles from seven built-in feeds and can curate their own feed by interacting with tags while reading. The “MyWire” feed tailors content to user preference as readers indicate positive or negative affinity for article related tags. At any time these tagged preference can be edited, allowing readers to maintain their own editorial control of what shows up in their MyWire feed.





![](http://moduscreate.com/wp-content/uploads/2013/01/awire_prod_22-455x350.png)





![](http://moduscreate.com/wp-content/uploads/2013/01/awire_prod_32-455x350.png)





## It’s All About Engagement





In addition to the basics of sharing or tweeting a story, readers can save stories to read later and pull up a view of related stories, and manage their ‘MyWire’ tags. The status of the selections that the user makes while using this application is stored locally on the device and is used by _The Atlantic Wire_ to deliver a custom reading experience for each user easily. _The Atlantic Wire_ allows readers to scan a massive amount of content and quickly save, share, or add story tags to their MyWire feed. As for reading the full article, the landscape article view (pictured above) presents the Tag Manager panel to the right of the article, allowing for immediate editing of MyWire tag filters. In portrait view (pictured below) articles render full screen and the Tag Manager panel can be toggled in to view from the navigation bar and make adjustments accordingly.





![](http://moduscreate.com/wp-content/uploads/2013/01/awire_prod_42-230x300.png)![](http://moduscreate.com/wp-content/uploads/2013/01/awire_prod_52-230x300.png)





We’ve talked a lot about design, but we have not discussed the technical details much. Let’s switch gears and see how this application was architected and then talk about some of the challenges we faced.





## The Making Of





Sencha Touch 2.0 provided the tools and design patterns that allowed us to develop the core functionality of this application in less than three weeks. We employed the Sencha Cmd tool from start to finish. Sencha Cmd provided us with the proper tools for each step of our workflow: it helps us create, develop, test and deploy our application in to a highly efficient production version.





Sencha Touch’s model-view-controller architecture is at the core of this application. This allowed us to accomplish tasks such as separate out Controller logic from Views. We also made use of the Touch History & Routing support, allowing direct links to content, which can be shared via email or social media channels.





To ensure the best possible experience, we created a set of highly efficient custom views and ensured their DOM was minimized. We use a design pattern called “tpl and data”, where developers define a component that has an HTML fragment known as its template (“tpl”) and upon instantiation, provide data to the template to render a custom view.





For example, here’s a code snippet from what we call the “Skybox” component:




    
    Ext.define('AW.view.Skybox', {
        extend : 'Ext.Container',
        xtype  : 'skybox',
    
        config : {
            height  : 153,
            layout  : 'hbox',
            cls     : 'skybox',
            stories : undefined,
            items   : [
                {
                    xtype  : 'component',
                    itemId : 'logo',
                    width  : 185,
                    style  : 'padding: 25px 0 0 10px;box-shadow:0px 0px 30px black;border-right: 1px solid #A8A8A8;',
                    html   : '<img src="resources/images/wire-logo.png" style="width:164px; height: 91px;" />'
                },
                {
                    xtype  : 'container',
                    cls    : 'skybox-container',
                    flex   : 1,
                    itemId : 'stories',
    
                    scrollable : {
                        direction : 'horizontal'
                    },
    
                    tpl : [
                        '<div style="display: -webkit-box; -webkit-box-orient: horizontal;">',
                            '<tpl for=".">',
                                '<tpl if="! values.advertising">',
                                    '<div class="skybox-story" data-id="{[ xindex - 1]}" style="background-image: url(http://src.sencha.io/226/{image});">',
                                        '<h2>{postDesc}</h2>',
                                    '</div>',
                                '</tpl>',
                                '<tpl if="values.advertising">',
                                    '<div class="ad skybox-story">',
                                    '</div>',
                                '</tpl>',
                            '</tpl>',
                        '</div>'
                    ]
                }
            ],
    
            listeners : {
                painted : 'onPaintedRegisterEvents'
            }
        },
    
        onStoriesTouchStart : function(evtObj) {},
        onStoriesTouchEnd : function(evtObj) {},
        applyStories : function(cfg) {},
        onPaintedRegisterEvents : function() {},
        onStoriesTap : function(evtObj, element) {}
    });
    
    





We created the Skybox as an extension to Container, effectively making it a Composite Component. (A Composite Component is a widget that is comprised of multiple sub-Components). Doing this allowed us to leverage the Touch Horizontal Box (HBox) layout in conjunction with having the ability to enjoy the silky-smooth CSS3-based scroller that Sencha Touch provides.





Here’s the Skybox rendered.





![](http://moduscreate.com/wp-content/uploads/2013/01/skybox2.gif)





Part of the secret sauce to performance is not only DOM efficiency, but also the weight of the image assets. This is why we use Sencha.io to crunch down images, making them not only faster to download but much more responsive to rendering and transitions as they require far less number crunching than source (non-mobile) friendly versions.





We’ve highlighted just a few of the cool ways we were able to provide a top-notch experience building from the out-of-the-box capabilities with Sencha Touch. Next, we’re going to focus on some of the challenges we faced and lessons learned.





## Challenges





The creation of each application provides its own unique challenges that must be faced and overcome. The biggest challenge we faced with this application revolved around integrating advertising.





The traditional advertising model that that most sites employ requires the use of dynamically injected script tags using document.write();. Advertisers use document.write to know where to inject DOM when their advertising scripts are loaded.





This method of injecting Advertising works fine for traditional sites, where the DOM is built on the fly on successive page loads or refreshes. However, what we developed is a single-page HTML5 application, meaning we build the main DOM structure once on the first page load. After that, document.write is not available for anyone to use.





To overcome this limitation in how advertising is done and the fact that the write method is not available, we did some research and found an awesome utility called WriteCapture (https://github.com/iamnoah/writeCapture).  
WriteCapture essentially works by creating a pseudo DOM structure that provides a layer to the advertiser’s script element into thinking that document.write is available to be used. It does this by creating its own encapsulated document.write method and when the advertising script calls it, WriteCapture captures what the advertising script would be writing to the DOM and injects it into our single page application. It’s a pretty ingenious approach!





## Conclusion





We had an amazing experience developing this application for _The Atlantic Wire_ and Sencha and are proud of what we’ve produced. We hope that you visit [http://touch.theatlanticwire.com](http://touch.theatlanticwire.com) with your iPad and give this application a whirl!



