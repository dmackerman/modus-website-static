---
author: jay
comments: true



title: The Evolution of Rvrsit

categories:
- Design
- Gaming
- HTML5
- ImpactJS
- Sencha Touch
- SilkJS
---

It is with great pride today that we publicly announce the immediate availability of [Rvrsit](http://moduscreate.com/rvrsit), our very first HTML5 game!

![](../assets/uploads//2012/03/game1-455x350.jpg)

Rvrsit was designed for use on the iPad and constructed using best practices of [Sencha Touch](http://sencha.com/products/touch), the best and most powerful HTML5 mobile framework and [Impact JS](http://impactjs.com), arguably the most modern JavaScript gaming framework on the market.


###### The history


I began development of this game over a year ago, when Sencha Touch 1.0 was in release candidate phase. My initial inspiration came from my experience in teaching my 4.5 year old son (now 6) how to play Othello. Little did I know that it would take over a year to get to this point!

![](../assets/uploads//2012/03/takeshi_othello-194x300.jpg)I remember having an epiphany "If I can teach a 4.5 year old how to play Othello, surely I can teach (program) a computer!". So, I set off to start developing Rvrsit, then known as Othello. I began by doing research into Othello (also known as Reversi) algorithms. I found a few JavaScript implementations including ones in Java and C++. All of them were really difficult to understand and some took different approaches to achieve AI.  Most implementations of Othello (or Reversi, as it's often called) were slow or not very attractive.

In order to figure out a fast way to get the AI working, I began to think about the rules of game play. Then, I needed to figure out how to get those rules into play. The result was an approach that was different compared to anything that I could find, but extremely fast!

![](../assets/uploads//2012/03/game-logic.jpg)
Beginning with Sencha Touch, I decided to create components that could be placed into a game board. The Chip class was constructed to be smart enough to know whether or not it was an edge piece or not and know of its nearest neighbor.

[![](../assets/uploads//2012/03/rvrsit_prototype-300x230.jpg)](http://moduscreate.com/rvrsit.old/) With this logic configuration, Chip instances could literally talk to other Chip instances by means of a simple JavaScript reference. This allowed for rapid lookups throughout the game board for the game rules, which include whether or not the player made a valid move or not. The results of this game engine design can be seen in the [Rvrsit prototype](http://moduscreate.com/rvrsit.old).
_(This version of the game does not come with the necessary A.I. to allow the computer to compete against the player)_



### 




### Fast forward to 2012


Soon after the turn of the new year, I was able to begin focusing on Rvrsit again! I began by converting the Sencha Touch 1.0 code to 2.0. I was left with the same quick response time but faced CSS3 animation issues. I couldn't have the silky smooth 3d transition of a two-colored chip that I wanted. This led me down the path of HTML5 game engines.

In my research, I found a lot of JavaScript HTML5 game engines but only one really stood out. That framework is ImpactJS. Impact JS was the only framework that was mature enough for me to use to develop such a game with ease. After a few days of tinkering, I was able to come up with a prototype that uses the exact same Chip connection logic, but this time we got the silky smooth transitions we were looking for.

![](../assets/uploads//2012/03/takeshi_kenji_rvrsit_prototype.jpg)I gave the prototype to my two boys, Takeshi and Kenji and they were able to play against each other without any issues.

After the migration to ImpactJS, I was able to leverage the Chip connection design to create efficient A.I., allowing the computer to make decisions based on which chips were available to be flipped. In this decision loop, the computer first gathers a list of chips that are currently visible. It then loops through that small list and asks those chips whether or not its neighbors are valid playing options. After it determines all of the valid moves, it figures out which is the biggest gain for it. It then flips the chips that gain it the biggest score, allowing for the human player to make their move. The speed of the AI is evident when playing against the computer, even in the slowest mobile tablets, including the Motorola Xoom, Blackberry Playbook and Kindle Fire.

After this prototyping phase, it was time for design. This is where team member Dave Ackerman came into play. Dave was able to take the initial game prototypes and add much-needed polish. ![](../assets/uploads//2012/03/game-300x231.jpg) Some of our design inspiration came from our good friend [Michael Harris](http://meharrisllc.tumblr.com/), with his wildly successful HTML5 [Sudoku game](https://chrome.google.com/webstore/detail/ifaabgmcffhggbfgjknkgenljelbocin), which can be found in the Google chrome store today.

That leaves us where we're at today. A well-designed app that leverages the best HTML5 UI framework with the best HTML5 game framework.


### Looking to the future


The Rvrsit evolution is not done! Here's a list of features that we already have in the works.



	
  * Use of HTML5 sound API for game sounds & in-game music

	
  * Two player game play via the cloud

	
  * Full integration with Silk JS, an up and coming Server side framework

	
  * Multi-device UI layout

	
  * Multiple layouts


In closing, as we progress, we'll be providing in-depth blog posts. In these blog posts, we'll be doing deep-dives into how we use each layer of the technology.
