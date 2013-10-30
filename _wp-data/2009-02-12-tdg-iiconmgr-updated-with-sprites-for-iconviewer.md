---
author: jay
comments: true



title: TDG-i.iconMgr updated with sprites for iconViewer

---

One of the largest issues with the TDGi.iconMgr class was the fact that it used individual icons instead of one large file.Â  I still argue that a single huge file is too much for a browser to download on the internet.Â Â  This argument, however, does not work well for _intranet_ applications, where speed doesn't matter.Â  So, I decided to start working on a montage.

I found this task to be extremly simple with the use of the wonderful image automation tool, ImageMagick with some clever shell scripting:

    
    montage -adjoin -tile 1x1462Â 
    
    -geometry 16x16+0+0 -quality 90 -background -none `ls *png | sort` ../collage.png


Next was the task to create the JSON required to display the montage.Â  Again, using simple BASH scripting:

    
    
    X=0
    
    for i in `ls | grep png | sort`; do
    
    Â   name=`echo $i | awk -F. '{print $1}'`
    
    Â   print "{n:'$name',f:'$i',y:$X},"
    
    Â   X=`echo $X+16 | bc`
    
    done


I edited the file manually to include the JS array tags "[]" and deleted the trailing comma.Â  Lastly, we needed to create the JavaScript to parse this stuff.Â  Here are the sprites in [gif](http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr.new/TDGi.iconMgr/iconSprites.gif) (IE6) and [png](http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr.new/TDGi.iconMgr/iconSprites.png) (Fx and IE7+) formats!

Once complete, we have our new iconMgr using the new sprite:

test drive (click the button): [http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr.new/ ](http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr.new/)

Known issues:

Filters can be slow - yes I'm aware and will be looking to see if i can optimize it.

To do:

Enable sprites for iconMgr

[![](http://moduscreate.com/img/screencasts/2009-02-11_2202.png)](http://moduscreate.com/js/examples/ext/tdgiux/TDGi.iconMgr.new/)
