---
author: tim
comments: true



title: Sencha Cmd Packages
picture: http://funlava.com/wp-content/uploads/2013/08/sunset.jpg
categories:
  - Development
  - Packages
  - Sencha
  - Sencha Cmd
---

### What Are Packages





Sencha Cmd 3.1 introduced packages, which are a new way to share code between projects. Perhaps you made an awesome sass theme or a cool Ext JS / Touch extension (such as Deft). You can use a package to share that with the rest of the world. Each package contains all of the Controllers, Views, Models, Stores, Sass, etc. required to make your application or theme work. There are Local Packages, which are just for your own use, and there are Remote Packages for public use.





### Creating a Package





Every Workspace generated by Sencha command has a "packages" folder. So, to create a package:




    
    cd to/your/workspace





and then:




    
    sencha generate package -type code my-package





It's worth noting that there are few different kinds of packages you can create. You can specify the type of package by using the "-type" option.







  * _code_ - which is your "go-to" standard package 


  * _theme_ - which is used for creating custom Ext JS / Touch themes 


  * _locale_ - which is obviously used for any localization specific code





This will ultimately make a package called my-package (or whatever you called yours) in the packages/my-package folder. There are number of subfolders and files underneath this. The important ones to note are:







  * sass - contains all of the sass for your package. When you compile your application, all of the sass for any packages will be automatically pulled in and compiled along with your application sass. This folder is further broken down into subfolders: 



    * var - for variable declarions


    * src - for component specific styles. The folder structure and naming conventions in here should match the folder and naming structure of your component views. ie. the sass for src/view/MyView.js would be in sass/view/MyView.js


    * etc - global styles or styling that's not specific to any particuar component




  * src - all of your JavaScript. This folder should be broken down into: 



    * controller


    * model 


    * store


    * view


    * (etc)




  * .sencha/package/sencha.cfg - If your sass folder is going to contain styling for package specific views then be sure that the _package.name_ has the correct namespace for your package. Don't leave it as the default value _Ext_. 




    
    ### The name of the package - should match the "name" property in ./package.json
    package.name=my-package
    
    ### The namespace to which this package's SASS corresponds. The default value of
    ### "Ext" means that the files in ./sass/src (and ./sass/var) match classes in
    ### the Ext" root namespace. In other words, "Ext.panel.Panel" maps to
    ### ./sass/src/panel/Panel.scss.
    ### 
    ### To style classes from any namespace, set this to blank. If this is blank,
    ### then to style "Ext.panel.Panel" you would put SASS in
    ### ./sass/src/Ext/panel/Panel.scss.
    package.sass.namespace=My.package
    







  * package.json - be sure the _name_ is correct and make sure the _requires_ array contains the name of any other package dependencies that _my-package_ might have. Be careful about using cyclical references here, i.e. package A requires package B which requires package A. Sencha Cmd will be very unhappy if you do.




    
    {
        "name": "my-package",
        "type": "code",
        "creator": "anonymous",
        "summary": "Short summary",
        "detailedDescription": "Long description of package",
        "version": "1.0.0",
        "compatVersion": "1.0.0",
        "format": "1",
        "local": true,
        "requires": [
            "my-otherpackage"
        ]
    }





### Implementing a Package







  * Add your package to the "requires" array in app.json




    
    {
        "name": "my-application",
        "requires": [
            "my-package",
            "my-otherpackage",
            "deft"
        ]
    }







  * Set up the Ext.Loader _paths_ in myapp/app/application.js 




    
    Ext.Loader.setConfig({
        paths: {
            'My.package': '../packages/my-package/src',
            'Deft': '../packages/deft/src/js'
        }
    });







  * Reference your new package in your app by using its namespace


  * Compile your app using Sencha Cmd (obviously) 





### Gotchas







  * Sass namespaces in .sencha/package/sencha.cfg


  * Requires array in .sencha/package/build.properties package.json


  * Watch out for cyclical references in your package.json files, i.e. package A requires package B which requires package A.





### Opinions





Packages are powerful new feature from Sencha. However, I recommend that you do not simply use packages for arbitrary code organization. If you find that your packages have heavy dependencies on each other then you should probably merge those packages together. Packages are best if you have something completely independent (i.e. a theme or extension/widget) that you want to reuse across different applications. They are even better if you have something you want to share with world.



