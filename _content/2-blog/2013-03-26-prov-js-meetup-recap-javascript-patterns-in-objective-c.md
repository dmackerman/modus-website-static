---
author: tim
comments: true



title: Prov.JS Meetup Recap - JavaScript Patterns in Objective C

categories:
  - Meetups
---

Last Thursday night, Andrew Goodale gave an excellent presentation at [ProvJS](http://www.meetup.com/Prov-JS) that highlighted some of the similarities between JavaScript and Objective-C. It turns out there are quite a few things we use in JavaScript that can be applied here, especially when it comes to basics of getting things done.





For example:





> 
  
> 
> 
  
>   * Delegates, Events 
> 
  
>   * JSON 
> 
  
>   * Function Patterns 
> 
  
>   * Closures 
> 
  
>   * Loose Typing 
> 
  
>   * Dynamic invocation - obj_msgSend() vs. Function.apply() 
> 
  
>   * Objects - Key/Value coding vs. Hash table
> 
  






These can all be taken advantage of in Objective-C. There are certainly some nuances here but it's nice to see some familiar techniques when diving into a new language. There were some negatives mentioned such as memory management, "wordy" method/property names and funky syntax. Avoiding memory leaks was possibly the only serious fault I heard. I think the wordiness and funky syntax would be pretty easy to get used to. In fact, take a look at this:




    
    (void)staticMethod:(int)foo
    
        { NSFileManager *mgr = [NSFileManager defaultManager]; NSError *myError;
        
        BOOL ok = [mgr createDirectoryAtURL : myURL withIntermediateDirectories : YES attributes : nil error : &myError;]; }
    
    





Sure, its a bit wordy but as Andrew said, it's not that far from this:




    
    
        JSFile.getDefaultManager().createDirectory({
            url: myURL,
            withIntermediateDirectories: true,
                attributes: null
        }); 
    





The Objective-C editor will even line up your colons (if you're into that sort of thing).





So, if you like to code in JavaScript and were thinking about trying Objective-C, give it a shot. You may just find it a little bit familiar. Also, if you're in the Providence area, stop by [ProvJS](http://www.meetup.com/Prov-JS/) and join us for a meetup!



