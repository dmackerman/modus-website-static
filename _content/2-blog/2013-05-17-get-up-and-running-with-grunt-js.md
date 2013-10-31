---
author: dave
comments: true



title: Get Up And Running With Grunt.js

categories:
  - Development
---

If you're anything like myself, you've probably had interest in trying to utilize [Grunt.js](http://gruntjs.com/) in your projects. Maybe you've at least heard of it, or have heard of people using it in their workflows. Unfortunately, the barrier for entry seemed a little bit high for me. Not necessarily technically, but I was confused on how it would actually benefit my workflow.





I've been using tools like SASS and Compass for a while now, and recently started to dive into [bower](https://github.com/bower/bower) for doing front-end package management. Let's take a look at how to integrate Grunt in a very simple workflow.





_Be forwarned, I'm quite new to Grunt in general. Some of the things that are done below can and probably should be optimized. I'd love to hear your feedback!_





### Why Grunt?





Honest answer? Because it seems like everyone under the sun is using it for doing anything from simple workflow enhancements, to complete production build systems. There's an extremely active plugin development community, and people involved in the project seem more than willing to help out in answering your questions. There may be other Javascript task runner solutions, but I don't know of any at the moment that are worth taking a look at.





### Our goal





Let's setup grunt to do the following:







  * monitor our project for changes to SASS files, and use Compass to compile them into CSS.


  * monitor our project for changes to HTML and JS files, and use LiveReload to refresh our page.


  * look into how we can use Grunt to minify and concatenate our Javascript using uglify JS.





### The basic grunt setup





Grunt has some basic documentation on their website about setting up your project. First and foremost, Grunt uses Node.js and is installed via npm - node's package manager. Once you've got those installed, you're ready to install the Grunt CLI globally.





`npm install -g grunt-cli`





If we were to run a `grunt` in our project directory, we'd get a message something like this:





_A valid Gruntfile could not be found. Please see the getting started guide for more information on how to configure grunt: http://gruntjs.com/getting-started Fatal error: Unable to find Gruntfile._





We expected that. Let's create a `package.json` and a `Gruntfile.js` in the root of our project.





`touch package.json Gruntfile.js`





### package.json





Here are the contents of my very basic package.json file:




    
    {
      "name": "my-project",
      "version": "1.0.0",
      "devDependencies": {
        "grunt": "~0.4.1",
        "grunt-contrib-compass": "~0.2.0",
        "grunt-contrib-watch": "~0.4.3",
        "grunt-contrib-uglify": "~0.2.0",
        "matchdep": "~0.1.2"
      }
    }
    





So what exactly does this file do? This tells NPM which dependencies we want to install for our project. The advantages of this are fairly simple. Anyone who collaborates on our project can always be up to date on dependencies and keep our environments in sync. I won't go into too much detail on these right now. There are plenty of other properties you can place in this file. You can also run `npm init` to create a boilerplate package file.





Run `npm install`, and NPM will go fetch these for us and place them in a `node_modules` folder.







  * [grunt-contrib-compass](https://github.com/gruntjs/grunt-contrib-compass)


  * [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)


  * [grunt-contrib-uglify](https://npmjs.org/package/grunt-contrib-uglify)





Fantastic! We've got packages! Unfortunately they don't do anything yet, because we haven't told Grunt what to do with them.





### Gruntfile.js





This is where the magic begins to happen. We'll open up by declaring the "wrapper" function. All Grunt related tasks happen inside of this function.




    
    module.exports = function(grunt) {
      // Do grunt-related things in here
    };
    





Let's get started by have the Compass plugin start watching for changes to our SASS files.




    
    module.exports = function(grunt) {
    
      // load all grunt tasks
      require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
      grunt.initConfig({
    
        compass: {
          dev: {
            options: {
              config: 'config.rb',
              force: true
            }
          }
        }
    
      });
    }
    





First, we're loading all of our NPM tasks that we specified in our `package.json`. We're using the `matchdep` package to help us do this by iterating over the _devDepencies_ in our json file.





We begin configuring your tasks inside the `grunt.initConfig({})` block. You'll see that we define a compass task, and we're telling Grunt to just load the settings from our compass configuration file - `config.rb`.





You can specify multiple ways to run compass by adding another object. For example, you could have a "production" object in which you would output compressed CSS, or output the CSS to a different folder, etc.





Let'see what happens when we run `grunt`!




    
    <code>Warning: Task "default" not found. Use --force to continue.
    Aborted due to warnings.
    </code>





Grunt looks for a default task called "default", which we haven't specified. Let's go ahead and do that now using the `grunt.registerTask()` function.





This function takes the name of the task you'd like to register, along with an array (or single string) of tasks you want run. Let's register the default task to run compass and compile our SASS. Add the following after the grunt.initConfig block.




    
    grunt.registerTask('default', 'compass');
    





When we run `grunt` again, you'll see our SASS is compiling!




    
    Running "compass:dev" (compass) task
    unchanged sass/app.scss
    unchanged sass/normalize.scss
    





Sweet deal! However, this isn't really all that useful. We could have gotten the same results by just running a simple `compass compile`. Let's keep pushing forward and add a `watch` task that will monitor changes very similarly to `compass watch`, but that we can extend to a variety of different plugins.





Go ahead and add a new object that defines our `watch` task:




    
    module.exports = function(grunt) {
    
      // load all grunt tasks
      require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    
      grunt.initConfig({
    
        compass: {
          dev: {
            options: {
              config: 'config.rb',
              force: true
            }
          }
        },
    
        watch: {
          sass: {
            files: ['assets/sass/**/*.scss'],
            tasks: ['compass:dev']
          },
          /* watch and see if our javascript files change, or new packages are installed */
          js: {
            files: ['assets/js/main.js', 'components/**/*.js'],
            tasks: ['uglify']
          },
          /* watch our files for change, reload */
          livereload: {
            files: ['*.html', 'assets/css/*.css', 'assets/images/*', 'assets/js/{main.min.js, plugins.min.js}'],
            options: {
              livereload: true
            }
          },
        }
    
      });
    
      grunt.registerTask('default', 'watch');
    
    }
    





You'll see that we've added a list of files types for Grunt to look for. We've also defined the tasks to run - one for now, but this can be an array of many tasks - when a file has been changed. We've modified the default task to run `watch` instead of `compass`. Additionally, we've added LiveReload functionality with a single line of code.





**Note**: You will need to install the LiveReload extension for this to easily work without having to include another file in your project. [Find the extension for Chrome here.](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en)





Let's re-run `grunt` and see what we have now.




    
    Running "watch" task
    Waiting...
    





Grunt waits patiently for us to change a file, and when we do, we get successful compilation and a browser reload! Pretty cool.





### Only the surface





I've only scratched the very surface of what's possible with Grunt. Check out the [vast array of Grunt plguins](http://gruntjs.com/plugins) and start doing everything from compressing javascript to running Jasmine unit tests through Phantom JS.



