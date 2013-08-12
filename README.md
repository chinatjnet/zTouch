zTouch
======

### * Zepto.js v1.0.1   touch extend (Zepto.js v1.0.1 的swipe touch扩展)

Zepto.js v1.0.1版本的touch.js模块引入使用后会导致页面很卡的情况，所以开发了一个新的扩展插件来替换其touch.js。已经过Android/ios测试。<br/>
由于手机浏览器会阻止JS对gesture手势事件的监听，~~swipe.js中对gesture监听接口虽然可以调用，但无法实现手势操作(Android设备测试，IOS设备应该支持)。我们会在后续进行多点touch事件模拟解决。~~**(最新版zTouch已经去除对gesture事件的监听方法，采用e.touches对多点触摸进行监控，支持两点监控的缩放和旋转操作)**<br>
![github](https://raw.github.com/chinatjnet/zTouch/master/example/images/Touch_Gesture_Reference.jpg "Touch_Gesture_Reference")
<br/><b>swipe.js中为事件监听的核心文件。所有的特殊效果可以在回调函数进行个性化定制。</b><br/>
### * 主要提供以下回调函数：<br/>
<b>sCallback</b> (start callback,touchstart时触发的回调函数),<br/>
<b>mCallback</b> (move callback,touchmove时触发的回调函数),<br/>
<b>eCallback</b> (end callback,touchend时触发的回调函数)<br/>

### * 回调函数中会传入touch事件相关回调参数：<br/>
<b>self</b>:实例化的BOX,<br/>
<b>startX</b>:触点起始X,<br/>
<b>startY</b>:触点起始Y,<br/>
<b>bL</b>:(Box Left) 相对于文档的left偏移,<br/>
<b>bT</b>:(Box Top)相对于文档的top偏移,<br/>
<b>bW</b>:(Box Width)BOX的宽度,<br/>
<b>bH</b>:(Box Height)BOX的高度,<br/>
<b>bRb</b>:(Box Right Border)BOX的右边界,<br/>
<b>bBb</b>:(Box Bottom Border)BOX的下边界,<br/>
<b>tPoint.endX</b>:触点结束X;<br/>
<b>tPoint.endY</b>:触点结束Y;<br/>
<b>tPoint.mX</b>:(move x distance)X方向滑动距离;<br/>
<b>tPoint.mY</b>:(move y distance)Y方向滑动距离;<br/>
<b>tPoint.direction</b>:手势滑动方向(left/right/false);<br/>
<b>tPoint.vendor</b>:浏览器前缀(-moz/-webkit/-o/-ms);<br/>

### * 同时在外部回调函数中提供修改内部tPoint数据的接口:<br/>
        tPoint.setAttr(name,value);<br/>

### * 调用方法:<br/>
    <script type="text/javascript">
    //传入args初始化参数对象
    args={
      iniL:30,//X方向滑动的最小距离
        iniT:50,//Y方向滑动的最大距离
    	eCallback:function(tPoint){
    		switch(tPoint.direction){
    			case "left":
    				alert("left");
    				break;
    			case "right":
    				alert("right");
    		}
    	}
    }
    $("body").Swipe(args); 
    </script>
	
### * 项目地址:<br/>
http://chinatjnet.github.io/zTouch/

### * 演示地址:<br/>
http://htmlpreview.github.io/?https://github.com/chinatjnet/zTouch/blob/master/index.html
<br/><b>二维码：</b><br/>
![github](https://raw.github.com/chinatjnet/zTouch/master/example/images/QRcode.png "QRcode")
<br><br>
