---
author: dave
comments: true



title: LESS Tips & Tricks

categories:
- Development
- CSS
- LESS
---

By now you have probably heard of LESS (or SASS). CSS pre-processors have been around for quite some time now. Even I was slow to adopt a CSS pre-processor solution for my projects, and I can't quite put my finger on why that is. Perhaps I felt that CSS was simple enough to not need any additional processing power. Or perhaps I felt I knew everything there is to know about CSS, so why should I need a crutch? It wasn't until recently that I started using LESS on all of my projects -- and I'm glad that I did.


######### Why CSS is limited





	
  * **No nesting capability,** therefore reading long strings of CSS can become difficult and time consuming.

	
  * **No re-usability**. You cannot globaly change any particular style unless you do a manual find/replace.

	
  * **No mathematical operators** for quickly calculating anything from margins & padding to font-size and colors.




######### Diving In


As a Front-End developer, I work with CSS a lot. One of the more frustrating things about CSS is in general, the more specific the rule, the longer the line of CSS will be. Of course there are ways around what I'm about to write, but in standard CSS it would not be uncommon to see something like this:

    
    ###main {
      background: ###fff;
    }
    
    ###main ###blog {
      margin: 10px 5px;
    }
    
    ###main ###blog .entry-content {
      margin: 20px;
    }
    
    ###main ###blog .entry-content p {
      line-height: 20px;
    }
    
    ###main ###blog .entry-content p.opener {
      font-weight: bold;
    }


That's 18 lines, including spaces. But we don't really care about lines numbers in our uncompressed CSS. We care about readability, and how quickly we can navigate and locate a specific style [more on this later].

In LESS, I'd write the same CSS like this:

    
    ###main {
      background: ###fff;
      ###blog {
        margin: 10px 5px;
        .entry-content {
          margin: 20px;
          p {
           line-height: 20px;
            &.opener {
              font-weight: bold;
             }
          }
       }
      }
    }


Couple of advantages here. If you _only_ used LESS for straight formatting, which I sometimes do, you gain several advantages.



	
  * It's faster to write CSS when you don't have to repeat extremely long chains.

	
  * Visualizing your cascading styles (we are working with Cascading Stylsheets afterall) is much easier when you actually can visually see them cascade and nest.


Using the & operator will output the CSS:

    
    p.opener { font-weight: bold; }


If you removed the &, you would get an additional class not specific to the tag.

    
    p .opener { font-weight: bold; }




######### Use LESS for :pseudo-classes


Another  quick trick is that you can use the & operator to act on `:hover`, `:active`,  and any other pseudo-attribute including the new CSS3 spec like :nth-child or :last-child.

    
    a {
      &:hover { color: red; }
      &:active { color: blue }
    }




######### Use CodeKit


LESS isn't a language that browsers can compile without Javascript, so I've been using an app called CodeKit. From the developers mouth:


> CodeKit automatically compiles Less, Sass, Stylus, CoffeeScript & Haml files. It effortlessly combines, minifies and error-checks Javascript. It even optimizes jpeg & png images, auto-reloads your browser and lets you use the same files across many projects. And that's just the first paragraph.


Yep, it automatically watches and compiles our LESS files. Very nice indeed. I've also used it for JSLint validation on my Javascript. Setup is dead simple. Add the folder in which your project lives, and CodeKit will find all of the files it can handle and work it's magic. CodeKit will also output our CSS in compressed (no line breaks) format for us.

Another advantage using CodeKit is that since LESS is compiled, it needs to be syntactically correct. No more hanging semi-colons or double `######` laying around in your code anymore!

Download CodeKit here:[ http://incident57.com/codekit/](http://incident57.com/codekit/)


######### LESS is MORE!


One of the great things about LESS are variables and mixins. When you develop, you'll notice that you begin to write repetitive CSS, especially when working with CSS3 properties like `border-radius` and `box-shadow`. Here's a couple resources to bootstrap LESS and add in functionality that you can start using right off the bat.



	
  * **LESS Elements** ([http://lesselements.com/](http://lesselements.com/))

	
  * **Preboot** ([http://markdotto.com/bootstrap/](http://markdotto.com/bootstrap/))




######### Don't overnest


As I mentioned earlier, one of the best features of LESS is the ability to nest rules. However, it's important to keep in mind that you do not want to overnest. Here's a good example:

    
    nav {
      ul {
        li {
          a {
            ...
          }
        }
      }
    }


Nesting with LESS isn't really a LESS problem, but inherintly it's a CSS problem. Find the balance between nesting for convenience, and nesting for function.

    
    header {
      ul { ... }
      li { ... }
      a { ... }
    }




######### Additional Resources





	
  * [How to Build a Responsive Frankenstein Framework With LESS](http://designshack.net/articles/css/how-to-build-a-responsive-frankenstein-framework-with-less/)

	
  * [Run LESS with Node.js](http://lesscss.org/###-server-side-usage)

	
  * [LESS Github](https://github.com/cloudhead/less)




######### Wrapping Up


Whether or not you use all of LESS' features, or only a few, I think its worth giving it a shot on your next project. Using LESS is less about improving your CSS knowledge, and more about being more efficient when writing CSS. Once you start to write with LESS, you'll begin to wonder why you waited so long.
