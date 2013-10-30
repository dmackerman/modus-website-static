---
author: crysfel
comments: true



title: Diving into MeteorJS

categories:
    - Development
---

Meteor JS is a really cool framework, it allows you to do real time communication out of the box, it also comes with some smart packages (as they call them) that we can use in our own projects to make things simple.





Meteor JS is built on top of Node JS and is great to create collaborative applications or multiplayer games, we can use it for anything we need.





In these series of posts I would like to show you how easy it is to send and receive data using Meteor. I’m going to explain how I built a small application where many users can control a ship in a canvas and navigate through the space with other users at the same time. You can see an example of what we want to achieve in here:





**Setting up our app**





The first thing you have to do is to install Meteor by running the following command in your terminal:




    
    $ curl https://install.meteor.com | /bin/sh
    





Once we have meteor installed we need to create a Meteor application and add three smart packages.




    
    $ meteor create battleship
    $ cd battleship
    $ meteor add bootstrap
    $ meteor add accounts-github
    $ meteor add accounts-ui
    





By default Meteor creates a few files, let’s delete them and inside of the battleship folder we will create the following folders:




    
    + client
    + common
    + public
    + server
    





If Meteor detects a client folder it will run all the JavaScript inside of this folder on the client’s browser, in here we can define html files, styles sheets, etc.





The common folder doesn’t mean anything special to Meteor, is just a folder where we will define JavaScript files that will be executed in the client and server side. But we can name it whatever we want, in this case common.





The public folder is a special folder for Meteor, in here we can add any asset that we need for our application, images, fonts, sounds, etc.





The server folder will contain the code that will be executed only in the server side, this code will not be sent to the client.





**GitHub Integration**





We are going to use GitHub oAuth for our users to sign up into our application. We have also added the bootstrap package, which will be used for our templates and styles.





In order to integrate GitHub authentication we need to go to GitHub (https://github.com/settings/applications/new) and register an app with the following values:





**Application Name**: Battleship (or whatever you want) **Main URL**: http://localhost:3000 **Callback URL**: http://localhost:3000/_oauth/github?close





Once you register you app you will get a Client ID and a Client Secret values that we are going to use. Let’s create a file called **config.js** inside of the **server** folder, and then we need to write the following code:




    
    Accounts.loginServiceConfiguration.remove({
        service : 'github'
    });
    
    Accounts.loginServiceConfiguration.insert({
        service : 'github',
        clientId: 'YOUR CLIENT ID',
        secret  : 'YOUR SECRET ID'
    });
    





Now we are going to listen for an event in the server, when a new user is created we need to get some information about the new user from GitHub, we will request their name, avatar and some other useful information. Let’s create an **accounts.js** file inside the **server** folder and then let’s define the following code:




    
    Accounts.onCreateUser(function(options,user){
        var accessToken = user.services.github.accessToken,
            result,
            profile;
    
        result = Meteor.http.get('https://api.github.com/user',{
            params : {
                access_token : accessToken
            },
            headers: {"User-Agent": "Meteor/1.0"}
        });
    
        if(result.error){
            console.log(result);
            throw result.error
        }
    
        profile = _.pick(result.data,
            'login',
            'name',
            'avatar_url',
            'url',
            'company',
            'blog',
            'location',
            'email',
            'bio',
            'html_url'
        );
    
        user.profile = profile;
    
        return user;
    });
    





When a new user is created we make a HTTP request using the Meteor.http.get method to get the user’s data. It’s important to send the access token as a parameter in order to get the data.





Also do not forget to set the user agent header; if we don’t set this header GitHub will not respond to our request, there are some tutorials out there that miss this little detail.





After getting the respond we extract the data from the result and define a profile property to the new user.





The last step is to define our views, so let’s create an index.html file inside of the client folder with the following code:




    
    <head>
        <title>Battleship</title>
    </head>
    
    <body>
        {{> header }}
    
        
    </body>
    





As you can see we are not defining the Doctype or the html tag, we are only defining the head and the body sections. Meteor will create the html file for us, we just need to define the head and the body, in this case we just define our title and we render a template called header, which is inside of the body.





Now let’s define the header template, we can create another html file or we can use the one that we already have, Meteor automatically will load all the html files.




    
    <template name="header">
        <header class="navbar" id="header">
            <div class="navbar-inner">
              <div class="container-fluid">
                <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="brand" href="#">Battleship</a>
                <div class="nav-collapse collapse">
                  <ul class="nav">
                    <li class="active"><a href="#">Game</a></li>
                    <li><a href="#about">About</a></li>
                  </ul>
                  <ul class="nav pull-right">
                    {{> user_info }}
                  </ul>
                </div>
              </div>
            </div>
          </header>
    </template>
    





We use the template tag to define a new template, it’s important to define a name so we can use this template anywhere in our application. The previous html is a navigation bar from bootstrap.





As you can see we are rendering another template called user_info, so let’s define the new template as follows.




    
    <template name="user_info">
        {{#if currentUser}}
            {{> user_loggedin}}
        {{else}}
            <li>{{> user_loggedout}}</li>
        {{/if}}
    </template>
    





We can also use conditionals inside our templates; this way we can dynamically render our views based in our data or custom logic.




    
    <template name="user_loggedin">
        {{#if logginIn}}
            <li>Logging in...</li>
        {{else}}
            <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                    <img src="{{currentUser.profile.avatar_url}}" class="img-rounded" style="width:25px" />
                    {{currentUser.profile.name}}
                    <b class="caret"></b>
                </a>
                <ul class="dropdown-menu">
                    <li><a>Account Settings</a></li>
                    <li class="divider"></li>
                    <li><a id="logout">Logout</a></li>
                </ul>
            </li>
        {{/if}}
    </template>
    
    <template name="user_loggedout">
        <a href="#" id="login">Login with Github</a>
    </template>
    





We have defined two templates, we will render one of them based on the user status, if there’s a logged user we will render the **user_loggedin** template, otherwise we will render the **user_loggedout** which is just a link that we will attach an event to do the log of the user into the system.





Let’s create a index.js file inside of the public folder, in here we will add the listener to the click event in order to log the user.




    
    Template.user_loggedout.events({
        'click #login' : loginFn
    });
    





The **Template** object contains all the templates that we have defined in our HTML’s files, we can access them by their name, then we call the events method to listen for events in that template.





As you can see we define the name of the event that we want to listen, in this case the **click** event, then we use the ID of the node that we want to be listening, the loginFn function looks as follows.




    
    function loginFn(){
        Meteor.loginWithGithub({
            requestPermissions : ['user','public_repo']
        },function(err){
            if(err){
                //error handling
            }else{
                //we will create players here ;)
            }
        });
    }
    





We are executing the loginWithGithub method, the second parameter is a callback function that will be executed after GitHub respond, we will add some code later in the next tutorial.





Let’s start our server in order to test our code, in order to do that we need to run the following command.




    
    $ meteor
    





Then we point our browser to http://localhost:300 and we will see the following image:





![meteorblogimage1](http://moduscreate.com/wp-content/uploads/2013/05/meteorblogimage1-300x107.png)





After we click in the **Login with Github** link we will be asked by GitHub to allow this application to use our personal data, if we accept we will be redirected to the application and we will see something as the following image:





![metoerblogimage2](http://moduscreate.com/wp-content/uploads/2013/05/metoerblogimage2-300x107.png)





And that’s all! We are using GitHub oAuth to login into our own application, the only thing that is missing is the logout, so let’s add the listener to the template as follows:




    
    Template.user_loggedin.events({
        'click #logout' : function(){
            //var username = Meteor.user().profile.login;
            Meteor.logout(function(err){
                if(err){
    
                }else{
                    //we will do something in here with the username
                }
            });
        }
    });
    





And now we have a complete authentication system! As you can see it’s very simple to use the smart packages and start working with them.





**Conclusion**





In my personal opinion Meteor is great for data transfer. Also the smart packages are handy to add functionality in minutes. The only thing that I complain about Meteor is the template system, I don’t really like the way we add listeners to our nodes, and also at this time it’s a little bit complicated to integrate the Loading system that comes with Ext or Sencha Touch because of the way Meteor includes the JavaScript files.





In the next tutorial I will show you how to add a list of players and how to start drawing with EaselJS in a canvas! It’s going to be fun!



