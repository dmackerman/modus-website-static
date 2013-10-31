---
author: admin
comments: true
title: >
  Sencha Cmd Not Working in OS X 10.9
  Mavericks
picture: ""
categories:
  - Design
  - Development
authors:
  - steve
  - jay
---

We've been seeing reports of Sencha Cmd not working after upgrading to Mavericks. This is due to Mavericks shipping with ruby 2.0, while Sencha Cmd depends upon ruby 1.9.3.





If you're just upgrading to 10.9, you'll need to install the Command Line Tools (including gcc) before you can install ruby 1.9.3.





`xcode-select --install`





We recommend using [RVM](http://rvm.io/) to manage your various ruby versions.





To install RVM:





Install ruby 1.9.3.





1) `curl -L https://get.rvm.io | bash -s stable --autolibs=enabled --ruby=1.9.3`





Load RVM into your environment





2) `source /Users/<YOUR-USERNAME>/.rvm/scripts/rvm`





Reload RVM





3) `rvm reload`





Set ruby 1.9.3 as your default ruby version





4) `rvm use 1.9.3 --default`





You'll also need Ant, which can be installed via [homebrew](http://brew.sh/):





`brew install https://raw.github.com/Homebrew/homebrew-dupes/master/ant.rb`





That should be it! You should now be able to use Sencha Cmd with Mavericks. Happy Commanding!



