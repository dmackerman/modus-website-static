---
author: stan
comments: true



title: Opening all URLs with Cordova's ChildBrowser Plugin

categories:
- Development
- ChildBrowser
- Cordova
- hybrid
- iOS
- ObjectiveC
---

For anyone who has had the pleasure of working with [Cordova](http://www.phonegap.com) you may hit this wall if you had to deal with external links. Tapping on a link opens the URL right in the WebView that your application is sitting in. The contents of the new page take over your application entirely and the user has no choice but to force close the app.





There are a couple of solutions to tackle this issue from a Cordova perspective.:





**Note: These solutions are for Cordova 2.0.0. Earlier Cordova versions have minor differences, but these techniques can be applied.**





### Open all URLs externally in Mobile Safari







  1. In XCode, open the MainViewController.m class.[![](http://moduscreate.com/wp-content/uploads/2012/09/1MainViewController2-300x218.jpeg)](http://moduscreate.com/opening-all-urls-with-phonegaps-childbrowser-plugin/1mainviewcontroller/)


  2. Find the method: `shouldStartLoadWithRequest`, it should be commented out by default




    
    - (BOOL) webView:(UIWebView*)theWebView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
    {
        return [super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType];
    }
    



  3. Implement the following:




    
    - (BOOL)webView:(UIWebView *)theWebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
    {
        NSURL *url = [request URL]; // URL that was requested
    
        // Test that URL scheme is either HTTP(S)
        if ([[url scheme] isEqualToString:@"http"] || [[url scheme] isEqualToString:@"https"]) {
            [[UIApplication sharedApplication] openURL:url]; // forward to application router
            return NO;
        }
        else {
            return [ super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType ];
        }   
    }
    






The [shouldStartLoadWithRequest](http://developer.apple.com/library/ios/#documentation/uikit/reference/UIWebViewDelegate_Protocol/Reference/Reference.html) method gets called before a WebView is about to load a URL. Here we intercept the request and pass it on to [UIApplication](https://developer.apple.com/library/ios/#documentation/UIKit/Reference/UIApplication_Class/Reference/Reference.html). UIApplication serves as a global application router. Mobile Safari is registered to handle http hrefs (Mail.app to mailto, other applications to their custom protocols, etc..). So when we call the openURL method, Mobile Safari is invoked. We return NO (false) to the method to tell the WebView that we will not load the frame internally.





### ChildBrowser Plugin





Let's say you don't want the user to leave your application, why would you? This is where Cordova's [ChildBrowser](https://github.com/purplecabbage/phonegap-plugins/tree/master/iPhone/ChildBrowser) plugin comes into play. The ChildBrowser creates a WebView inside your main Cordova WebView. It has a bottom toolbar with necessary buttons (Done, Back, Forward, etc..).





Installing the ChildBrowser plugin is straightforward, you can follow these excellent tutorials:







  * [Installing the ChildBrowser Plugin for iOS with PhoneGap/Cordova 1.5](http://blog.digitalbackcountry.com/2012/03/installing-the-childbrowser-plugin-for-ios-with-phonegapcordova-1-5/)


  * [Bridging the PhoneGap: ChildBrowser Plugin](http://a.shinynew.me/post/19786775381/bridging-the-phonegap-childbrowser-plugin)





To get it to do what we need, open **ALL** URLs through the ChildBrowser we must do the following:







  1. In XCode, open the MainViewController.m class. 


  2. Find the method: shouldStartLoadWithRequest, it should be commented out by default 


  3. Include the necessary ChildBrowser classes at the top of your Controller implementation class




    
    #import "MainViewController.h"
    #include "ChildBrowserViewController.h" // Include ChildBrowserViewController so we can use it later
    
    @implementation MainViewController
    



  4. Implement the shouldStartLoadWithRequest with the following:




    
    - (BOOL)webView:(UIWebView *)theWebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
    {
    
        NSURL *url = [request URL]; // URL that was requested
    
        // Test that URL scheme is either HTTP(S)
        if ([[url scheme] isEqualToString:@"http"] || [[url scheme] isEqualToString:@"https"]) {
            [theWebView sizeToFit];
            ChildBrowserViewController* childBrowser = [ [ ChildBrowserViewController alloc ] initWithScale:FALSE ];
            childBrowser.modalPresentationStyle = UIModalPresentationFormSheet;
            childBrowser.modalTransitionStyle = UIModalTransitionStyleFlipHorizontal;
            [super presentModalViewController:childBrowser animated:YES ];
            NSString* urlString=[NSString stringWithFormat:@"%@",[url absoluteString]];
            [childBrowser loadURL:urlString];
            [childBrowser release];
            return NO;
        }
        else {
            return [ super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType ];
        }   
    }
    



  5. In your JavaScript, all that is necessary is to "install ChildBrowser" (`ChildBrowser.install()`). There is no need to invoke it directly to open URL. All URL requests are now intercepted. 
Here we take the same approach as the Safari method. However, instead of passing on to the UIApplication reference we invoke the ChildBrowser directly.







### A note on iFrames and YouTube





Cordova has a nasty bug/feature/issue that it opens all iFrames as they are added to the DOM. Thus if you have a YouTube video in an iFrame that you append to the DOM, it will open the ChildBrowser right away and begin displaying the video. Unfortunately we do not know where the URL request came from in the MainViewController implementation, all we have is the URL. Thus we can make conditions based on the destination (for example YouTube or Vimeo) and handle it by default with Cordova.





In `Cordova.plist` you can set the following properties to allow inline media playback. This will allow your YouTube video to play inside your original content and not take over the entire WebView.





[![](http://moduscreate.com/wp-content/uploads/2012/09/fx6h2-300x85.png)](http://moduscreate.com/opening-all-urls-with-phonegaps-childbrowser-plugin/fx6h/)





### References







  * [PhoneGap + ChildBrowser – Opening all non-app links in ChildBrowser](http://ethellenterprises.com/2012/02/phonegap-childbrowser-opening-all-non-app-links-in-childbrowser/)


  * [PhoneGap External Link](http://www.tonylea.com/2011/phonegap-external-link/)





