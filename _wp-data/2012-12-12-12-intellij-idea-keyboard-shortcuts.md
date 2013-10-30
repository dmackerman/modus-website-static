---
author: grgur
comments: true



title: 12 IntelliJ IDEA Keyboard Shortcuts You Should Know About

categories:
- Development
- IDE
- Productivity
- Shortcuts
---

When we need to get productive, we often invest money in new gadgets, software, or even a new computer. Another way to boost productivity is learning how to use the assets we already own, such as IntelliJ IDEA. I can't say I'm a shortcut junky, but knowing a few make my life a whole lot easier.





In 2012 I spent quite some time giving other IDEs a chance. All impressed me with their own unique features. Even more so, I was so close to ditching IDEA (or rather Web Storm) for Sublime Text 2 due to the cool features available through its plugin mechanism. Weeks, or even months later, I came back to IDEA, realizing that it has virtually all features found elsewhere, and it felt a bit more robust.





Visiting other options opened my eyes for new features to look for. Features that could easily boost my productivity in a piece of software I spend so much time with. I'm sharing my 12 most useful with you.





#### 1. (Un)Comment line: Cmd + L





Transforming the current line into comment is essential in bug tracking. Instead of going to the beginning of line and manually typing //, Cmd+L will do that for us. Even cooler, the editor will know how to uncomment lines, even when commented out manually. A good thing to know is that caret will move to the next line automatically, allowing multiple lines to be commented out at once.





[![Line comment](http://moduscreate.com/wp-content/uploads/2012/12/line-comment2.png)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/line-comment/)





#### 2. (Un)Comment selection: Shift + Control + /





Similar to line commenting, this shortcut will surround the current selection. While line commenting is quicker, here you can be much more precise and more creative with comments. Refer to the figure below for comparison.





[![Selection comment](http://moduscreate.com/wp-content/uploads/2012/12/selection-comment2.png)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/selection-comment/)





#### 3. Documentation comment block: /** + Enter





Not quite a keyboard shortcut, this one is more of a code completion helper. After you create a member, go one line above it and type /** followed by a press on the Enter key. Voila, IDEA will automagically create a documentation block for you. If you place it above a method, the block will be populated with argument params, which can be tremendously useful.





EDIT: Denis Zhdanov of JetBrains pointed out a great new feature shipped as of v12, "Fix Doc Comment". Read more about it here on his [blog post](http://blogs.jetbrains.com/idea/2012/09/fix-doc-comment-action-is-available/).





I don't think I can stress the importance of documentation in code. Please use line comments and documentation blocks as much as possible. They will help you more than you can imagine, others even more.





[![Documentation block](http://moduscreate.com/wp-content/uploads/2012/12/documentation-block2.png)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/documentation-block/)





#### 4. Delete line: Cmd + Y





Another no-brainer very useful. No need to get your hands off of keyboard to reach for the mouse, or use extra shortcuts to select a line + Backspace. Simply place caret at the line you want out of your project and push Cmd + Y.





Here's how I remember that it's Y and not another key, D for example. You know how deletions are frequently followed by a confirmation dialog? "Are you sure you want to delete this item?" and similar. Most of us have trained our eyes to find a short little word that begins with an Y - Yes. Here we're skipping the dialog and agreeing immediately. Yes, delete the sucker!





#### 5. Argument documentation for method calls: Cmd + P





Useful when you need to remember argument options when calling a method, this shortcut will pull up a callout with the information you need. It is even capable of learning from your documentation blocks.





[![Parameter callout](http://moduscreate.com/wp-content/uploads/2012/12/param-callout2.png)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/param-callout/)





#### 6. Incremental selection: Cmd + W





Although Cmd + W defaults to close tab/window in most applications (and so it did in IDEA < 11), IDEA 11 and up assigned to to a whole new purpose.  When you need to select a word, reference, statement, line, or entire block of code without lifting your hands from keyboard, this shortcut comes to the rescue. Press it once to select the word closes to the caret. Repeat to incrementally select larger chunks.





[![Incremental selection](http://moduscreate.com/wp-content/uploads/2012/12/incremental-selection12.gif)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/incremental-selection-2/)





#### 7. Reformat code: Option + Cmd + L





Whether you are a fan of JSLint or you follow another JavaScript code style, you can configure IDEA to learn it and reformat your code accordingly. First, make sure you're satisfied with settings found at Preferences -> Code Style - > Your Language. Walk through the tabs offered and set the style that best match your desired behavior. Once completed, go to your code.





Pressing Option + Cmd + L will politely ask you which section you want to reformat. It can be a selection, file, or even entire project.





In some situations, you may need to omit parts of code (e.g. when concatenating arrays of html strings). In such case, selecting a code area and hitting the shortcut will automatically offer to reformat selection. So hit shortcut and press enter for a quick and smart code reformat.





#### 8. Cycle through the history of most recent changes: Cmd + Shift + Backspace





When editing huge files, and I mean many at the same time, it can get difficult to navigate through the maze of code. The effect is stronger when editing someone else's code. In such situations, I find this shortcut very useful. It doesn't delete anything, as Backspace may imply, it just shifts the caret over to the position of last change. It goes like that long ways through history, and even switches open files for you. If you haven't already, try it out, it's a gem.





#### 9. Paste from five previous copies - Cmd + Shift + V





Does the OS default one slot in memory for copy-paste satisfy you? IDEA tracks your last five copies and allows you to chose from them when pasting. Instead of the accustomed Cmd + V for paste, add Shift to the combination and a dialog pops up, offering the options.





[![Paste history](http://moduscreate.com/wp-content/uploads/2012/12/paste-history12.png)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/paste-history-2/)





#### 10. Find members in current file: Cmd + F12





Easily on of my top three favorite shortcuts, this one emulates Cmd + Shift + O in Chrome Inspector. Basically, it shows a popup with all objects and respective members associated with a file. Moreover, if you start typing, it will perform a search and select the line you were looking for. Amazingly useful in big files.





As an added bonus, press the shortcut twice to show the inherited members.





[![Find members](http://moduscreate.com/wp-content/uploads/2012/12/find-members2.png)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/find-members/)





If you can't reproduce this on a Mac, make sure F12 (Fn + F12) is not registered to Mission Control. Simply go to OS X's Settings -> Mission Control and remove any existing bindings. Now you can retry in IDEA.





[![Disable F12 in Mission Control](http://moduscreate.com/wp-content/uploads/2012/12/disable-f12-mission-control2.png)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/disable-f12-mission-control/)





#### 11. Find members in current project: Cmd + Alt + Shift + N





Finding members in a file is quick and easy. Alternatively, if you want to find members throughout the project, sacrificing just a tiny bit of speed, then this shortcut is meant for you.





[![Find members in a project](http://moduscreate.com/wp-content/uploads/2012/12/find-project-members2.png)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/find-project-members/)





#### 12. Show recently changed files: Cmd + Shift + E





IDEA will automatically manage your tabs so that you don't have too many to clutter your workspace. In many workspaces, you might also want to close the project browser window in order to save some horizontal space. Getting to see the most recently edited files is a speed boost that will help any developer working in a similar environment. Just press Cmd + Shift + E and chose from the list, sorted in ascending order relative to the time of last edit. Guess what - it even works after you restart the editor!





[![Recent Edits](http://moduscreate.com/wp-content/uploads/2012/12/recent-edits2.png)](http://moduscreate.com/12-intellij-idea-keyboard-shortcuts/recent-edits/)





Note on automatic tab management: IDEA will auto close tabs to keep the workspace tidy. This action will not result in losses such as file state, undo/redo stack, or even scroll position. If, for any reason, you may want to keep a tab constantly visible, right click on it and select 'Pin active tab'. I'm afraid here isn't a default shortcut for pinning tabs.





**Conclusion**





Getting accustomed to a new set of shortcuts requires some more brain processing, but as you reach automation, you will gain a significant productivity boost. Feel free to keep this blog post bookmarked and use it as a cheat sheet when working. I promise, you'll learn these, and even more shortcuts, in no time.





Presented shortcuts will work with IntelliJ IDEA, WebStorm, and PHPStorm on US keyboard layout. If you're a Windows user, you can substitute Cmd with Ctrl and Option with Alt in the shortcuts listed above. Note that these will work on any new installation of IDEA 11 and up. If you modified keyboard shortcuts to your own needs, than some combination might result in unexpected behavior.





Do you have your own life-saving shortcuts that are not mentioned? Are there shortcuts you would love to have but are missing? Please share your thoughts in the comments section.



