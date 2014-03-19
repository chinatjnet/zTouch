zTouch
======
![github](https://rawgithub.com/chinatjnet/zTouch/master/example/images/zTouch.png "zTouch")
### * Zepto.js v1.0.1   touch extend (Zepto.js v1.0.1 swipe/touch扩展)

Zepto.js v1.0.1版本的touch.js模块引入使用后会导致页面很卡的情况，所以开发了一个新的扩展插件来替换其touch.js。已经过Android/ios测试。<br/>

![github](https://rawgithub.com/chinatjnet/zTouch/master/example/images/rich.png "rich")
### * zTouch特点：<br/>
* zTouch.js只包含核心功能函数，不包含任何效果，简洁轻巧;
* 提供丰富的回调参数，可由用户自定义扩展效果（可参考Demo）;
* 支持多种回调函数，方便及时监控及事件处理（实例化前/后回调，touch start/move/end回调）;
* 支持用户自定义手势标准定义(X-Y轴滑动限定，角度限定);
* 支持BOX边界检测，touch超出边界后自动停止回调操作;
* 提供内部属性设置接口，可在内部tPoint中加入用户自定义属性;
* 支持手势横向滑动，同时保证浏览器纵向正常滑动;
* 不会阻止BOX内的其它绑定事件(onclick等);
* 支持多点触摸监控（缩放，旋转）;

由于手机浏览器会阻止JS对gesture手势事件的监听
~~zTouch.js中对gesture监听接口虽然可以调用，但无法实现手势操作(Android设备测试，IOS设备应该支持)。我们会在后续进行多点touch事件模拟解决。~~
**(最新版zTouch已经去除对gesture事件的监听方法，采用e.touches对多点触摸进行监控，支持两点监控的缩放和旋转操作)**<br>
![github](https://rawgithub.com/chinatjnet/zTouch/master/example/images/Touch_Gesture_Reference.jpg "Touch_Gesture_Reference")
<br/><b>zTouch.js中为事件监听的核心文件。所有的特殊效果可以在回调函数进行个性化定制。</b><br/>
### * 主要提供以下回调函数：<br/>
<b>beforeCallback</b> (实例化之前触发的回调函数),<br/>
<b>sCallback</b> (start callback,touchstart时触发的回调函数),<br/>
<b>mCallback</b> (move callback,touchmove时触发的回调函数),<br/>
<b>eCallback</b> (end callback,touchend时触发的回调函数)<br/>
<b>afterCallback</b> (实例化之后触发的回调函数),<br/>

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
<b>endX</b>:触点结束X;<br/>
<b>endY</b>:触点结束Y;<br/>
<b>mX</b>:(move x distance)X方向滑动距离;<br/>
<b>mY</b>:(move y distance)Y方向滑动距离;<br/>
<b>direction</b>:手势滑动方向(left/right/false);<br/>
<b>angle</b>:单点手势滑动角度;<br/>
<b>duration</b>:手势持续时间;<br/>
<b>vendor</b>:浏览器前缀(-moz/-webkit/-o/-ms);<br/><br/>

<b>tPoint.multiTouch</b>:是否多点触摸(touchmove时可监控);<br/>
<b>tPoint.gStartDis</b>:(gisture start distance)手势起始距离;<br/>
<b>tPoint.gEndDis</b>:(gisture end distance)手势结束距离;<br/>
<b>tPoint.scale</b>:手势缩放比例;<br/>
<b>tPoint.rotation</b>:手势旋转角度;<br/>

### * 同时在外部回调函数中提供修改内部tPoint数据的接口:<br/>
        tPoint.setAttr(name,value);

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

### * Github地址:<br/>
https://github.com/chinatjnet/zTouch/

### * 演示地址:<br/>
http://chinatjnet.github.io/zTouch/demo.html
<br/><b>二维码：</b><br/>
![github](https://rawgithub.com/chinatjnet/zTouch/master/example/images/QRcode.png "QRcode")
<br><br>
