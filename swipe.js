function Swipe(tBox,args) {
  var tPoint={startX:"",startY:"",self:tBox,count:0};
		tPoint.total=tBox.children().children().length;
		tPoint.speed=args.speed?args.speed:300;
		tPoint.iniL=args.iniL?args.iniL:30;
		tPoint.iniT=args.iniT?args.iniT:30;
	var touchDrag=false;
		jtBox=tBox.get(0);
		_this=tBox;
	
	tPoint.setAttr=function(name,value){
		tPoint[name]=value;
	}
		
	//获取浏览器前缀
	function getVendor(){
	  	var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
	  		(/firefox/i).test(navigator.userAgent) ? 'Moz' :
	  		'opera' in window ? 'O' : '';
	  	return vendor;
	}

	//Derection Detect方向检测(左移距离，上移距离，初始设置左，初始设置右)
	function dDetect(l,t){
		if(Math.abs(t)<tPoint.iniT&&Math.abs(l)>tPoint.iniL){
			var rStr=l<0?'left':'right';
			return rStr;
		}
		return false;
	}
	
	//Detect Border 边界检测
	function dBorder(x,y){
		return (x<tPoint.bL||x>tPoint.bRb||y<tPoint.bT||y>tPoint.bBb);	
	}

	//设置tPoint的改变数据（当不监听move/change事件时，由touchend/gestureend事件设置）
	function setPointData(point,setList){//默认设置改变数据，如果setList存在，则遍历setList设置属性
		if(setList){
			for(var o in setList){
				tPoint.setAttr(o,setList[o]);
				//alert(o+":"++":"+tPoint.o);
			}
		}else{
			tPoint.endX=point.pageX;
			tPoint.endY=point.pageY;
			tPoint.mX=point.pageX-tPoint.startX;//滑动距离
			tPoint.mY=point.pageY-tPoint.startY;
			tPoint.d=dDetect(tPoint.mX,tPoint.mY);		
			//alert(tPoint.startX+":"+point.pageX)
		}
	}
	
	function startFun(e){
		var point = e.touches[0],
			_offset=_this.offset(),
			bL=_offset.left,
			bT=_offset.top,
			bW=_this.width(),
			bH=_this.height();
		var setList={
			startX:point.pageX,
			startY:point.pageY,
			bL:bL,
			bT:bT,
			bW:bW,
			bH:bH,
			bRb:bL+bW, //右边界
			bBb:bT+bH, //下边界
			vendor:getVendor()
		}
		setPointData(point,setList);
		touchDrag=true;
		if(typeof args.sCallback=="function"){
			args.sCallback(tPoint);
		}
		e.preventDefault();		
	}
	
	function moveFun(e){
		var point = e.touches[0];
		if(dBorder(point.pageX,point.pageY)){
			touchDrag=false;
			return false;
		}
		if(touchDrag){
			setPointData(point);
			if(typeof args.eCallback=="function"){
				args.mCallback(tPoint);
			}
		}
		e.preventDefault();	
	}
	
	function endFun(e){
		var d=dDetect(tPoint.mX,tPoint.mY),
			touchDrag=false;
		if(typeof args.eCallback=="function"){
			args.eCallback(tPoint);
		}
		e.preventDefault();
	}
	
	function gStartFun(e){
		var setList={
			startRotation:e.rotation,
			startScale:e.scale
		}
		setPointData("",setList);
		if(typeof args.gsCallback=="function"){
			gsCallback(point);
		}
	}
	
	function gChangeFun(e){
		var setList={
			endRotation:e.rotation,
			endScale:e.scale
		}
		setTPointData("",setList);
		if(typeof args.gcCallback=="function"){
			gcCallback(point);
		}		
	}
	
	function gEndFun(e){
		gChangeFun(e);
		if(typeof args.gcCallback!="function"){
			gChangeFun(e);
		}
		if(typeof args.geCallback=="function"){
			geCallback(point);
		}
	}
	
	//Touch事件监听
	tBox.die("touchstart,touchmove,touchend");
	jtBox.addEventListener('touchstart',startFun);
	jtBox.addEventListener('touchmove',moveFun);
	jtBox.addEventListener('touchend',endFun);
	
	//Gesture事件监听
	tBox.die("gesturestart,gesturechange,gestureend");
	jtBox.addEventListener('gesturestart',gStartFun);
	if(typeof args.gcCallback=="function"){
		jtBox.addEventListener('gesturechange',gChangeFun);
	}
	jtBox.addEventListener('gesturechange',gChangeFun);
	jtBox.addEventListener('gestureend',gEndFun);
	
}

if (window.jQuery || window.Zepto) { (function(a) {
		a.fn.Swipe = function(b) {
			return this.each(function() {
				a(this).data("Swipe", new Swipe(a(this), b))
			})
		}
	})(window.jQuery || window.Zepto)
};
