---
author: tyler
comments: true



title: Monit - Easy Monitoring

categories:
- Development
- monit
- monitoring
---

![monit](http://moduscreate.com/wp-content/uploads/2012/08/monit2.png)





I recently started working on a project using [delayed_job](https://github.com/collectiveidea/delayed_job) as a queuing system for sending batch email.  The email being sent contained a weekly digest of the events for the customer, so it was very important that the email was sent and sent out in a timely manner.  Part of inheriting the project was the discovery that manual checks were being made to ensure that delayed_job was running in the production environment on a daily basis.  





As it turns out, delayed_job had been occasionally failing, causing delay or even failure, of the aforementioned email.  I, personally, knew that I wasn’t going to remember to check on delayed_job each day, nor did I want to be the weak point in the causal chain.  This is where monitoring and monit come into play.





Now, I have used a variety of monitoring systems in the past, but tend to use [Nagios](http://www.nagios.org/) for my monitoring solutions because it has a rich ecosystem of plugins and does a lot of work right out of the box for you.  However, bringing up Nagios for this type of monitoring (a single event) was certainly overkill.  To further that, I wanted something that could be reactive to failure.  That way if delayed_job goes down over the weekend, evenings or what have you, I know that the monitoring solution can react to the failure, working to correct the abnormality.  Having been woken up in the middle of the night by things going awry, I’m a huge fan of reactive monitoring.  





So, after looking around for a bit, I stumbled across [monit](http://mmonit.com/monit/).  It certainly seemed to have quite a bit of fanfare with people even integrating monit into [delayed_job](https://github.com/collectiveidea/delayed_job/blob/master/contrib/delayed_job.monitrc). Monit itself is best described as a monitoring system that manages and monitors various components of the OS, performing reactive monitoring.  This is slightly different from traditional monitoring in that we can set up predefined actions that monit can take when it finds itself in an error state.  Traditional monitoring only takes action to inform the user that an error state has occurred, but doesn’t take action to correct the error and hence why I describe monit as reactive monitoring.





Great!  So how do we use it?  I was setting up monit on a CentOS box, so these instructions will make sense for CentOS, but these [instructions](http://dambalah.com/2009/05/05/install-monit-from-source-on-ubuntu/) look to be useful for Ubuntu (my preferred distribution). Monit is not a part of the CentOS 5 base packages but is in EPEL, the Extra Packages for Enterprise Linux repository, that contains packages included in Fedora Linux but not in Red Hat Enterprise Linux or CentOS.





### Step 1: Enable [EPEL](http://fedoraproject.org/wiki/EPEL)




    
    $ sudo rpm -ivh http://mirror.itc.virginia.edu/fedora-epel/5/i386/epel-release-5-4.noarch.rpm 





### Step 2: Install monit




    
    $ sudo yum -y install monit





### Step 3: Turn monit on at startup:




    
    $ chkconfig --levels 235 monit on
    





### Step 4: Edit the monit config file to include the delayed_job.monitrc file




    
    $ vi /etc/monit.conf
    





include the monitrc file




    
    # include the delayed_job restart script
    include /<strong><path></strong>/delayed_job.monitrc





I used the following delayed_job.monitrc file:




    
    check process delayed_job
     with pidfile /<strong><path to pid></strong>/delayed_job.pid
    
    start program = "/bin/su - root -c 'cd /<strong><path to webapp root></strong>; RAILS_ENV=production /<strong><path to webapp root></strong>/script/delayed_job start'"
    
    stop program  = "/bin/su - root -c 'cd /<strong><path to webapp root></strong>; RAILS_ENV=production /<strong><path to webapp root></strong>/script/delayed_job stop'"
    





You can see that I’m using Ruby on Rails and the [delayed_job](http://rubygems.org/gems/delayed_job) gem to provide scripts to start and stop delayed_job.  I did have some trouble getting monit to properly start the job and the above worked out well.  You’ll find [plenty](http://jetpackweb.com/blog/2010/05/19/making-monit-delayed_job-and-bundler-play-nice-together/) of other [examples](http://airbladesoftware.com/notes/deploying-and-monitoring-delayed-job-with-monit) out [there](http://www.funonrails.com/2011/03/monitor-delayedjob-in-rails.html) if the above doesn’t work.





You’ll also, likely, want to send email when monit detects a problem:




    
    set mailserver localhost,               # primary mailserver
    





Don’t forget to specify an email address to send alerts:




    
    set alert <strong><email></strong>                 # receive all alerts
    





That is it.  Four easy steps to bring up monit and begin reactive monitoring.  You now have a system which will detect anomalies in the system and take pre-defined steps to correct the anomaly, informing you all the way. As a side note, I found that monit began stomping on jobs when the daemon timeout mode was too short.  I adjusted mine back to two minutes after trying other shorter time periods because this gave monit enough time to start up delayed_job without starting multiple instances:




    
    # set daemon mode timeout to 2 minute
    # monit will stomp on restarted delayed_job unless this is set to 2 mins
    set daemon 120
    





### **Extras: ** I also enabled web access so that the customer could check on the state of delayed_job (in monit.conf):




    
    set httpd port 2812 and
       use address localhost  # only accept connection from localhost
       allow localhost        # allow localhost to connect to the server and
       allow <strong><username></strong>:<strong><password></strong>      # require user '<strong><user></strong>' with password '<strong><password></strong>’
    





We serve everything using [Apache](http://httpd.apache.org/), so I added a virtual host with a [proxypass](http://httpd.apache.org/docs/2.2/mod/mod_proxy.html) to allow outside access:




    
    <VirtualHost <strong><internal ip></strong>:80>
     ServerName <strong><server name></strong>
     ProxyPass / http://127.0.0.1:2812
     ProxyPassReverse / http://127.0.0.1:2812
    </VirtualHost>
    





That should be it!  Now you have easy monitoring, with a web interface, which can easily be expanded to not only monitor delayed_job but a variety of other things.  Be sure to check the [docs](http://mmonit.com/monit/documentation/) for more information.



