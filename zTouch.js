function Swipe(tBox,args) {
	var tPoint={
		self:tBox,
		count:0,
		speed:300,
		iniL:30,
		iniT:30,
		iniAngle:30,
		touch:false,
		mutiTouch:false,
		setAttr:function(name,value){
			tPoint[name]=value;
		}
	};
	
	// init初始化
	(function(){	
		_this=tPoint.self;
		for(var o in args){
			tPoint[o]=args[o];
		}
		var _offset=_this.offset();
		tPoint.bL=_offset.left;
		tPoint.bT=_offset.top;
		tPoint.bW=_this.width();
		tPoint.bH=_this.height();
		tPoint.bRb=tPoint.bL+tPoint.bW; //右边界
		tPoint.bBb=tPoint.bT+tPoint.bH; //下边界
		tPoint.total=_this.children().children().length;		
	})();
	
  	// 浏览器特性检测
  	tPoint.vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
  		(/firefox/i).test(navigator.userAgent) ? 'Moz' :
  		'opera' in window ? 'O' : '';
  	tPoint.has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
  	tPoint.hasTouch = 'ontouchstart' in window;
  	tPoint.hasTransform = tPoint.vendor + 'Transform' in document.documentElement.style;
	
	// 方向检测(左移距离，上移距离)
	function directionDetect(l,t){
		if(Math.abs(t)<tPoint.iniT&&Math.abs(l)>tPoint.iniL){
			var rStr=l<0?'left':'right';
			return rStr;
		}
		return false;
	}
	
	// 边界检测
	function borderDetect(x,y){
		return (x<tPoint.bL||x>tPoint.bRb||y<tPoint.bT||y>tPoint.bBb);	
	}
	
	// 获取夹角(通过arctant反三角函数)
	function getAngle(n){
		return Math.atan(n)*180/Math.PI;
	}
	
	// 获取距离(通过两边计算第三边)
	function getDis(xLen,yLen){
		return Math.sqrt(Math.pow(xLen,2)+Math.pow(yLen,2));
	}

	// 设置tPoint的改变数据（默认设置改变数据，如果setList存在，则遍历setList设置属性）
	function setPointData(point,setList){
		if(setList){
			for(var o in setList){
				tPoint.setAttr(o,setList[o]);
			}
		}else{
			var t = new Date();
			tPoint.endX=point.pageX;
			tPoint.endY=point.pageY;
			tPoint.endTime=t.getTime();
			tPoint.duration=tPoint.endTime-tPoint.startTime;
			tPoint.mX=point.pageX-tPoint.startX;//滑动距离
			tPoint.mY=point.pageY-tPoint.startY;
			tPoint.direction=directionDetect(tPoint.mX,tPoint.mY);		
			tPoint.angle=getAngle(tPoint.mY/tPoint.mX);
		}
	}
	
	// 多点触摸检测(只检测两点触摸)
	function multiTouchDetect(e){
		tPoint.tLen=e.touches.length;
		if(tPoint.tLen>1){
			var point0=e.touches[0],
				point1=e.touches[1],
				xLen=point1.pageX-point0.pageX,
				yLen=point1.pageY-point0.pageY,
				angle=getAngle(yLen/xLen),
				gDis=getDis(xLen,yLen);
			if(!tPoint.mutiTouch){
				tPoint.gStartDis=gDis;
				tPoint.gStartAngle=angle;
			}else{
				tPoint.gEndDis=gDis;
				tPoint.gEndAngle=angle;
				tPoint.scale=gDis/tPoint.gStartDis;
				tPoint.rotation=angle-tPoint.gStartAngle;
			}
			tPoint.mutiTouch=true;
		}else{
			tPoint.mutiTouch=false;
		};	
	}
	
	function startFun(e){
		var point = e.touches[0],
			t = new Date();
		var setList={
			startX:point.pageX,
			startY:point.pageY,
			startTime:t.getTime(),
			identifier:point.identifier
		}
		setPointData(point,setList);
		tPoint.touch=true;
		if(typeof tPoint.sCallback=="function"){
			tPoint.sCallback(tPoint);
		}	
	}
	
	function moveFun(e){
		var point = e.touches[0];
		if(borderDetect(point.pageX,point.pageY)){
			tPoint.touch=false;
			return false;
		}
		if(tPoint.touch){
			setPointData(point);
			multiTouchDetect(e);// Muti touch detect
			if(typeof tPoint.mCallback=="function"){
				tPoint.mCallback(tPoint);
			}
		}
		if(Math.abs(tPoint.angle)<tPoint.iniAngle){
			e.preventDefault();	
		}
	}
	
	function endFun(e){
		tPoint.touch=false;
		tPoint.mutiTouch=false;
		if(typeof tPoint.eCallback=="function"){
			tPoint.eCallback(tPoint);
		}
	}

	// 实例化之前的回调函数
	if(typeof tPoint.beforeCallback=="function"){
		tPoint.beforeCallback(tPoint);
	}
	
	// Touch事件监听
	_this.die("touchstart,touchmove,touchend");
	_this.get(0).addEventListener('touchstart',startFun);
	_this.get(0).addEventListener('touchmove',moveFun);
	_this.get(0).addEventListener('touchend',endFun);
	
	// 实例化之后的回调函数
	if(typeof tPoint.afterCallback=="function"){
		tPoint.afterCallback(tPoint);
	}	
}

if (window.jQuery || window.Zepto) { (function(a) {
		a.fn.Swipe = function(b) {
			return this.each(function() {
				a(this).data("Swipe", new Swipe(a(this), b))
			})
		}
	})(window.jQuery || window.Zepto)
};
