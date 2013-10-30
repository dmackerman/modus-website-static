---
author: dave
comments: true



title: Bolded folder names in Sublime Text 2

categories:
    - Development
---

By now you probably have heard about Sublime Text 2. It's a fantastic text editor, and my personal favorite. One of the biggest downfalls of ST2, in my humble opinion, is the sidebar. You should install [SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements/) to get started, but that doesn't help with scanning the scaffolding of a large project.





Making folder names bold, as per TextMate helps the situation a little bit. This little known feature was added in [Build 2195](http://www.sublimetext.com/dev) on April 16th.





Start by opening your configuration file. You can quickly access it by typing `CMD + ,` on a Mac. `Preferences -> User` should get you to this same file.





Add the following line anywhere in the document. Don't forget trailing `,` if necessary!





`"bold_folder_labels": true`





![](http://moduscreate.com/wp-content/uploads/2012/07/99zw.png)
**Boom!**





I've attached my config file in case people are interested.




    
    
    {
        "auto_complete_commit_on_tab" : true,
        "caret_style"                 : "phase",
        "color_scheme"                : "Packages/Color Scheme - Default/Tomorrow-Night.tmTheme",
        "draw_minimap_border"         : false,
        "fade_fold_buttons"           : false,
        "find_selected_text"          : true,
        "font_face"                   : "Inconsolata-Dz",
        "highlight_modified_tabs"     : true,
        "bold_folder_labels"          : true,
        "font_options"                : [
            "subpixel_antialias"
        ],
        "font_size"                   : 13.0,
        "highlight_line"              : true,
        "indent_to_bracket"           : true,
        "line_padding_bottom"         : 3,
        "overlay_scroll_bars"         : "enabled",
        "scroll_speed"                : 5.0,
        "shift_tab_unindent"          : true,
        "tab_size"                    : 2,
        "translate_tabs_to_spaces"    : true,
        "use_simple_full_screen"      : true
    }
    



