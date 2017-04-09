// by zhangxinxu welcome to visit my personal website http://www.zhangxinxu.com/
// zxx.drag v1.0 2010-03-23 元素的拖拽实现

var params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false
};
//获取相关CSS属性
var getCss = function(o,key){
	return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
};

var createShadowBox = function (bar, target){
	var div = document.createElement("div");

	div.setAttribute("style","width:"+ target.offsetWidth +"px;height:"+ target.offsetHeight + "px;");
	div.setAttribute("class","vitual");

	bar.appendChild(div);

	return div;
}	
//拖拽的实现
var startDrag = function(bar, box,callback){
	var target;
	if(getCss(box, "left") !== "auto"){
		params.left = getCss(box, "left");
	}
	if(getCss(box, "top") !== "auto"){
		params.top = getCss(box, "top");
	}
	//o是移动对象
	bar.onmousedown = function(event){
		params.flag = true;
		if(!event){
			event = window.event;
			//防止IE文字选中
			bar.onselectstart = function(){
				return false;
			}  
		}
		var e = event;
		params.currentX = e.clientX;
		params.currentY = e.clientY;
		target = createShadowBox(bar, box);
	};
	document.onmouseup = function(){
		params.flag = false;	
		if(getCss(target, "left") !== "auto"){
			params.left = getCss(target, "left");
		}
		if(getCss(target, "top") !== "auto"){
			params.top = getCss(target, "top");
		}
		box.style.left = target.offsetLeft + "px";
		box.style.top = target.offsetTop + "px";

		target.parentNode.removeChild(target);
	};
	document.onmousemove = function(event){
		var e = event ? event: window.event;
		if(params.flag){
			var nowX = e.clientX, nowY = e.clientY;
			var disX = nowX - params.currentX, disY = nowY - params.currentY;
			target.style.left = parseInt(params.left) + disX + "px";
			target.style.top = parseInt(params.top) + disY + "px";
		}
		// if (typeof callback == "function") {
		// 	callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
		// }
	};

};
window.onload = function(){
	var axis = {};
	var wrap = document.getElementById('wrap');
	var box = document.getElementById('box');

	startDrag(wrap,box);
	
}