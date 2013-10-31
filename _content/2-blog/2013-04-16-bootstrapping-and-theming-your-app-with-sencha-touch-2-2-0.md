---
author: dave
comments: true



title: Bootstrapping and Theming Your App with Sencha Touch 2.2.0

---

Sencha has just released the much anticipated [Sencha Touch 2.2.0](http://www.sencha.com/blog/hello-sencha-touch-2-2/). Alongside a number of significant underlying framework changes, there are also significant changes in the way that you bootstrap new applications using Sencha Cmd `v3.1.1.270` (the latest as of this writing). Sencha has also modified the way that you modify and include SASS files to be in line with the new ExtJS 4.2 release - with some varying pieces.





I'm going to be going through some of the basic steps, including the new theming system. The following was done on a Mac using OSX 10.8 - your mileage may vary!





Sencha has released a fairly comprehensive guide for setting up an ExtJS project that you can [find here](http://docs.sencha.com/extjs/4.2.0/###!/guide/theming). There is also a new barebones "bootstrapping" guide for Sencha Touch 2.2 you can [find here](http://docs.sencha.com/touch/2.2.0/###!/guide/getting_started). We're going to be following both of these with some slight tweaks along the way.





############ Download the SDK and Sencha Cmd





Follow [this link](http://www.sencha.com/forum/announcement.php?f=91&a=36) and download the Sencha Touch SDK, and the newest version of Sencha Cmd. Once installed, you'll know you have a proper installation if you can type the `sencha` command into your shell and return something like this:





Unzip the framework into any directory you'd like. We'll be referencing the path later on.





![Sencha Cmd installation](http://dl.dropbox.com/u/68704/Screenshots/0e~c.png)





Most OS X users use BASH (the default) shell, but I use ZSH. Sencha Cmd currently only updates your BASH resource file `~/.bashrc`, but being that I use ZSH, i had to manually update my shell's resource file manually `~/.zshrc`. In any case, it's always best to ensure that your `$PATH` variable is set up properly after installing Sencha Cmd. Here's what my `$PATH` variable looks like.





`export PATH=$PATH:/Users/dave/bin/Sencha/Cmd/3.1.1.270: ...`





############ Generate your workspace





Sencha Cmd has a new concept of workspaces. A workspace is simply a place where multiple Sencha Touch or ExtJS apps can live, with their appropriate source folders being there as well.





I'm going to create a Touch specific workspace. Generate your workspace using the following.




    
    sencha -sdk ./touch-2.2.0 generate workspace ./touch-workspace





This will create a `touch-workspace` folder, and copy the Sencha Touch SDK into that folder. You should have a file structure similar to this at this point:





![touch workspace](http://dl.dropbox.com/u/68704/Screenshots/rc1c.png)





############ Generate your app





This step hasn't changed significantly from previous version of Sencha Touch/Cmd. Run the following to bootstrap your app inside your workspace.




    
    sencha -sdk touch-2.2.0 generate app MyNewApp ./my-app
    





`-sdk` is referring to the path to your Touch 2 SDK folder. The last parameter is the path for your generated app. If you don't have this folder already created, Cmd will create it for you.





############ Perform an initial build





In your shell, change your current working directory to your `my-app` directory and create a build via the following command:




    
    sencha app build
    





This will generate a `build` folder in your workspace. Inside it you should see a folder with the name of your app. Inside that there should be a production folder which contains production versions of your code, minified JS, and minified CSS.





![build folder structure](http://dl.dropbox.com/u/68704/Screenshots/~k~c.png)





######### Generate your custom theme





Sencha Touch 2.2 ships with an all new base-theme. This base-theme is designed as the absolute bare minimum to get your app up and running, and contains no styling beyond what is required for making the framework operate. If any of you out there have previous experience theming Sencha Touch apps, this should come as a huge step in right direction. No longer will we have to override existing styles with `!important`. Generating your SASS for your apps should be more trivial.





To use the new base theme with your application, open the `my-app/resources/sass/app.scss` file. This should have been auto generated for you with Sencha Cmd.





Replace the existing imports:




    
    @import 'sencha-touch/default';
    @import 'sencha-touch/default/all';
    





with:




    
    @import 'sencha-touch/base';
    @import 'sencha-touch/base/all';
    





Change to your sass directory and start watching for changes.




    
    $ cd my-app/resources/sass
    $ compass watch
    





Compass should compile. If you are having issues, make sure you're running the `compass watch` command from the directory that contains the `config.rb` (the Compass configuration file). ![touch base theme](../assets/uploads//2013/04/base-theme.png) The Sencha Base theme on the left, versus the standard theme on the right.





############ Start customizing





As before, all of the SASS variables exposed by the Touch Framework are still available, but many of them may not act as expected due to the way that the base theme is implemented. The base-theme is fantastic for experienced developers who are familiar with the Sencha Touch DOM structure, but is also a step in the right direction for newcomers that were once scared away by the amount of DOM output that the Touch framework generates.





For most of my projects, I like to start off with individual SASS files for each component. Take buttons for example - I'd create an `include` directory under the `sass` directory, and then create a `_buttons.scss` file that would be importeted into the root `app.scss` file.





Here's an example of my `app.scss`:




    
    /* you would set your SASS variables here. many will have no effect on the base theme */
    // $button-height: 40px;
    
    /* import the sencha defaults */
    @import 'sencha-touch/base';
    @import 'sencha-touch/base/all';
    
    /* our custom imports */
    @import 'include/buttons';
    
    /* examples of other, structured styling */
    // @import 'include/tab';
    // @import 'include/form';
    // @import 'include/panel';
    // @import 'include/panel';
    
    /* other custom css */
    





############ Styling a component





As mentioned in the Theming article at the top of this post, all Sencha Touch components always have a baseCls that matches the name of the component. Let's style a button.





I've added a couple of buttons to the sample application that is generated by Cmd by modifying the `items[]` array to the following:




    
    items : [
        {
            docked : 'top',
            xtype  : 'titlebar',
            title  : 'Welcome to Sencha Touch 2',
        },
        {
            xtype : 'button',
            cls   : 'modus-button default',
            text  : 'Default Button'
        },
        {
            xtype : 'button',
            cls   : 'modus-button primary',
            text  : 'Success Button'
        },
        {
            xtype : 'button',
            cls   : 'modus-button info',
            text  : 'Info Button'
        },
        {
            xtype : 'button',
            cls   : 'modus-button danger',
            text  : 'Danger Button'
        }
    ]
    





You can see that I've chosen to go with the `cls` definition versus defining a new `ui` using the [sencha-button-ui](http://docs-devel.sencha.com/touch/2.2.0/###!/api/Ext.Button-css_mixin-sencha-button-ui) mixin. I've found that this will give us greater flexibility using our own classes that we create. Compilation seems speedier as well when you avoid using heavy mixins. We'll create lightweight classes that reduce code redundancy.





Here's what I've got for the `_buttons.scss` file:




    
    @mixin modus-button($color) {
      @include transition(all .25s ease);
      @include border-radius(6px);
      margin-bottom: 15px;
      font-size: 15px;
      background: $color;
      border: none;
      color: white;
      text-decoration: none;
      .x-button-label {
        padding: 10px 0;
      }
      &.x-button-pressing {
        background: darken($color, 10);
      }
    }
    
    .default {
      @include modus-button($baseColor);
    }
    
    .primary {
      @include modus-button($primaryColor);
    }
    
    .info {
      @include modus-button(###2c97de);
    }
    
    .danger {
      @include modus-button(###e94b35);
    }
    





Simple, right? The output is fairly dramatic based on the amount of code we had to write.





![st buttons](http://dl.dropbox.com/u/68704/Screenshots/_1ls.png)





Buttons are pretty simple. What if we wanted to do something like the tabbed control at the bottom, or the titlebar on the top? Let's start by creating a `_tabs.scss` and `_titlebar.scss` files and go from there.





Here's `_tabs.scss`.




    
    .x-toolbar {
      border: none;
      background: $baseColor;
      .x-innerhtml {
        color: white;
        font-size: 16px;
      }
    }
    





Here's the contents for `_titlebar.scss`.




    
    .x-tabbar {
      border: none;
      background: $baseColor;
      .x-tab {
        background: none;
        border: none;
        .x-button-label {
          color: white;
          padding: 10px 15px;
          text-align: center;
          font-size: 13px
        }
        &.x-tab-active {
          .x-button-label {
            color: ###02b99a;
          }
        }
      }
    }
    





![final customized theme](http://dl.dropbox.com/u/68704/Screenshots/1c0y.png)





############ Wrapping up





There is so much more to theming Sencha Touch than what was described above. My upcoming posts will detail how to integrate custom icon fonts, write and style custom components (a big part of what we do here at Modus), and how to use the new config driven system in ST 2.2 to deploy custom CSS for multiple platforms.





Make sure to follow me on twitter [@dmackerman](http://www.twitter.com/dmackerman) for future blog posts!





**Sencha Touch 2.2 has been officially released. [Read the blog post here](http://www.sencha.com/blog/hello-sencha-touch-2-2/).**



