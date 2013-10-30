---
author: crysfel
comments: true



title: Device Camera Access With Sencha Touch

categories:
- Development
---

In this tutorial I will show you how to access device camera directly from your Sencha Touch 2 application. We will take a picture, resize it and then send it to the server. For this example we are going to use: 1. **Rails** 3.2.12 as our backend framework 2. **Sencha Touch** 2.2.1 3. **Sencha Cmd** 4.0.0 for our builds. We will create a list of users and a form to add new users.





Let’s start by creating our rails application:




    
    <code>$ rails new users 
    $ cd users
    </code>





Now let’s create a `mobile` folder, for our Sencha Touch development code, at the root folder in our application.




    
    <code>$ mkdir mobile 
    $ cd mobile
    </code>





In this folder we will create our Sencha Touch app. We are going to have our development code in here. Then we will create the production version using the Sencha Command and we will copy our production code to the public folder using an ANT task to do it automatically after our build is done.





### Creating the Sencha App





Let’s create our Sencha application executing the following command inside of our mobile folder.




    
    <code>$ sencha -sdk /path/to/your/touch-2.2.1/ generate app Users .
    </code>





Sencha Command 4.0.0 comes with a webserver included, and we can use this server to test our mobile application in development environment. Let’s run the following command in order to start the server.




    
    <code>$ sencha fs web -port 8000 start -map .
    </code>





If we open our browser and go to http://localhost:8000 we will see the default Sencha app.





![Default Sencha Touch App](http://moduscreate.com/wp-content/uploads/2013/08/st1.png)





Let’s create the User model. We will use it for the list and for the form. Inside of the mobile folder let’s run the following command.




    
    <code>$ sencha generate model User --fields=name:string,email:string,image:string
    </code>





We will see a new file under app/model folder. If we open this file we will see the model definition with the three fields we have defined. Here’s the generated code:




    
    <code>Ext.define('Users.model.User', { extend: 'Ext.data.Model',
        config: {
            fields: [
                { name: 'name', type: 'string' },
                { name: 'email', type: 'string' },
                { name: 'image', type: 'string' }
            ]
        }
    });
    </code>





Now we need to create a store collection with an ajax proxy to get the data from the server. Under the folder `app/store` let’s create a `Users.js` file with the following code.




    
    <code>Ext.define('Users.store.Users', { 
        extend: 'Ext.data.Store', 
        alias: 'store.users', 
        requires: [ 'Users.model.User' ],
    
        config: {
            model: 'Users.model.User',
            proxy: {
                type: 'ajax',
                url: '/api/users',
                reader: {
                    type: 'json',
                    rootProperty: 'users'
                }
            }
        }
    });
    </code>





The URL property will be a rails route where we will expose the data, this is pretty basic stuff, just a regular store.





Once we have our store we need to create the view where we will show our users, and we will extend from the List component. Let’s create a file under the app/view folder with the following code.




    
    <code>Ext.define('Users.view.UsersList', {
        extend: 'Ext.dataview.List',
        xtype: 'userslist',
        requires: [
            'Users.store.Users'
        ],
        config: {
            cls: 'user-list',
            itemTpl: '<img src="{image}" /> {name}<br><small>{email}</small></p>',
            store: {
                type: 'users',
                autoLoad: true
            }
        }
    });
    </code>





We also need to create the form to add new users, let’s create a new file under our views folder.




    
    <code>Ext.define('Users.view.UserForm', {
        extend: 'Ext.form.Panel',
        xtype: 'userform',
        requires: [
            'Users.view.CapturePicture',
            'Ext.field.Email'
        ],
    
        config: {
            cls: 'user-form',
            items: [{
                xtype: 'capturepicture'
            }, {
                xtype: 'textfield',
                name: 'name',
                label: 'Name', 
        margin: '0 20'
            }, {
                xtype: 'emailfield',
                name: 'email',
                label: 'email',
                margin: '0 20'
            }, {
                xtype: 'button',
                action: 'save',
                text: 'Save',
                margin: '10 20'
            }]
        },
    
        reset: function() {
            this.callParent(arguments);
            this.down('capturepicture').reset();
        }
    });
    </code>





### Accessing the camera to take a picture





As you can see there’s a custom class to capture the image, this is the one really interesting. In this class we will allow the user to use the phone camera to take a picture and then process that image to send it to the server. Let’s create a new JS file under the `views` folder with the following code.




    
    <code>Ext.define('Users.view.CapturePicture', {
        extend: 'Ext.Component',
        xtype: 'capturepicture',
    
        config: {
            captured: false,
            width: 140,
            height: 100,
            cls: 'picture-capture',
            html: [
                '<div class="icon"><i class="icon-camera"></i> Make a pic</div>',
                '<img class="image-tns" />',
                '<input type="file" capture="camera" accept="image/*" />' //Step 1
            ].join('')
        },
    
        initialize: function() {
            this.callParent(arguments);
    
            this.file = this.element.down('input[type=file]');
            this.img = this.element.down('img');
    
            this.file.on('change', this.setPicture, this); //Step 2
    
            //FIX for webkit
            window.URL = window.URL || window.webkitURL; //Step 3
        },
    
        setPicture: function(event) {
            var files = event.target.files;
            if (files.length === 1 && files[0].type.indexOf("image/") === 0) {
                this.img.setStyle('display', 'block');
                this.img.set({
                    src: URL.createObjectURL(files[0]) //Step 4
                });
                this.setCaptured(true);
            }
        },
    
        reset: function() {
            this.img.setStyle('display', 'none');
            this.img.set({
                src: ''
            });
            this.setCaptured(false);
        },
    
        getImageDataUrl: function() { //Step 6
            var img = this.img.dom,
                imgCanvas = document.createElement("canvas"),
                imgContext = imgCanvas.getContext("2d");
    
            if (this.getCaptured()) {
                // Make sure canvas is as big as the picture
                imgCanvas.width = img.width;
                imgCanvas.height = img.height;
    
                // Draw image into canvas element
                imgContext.drawImage(img, 0, 0, img.width, img.height);
    
                // Return the image as a data URL
                return imgCanvas.toDataURL("image/png");
            }
        }
    });
    </code>





There’s a HTML5 API to access the camera through JavaScript, and as you can see in the first step we have defined the input file. This step is very important because we are also defining the property `capture=camera`, this property allows the user to capture the image from their device! We also define the accept property to specify the type of content this input will handle, in this case an image.





We are able to capture images from the camera or from the user’s library. Now we need to process this image in order to send it to the server, but before we do that we will display the selected image in the `img` tag that we have defined in the html property.





In step number two we listen for the `change` event in the input file, this event will be fired when the user select a new image. In this case we will execute the `setPicture` method.





In step three we are just making sure the URL object exist, webkit browsers use a different name, this step is important in order to have the same object with the same name.





In step number four we receive the `event` object, first we check if it contains a file, and if the file is an image, then we show the `img` tag and assign the src property using the createObjectURL method. This method converts the captured file into a URL that represents the selected file. Finally we set the captured flag to true.





At this point the image should be able to appear in the `img` tag, and the user will be able to see it.





The last step takes the image to resize it using a canvas and then get the URL representation of the image. The `getImageDataUrl` method creates a canvas, and if there’s a captured image, we draw that image into the canvas. We are resizing the image at the same dimensions as the image tag, but we can always change this. The method returns the new image in an URL format, this way we can send it to the server in an easy way. For this example we will save the image in the database.





We are almost done with the views; the only thing that is missing is to add all our classes to the main viewport, let’s modify the Main.js file in the views folder as follow.




    
    <code>Ext.define('Users.view.Main', {
        extend: 'Ext.Container',
        xtype: 'main',
        requires: [
            'Ext.TitleBar',
            'Users.view.UserForm',
            'Users.view.UsersList'
        ],
        config: {
            fullscreen: true,
            
            items: [{
                xtype: 'toolbar',
                docked: 'top',
                title: 'Users',
                items: [{
                    xtype: 'button',
                    text: 'Back',
                    action: 'back',
                    ui: 'back',
                    hidden: true
                }, {
                    xtype: 'spacer'
                }, {
                    xtype: 'button',
                    text: 'New User',
                    action: 'newuser'
                }]
            }, {
                xtype: 'userslist'
            }, {
                xtype: 'userform'
            }]
        }
    });
    </code>





Instead of using tabs we will use a card layout, we will display the list of users first and then the form to add a new user or to edit an existing user from the list. If we open our application in the browser we should see something like the following image.





![The User's List](http://moduscreate.com/wp-content/uploads/2013/08/st2.png)





As you can see there’s an error while getting the users, this is happening because we haven’t created anything in the server side. We will get into that later in this tutorial, but for now let’s just leave it like that.





### Adding actions with the controller





So far we can only see the title and a button that doesn’t do anything. Let’s create a controller to listen for an event on our views. Let’s execute the following command in our terminal in order to create the controller.




    
    <code>$ sencha generate controller Main
    </code>





The previous command creates a new file under the `app/controller` folder, let’s open and edit the Main.js file with the following code.




    
    <code>Ext.define('Users.controller.Main', {
        extend: 'Ext.app.Controller',
    
        config: {
            refs: {
                main: 'main',
                backBtn: 'main > toolbar button[action=back]'
            },
            control: {
                'main > toolbar button[action=newuser]': {
                    tap: 'showUserForm'
                },
                'main > toolbar button[action=back]': {
                    tap: 'showMainView'
                }
            }
        },
    
        showUserForm: function() {
            this.getMain().animateActiveItem(this.getMain().down('userform'), {
                type: 'slide',
                direction: 'left'
            });
            this.getBackBtn().show();
        },
    
        showMainView: function() {
            this.getMain().animateActiveItem(this.getMain().down('userslist'), {
                type: 'slide',
                direction: 'right'
            });
            this.getBackBtn().hide();
        }
    });
    </code>





We only have the two references, one for the main container and one for the back button.





We are listening for two events, one to show the form to add a new user and the other one to go back to the list. We use a slide animation to do the transition between the two views.





If we refresh our application in the browser we will be able to see the form, with a smooth animation when pressing the new user button.





![User's Form](http://moduscreate.com/wp-content/uploads/2013/08/st3.png)





### Styling our application with SASS





Unfortunately, it's not looking good at all, so we need to define some styles in order to make it better. Let’s start by watching changes in the sass files, this way the files will be compiled automatically every time we change a file. In our terminal we need to run the following command.




    
    <code>$ sencha app watch
    </code>





Now we can start coding our sass files and we will see the result almost immediately! This is a new feature in the Sencha Command 4, and in order to make it work we need to have Java 7 installed in our system.





Dave Ackerman already wrote a great blog post [about theming](http://moduscreate.com/bootstrapping-and-theming-your-app-with-sencha-touch-2-2-0/), you should go and read it if you would like to create a very custom theme. I’m not going to explain about theming but if you don’t understand this part, go and read [Dave’s post](http://moduscreate.com/bootstrapping-and-theming-your-app-with-sencha-touch-2-2-0/).





Here’s my app.scss file




    
    <code>@import 'sencha-touch/default';
    @import 'sencha-touch/default/all';
    
    @import 'includes/list';
    @import 'includes/capturepicture';
    @import 'includes/icons';
    </code>





We are just including three files, one for the list of users, one for the capture picture component and one for custom icons.





Here’s the list.scss file.




    
    <code>.user-list{
        .x-list-item{
            overflow:auto;
            img{
                float:left;
                width:65px
                margin-right:10px;
            }
            small{
                color:#666;
            }
        }
    }
    </code>





Here’s the capturepicture.scss code.




    
    <code>.picture-capture{
        @include background-image(linear-gradient(#1676b9,#10598d));
        @include border-radius(3px);
        @include box-shadow(inset 0px 1px 1px #1a86d2);
        border:1px solid #000000;
        border-width:1px;
        overflow: hidden;
        margin:20px auto;
    
        input{
            border: 0;
            position: absolute;
            cursor: pointer;
            top: -2px;
            right: -2px;
            filter: alpha(opacity=0);
            opacity: 0;
            font-size: 1000px;
        }
    
        img{
            position: absolute;
            @include border-radius(3px);
            width: 100%;
            height: 100%;
            display:none;
        }
    
        .icon{
            position: absolute;
            width: 100%;
            height: 100%;
            color:#fff;
            text-align: center;
            font-size: 0.8em;
            i{
                display:block;
                font-size: 3.5em;;
                color:#fff;
            }
        }
    }
    </code>





And here’s the icons.scss code.




    
    <code>@mixin custom-icon($name, $font-family: false) {
        .icon-#{$name}{
            $character: icon-character-for-name($name);
    
            &:before {
                font-style: normal;
                text-align: center;
    
                @if $font-family {
                    font-family: $font-family;
                } @else{
                    font-family: 'Pictos';
                }
    
                @if $character {
                    content: "#{$character}";
                } @else {
                    content: "#{$name}";
                }
            }
        }
    }
    
    @include custom-icon('camera');
    </code>





That’s just a custom mixing that allow us to use the pictos icons on any DOM node such as the `<i>` tag. If we refresh our browser we will see something like this:





![Styles applyed](http://moduscreate.com/wp-content/uploads/2013/08/st4.png)





If you open the app in your iPhone or iPad, you will be able to take a picture and then the picture will appear in the blue box.





### Sending the image to the server





Ok, that’s awesome, but what we really want is to save that image to the server, we only need to add a listener to the `save` button and make an ajax call sending the three parameters.





In the main controller, we will add the new listener as follows:




    
    <code>Ext.define('Users.controller.Main', {
        extend: 'Ext.app.Controller',
    
        config: {
            refs: { ... },
            control: {
                ...
                'main userform button[action=save]': {
                    tap: 'saveUser'
                }
            }
        },
    
        saveUser: function() {
            var form = this.getMain().down('userform'),
                capture = form.down('capturepicture'),
                values = form.getValues();
    
            Ext.Ajax.request({
                url: '/api/users',
                method: 'POST',
                params: {
                    'user[name]': values.name,
                    'user[email]': values.email,
                    'user[image]': capture.getImageDataUrl()
                },
                scope: this,
                success: this.showMessage,
                failure: this.showMessage
            });
        },
    
        showMessage: function(response, options) {
            if (response.status === 200) {
                var form = this.getMain().down('userform');
    
                form.reset();
                this.showMainView();
                this.getMain().down('userslist').getStore().load();
    
            } else {
                Ext.Msg.alert('Error', 'There was an error while saving this user.');
            }
        },
    
        ...
    
    });
    </code>





First we add a new listener to the `control` object, we are listening for the tap event in the save button.





When the event is fired we execute the saveUser method, in here we get the values from the form and also get the image from our custom component. We could also validate the data here, but for the sake of simplicity we won’t do it.





We are also making an ajax request, sending the three parameters to the rails service. Note how we are naming those parameters in order to get them easily in our rails action.





When the service response, we execute the showMessage method, if the status of the response is 200 we just reset the form, reload and show the list. If there was an error we are just showing an alert. Creating the rails services, we are done with our Sencha Touch app, now let’s create the service to fill the list of users and the service to create a new user.





Make sure you are in the root folder of the rails application and run the following command to generate the user model and the migration.




    
    <code>$ rails g model User name:string email:string image:text 
    $ rake db:migrate
    </code>





Now let’s create our routes, open the `config/routes.rb` file and add the following code:




    
    <code>namespace :api do
        resources :users, :only=>[:index,:create]
    end
    </code>





Now we need to create the controller inside of the `app/controllers/api` folder and add the following code.




    
    <code>class Api::UsersController < ActionController::Base
    protect_from_forgery
    
    def index
        users = User.order('name ASC').limit(10)
    
        render :json=> {:users=>users}
    end
    
    def create
        user = User.new params[:user]
    
        if user.save
          render :json=>{:success=>true}
        else
          render :json=>{:success=>false}
        end
    end
    end
    </code>





This controller is very simple, there are many things to improve but it’s enough for our example. Now we can start the webrick server in order to test our new controller and start consuming the JSON data.




    
    <code>$ rails s
    </code>





### Deploying the Sencha Touch to Production





We need to generate a production version of our application, and in order to do that we need to create a custom ANT task to copy the production ready files to our public folder after the build is completed.





In order to do that we need to edit the `build-impl.xml` under `mobile/.sencha/app` and add the following code at the end of the file, just before `&lt;/project&gt;` the tag.




    
    <code><target name="-to-public" description="Copy the build to the public folder">
            <echo>Copying files to ${app.dir}/../public</echo>
            <copy todir="${app.dir}/../public">
                <fileset dir="${app.build.dir}/production">
                    <!-- don't copy the manifest -->
                    <!--exclude name="index.html"/>
                    <exclude name="cache.appcache"/-->
                </fileset>
            </copy>
    </target>
    </code>





Then, in the line around 316 we will find the task where the build is performing, we have to add our new task at the end of the tasks that are already in there.





Save the file, and run the following command to build our production version.




    
    <code>$ sencha app build production
    </code>





If you notice there are two excluded files in the copy task, these files contain the HTML5 offline support (the manifest) for our mobile application, but it’s really annoying when you are testing and making sure everything is working fine. I would suggest that you not copy these files until you are completely sure your application is working correctly.





We are probably going to have some issues when upgrading the Sencha Command to a new version, that’s because we have edited the `build-impl.xml` file. Sencha recommend not to edit this file unless you really know what you are doing, we have added a very simple tasks, so when upgrading just keep in mind that.





Here’s a demo of our [final application](http://fierce-mountain-8070.herokuapp.com/) (http://localhost:3000), we are displaying the images in the list from the server, in the following image there’s one picture that I have taken with my iPhone 4.





[![Final app](http://moduscreate.com/wp-content/uploads/2013/08/st5.png)](http://fierce-mountain-8070.herokuapp.com/)





### Browser support





Our application should work on **iOS 6**, **BlackBerry 10**, **Android 4.1** with both Android and Chrome browsers.





You can get the completed [code from GitHub](https://github.com/crysfel/accessing-camera).





### Your turn





Now it's your turn. Have you tried this approach? Any luck, challenges, tips? Please share your thoughts with us.



