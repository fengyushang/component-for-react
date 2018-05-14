// JavaScript Document

//防止网页被iframe嵌套
//if(window.top!=window.self)window.top.location=window.self.location;

//工具函数-->
//原生常用方法封装
function Id(id){
	return document.getElementById(id);
};
function Class(Class){
	return document.getElementsByClassName(Class);
};
function Tag(tag){
	return document.getElementsByTagName(tag);
};
function QS(Class){//带上选择符号(包括属性)，只能选一组中的一个元素
	return document.querySelector(Class);
};
function QSA(Class){//带上选择符号(包括属性)，能选一组元素
	return document.querySelectorAll(Class);
};
function Create(tag){
	return document.createElement(tag);
};
function Add(obj,obj1){
	obj.appendChild(obj1);
};
function Insert(obj,obj1,obj2){//父元素，要插入的元素，插入元素的后一个兄弟元素
	obj.insertBefore(obj1,obj2);
};
function Remove(obj,obj1){
	obj.removeChild(obj1);
};
function AddClass(obj,className){
	obj.classList.add(className);
};
function RemoveClass(obj,className){
	obj.classList.remove(className);
};
function ToggleClass(obj,className){
	obj.classList.toggle(className);
};
function HasClass(obj,className){
	return obj.classList.contains(className);
};
function parent(obj){
	return obj.parentElement||obj.parentNode;
};
function prevSibling(obj){
	return obj.previousElementSibling||obj.previousSibling;
};
function nextSibling(obj){
	return obj.nextElementSibling||obj.nextSibling;
};
function firstChild(obj){
	return obj.firstElementChild||obj.firstChild;
};
function lastChild(obj){
	return obj.lastElementChild||obj.lastChild;
};
function Scroll(obj,position,dis){
	var position='scroll'+position.toLowerCase().replace(/^[a-z]{1}/,position.charAt(0).toUpperCase());

	if(obj===document||obj===document.body){
		document.documentElement[position]=document.body[position]=dis;
	}else{
		obj[position]=dis;
	}
};

//开发与线上控制台模式切换
//arr(数组里面选定的都不输出)
function consoleNull(arr){
	for(var i=0;i<arr.length;i++){
		window.console[arr[i]]=function(){};
	}
};

//判断数据类型的方法（对typeof的增强，7种常用类型的判断，返回小写字符串）
function Type(obj){
	var arr=['null','nan','function','number','string','array','object'];
	if(obj===null){
		return 'null';
	}
	if(obj!==obj){
		return 'nan';
	}
	if(typeof Array.isArray==='function'){
		if(Array.isArray(obj)){	//浏览器支持则使用isArray()方法
			return 'array';
		}
	}else{  					//否则使用toString方法
		if(Object.prototype.toString.call(obj)==='[object Array]'){
			return 'array';
		}
	}
	return (typeof obj).toLowerCase();
};

//获取对象样式
function getStyle(obj,attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,false)[attr];
};

//对拟态类名(字符串样式)的操作，必须先用set方法
//该方法是为了在js里替代类似active状态操作类名样式
var yydStyle={
	set:function(obj,str){
		if(obj.getAttribute('style'))str=obj.getAttribute('style')+str;
		obj.setAttribute('style',str);
		this.str=str;
	},
	get:function(){
		return this.str;
	},
	remove:function(obj,str){
		if(this.str){
			this.str=this.str.replace(str,'');
			obj.setAttribute('style',this.str);
		}
	}
};

//绑定事件，可重复绑定('事件名称'必须加引号)
function bind(obj,evname,fn){
	if(obj.addEventListener){
		obj.addEventListener(evname,fn,false);
	}else{
		obj.attachEvent('on'+evname,function(){
			fn.call(obj);
		});
	}
};

//取消绑定，可重复取消('事件名称'必须加引号)
function unBind(obj,evname,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(evname,fn,false);
	}else{
		obj.detachEvent('on'+evname,fn);
	}
};

//网络处理
function networkHandle(onlineFn,offlineFn){
	var oMask=document.createElement('div');
	var oWrap=document.createElement('div');
	var textArr=['当前无网络连接！','网络连接已恢复！'];

	oMask.style.cssText='width:100%; height:100%; background-color:rgba(0,0,0,0.6); position:fixed; left:0; top:0; z-index:999999999;';
	oWrap.style.cssText='width:200px; height:50px; line-height:50px; text-align:center; border-radius:5px; background-color:#fff; font-size:16px; position:absolute; left:0; top:0; right:0; bottom:0; margin:auto; z-index:10;';
	oMask.appendChild(oWrap);

	window.onoffline=function(){
		oWrap.innerHTML=textArr[0];
		document.body.appendChild(oMask);
		offlineFn&&offlineFn();
	};
	window.ononline=function(){
		oWrap.innerHTML=textArr[1];
		setTimeout(function(){
			document.body.removeChild(oMask);
			window.location.reload();
		},3000);
		onlineFn&&onlineFn();
	};
};

//限制输入类型
//oninput="inputType(this,0)"
function inputType(This,index){
	var arr=[
				This.value.replace(/[^\d]+/g,''),//数字类型0
				This.value.replace(/[^a-zA-Z]+/g,''),//字母类型1
				This.value.replace(/[^a-zA-Z]+/g,'').toLowerCase(),//字母类型小写2
				This.value.replace(/[^a-zA-Z]+/g,'').toUpperCase(),//字母类型大写3
				This.value.replace(/[^\w]+/g,''),//数字和字母类型4
				This.value.replace(/[^\w]+/g,'').toLowerCase(),//数字和字母类型小写5
				This.value.replace(/[^\w]+/g,'').toUpperCase(),//数字和字母类型大写6
				This.value.replace(/[^\u2E80-\u9FFFa-zA-Z]+/g,''),//汉字和英文7
			];
	This.value=arr[index||0];
};

//自动点击事件
function autoEvent(obj,event){
	if(document.createEvent){
        var evObj=document.createEvent('MouseEvents');

        evObj.initEvent(event,true,false);
        obj.dispatchEvent(evObj);
	}else if(document.createEventObject){
  		obj.fireEvent(event);
	}
};

//自定义事件的实现
var customEvent={
	json:{},
	on:function(evName,fn){
		if(Type(this.json[evName])!='object'){
			this.json[evName]={};
		}
		if(Type(fn)=='function'){
			fn.id=soleString32();
			this.json[evName][fn.id]=fn;
		}
		return this;
	},
	emit:function(evName,data){
		var evFnArr=this.json[evName];

		if(Type(evFnArr)=='object'){
			for(var attr in this.json[evName]){
				if(Type(this.json[evName][attr])=='function'){
					this.json[evName][attr](data);
				}
			}
		}
		return this;
	},
	remove:function(evName,fn){
		var evFnArr=this.json[evName];

		if(Type(evName)=='string'&&Type(evFnArr)=='object'){
			if(Type(fn)=='function'){
				if(fn.id){
					delete this.json[evName][fn.id];
				}else{
					for(var attr in this.json[evName]){
						if(this.json[evName][attr]+''===fn+''){
							delete this.json[evName][attr];
							break;
						}
					}
				}
			}else{
				delete this.json[evName];
			}
		}
		return this;
	}
};

//浏览器文本操作方法，复制，剪辑有效
function textHandle(obj,index){
	var arr=['Copy','Cut'];
	obj.select();
	document.execCommand(arr[index||0]);
};

//获取到document的位置
function getPos(obj,attr){
	var value=0;
	var iPos=0;
	var i=0;
	while(obj){
		iPos=attr=='left'?obj.offsetLeft:iPos=obj.offsetTop;
		value+=iPos;
		obj=obj.offsetParent;
		i++;
	}
	return value;
};

//碰撞检测(配合定时器使用)
function collide(obj1,obj2){
	var l1=obj1.offsetLeft;
	var r1=obj1.offsetLeft+obj1.offsetWidth;
	var t1=obj1.offsetTop;
	var b1=obj1.offsetTop+obj1.offsetHeight;

	var l2=obj2.offsetLeft;
	var r2=obj2.offsetLeft+obj2.offsetWidth;
	var t2=obj2.offsetTop;
	var b2=obj2.offsetTop+obj2.offsetHeight;

	return r1<l2||l1>r2||b1<t2||t1>b2?false:true;
};

//生成32位唯一字符串(大小写字母数字组合)
function soleString32(){
	var str='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var timestamp=+new Date()+Math.floor(Math.random()*10);
	var resultStr='';

	for(var i=0;i<19;i++){
		resultStr+=str.charAt(Math.floor(Math.random()*str.length));
	}
	resultStr+=timestamp;

	resultStr=resultStr.split('');
	resultStr.sort(function(a,b){
		return Math.random()-0.5;
	});
	resultStr=resultStr.join('');
	return resultStr;
};

//时间变成两位数
function toTwo(n){
	return n<10?'0'+n:n+'';
};

//算出本月天数
//getMonth获得的月份是从0开始，要加一
function manyDay(year,month){
	var nextMonth=new Date(year,month,0);//下月第0天就是最后一天，-1=倒数第二天
	return nextMonth.getDate();
};

//正常化日期
function normalDate(oDate){
	var oDate=oDate;
	var reg=/\-+/g;

	if(Type(oDate)=='string'){
		oDate=oDate.split('.')[0];//解决ie浏览器对yyyy-MM-dd HH:mm:ss.S格式的不兼容
		oDate=oDate.replace(reg,'/');//解决苹果浏览器对yyyy-MM-dd格式的不兼容性
	}

	oDate=new Date(oDate);
	return oDate;
};

//日期格式化函数
//oDate（时间戳或字符串日期都支持）
//fmt（格式匹配）
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//dateFormat0(new Date(),'yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
//dateFormat0(new Date(),'yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
function dateFormat0(oDate,fmt){
	var fmt=fmt||'yyyy/MM/dd hh:mm:ss';
	var oDate=normalDate(oDate);
	var date={
		"M+":oDate.getMonth()+1,                 //月份
		"d+":oDate.getDate(),                    //日
		"h+":oDate.getHours(),                   //小时
		"m+":oDate.getMinutes(),                 //分
		"s+":oDate.getSeconds(),                 //秒
		"q+":Math.floor((oDate.getMonth()+3)/3), //季度，+3为了好取整
		"S":oDate.getMilliseconds()              //毫秒
	};

	if(/(y+)/.test(fmt)){//RegExp.$1(正则表达式的第一个匹配，一共有99个匹配)
		fmt=fmt.replace(RegExp.$1,(oDate.getFullYear()+'').substr(4-RegExp.$1.length));
	}

	for(var attr in date){
		if(new RegExp('('+attr+')').test(fmt)){
			fmt=fmt.replace(RegExp.$1,RegExp.$1.length==1?date[attr]:('00'+date[attr]).substring((date[attr]+'').length));
		}
	}

	return fmt;
};

//时间格式化(主要用于格式化历史时间到当前时间是多少秒到多少年前)
//oDate（时间戳或字符串日期都支持）
function dateFormat1(oDate){
	var oDate=normalDate(oDate);

	if(+oDate>=+new Date()){
		return '刚刚';
	}
	var lookTime=+new Date()-(+oDate);
	var	seconds=Math.floor(lookTime/(1000));
	var minutes=Math.floor(lookTime/(1000*60));
	var hours=Math.floor(lookTime/(1000*60*60));
	var days=Math.floor(lookTime/(1000*60*60*24));
	var months=Math.floor(lookTime/(1000*60*60*24*30));
	var years=Math.floor(lookTime/(1000*60*60*24*30*12));

	if(seconds<60){
		lookTime=seconds+'秒前';
	}else if(minutes<60){
		lookTime=minutes+'分钟前';
	}else if(hours<24){
		lookTime=hours+'小时前';
	}else if(days<30){
		lookTime=days+'天前';
	}else if(months<12){
		lookTime=months+'个月前';
	}else{
		lookTime=years+'年前';
	}
	return lookTime;
};


//定时器增强requestAnimationFrame与setInterval兼容
function yydTimer(fn,msec){
	var id=null;
	var lastT=null;
	var msec=msec||1000/60;

	if(msec<17.1)msec=17.1;//解决间隔小于17.1的BUG
	if(window.requestAnimationFrame){
		function animate(time){
			id=requestAnimationFrame(animate);

			if(lastT==null){
				lastT=parseInt(time);
			}
			if(parseInt(time)%msec<lastT){
				fn&&fn(clear,id);
			}
			lastT=parseInt(time)%msec;

			function clear(){
				cancelAnimationFrame(id);
			};
			window.onhashchange=function(){
				clear();
			};
		};
		id=requestAnimationFrame(animate);
	}else{
		id=setInterval(function(){
			fn&&fn(clear,id);
		},msec);

		function clear(){
			clearInterval(id);
		};
		window.onhashchange=function(){
			clear();
		};
	}
};

//布局转换
function layoutChange(obj){
	for(var i=0;i<obj.length;i++){
		obj[i].style.left=obj[i].offsetLeft+'px';
		obj[i].style.top=obj[i].offsetTop+'px';
	}
	for(var i=0;i<obj.length;i++){
		obj[i].style.position='absolute';
		obj[i].style.margin='0';
	}
};

//选中文字兼容
function selectText(){
	return 	document.selection? document.selection.createRange().text //ie下
								:window.getSelection().toString(); //标准下
};

//重置file文件
//obj(file文件对象)
function resetFile(obj){
	var oFrom=document.createElement('form');
	var oParent=obj.parentNode;

	oFrom.appendChild(obj);
	oFrom.reset();
	oParent.appendChild(obj);
};

//canvas画笔(兼容手机和电脑端)
//obj(canvas标签对象)
//lineWidth(画笔线框)
//color(画笔颜色)
//endFn(在touchend后会输出dataUrl)
function brush(obj,lineWidth,color,endFn){
	var oGC=obj.getContext('2d');
	console.dir(oGC);

	oGC.lineWidth=lineWidth||1;
	oGC.strokeStyle=color||'#000';

	isPhone()?mo():pc();

	function mo(){
		bind(obj,'touchstart',function(ev){
			var ev=ev||window.event;

			oGC.moveTo(ev.changedTouches[0].clientX-obj.offsetLeft,ev.changedTouches[0].clientY-obj.offsetTop);
		});

		bind(obj,'touchmove',function(ev){
			var ev=ev||window.event;

			oGC.lineTo(ev.changedTouches[0].clientX-obj.offsetLeft,ev.changedTouches[0].clientY-obj.offsetTop);
			oGC.stroke();
		});

		bind(obj,'touchend',function(){
			endFn&&endFn(obj.toDataURL());
		});
	};

	function pc(){
		obj.onmousedown=function(ev){
			var ev=ev||window.event;
			oGC.moveTo(ev.clientX-obj.offsetLeft,ev.clientY-obj.offsetTop);

			if(obj.setCapture)obj.setCapture;
			document.onmousemove=function(ev){
				var ev=ev||window.event;

				oGC.lineTo(ev.clientX-obj.offsetLeft,ev.clientY-obj.offsetTop);
				oGC.stroke();
			};
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
				if(obj.releaseCapture)obj.releaseCapture;
				endFn&&endFn(obj.toDataURL());
			};
			return false;
		};
	};
};

//内核前缀查询
function getPrefix(){
	var style=document.body.style||document.documentElement.style;
	var arr=['webkit','khtml','moz','ms','o'];
	for(var i=0;i<arr.length;i++){
		if (typeof style[arr[i]+'Transition']=='string'){
			document.title='内核前缀：-'+arr[i];
		}
	}
};

//判断是否是手机浏览器
function isPhone(){
	var reg=/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
	return window.navigator.userAgent.match(reg)?true:false;
};

//判断是否是微信浏览器
function isWeixin(){
	var ua=navigator.userAgent.toLowerCase();
 	return ua.match(/MicroMessenger/i)=='micromessenger'?true:false;
};

var cookie={
	set:function(key,value,mesc){//设置cookie
		var oDate=new Date();

		oDate.setSeconds(oDate.getSeconds()+(mesc||60*60*24*30));//不传过期秒数默认30天过期
		document.cookie=key+'='+encodeURIComponent(value)+';expires='+oDate;
	},
	get:function(key){//获取cookie
		var str=document.cookie;
		var reg1=/\=+/g;
		var reg2=/\;+/g;

		str=str.replace(reg1,'":"');
		str=str.replace(reg2,'","');
		str='{"'+str;
		str+='"}';
		str=JSON.parse(str);
		return decodeURIComponent(str[key]);
	},
	remove:function(key){//删除cookie
		var oDate=new Date();

		oDate.setDate(oDate.getDate()-1);
		document.cookie=key+'='+''+';expires='+oDate.toGMTString();
	},
};

var Store=function(){
	this.name='Store';
};

Store.prototype={
	init:function(options){
		this.store=function(){
			return options.type;
		};
		return this;
	},
	set:function(key,value){
		var type=Type(value);

		switch(type){
			case 'object':
							this.store().setItem(key,JSON.stringify(value));
						break;
			case 'array':
							this.store().setItem(key,'['+value+']');
						break;
			case 'function'://如果是函数先用eval()计算执行js代码
							this.store().setItem(key,value);
						break;
			default :
							this.store().setItem(key,value);
		}

	},
	get:function(key){
		var value=this.store().getItem(key);

		try{
			value=JSON.parse(value);
		}catch(e){}
		return value;
	},
	getAll:function(){
		var json={};
		var value='';

		for(var attr in this.store()){
			try{
				value=JSON.parse(this.store()[attr]);
			}catch(e){}
			json[attr]=value;
		}
		return 	json;
	},
	remove:function(key){
		this.store().removeItem(key);
	},
	clear:function(){
		this.store().clear();
	},
};

var lStore=new Store().init({
	'type':window.localStorage,
});

var sStore=new Store().init({
	'type':window.sessionStorage,
});

//用js修改样式表
//linkHref（样式表完整名称）
//className(想要修改的选择器完整名称)
//json(json格式去写样式)
function jsStyle(linkHref,className,json){
	var sheets=document.styleSheets;//拿到所有样式表
	var sheet=null;

	for(var i=0;i<sheets.length;i++){
		if(sheets[i].href){
			var sHref=sheets[i].href;
			sHref=sHref.substring(sHref.lastIndexOf('/')+1,sHref.length);

			if(sHref==linkHref){
				sheet=sheets[i];//拿到样式表对象
			}
		}
	}

	var rules=sheet.cssRules||sheet.rules;//拿到所有的样式
	var rule=null;

	for(var i=0;i<rules.length;i++){
		if(rules[i].selectorText==className){
			rule=rules[i];//拿到想要操作的那条样式
			for(var attr in json){
				rule.style[attr]=json[attr];
			}
		}
	}
	return rule.cssText;
};

//返回当前地址?后面的参数的json格式(用于submit提交的str='1'&str1='2'格式)
function strToJson(str){
	var str=str||window.location.search;
	var reg=/&+/g;
	var reg1=/=+/g;

	str=decodeURI(str);
	str=str.replace('?','');
	str=str.replace(reg,'","');
	str=str.replace(reg1,'":"');
	str='{"'+str+'"}';
	str=JSON.parse(str);
	return str;
};

//返回当前地址?后面的参数的json格式(用于自己拼接的str={}&str1={}格式)
//注意要拼接标准json格式
function strToJson1(str){
	var str=str||window.location.search;
	var reg=/&+/g;
	var reg1=/=+/g;
	var reg2=/^\?$/;

	str=decodeURI(str);
	str=reg2.test(str)?str.replace('?','"'):'"'+str;
	str=str.replace(reg,',"');
	str=str.replace(reg1,'":');
	str='{'+str+'}';
	str=JSON.parse(str);
	return str;
};

//json克隆副本
function Json(json){
	return json?JSON.parse(JSON.stringify(json)):'';
};

//判断设备跳转不同地址
function goPage(moHref,pcHref){
	var reg=/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;

	window.location.href=navigator.userAgent.match(reg)?moHref:pcHref;
};

//根据设备宽度来写相对布局,
//最小1rem=100px(宽度为375px屏幕下),3.75rem=100%;
//根据375屏幕下换算来布局
//小于375屏幕根节点字体大小与375屏幕保持一致，注意宽度的溢出
function htmlFontSize(){
	function change(){
		var fontSize=document.documentElement.clientWidth/3.75;

		if(fontSize<100)fontSize=100;
		if(fontSize>288)fontSize=288;
		document.getElementsByTagName('html')[0].style.fontSize=fontSize+'px';
	};
	change();
	window.onresize=change;
};



//旋转360核心函数
//根据半径和角度获得x和y的坐标
function circleGetXY(radius,angle){
	return{x:Math.round(Math.sin(angle*Math.PI/180)*radius),y:Math.round(Math.cos(angle*Math.PI/180)*radius)}
};
//过渡结束时候初始化属性
function transitionEndFn(){
	this.style.transition='50ms 100ms';
	this.style.transform='scale(1) rotate(-720deg)';
	this.style.opacity=1;
	this.style.filter='alpha(opacity:1)';
	removeEnd(this)	;
};
//元素过渡结束的时候加上transitionEndFn函数
function addEnd(obj){
	obj.addEventListener('transitionend',transitionEndFn,false);
	obj.addEventListener('webkitTransitionEnd',transitionEndFn,false);
};
//元素过渡结束的时候再删除transitionEndFn函数
function removeEnd(obj){
	obj.removeEventListener('transitionend',transitionEndFn,false);
	obj.removeEventListener('webkitTransitionEnd',transitionEndFn,false);
};

//查看键值修正版
function keyCode(){
	document.onkeyup=function(ev){
		var ev=ev||window.event;
		var oP=document.createElement('p');
		var aString=String.fromCharCode(ev.keyCode);
		var json={27:'Esc',112:'F1',113:'F2',114:'F3',115:'F4',116:'F5',117:'F6',118:'F7',119:'F8',120:'F9',121:'F10',122:'F11',123:'F12',44:'PrtScr',145:'Scroll',19:'Pause',192:'`',189:'-',187:'=',8:'←删除',45:'Insert',36:'Home',33:'PgUp',144:'数字区 NumLock',111:'数字区 /',106:'数字区 *',109:'数字区 -',9:'Tab',219:'[',221:']',13:'Enter',46:'Delete',35:'End',34:'PgDn',103:'数字区 7',104:'数字区 8',105:'数字区 9',107:'数字区 +',20:'Capslock',186:'：',222:'’',220:'｜',100:'数字区 4',101:'数字区 5',102:'数字区 6',16:'Shift',188:'，',190:'。',191:'/',38:'方向↑',97:'数字区 1',98:'数字区 2',99:'数字区 3',17:'Ctrl',91:'左Window',92:'右Window',18:'Alt',32:'空格',93:'打印',37:'方向←',40:'方向↓',39:'方向→',96:'数字区 0',110:'数字区 .'};

		if(json[ev.keyCode]){
			aString=json[ev.keyCode];
		}
		oP.innerHTML='按键'+':'+aString+' '+'键值'+':'+ev.keyCode;
		document.body.appendChild(oP);
	};
};



//算法函数-->
//计算排列函数(arrange)
function A(m,n){
	return f(m)/f(m-n);
};
//计算组合的函数(combination)
function C(m,n){
	return f(m)/(f(m-n)*f(n));
};
//递归计算阶层
function f(num){
	if(num<=1){
		return 1;
	}
	return num*f(num-1);
};

//数组螺旋矩阵
function changeXY(size){
	var arr=[];
	var len=size*size;
	var row = 0;
	var col = 0;
	var min = 0;
	var max = size - 1;

	for(var i=0;i<len;i++){
		arr.push(row*size+col);
		if(row==min&&col<max){
			col=col+1;
		}
		else if(col==max&&row<max){
			row=row+1;
		}
		else if(row==max&&col>min){
			col=col-1;
		}
		else if(col==min&&row>min){
			row=row-1;
		}
		if(row-1==min&&col==min){
			min=min+1;
			max=max-1;
		}
	}
	return arr;
};

//数组行列矩阵互换
function changeXY1(arr,size){
	var newArr=[];
	var iNow=0;

	(function(){
		if(iNow==size){
			return;
		}
		for(var i=0;i<arr.length;i++){
			if(i%size==iNow){
				newArr.push(arr[i]);
			}
		}
		iNow++;
		arguments.callee();//递归调用自执行函数本身
	})();
	return newArr;
}



//参考函数-->
//对js中的5钟主要数据类型进行值复制（包括Number、String、Object、Array、Boolean）
function clone(obj){
	//判断是对象，就进行循环复制
	if(typeof obj==='object'&&typeof obj!=='null'){
		//区分是数组还是对象，创建空的数组或对象
		var o=Object.prototype.toString.call(obj).slice(8,-1)==="Array"?[]:{};

		for(var k in obj){
			//如果属性对应的值为对象，则递归复制
			if(typeof obj[k]==='object'&&typeof obj[k]!=='null'){
				o[k]=clone(obj[k]);
			}else{
				o[k]=obj[k];
			}
		}
	}else{//不为对象，直接把值返回
		return obj;
	}
	return o;
};

//包装成一个promise对象
function setPromise(fn,ag1,ag2){
	return new Promise(function(resolve,reject){
		if(fn){
			fn.resolve=resolve;
			arguments.length==2?fn(ag1):fn(ag1,ag2);
		}
		//传入的函数加入return [函数名].resolve(data);//因为resolve后面的不会再走了，加上return明确点
	});
};

//兼容手机和pc端的拖拽事件方法(该方法不进行拖拽，只封装事件)
//option{
	//obj:obj,//被拖拽的对象
	//start:function(position,ev){},//拖拽开始的函数
	//move:function(position,ev){},//拖拽中的函数
	//end:function(position,ev){},//拖拽结束的函数
	//preventDefault:true,//是否阻止系统默认拖拽事件
//}
function onDrag(option){
	var obj=option.obj;
	var start=option.start;
	var move=option.move;
	var end=option.end;
	var preventDefault=option.preventDefault;
	var position={
		sX:0,
		sY:0,
		mX:0,
		mY:0,
		eX:0,
		eY:0,
	};

	isPhone()?mo():pc();

	function mo(){
		bind(obj,'touchstart',fn1);
		function fn1(ev){
			var ev=ev||window.event;

			position.sX=ev.changedTouches[0].clientX;
			position.sY=ev.changedTouches[0].clientY;
			start&&start.call(obj,position,ev);
		};
		bind(obj,'touchmove',fn2);
		function fn2(ev){
			var ev=ev||window.event;

			position.mX=ev.changedTouches[0].clientX;
			position.mY=ev.changedTouches[0].clientY;
			move&&move.call(obj,position,ev);
		};
		bind(obj,'touchend',fn3);
		function fn3(){
			var ev=ev||window.event;

			position.eX=ev.changedTouches[0].clientX;
			position.eY=ev.changedTouches[0].clientY;
			end&&end.call(obj,position,ev);
		};
	};

	function pc(){
		obj.onmousedown=function(ev){
			var ev=ev||window.event;

			position.sX=ev.clientX;
			position.sY=ev.clientY;

			if(obj.setCapture)obj.setCapture;
			start&&start.call(obj,position,ev);
			document.onmousemove=function(ev){
				var ev=ev||window.event;

				position.mX=ev.clientX;
				position.mY=ev.clientY;
				move&&move.call(obj,position,ev);
			};
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
				if(obj.releaseCapture)obj.releaseCapture;
				var ev=ev||window.event;

				position.eX=ev.clientX;
				position.eY=ev.clientY;
				end&&end.call(obj,position,ev);
			};
			return false;
		};
	};

	if(preventDefault)bind(obj,'touchmove',fix);
	document.onselectstart=function(){
		return false;
	};
};



//兼容手机和电脑端的拖拽方法
function drag(obj,lMin,lMax,tMin,tMax,sFn,mFn,endFn){
	var disX=0;
	var disY=0;
	var lMin=lMin||0;
	var lMax=lMax||Math.max(document.documentElement.clientWidth,parseInt(getStyle(document.body,'width')))-parseInt(getStyle(obj,'width'));
	var tMin=tMin||0;
	var tMax=tMax||Math.max(document.documentElement.clientHeight,parseInt(getStyle(document.body,'height')))-parseInt(getStyle(obj,'height'));

	isPhone()?mo():pc();

	function mo(){
		bind(obj,'touchstart',fn1);
		function fn1(ev){
			var ev=ev||window.event;

			disX=ev.changedTouches[0].clientX-css(obj,'left');
			disY=ev.changedTouches[0].clientY-css(obj,'top');
			sFn&&sFn.call(obj,disX,disY);
		};
		bind(obj,'touchmove',fn2);
		function fn2(ev){
			var ev=ev||window.event;
			var l=ev.changedTouches[0].clientX-disX;
			var t=ev.changedTouches[0].clientY-disY;

			if(l<lMin)l=lMin;
			if(l>lMax)l=lMax;
			if(t<tMin)t=tMin;
			if(t>tMax)t=tMax;
			css(obj,'left',l+'px');
			css(obj,'top',t+'px');
			mFn&&mFn.call(obj,l,t);
		};
		bind(obj,'touchend',fn3);
		function fn3(){
			endFn&&endFn.call(obj);
		};
	};

	function pc(){
		obj.onmousedown=function(ev){
			var ev=ev||window.event;
			disX=ev.clientX-css(obj,'left');
			disY=ev.clientY-css(obj,'top');

			if(obj.setCapture)obj.setCapture;
			sFn&&sFn.call(obj,disX,disY);
			document.onmousemove=function(ev){
				var ev=ev||window.event;
				var l=ev.clientX-disX;
				var t=ev.clientY-disY;

				if(l<lMin)l=lMin;
				if(l>lMax)l=lMax;
				if(t<tMin)t=tMin;
				if(t>tMax)t=tMax;
				css(obj,'left',l+'px');
				css(obj,'top',t+'px');
				mFn&&mFn.call(obj,l,t);
			};
			document.onmouseup=function(){
				document.onmousemove=document.onmouseup=null;
				if(obj.releaseCapture)obj.releaseCapture;
				endFn&&endFn.call(obj);
			};
			return false;
		};
	};

	bind(obj,'touchmove',fix);
	document.onselectstart=function(){
		return false;
	};
};

//照片墙拖拽
//obj(一组图片元素)
//endFn(返回交换位置的两个索引)
function imgDrag(obj,endFn,startFn){
	var iZIndex=0;
	var aPos=[];
	var iMin=0;
	var iMinIndex=-1;
	var aPosIndex=0;
	var dObj=[];

	for(i=0;i<obj.length;i++){
		obj[i].setAttribute('style','');
		aPos[i]={left:obj[i].offsetLeft,top:obj[i].offsetTop};
		obj[i].index=i;
	}
	startFn&&startFn(aPos);

	window.localStorage.setItem('yydImgDragAPos',JSON.stringify(aPos));
	layoutChange(obj);

	function removeItem(){
		window.localStorage.removeItem('yydImgDragOnOff');
	};
	window.onunload=removeItem;
	window.onhashchange=removeItem;
	if(window.localStorage.getItem('yydImgDragOnOff')){
		dObj=[obj[obj.length-1]];
	}else{
		dObj=obj;
	}
	window.localStorage.setItem('yydImgDragOnOff',true);

	for(var i=0;i<dObj.length;i++){
		drag(dObj[i],null,null,null,null,null,function(){

			iMin=Infinity;
			iMinIndex=-1;

			try{
				obj=obj[0].parentNode.getElementsByClassName(obj[0].className.split(' ')[0]);
				if(iZIndex>100){
					for(i=0;i<obj.length;i++){
						obj[i].style.zIndex=0;
					}
					window.localStorage.setItem('yydImgDragIZIndex',0);
				}
				if(window.localStorage.getItem('yydImgDragIZIndex')){
					iZIndex=window.localStorage.getItem('yydImgDragIZIndex');
				}
				this.style.zIndex=iZIndex++;
				window.localStorage.setItem('yydImgDragIZIndex',iZIndex);
			}catch(e){}

			for(var i=0;i<obj.length;i++){
				var a=css(this,'left')-css(obj[i],'left');
				var b=css(this,'top')-css(obj[i],'top');
				var c=Math.sqrt(Math.pow(a,2)+Math.pow(b,2));

				obj[i].classList.remove('active');
				if(this==obj[i]){
					continue;
				}else if(collide(this,obj[i])&&c<iMin){
					iMin=c;
					iMinIndex=i;
				}
			}
			if(iMinIndex!=-1)obj[iMinIndex].classList.add('active');
		},function(){
			var index=this.index;
			var aPosIndex=-1;

			if(window.localStorage.getItem('yydImgDragAPos')){
				aPos=JSON.parse(window.localStorage.getItem('yydImgDragAPos'));
			}

			try{
				obj=obj[0].parentNode.getElementsByClassName(obj[0].className.split(' ')[0]);
			}catch(e){}

			try{
				if(iMinIndex!=-1){
					aPosIndex=obj[iMinIndex].index;

					allMove(300,this,{'left':aPos[aPosIndex].left,'top':aPos[aPosIndex].top},'easeOut');
					allMove(300,obj[iMinIndex],{'left':aPos[index].left,'top':aPos[index].top},'easeOut');
					obj[iMinIndex].classList.remove('active');

					this.index=aPosIndex;
					obj[iMinIndex].index=index;
				}else{
					allMove(300,this,{'left':aPos[index].left,'top':aPos[index].top},'easeOut');
				}
			}catch(e){}

			endFn&&endFn(index,aPosIndex);
			iMinIndex=-1;
		});
	}
};



//常用框架-->
//匀速链式运动框架
function move(msec,obj,attr,dis,target,endFn){
	clearInterval(obj.move);
	var arr=[];
	var num=0;
	var onOff=false;
	var position=parseInt(getStyle(obj,attr.split('/').join('')));
		for(var i=target;i>0;i-=dis) {
			arr.push(i,-i);
		}
		arr.push(0);
		if(attr=='/left'||attr=='/top'){
			onOff=true;
		}else if(attr=='opacity'){
			var dis=getStyle(obj,attr)*100<target?dis:-dis;
		}else{
			var dis=parseInt(getStyle(obj,attr))<target?dis:-dis;
		}
	obj.move=setInterval(function (){
		if(onOff){
			attr=attr.split('/').join('');
		}else if(attr=='opacity'){
			var outcome=getStyle(obj,attr)*100+dis;
		}else{
			var outcome=parseInt(getStyle(obj,attr))+dis;
		}
		if(outcome>target&&dis>0||outcome<target&&dis<0)outcome=target;
		if(onOff){
			obj.style[attr]=position+arr[num]+'px';
			num++;
			}else if(attr=='opacity'){
			obj.style.opacity=outcome/100;
			obj.style.filter='alpha(opacity:'+outcome+')';
		}else{
			obj.style[attr]=outcome+'px';
		}
		if(outcome==target||num==arr.length){
			clearInterval(obj.move);
			endFn&&endFn.call(obj);
		}
	},msec);
};

//匀速同步运动框架
function manyMove(msec,obj,json,dis,endFn){
	clearInterval(obj.manyMove);
	obj.manyMove=setInterval(function (){
	var over=true;
		for(var attr in json){
			var target=json[attr];
			if(attr=='opacity'){
				var speed=getStyle(obj,attr)*100<target?dis:-dis;
				var outcome=getStyle(obj,attr)*100+speed;
			}else{
				var speed=parseInt(getStyle(obj,attr))<target?dis:-dis;
				var outcome=parseInt(getStyle(obj,attr))+speed;
			}
			if(outcome>target&&speed>0||outcome<target&&speed<0)outcome=target;
			if(attr=='opacity'){
				obj.style.opacity=outcome/100;
				obj.style.filter='alpha(opacity:'+outcome+')';
			}else{
				obj.style[attr]=outcome+'px';
			}
			if(outcome!=target)over=false;
		}
		if(over){
			clearInterval(obj.manyMove);
			endFn&&endFn.call(obj);
		}
	},msec);
};

//综合类型同步运动框架
function allMove(time,obj,json,type,endFn){
	clearInterval(obj.allMove);
	var Default={};
	var startTime=new Date().getTime();
	for(var attr in json){
	Default[attr]=0;
	Default[attr]=attr=='opacity'? Math.round(getStyle(obj,attr)*100)
								   :parseInt(getStyle(obj,attr));
	}
	obj.allMove=setInterval(function(){
		var changeTime=new Date().getTime()-startTime;
		var t=time-Math.max(0,time-changeTime);
		for(var attr in json){
			var value=moveType[type](t,Default[attr],json[attr]-Default[attr],time);
			if(attr=='opacity'){
				obj.style.opacity=value/100;
				obj.style.filter='alpha(opacity='+value+')';
			} else {
				obj.style[attr]=value+'px';
			}
		}
		if(t==time){
			clearInterval(obj.allMove);
			endFn&&endFn.call(obj);
		}
	},20)
};

var moveType={
	//t:运动消耗的时间 b:初始值 c:目标值 d:设定的总时间 return:返回是随运动变化的结果值
	'linear':function (t,b,c,d){  //匀速运动
		return c*(t/d)+b;
	},
	'easeIn':function(t,b,c,d){  //加速运动
		return c*(t/=d)*t+b;
	},
	'easeOut':function(t,b,c,d){  //减速运动
		return c*(t/=d)*(2-t)+b;
	},
	'easeBoth':function(t,b,c,d){  //加速减速运动
		return (t/=d/2)<1?c/2*t*t+b :c/2*((t-=1)*(2-t)+1)+b;
	},
	'easeInStrong':function(t,b,c,d){  //加加速运动
		return c*(t/=d)*t*t+b;
	},
	'easeOutStrong':function(t,b,c,d){  //减减速运动
		return c*(1-(t=1-t/d)*t*t)+b;
	},
	'easeBothStrong':function(t,b,c,d){  //加加速减减速运动
		return (t/=d/2)<1?c/2*t*t*t+b :c/2*((t-=2)*t*t+2)+b;
	},
	'elasticIn':function(t,b,c,d,a,p){  //弹性加速
		if (t==0) return b;
		if ((t/=d)==1) return b+c;
		if (!p) p=d*0.3;
		if (!a||a<Math.abs(c)) a=c;
		var s=!a||a<Math.abs(c)?p/4 :s=p/(2*Math.PI)*Math.asin(c/a);
		return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;
	},
	'elasticOut':function(t,b,c,d,a,p){  //加速弹性
		if (t==0) return b;
		if ((t/=d)==1) return b+c;
		if (!p)p=d*0.3;
		if (!a||a<Math.abs(c)) a=c;
		var s=!a||a<Math.abs(c)?p/4 :s=p/(2*Math.PI)*Math.asin(c/a);
		return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;
	},
	'elasticBoth':function(t,b,c,d,a,p){  //弹性加速弹性
		if(t==0) return b;
		if((t/=d/2)==2) return b+c;
		if (!p) p=d*(0.3*1.5);
		if (!a||a<Math.abs(c)) a=c;
		var s=!a||a<Math.abs(c)?p/4: s=p/(2*Math.PI)*Math.asin(c/a);
		return 	t<1? -0.5*(a*Math.pow(2,10*(t-=1))* Math.sin( (t*d-s)*(2*Math.PI)/p))+b :a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*0.5+c+b;
	},
	'backIn':function(t,b,c,d){  //回退加速
		var s=1.70158;
		return c*(t/=d)*t*((s+1)*t-s)+b;
	},
	'backOut':function(t,b,c,d){	  //加速回退
		var s=3.70158;
		return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
	},
	'backBoth':function(t,b,c,d){  //回退加速回退
		var s=1.70158;
		return	(t/=d/2)<1? c/2*(t*t*(((s*=(1.525))+1)*t-s))+b
							:c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s)+2)+b;
	},
	'bounceIn':function(t,b,c,d){  //弹球加速
		return c-moveType['bounceOut'](d-t, 0, c, d)+b;
	},
	'bounceOut':function(t,b,c,d){  //加速弹球
		if ((t/=d)<(1/2.75)) return c*(7.5625*t*t)+b;
		if (t<(2/2.75)) return c*(7.5625*(t-=(1.5/2.75))*t+0.75)+b;
		if (t<(2.5/2.75)) return c*(7.5625*(t-=(2.25/2.75))*t+0.9375)+b;
		return c*(7.5625*(t-=(2.625/2.75))*t+0.984375)+b;
	},
	'bounceBoth':function(t,b,c,d){  //弹球加速弹球
		return t<d/2? moveType['bounceIn'](t*2,0,c,d)*0.5+b
					   :moveType['bounceOut'](t*2-d,0,c,d)*0.5+c*0.5+b;
	}
};

//基于css()函数的运动框架
function tweenMove(time,obj,json,type,endFn){
	var fn=moveType[type];
	var t=0;
	var b={};
	var c={};
	var d=time/24;
	var attr='';
	clearInterval(obj.timer);
	for(attr in json){
		b[attr]=css(obj,attr);
		c[attr]=json[attr]-b[attr];
	}
	if(time<30){
		for(attr in json){
			css(obj,attr,json[attr]);
		}
	}else{
		obj.timer=setInterval(function(){
			if(t<d){
				t++;
				for(attr in json){
					css(obj,attr,fn(t,b[attr],c[attr],d));
				}
			}else{
				for(attr in json){
					css(obj,attr,json[attr]);
				}
				clearInterval(obj.timer);
				endFn&&endFn.call(obj);
			}
		},20);
	}
};

//设置css样式
function css(obj,attr,value){
	if(arguments.length==2){
		if(attr=='scale'|| attr=='rotate'|| attr=='rotateX'||attr=='rotateY'||attr=='scaleX'||attr=='scaleY'||attr=='translateY'||attr=='translateX'){
			if(!obj.$Transform)obj.$Transform={};
			switch(attr){
				case 'scale':
				case 'scaleX':
				case 'scaleY':
					return typeof(obj.$Transform[attr])=='number'?obj.$Transform[attr]:100;
					break;
				default:
					return obj.$Transform[attr]?obj.$Transform[attr]:0;
			}
		}
		var current=getStyle(obj,attr);
		return attr=='opacity'?Math.round(parseFloat(current)*100):parseInt(current);
	}else if(arguments.length==3){
		switch(attr){
			case 'scale':
			case 'scaleX':
			case 'scaleY':
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
			case 'translateZ':
			case 'translateX':
			case 'translateY':
				setCss3(obj,attr,value);
				break;
			case 'width':
			case 'height':
			case 'paddingLeft':
			case 'paddingTop':
			case 'paddingRight':
			case 'paddingBottom':
				value=Math.max(value,0);
			case 'left':
			case 'top':
			case 'marginLeft':
			case 'marginTop':
			case 'marginRight':
			case 'marginBottom':
				obj.style[attr]=typeof(value=='string')?value:value+'px';
				break;
			case 'opacity':
				obj.style.filter="alpha(opacity:"+value+")";
				obj.style.opacity=value/100;
				break;
			default:
				obj.style[attr]=value;
		}
	}
	return function(attr_in,value_in){css(obj,attr_in,value_in)};
};

//兼容css3样式
function setCss3(obj, attr, value){
	var str='';
	var val='';
	var arr=['Webkit','Moz','O','ms',''];
	if(!obj['$Transform']){
		obj['$Transform']={};
	}
	obj['$Transform'][attr]=parseInt(value);
	for(str in obj['$Transform']){
		switch(str){
			case 'scale':
			case 'scaleX':
			case 'scaleY':
				val+=str+'('+(obj['$Transform'][str]/100)+')';
				break;
			case 'rotate':
			case 'rotateX':
			case 'rotateY':
				val+=str+'('+(obj['$Transform'][str])+'deg)';
				break;
			case 'translateX':
			case 'translateY':
			case 'translateZ':
				val+=str+'('+(obj['$Transform'][str])+'px)';
				break;
		}
	}
	for(var i=0;i<arr.length;i++){
		obj.style[arr[i]+'Transform']=val;
	}
};



//项目常用插件-->
//绑定的方式阻止事件冒泡
function cBub(ev){
	var ev=ev||window.event;
	if(ev.stopPropagation)ev.stopPropagation();	//标准
	ev.cancelBubble=true;//ie
};

//绑定的方式阻止默认事件
function pDef(ev){
	var ev=ev||window.event;
	if(ev.preventDefault)ev.preventDefault();	//标准
	ev.returnValue=false;//ie
};

//兼容之前用到的fix函数
function fix(ev){
	pDef(ev);
};

//回到顶部插件
//obj（回到顶部按钮）
//showPos（按钮出现的位置，默认一屏幕）
function goTop(obj,showPos){
	var iH=document.documentElement.scrollHeight||document.body.scrollHeight;
	var iCH=document.documentElement.clientHeight;
	var oScrollTop=0;
	var onOff=false;

	document.onscroll=function(){
		oScrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		var oDisplay=getStyle(obj,'display');

		if(oScrollTop>(showPos||iCH)){
			if(oDisplay=='none'){
				obj.style.display='block';
				obj.style.opacity='0';
				obj.style.filter='alpha(opacity:0)';
				allMove(300,obj,{'opacity':100},'linear');
			}
		}else{
			if(oDisplay=='block'){
				if(onOff)return;
				onOff=true;
				obj.style.opacity='100';
				obj.style.filter='alpha(opacity:100)';
				allMove(300,obj,{'opacity':0},'linear',function(){
					obj.style.display='none';
					onOff=false;
				});
			}
		}
	};

	bind(obj,'click',fn);
	function fn(){
		document.documentElement.scrollTop=document.body.scrollTop=0;
	};
};

//提示框插件
//str（提示的字符串）
//msec（提示框消失的时间，默认3秒）
function alerts(str,msec){
	var oWrap=document.createElement('div');
	var msec=msec||3000;

	oWrap.style.cssText='min-width:1.4rem; max-width:100%; padding:0 .2rem; height:.4rem; line-height:.4rem; text-align:center; border-radius:.05rem; box-sizing:border-box; background-image: linear-gradient(to right,rgba(29,82,138,0.9),rgba(30,89,192,0.9)); color:#fff; font-size:.14rem; position:fixed; top:.5rem; left:50%; z-index:99999; transform:translate3d(-50%,0,0);-webkit-transform:translate3d(-50%,0,0); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; transition:opacity 3s ease-in 0s;-webkit-transition:opacity 3s ease-in 0s;opacity:1;';
	oWrap.innerHTML=str;
	oWrap.style.transitionDuration=(msec/1000/2)+'s';

	document.body.appendChild(oWrap);

	setTimeout(function(){
		oWrap.style.opacity=0;
	},msec/2);

	setTimeout(function(){
		document.body.removeChild(oWrap);
	},msec);
};

//提示框插件（成功和失败）
//str（提示的字符串）
//bool（true成功提示，false失败提示）
//msec（提示框消失的时间，默认3秒）
function toast(str,bool,msec){
	var oWrap=document.createElement('div');
	var oIcon=document.createElement('div');
	var oText=document.createElement('div');
	var msec=msec||3000;

	oWrap.style.cssText='box-sizing:border-box; width:2.6rem;padding:.2rem;text-align:center;background-color:#fff;border-radius:.05rem;box-shadow:0 .1rem .2rem rgba(0,0,0,0.2);position:fixed;left:50%;top:50%;z-index:99999;transform:translate3d(-50%,-50%,0);-webkit-transform:translate3d(-50%,-50%,0);transition:opacity 3s ease-in 0s;-webkit-transition:opacity 3s ease-in 0s;opacity:1;';
	oIcon.style.cssText='box-sizing:border-box; color:'+(bool?'#56a786':'#da596d')+';font-size:.4rem;';
	oText.style.cssText='box-sizing:border-box; padding-top:.2rem;line-height:.2rem;font-size:.14rem;';
	oText.innerHTML=str;

	oWrap.style.transitionDuration=(msec/1000/2)+'s';

	AddClass(oIcon,'iconfont');
	AddClass(oIcon,bool?'icon-Shape':'icon-Shapefuben');

	oWrap.appendChild(oIcon);
	oWrap.appendChild(oText);
	document.body.appendChild(oWrap);

	setTimeout(function(){
		oWrap.style.opacity=0;
	},msec/2);

	setTimeout(function(){
		document.body.removeChild(oWrap);
	},msec);
};

//提示框带多条件阻止
//优先级reg>type>if（校验类型只生效一个）
//arr[{if:'','reg':/^$/,type:'number','value':,'str':''}]
//if（提示触发的条件）
//reg（正则匹配）
//type（已定义类型正则匹配）
//value（正则验证的值）
//hint（提示的字符串）
//endFn（全部验证通过后才走的回调函数）
//errorFn（参数中返回错误条件的索引）
//msec（提示框消失的时间，默认3秒）
function alertss(arr,endFn,errorFn,msec){
	var onOff=true;
	var errorIndex=-1;
	var regJson={//所有type类型
        number:{
            name:'数字',
            reg:/^[0-9]+$/,
        },
        aa:{
            name:'小写字母',
            reg:/^[a-z]+$/,
        },
        AA:{
            nmae:'大写字母',
            reg:/^[A-Z]+$/,
        },
        aA:{
            name:'字母',
            reg:/^[a-zA-Z]+$/,
        },
        aa1:{
            name:'小写字母或数字',
            reg:/^[a-z0-9]+$/,
        },
        AA1:{
            name:'大写字母或数字',
            reg:/^[A-Z0-9]+$/,
        },
        aA1:{
            name:'字母和数字',
            reg:/^\w+$/,
        },
        zh:{
            name:'中文',
            reg:/^[\u2E80-\u9FFF]+$/,
        },
        zhEn:{
            name:'中文或英文',
            reg:/^[\u2E80-\u9FFFa-zA-Z]+$/,
        },
        mobile:{
            name:'手机号',
            reg:/^1[3-9]{1}\d{9}$/,
        },
        identity:{
            name:'身份证号码',
            reg:/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,
        },
        bankCard:{
            name:'银行卡号',
            reg:/^[0-9]{8,28}$/,
        },
        user:{
            name:'用户名',
            reg:/^[\w-]{3,16}$/,
        },
        password:{
            name:'密码',
            reg:/^[a-zA-Z0-9]{6,20}$/,
        },
        email:{
            name:'邮箱',
            reg:/^([\w\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        },
    };

	for(var i=0;i<arr.length;i++){
		if(arr[i].reg){
			if(!arr[i].reg.test(arr[i].value)){
				alerts(arr[i].hint,msec);
				onOff=false;
				errorIndex=i;
				break;
			}
		}else if(arr[i].type){
			if(regJson[arr[i].type]&&!regJson[arr[i].type].reg.test(arr[i].value)){
				alerts(arr[i].hint||'请输入有效的'+regJson[arr[i].type].name,msec);
				onOff=false;
				errorIndex=i;
				break;
			}
		}else if(arr[i].if){
			alerts(arr[i].hint,msec);
			onOff=false;
			errorIndex=i;
			break;
		}
	}

	errorFn&&errorFn(errorIndex);
	onOff&&endFn&&endFn();
};

//判断数组、json、字符串是否所有值都不为空
function allHaveValue(obj){
	var bool=true;

	if(Type(obj)=='array'){
		for(var i=0;i<obj.length;i++){
			if(!obj[i]||obj[i]==0){
				bool=false;
				break;
			}
		}
	}else if(Type(obj)=='object'){
		for(var attr in obj){
			if(!obj[attr]||obj[i]==0){
				bool=false;
				break;
			}
		}
	}else{
		if(!obj||obj==0){
			bool=false;
		}
	}
	return bool;
};

//导航栏滑动插件
//obj（要滑动的容器）
//styleClass（高亮选中样式的类名）
//moveType（滑动的运动形式）
//t（每次滑动到达目标的运动时间）
function slide(obj,styleClass,moveType,t){
	var oA=obj.children;
	var iW=oA[0].offsetWidth;

	obj.style.width=iW*oA.length+'px';
	for(var i=0;i<oA.length;i++){
		oA[i].style.width=iW+'px';
	}
	var iMin=-(obj.offsetWidth-document.documentElement.clientWidth);

	for(var i=0;i<oA.length;i++){
		if(oA[i].className==styleClass){
			var iNowLeft=-oA[i].offsetLeft;

			if(iNowLeft<iMin)iNowLeft=iMin;
			tweenMove(t,obj,{'translateX':iNowLeft},moveType);
		}
	}
	bind(obj,'touchstart',fn);
	function fn(ev){
		var ev=ev||window.event;
		var iLeft=ev.changedTouches[0].pageX-css(obj,'translateX');

		bind(obj,'touchmove',fn1);
		function fn1(ev){
			var ev=ev||window.event;
			var iDis=ev.changedTouches[0].pageX-iLeft;

			if(iDis>0)iDis=0;
			if(iDis<iMin)iDis=iMin;
			tweenMove(t,obj,{'translateX':iDis},moveType);
		};
	};
	bind(obj,'touchmove',fix);
};

//划屏惯性滚动插件（防隐藏元素）
//obj（要滑动的容器）
//msec（手指抬起时模拟惯性定时器的频率，不写默认为1000/60）
function slide1(obj,msec,n){
	var oA=obj.children;
	var iW=parseInt(getStyle(oA[0],'width'));
	var iLeft=0;
	var iL=0;
	var iT=0;
	var iDX=0;
	var iDX1=0;
	var iS=0;
	var iX=0;
	var iY=0;
	var iC=0;
	var timer=null;

	obj.style.width=iW*oA.length+'px';
	for(var i=0;i<oA.length;i++){
		oA[i].style.width=iW+'px';
	}
	var iMin=-(parseInt(getStyle(obj,'width'))-parseInt(getStyle(obj.parentNode,'width')) );

	bind(obj,'touchstart',fn);
	function fn(ev){
		var ev=ev||window.event;

		iLeft=ev.changedTouches[0].pageX-css(obj,'translateX');
		iL=ev.changedTouches[0].pageX;
		iT=ev.changedTouches[0].pageY;
		bind(obj,'touchmove',fix);
	};

	bind(obj,'touchmove',fn1);
	function fn1(ev){
		var ev=ev||window.event;

		iDX=ev.changedTouches[0].pageX-iLeft;
		iX=ev.changedTouches[0].pageX-iL;
		iY=ev.changedTouches[0].pageY-iT;
		iS=iDX-iDX1;
		iDX1=iDX;
		iC=Math.abs(iX)-Math.abs(iY);

		iC>0?fn3():unBind(obj,'touchmove',fix);
	};
	function fn3(){
		if(iDX>0){
			iDX=0;
			clearInterval(timer);
		}
		if(iDX<iMin){
			iDX=iMin;
			clearInterval(timer);
		}
		css(obj,'translateX',iDX);
	};

	bind(obj,'touchend',fn2);
	function fn2(){
		if(iC>0){
			iS=iS*(n||2);
			clearInterval(timer);
			timer=setInterval(function(){
				iDX+=iS;
				iS<0?iS++:iS--;
				fn3();
				if(Math.abs(iS)<1)clearInterval(timer);
			},msec||1000/60);
		}
	};
};

//手机划屏翻页插件
//obj(轮播图的父容器)，obj1（高亮的小点的父容器），styleClass（高亮小点的样式）
//t（划屏滚动时间）
function slide3(obj,obj1,styleClass,t){
	var oLi=obj.children;
	var aLi=obj1.children;
	var iW=oLi[0].offsetWidth;
	var iL=oLi.length;
	var iLeft=0;
	var iTop=0;
	var lDis=0;
	var tDis=0;
	var oTime=0;
	var iNow=0;
	var	index=0;
	var iOld=0;
	var str='';

	obj.style.width=iW*iL+'px';
	for(var i=0;i<iL;i++){
		oLi[i].style.width=iW+'px';
	}

	for(var i=0;i<iL;i++){
		str+='<li></li>';
	}
	obj1.innerHTML=str;
	var iW1=obj1.offsetWidth;
	obj1.style.marginLeft=-iW1/2+'px';
	aLi[0].classList.add(styleClass);

	bind(obj,'touchstart',fn2);
	function fn2(ev){
		var ev=ev||window.event;

		iLeft=ev.changedTouches[0].pageX;
		iTop=ev.changedTouches[0].pageY;
		oTime=Date.now();

		iOld=css(obj,'translateX');
		bind(obj,'touchmove',fix);
		bind(obj1,'touchmove',fix);
	};

	bind(obj,'touchmove',fn3);
	function fn3(ev){
		var ev=ev||window.event;
		lDis=ev.changedTouches[0].pageX-iLeft;
		tDis=ev.changedTouches[0].pageY-iTop;
		var condition=Math.abs(lDis)-Math.abs(tDis);

		if(condition<0){
			unBind(obj,'touchmove',fix);
			unBind(obj1,'touchmove',fix);
		}else{
			if(css(obj,'translateX')>=0&&lDis>0||css(obj,'translateX')<=-iW*(iL-1)&&lDis<0){
				lDis/=3;
			}
			css(obj,'translateX',iOld+lDis);
		}
	};

	bind(obj,'touchend',fn4);
	function fn4(){
		var tDis=Date.now()-oTime;

		if(Math.abs(lDis/iW)>0.3||tDis<300&&Math.abs(lDis)>30){
			lDis<0?iNow++:iNow--;
			fn();
			lDis=0;
		}

		tweenMove(t,obj,{'translateX':-iNow*iW},'linear',function(){
			iOld=css(obj,'translateX');
		});
		unBind(obj,'touchmove',fix);
		unBind(obj1,'touchmove',fix);
	};

	function fn(){
		if(iNow>iL-1){
			iNow=iL-1;
		}else if(iNow<0){
			iNow=0;
		}
		index=iNow;
		for(var	i=0;i<aLi.length;i++){
			aLi[i].classList.remove(styleClass);
		}
		aLi[index].classList.add(styleClass);
	};
};

//公告滚动插件
//obj(要滚动的父容器)
//moveType(运动形式)
//t(滚动间隔)
//t1(滚动一次的时间)
function autoNotice(obj,moveType,t,t1){
	var oLi=obj.children;
	var iL=oLi.length*2;
	var iH=oLi[0].offsetHeight;
	var iNow=0;

	obj.innerHTML+=obj.innerHTML;
	yydTimer(function(clear){
		iNow++;
		if(iNow>iL/2){
			iNow=1;
			css(obj,'translateY',0);
		}
		tweenMove(t1||1000,obj,{'translateY':-iNow*iH},moveType);
	},t||2000);
};

//横向公告滚动插件
//obj(要滚动的父容器)
//dis(每次运动的距离)
//msec(定时器频率)
function autoNotice1(obj,dis,msec){
	var oLi=obj.children;
	var iL=oLi.length*2;
	var iW=0;
	var iNow=0;

	obj.innerHTML+=obj.innerHTML;
	for(var i=0;i<obj.children.length;i++){
		iW=obj.children[i].offsetWidth*iL;
	}
	obj.style.width=iW+'px';

	yydTimer(function(clear){
		if(css(obj,'translateX')<=-iW/2){
			css(obj,'translateX',-14);
		}
		css(obj,'translateX',css(obj,'translateX')-(dis||1));
	},msec||1000/60);
};

//添加删除遮罩层
function mask(zIndex,onOff){
	if(!document.getElementById('yydMask')&&onOff){
		var oMask=document.createElement('div');
		oMask.id='yydMask';

		oMask.style.cssText='width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); position: fixed; top: 0; left: 0; z-index: 10;';
		oMask.style.zIndex=zIndex;
		document.body.appendChild(oMask);
	}

	if(document.getElementById('yydMask')&&!onOff){
		document.body.removeChild(document.getElementById('yydMask'));
	}
};

//创建一个loading样式
//mask(是否能看见遮罩)
//onOff(创建还是删除loading)
//scale(样式的大小比例)
//msec(旋转定时器的频率)
//zIndex(设置层级)
function loadingMask(mask,onOff,scale,msec,zIndex){
	if(!document.getElementById('yydLoading')&&onOff){
		var oUl=document.createElement('i');
		var oli=oUl.getElementsByTagName('i');
		var sLi='';
		var iNum=0;
		var timer=null;

		oUl.style.cssText='margin:auto; width:40px; height:40px; position: absolute; left:0; right:0; top:0; bottom:0;';
		oUl.id='yydLoading';
		oUl.style.transform='scale('+(scale||1)+','+(scale||1)+')';
		oUl.style.WebkitTransform='scale('+(scale||1)+','+(scale||1)+')';

		for(var i=0;i<12;i++){
			sLi+='<i></i>';
		}
		oUl.innerHTML=sLi;

		for(var i=0;i<12;i++){
			oli[i].style.cssText='list-style:none; width:4px; height:10px; background-color:rgba(255,255,255,0.5); position:absolute; left:20px; top:0; transform-origin:0 20px; -webkit-transform-origin:0 20px; border-radius:2px 2px 0 0;';
		}

		var oDiv=document.createElement('div');

		oDiv.style.cssText='width: 100%; height: 100%; background-color: rgba(0,0,0,0.6); position: fixed; top: 0; left: 0;';
		oDiv.id='yydMask1';
		oDiv.style.zIndex=zIndex||10;

		oDiv.appendChild(oUl);
		document.body.appendChild(oDiv);
		if(!mask){
			oDiv.style.backgroundColor='rgba(0,0,0,0)';
		}

		for(var i=0;i<12;i++){
			oli[i].style.transform='rotate('+i*30+'deg)';
			oli[i].style.WebkitTransform='rotate('+i*30+'deg)';
		}

		fn1();
		timer=setInterval(fn1,msec||100);

		function fn1(){
			iNum++;

			for(var i=0;i<12;i++){
				oli[i].style.backgroundColor='rgba(155,155,155,0.5)';
			}
			oli[iNum%12].style.backgroundColor='rgba(55,55,55,0.9)';
			oli[(iNum+1)%12].style.backgroundColor='rgba(55,55,55,0.8)';
			oli[(iNum+2)%12].style.backgroundColor='rgba(55,55,55,0.7)';
			oli[(iNum+3)%12].style.backgroundColor='rgba(55,55,55,0.6)';
			oli[(iNum+4)%12].style.backgroundColor='rgba(55,55,55,0.5)';
			oli[(iNum+5)%12].style.backgroundColor='rgba(55,55,55,0.4)';
		};
	}

	if(document.getElementById('yydLoading')&&!onOff){
		clearInterval(timer);
		document.body.removeChild(document.getElementById('yydMask1'));
	}
};

//验证码防止刷新插件(多个按钮)
/*new UnReload([
	{
		obj:oBt1,//按钮
		obj1:oInput,//填写手机号的输入框(里面做了判断手机号码)
		num:10,//设置倒计时总秒数
		str1:null,//按钮未点击时候的文字
		str2:null,//按钮点击之后的文字
		lNum:'yydNum1',//刷新时本地存储倒计时已走秒数的名称
		lTime:'yydTime1',//刷新时本地存储当时时间戳的名称
		endFn:function(){//回调函数，这个函数仅在可点击状态执行一次
			console.log(111);
		}
	},
	{
	}
]);*/
function UnReload(option){
	this.option=option;
	for(var i=0;i<option.length;i++){
		option[i].iNum=0;
		option[i].timer=null;
		this.Click(option[i]);
		this.exist(option[i]);
		this.Unload();
	}
};
UnReload.prototype={
	start:function(option){
		var This=this;
		clearInterval(option.obj.timer);
		option.obj.classList.add('active');
		option.obj.innerHTML=((option.num+1)||60)-option.iNum+(option.str2||'s后重新发送');

		option.obj.timer=setInterval(function(){
			option.iNum++;

			if(option.iNum>=((option.num+1)||60)){
				clearInterval(option.obj.timer);
				option.obj.classList.remove('active');
				option.obj.innerHTML=option.str1||'获取验证码';
				option.iNum=0;
			}else{
				option.obj.innerHTML=((option.num+1)||60)-option.iNum+(option.str2||'s后重新发送');
			}
		},1000);
	},
	Click:function(option){
		var This=this;

		option.obj.onclick=function(){
			if(option.iNum>0&&option.iNum<((option.num+1)||60))return;
			if(option.obj1){
				if(!option.obj1.value){
					alerts('请填写手机号！');
					return;
				}else{
					var reg=/^1(3|4|5|7|8){1}\d{9}$/;

					if(!reg.test(option.obj1.value)){
						alerts('手机号格式错误！');
						return;
					}
				}
			}
			if(document.getElementById('yydTXM')&&!document.getElementById('yydTXM').value){
				alerts('请输入图形验证码！');
				return;
			}
			option.endFn&&option.endFn.call(option.obj);
			option.iNum=1;
			This.start(option);
		};
	},
	exist:function(option){
		var yydNum=+(window.localStorage.getItem(option.lNum||'yydNum'));
		var yydTime=+(window.localStorage.getItem(option.lTime||'yydTime'));

		if(yydNum){
			var nTime=Math.round((+new Date()-yydTime)/1000);

			option.iNum=((+yydNum)+(+nTime));
			if(option.iNum>0&&option.iNum<=((option.num+1)||60)){
				this.start(option);
			}
		}
	},
	Unload:function(){
		var This=this;
		window.onunload=function(){
			for(var i=0;i<This.option.length;i++){
				window.localStorage.setItem(This.option[i].lNum||'yydNum',+This.option[i].iNum);
				window.localStorage.setItem(This.option[i].lTime||'yydTime',+new Date());
			}
		};
	}
};

//抛物线运动插件(公式：y=ax^2+bx^2+c)
//obj(要运动的对象)
//a(曲率，为正开口向下，负开口向上，默认0.001)
//t(抛物线运动的总时间)
//t1(定时器的频率)
//sLeft(运动开始的x轴位置)
//sTop(运动开始的y轴位置)
//eLeft(运动结束的x轴位置)
//eTop(运动结束的y轴位置)
//stepFn(运动过程中的回调函数)
//endFn(运动结束后的回调函数)
function fly(obj,a,t,t1,sLeft,sTop,eLeft,eTop,stepFn,endFn){
	var a=a||0.001;
	var sLeft=sLeft||0;
	var sTop=sTop||0;
	var eLeft=eLeft||200;
	var eTop=eTop||200;

	var timer=null;
	var	sT=+new Date();
	var t=t||500;
	var eT=sT+t;
	var x=eLeft-sLeft;
	var y=eTop-sTop;
	var b=(y-a*x*x)/x;

	obj.style.position='absolute';
	obj.style.opacity=0;
	obj.style.filter='alpha(opacity:0)';
	clearInterval(timer);
	timer=setInterval(function(){
		var nT=+new Date();

		obj.style.opacity=100;
		obj.style.filter='alpha(opacity:100)';
		if(nT>eT){//当前时间大于结束时间就停止运动
			clearInterval(timer);
			css(obj,'translateX',eLeft);
			css(obj,'translateY',eTop);
			endFn&&endFn.call(this);
		}else{
			var disX=x*(nT-sT)/t;
			var disY=a*disX*disX+b*disX;

			css(obj,'translateX',sLeft+disX);
			css(obj,'translateY',sTop+disY);
			stepFn&&stepFn.call(this,sLeft+disX,sTop+disY);
		}
	},t1||1000/60);
};

//自动裁剪图片插件
//option{
	//obj:obj,(要裁剪图片的input(type="file")文件)
	//sWidth(图片宽度超过这个宽度(默认640)就进行预压缩，压缩后的宽高基于此数值)
	//width:100,(要裁剪的宽度，不写默认图片原始尺寸，宽高小于等于1则按图片宽度比例)
	//height:100,(要裁剪的高度，不写默认图片原始尺寸，宽高小于等于1则按图片宽度比例)
	//position:'center',(裁剪开始的位置，'top','center'(默认)，'bottom','left','right')
	//type:'png',(裁剪后保存的图片类型，'png'(默认)，'jpg')
	//quality:1,(裁剪后的图片质量(数值)，1.0(默认)，要生效不能用png格式)
	//endFn:function(url,file){},(裁剪后返还函数，第一个是裁剪后的base64地址，第二个是文件的files[0]对象，包含图片信息)
//}
function autoClipImage(option){
	var json={'png':'image/png','jpg':'image/jpeg','gif':'image/gif','icon':'image/x-icon'};
	var iW=option.width;
	var iH=option.height;

	var obj=option.obj;
	var sWidth=option.sWidth||640;
	var width=option.width;
	var height=option.height;
	var position=option.position||'center';
	var type=option.type||'png';
	var quality=option.quality||1;
	var endFn=option.endFn||null;

	obj.onchange=function(){
		if(!this.files.length)return;//没选择文件则不执行
		var file=this.files[0];
		var reader=new FileReader();
		var onOff=false;

		reader.readAsDataURL(file);
		reader.onload=function(){
			for(var attr in json){
				if(file.type==json[attr]){
					onOff=true;
					break;
				}
			}
			if(!onOff){
				alerts('请上传图片文件！');
				resetFile(obj);
				console.log('文件类型为：'+file.type+'，不是正确的图片类型：'+JSON.stringify(json),file);
				return;
			}
			setImageURL(reader.result,file);
		};
	};

	function setImageURL(url,file){
		var image=new Image();
		var oWrap=document.createElement('div');
		var oC=document.createElement('canvas');

		image.src=url;
		image.style.cssText='width:auto!important;height:auto!important;max-width:none!important;min-width:none!important;max-height:none!important;min-height:none!important;opacity:0;filter:alpha(opacity:0)';
		oWrap.style.cssText='position:absolute;';
		oWrap.appendChild(image);
		document.body.appendChild(oWrap);

		image.onload=function(){
			var iWidth=parseFloat(getStyle(image,'width'));
			var iHeight=parseFloat(getStyle(image,'height'));

			if(iWidth>sWidth){//根据宽度限制进行预压缩
				var maxWidth=iWidth;
				var maxHeight=iHeight;

				iWidth=sWidth;
				iHeight=iHeight*sWidth/maxWidth;

				var oC1=document.createElement('canvas');

				oC1.width=iWidth;
				oC1.height=iHeight;
				oWrap.appendChild(oC1);

				var oGC1=oC1.getContext('2d');

				oGC1.drawImage(image,0,0,maxWidth,maxHeight,0,0,iWidth,iHeight);
				image.src=oC1.toDataURL(json[type]);
				image.onload=function(){
					clip();
				};
			}else{
				clip();
			}

			function clip(){//判断希望的图片尺寸进行压缩和裁剪
				if(width&&height){
					if(width<=1&&height<=1){
						width=iWidth*width;
						height=iWidth*height;
					}
					if(width>iWidth&&height<=width*iHeight/iWidth){
						image.style.width=width+'px';
						image.style.height='auto';
					}else if(height>iHeight&&width<=height*iWidth/iHeight){
						image.style.width='auto';
						image.style.height=height+'px';
					}
				}else if(width&&!height){
					if(width>iWidth){
						image.style.width=width+'px';
					}
					height=iHeight;
				}else if(!width&&height){
					if(height>iHeight){
						image.style.height=height+'px';
					}
					width=iWidth;
				}else{
					width=iWidth;
					height=iHeight;
				}

				var iWidth1=parseFloat(getStyle(image,'width'));
				var iHeight1=parseFloat(getStyle(image,'height'));

				oWrap.style.width=iWidth1+'px';
				oWrap.style.height=iHeight1+'px';

				oC.style.cssText='position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;z-index:10;';
				switch(position){
					case 'top':
								oC.style.left='50%';
								oC.style.marginLeft=-width/2+'px';
								oC.style.right='auto';
								oC.style.bottom='auto';
								break;
					case 'bottom':
								oC.style.left='50%';
								oC.style.marginLeft=-width/2+'px';
								oC.style.right='auto';
								oC.style.top='auto';
								break;
					case 'left':
								oC.style.top='50%';
								oC.style.marginTop=-height/2+'px';
								oC.style.right='auto';
								oC.style.bottom='auto';
								break;
					case 'right':
								oC.style.top='50%';
								oC.style.marginTop=-height/2+'px';
								oC.style.left='auto';
								oC.style.bottom='auto';
								break;
				}
				oC.width=width;
				oC.height=height;
				oWrap.appendChild(oC);

				var iLeft=oC.offsetLeft;
				var iTop=oC.offsetTop;
				oWrap&&document.body.removeChild(oWrap);

				var oGC=oC.getContext('2d');
				oGC.drawImage(image,iLeft*iWidth/iWidth1,iTop*iHeight/iHeight1,width*iWidth/iWidth1,height*iHeight/iHeight1,0,0,width,height);

				width=iW;
				height=iH;

				resetFile(obj);
				endFn&&endFn(oC.toDataURL(json[type],quality),file);
			};
		};
	};
};

//滑动选项卡效果
//obj(选项的一组元素)
//str(可以修改滑动条的样式，样式字符串)
//endFn(回调函数，返回选中的索引，用于切换内容)
function yydTabBar(obj,str,endFn){
	var oldIndex=0;
	var obj1=document.createElement('div');
	var barStyle='height: 3px; background-color: #f20532; position: absolute; left: 0; right: 100%; bottom: 0;';
	var forward='transition: right 0.3s cubic-bezier(0.61, 0.01, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s; -webkit-transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s;';
	var backward='transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1); -webkit-transition: right 0.3s cubic-bezier(0.35, 0, 0.25, 1) 0.09s, left 0.3s cubic-bezier(0.35, 0, 0.25, 1);';

	if(str)barStyle+=str;
	obj1.setAttribute('style',barStyle);
	obj[0].parentNode.appendChild(obj1);
	for(var i=0;i<obj.length;i++){
		obj[i].index=i;
	}
	for(var i=0;i<obj.length;i++){
		obj[i].onclick=function(){
			var iLeft=this.offsetLeft;
			var iRight=document.documentElement.clientWidth-(this.offsetLeft+this.offsetWidth);
			var index=this.index;

			function clear(){
				for(var i=0;i<obj.length;i++){
					obj[i].classList.remove('active');
				}
			};
			if(index!=oldIndex){
				oldIndex=index;
				clear();
				yydStyle.remove(obj1,forward);
				yydStyle.remove(obj1,backward);
				index>oldIndex?yydStyle.set(obj1,forward):yydStyle.set(obj1,backward);
				setTimeout(function(){
					obj1.style.left=iLeft+'px';
					obj1.style.right=iRight+'px';
				});
				setTimeout(function(){
					clear();
					obj[index].classList.add('active');
				},300);
				endFn&&endFn(index);
			}
		};
	}
};

/*引入百度地图插件<script src="https://api.map.baidu.com/api?v=2.0"></script>*/
//定位当前城市(需要引入jq)
function getLocation(endFn) {
	window.$.getScript("https://api.map.baidu.com/api?v=2.0", function(){
		var options={
			enableHighAccuracy:true,
			maximumAge:1000
		};

		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(function(position){
				//获取经纬度成功(mo浏览器上,调用百度地图接口，传入经纬度获取城市)
				var longitude=position.coords.longitude;//经度
				var latitude=position.coords.latitude;//纬度
				var map=new window.BMap.Map("allmap");
				var point=new window.BMap.Point(longitude,latitude);
				var gc=new window.BMap.Geocoder();

				gc.getLocation(point,function(rs){
					var addComp=rs.addressComponents;

					if(addComp.city.charAt(addComp.city.length-1)=='市'){
						addComp.city=addComp.city.replace('市','');
					}
					endFn&&endFn(addComp.city,longitude,latitude);
				});
			},function(error){//获取经纬度失败 (pc浏览器上，调用新浪接口获取城市)
				var url='http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';

				window.$.getScript(url,function(){
					if(window.remote_ip_info.ret=='1'){
						endFn&&endFn(window.remote_ip_info.city);
					}
				});
			},options);
		}else{
			alert('您的浏览器不支持地理位置定位');
		}
	});
};

//高德定位接口(需要引入jq)
//<script src="https://webapi.amap.com/maps?v=1.3&key=c14b6228b5ae543b1718ab6ebc4d19f5"></script>
function getLocation1(endFn) {
	window.$.getScript("https://webapi.amap.com/maps?v=1.3&key=c14b6228b5ae543b1718ab6ebc4d19f5", function(){
		function session(key,value){
			if(arguments.length==1){
			  return window.sessionStorage.getItem(key);
			}
			if(arguments.length==2){
			  window.sessionStorage.setItem(key,value);
			}
		};

		yydTimer(function(clear){
			var city=session('getLocationCity');
			var longitude=session('getLocationLongitude');
			var latitude=session('getLocationLatitude');
			var province=session('getLocationProvince');
			var detail=session('getLocationDetail');
			var condition=city&&longitude&&latitude&&province&&detail;

			if(condition){
				clear();
				endFn&&endFn(city,(+longitude),(+latitude),province,detail);
			}else{
				if(Type(window.AMap.Map)=='function'){
					clear();
					getMap();
				}
			}
		});

		function getMap(){
			var mapObj = new window.AMap.Map('container');

		    mapObj.plugin('AMap.Geolocation', function () {
		    	var geolocation = new window.AMap.Geolocation({
			        enableHighAccuracy: true,//是否使用高精度定位，默认:true
			        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
			        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
			        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
			        showButton: true,        //显示定位按钮，默认：true
			        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
			        buttonOffset: new window.AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
			        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
			        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
			        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
			        zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		    	});
				mapObj.addControl(geolocation);
				window.AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
				window.AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息

				function setSession(city,longitude,latitude,province,detail){
					session('getLocationCity',city);
					session('getLocationLongitude',longitude);
					session('getLocationLatitude',latitude);
					session('getLocationProvince',province);
					session('getLocationDetail',detail);
				};
				function onComplete(data){
					console.log(data);
					var city=data.addressComponent?data.addressComponent.city:'南昌市';
					var longitude=data.position.lng?data.position.lng:'115.89';
					var latitude=data.position.lat?data.position.lat:'28.68';
					var province=data.addressComponent?data.addressComponent.province:'江西省';
					var detail=data.formattedAddress?data.formattedAddress:'江西省南昌市卫东';

					setSession(city,longitude,latitude,province,detail);
					endFn&&endFn(city,longitude,latitude,province,detail);//http纬度为L，https纬度为M
				};
				function onError(data){
					console.log(data);
					setSession('南昌市',115.89,28.68,'江西省','江西省南昌市卫东');
					endFn&&endFn('南昌市',115.89,28.68,'江西省','江西省南昌市卫东');
				};
				//获取当前位置信息
				getCurrentPosition();
				function getCurrentPosition () {
					geolocation.getCurrentPosition();
				};
				//监控当前位置并获取当前位置信息
				function watchPosition () {
					geolocation.watchPosition();
				};
		    });
		};
    });
};

//生成高德地图多点标注地址
//arr示例[{longitude:'',latitude:'',name:''}]
function createGaodeMapUrl1(arr){
	var url='https://uri.amap.com/marker?callnative=1&markers=';
	var str='';

	for(var i=0;i<arr.length;i++){
		if(arr[i].longitude&&arr[i].latitude){
			str+=arr[i].longitude+','+arr[i].latitude+','+arr[i].name+'|';
		}
	}
	str=str.substring(0,str.length-1);
	return url+encodeURIComponent(str);
};

//生成高德地图搜索周边地址
//keyword(搜索关键字)
//longitude(中心点经度)
//latitude(中心点纬度)
//city(搜索城市)
function createGaodeMapUrl2(keyword,longitude,latitude,city){
	var url='https://uri.amap.com/search?';
	var str='callnative=1&keyword='+keyword+'&center='+longitude+','+latitude+'&city='+city;

	return url+str;
};

//生成高德地图导航地址
//start(起始点参数)
//end(终点参数)
function createGaodeMapUrl3(start,end){
	var url='https://m.amap.com/navigation/carmap/saddr=';
	var str=start.longitude+','+start.latitude+','+start.name+'&daddr='+end.longitude+','+end.latitude+','+end.name+'&callnative=1';

	return url+str;
};

//根据经纬度算大圆上两点间距离(假设地球为标准圆)
function getGreatCircleDistance(lng1,lat1,lng2,lat2){
	var EARTH_RADIUS = 6378137.0;    //地球半径单位M
	function getRad(d){
		return d*Math.PI/180.0;
	};

    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);
    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);

    var s = 2*Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2) + Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
    s = s*EARTH_RADIUS;
    s = Math.round(s*10000)/10000.0;

    return Math.round(s);
};

//根据经纬度算椭圆上两点间距离
function getFlatternDistance(lng1,lat1,lng2,lat2){
	var EARTH_RADIUS = 6378137.0;    //地球半径单位M
	function getRad(d){
		return d*Math.PI/180.0;
	};

    var f = getRad((lat1 + lat2)/2);
    var g = getRad((lat1 - lat2)/2);
    var l = getRad((lng1 - lng2)/2);

    var sg = Math.sin(g);
    var sl = Math.sin(l);
    var sf = Math.sin(f);

    var s,c,w,r,d,h1,h2;
    var a = EARTH_RADIUS;
    var fl = 1/298.257;

    sg = sg*sg;
    sl = sl*sl;
    sf = sf*sf;

    s = sg*(1-sl) + (1-sf)*sl;
    c = (1-sg)*(1-sl) + sf*sl;

    w = Math.atan(Math.sqrt(s/c));
    r = Math.sqrt(s*c)/w;
    d = 2*w*a;
    h1 = (3*r -1)/2/c;
    h2 = (3*r +1)/2/s;

    return Math.round(d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg)));
};

//新浪天气接口(需要引入jq)
function getWeather(city,endFn){
	var url='http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
	var str=city.charAt(city.length-1);

	switch(str){
		case '市':
			city=city.substring(0,city.length-1);
			break;
		case '区':
			city=city.substring(0,city.length-2);
			break;
	}
	window.$.getScript(url,function(){
		if(window.remote_ip_info.ret=='1'){
			window.$.ajax({
				url:'http://wthrcdn.etouch.cn/weather_mini?city='+city,
				type:'GET',
				data:'',
				success:function(data){
					var data1=JSON.parse(data);

					if(data1.status==1000){
						var data2=JSON.parse(data);

						data2=data2.data.forecast[0];
						data2.status=data1.status;
						console.log('获取'+city+'天气成功！');
						endFn&&endFn(data2);
					}else{
						console.log('获取'+city+'天气失败！');
					}
				}
			});
		}
	});
};



//不常用插件-->
//预加载插件
//arr(预加载的一组图片地址)
function preload(arr,endFn){
    var newimages=[];
    var iNum=0;

    function loadOver(){
        iNum++;
        if(iNum==arr.length){
            endFn&&endFn(newimages);
        }
    }
    for(var i=0;i<arr.length;i++){
        newimages[i]=new Image();
        newimages[i].crossOrigin='anonymous';
        newimages[i].src=arr[i];
        newimages[i].onload=function(){
            loadOver();
        }
        newimages[i].onerror=function(){
            loadOver();
        }
    }
};

//ajax
//ajax({//示例
//	url:'',
//	type:'post',
//	data:'',
//	closeToForm:false,
//	dataType:'json',
//	headers:{},
//	xhr:function(xhr){
//		console.log(xhr);
//	},
//	progress:function(ev){
//		console.log(ev);
//	},
//	success:function(data){
//		console.log(data);
//	},
//	error:function(data){
//		console.log(data);
//	},
//});
function ajax(json){
	var str='';

	json.type=json.type.toLowerCase()||'get';
	json.dataType=json.dataType.toLowerCase()||'json';

	if(!json.closeToForm&&json.data&&Type(json.data)=='object'){
		for(var attr in json.data){
			str+=attr+'='+json.data[attr]+'&';
		}
		json.data=str.substring(0,str.length-1);
	}

	var xhr=null;

	try{
		xhr=new XMLHttpRequest();
	}catch(e){
		xhr=new window.ActiveXObject('Microsoft.XMLHTTP');
	}

	if(json.xhr&&Type(json.xhr)=='function'){
		xhr=json.xhr(xhr);
	}

	if(xhr.upload&&json.progress&&Type(json.progress)=='function'){
		bind(xhr.upload,'progress',json.progress);
	}

	if(json.type=='get'&&json.data){
		json.url+='?'+json.data;
	}

	xhr.open(json.type,json.url,true);

	if(json.type=='get'){
		xhr.send();
	}else{
		if(!json.closeToForm)xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
		if(json.headers&&Type(json.headers)=='object'){
			for(var attr in json.headers){
				xhr.setRequestHeader(attr,json.headers[attr]);
			}
		}
		xhr.send(json.data);
	}

	json.before&&Type(json.before)=='function'&&json.before(xhr);
	xhr.onreadystatechange=function(){
		var data=null;

		if(xhr.readyState==4){
			if(xhr.status==200){
				try{
					switch(json.dataType){
						case 'text':
								data=xhr.responseText;
							break;
						case 'json':
								data=JSON.parse(xhr.responseText);
							break;
						case 'html':
								var oDiv=document.createElement('div');

								oDiv.setAttribute('dataType','html');
								oDiv.innerHTML=xhr.responseText;
								data=oDiv;
							break;
						case 'script':
								var oScript=document.createElement('script');

								oScript.setAttribute('dataType','script');
								oScript.innerHTML=xhr.responseText;
								document.body.appendChild(oScript);
								data=oScript;
							break;
					}

				}catch(e){
					console.log(e);
				}
				json.after&&Type(json.after)=='function'&&json.after(xhr,data);
				json.success&&Type(json.success)=='function'&&json.success(data);
			}else{
				json.error&&Type(json.error)=='function'&&json.error(xhr.status);
			}
		}
	};
};

//传入日期和当前日期的差
function countDtime(time){
	var reg=/\-+/g;
	var time=time.replace(reg,'/');
	var dTime=0;

	dTime=new Date(time)-new Date(dateFormat0(new Date(),'yyyy/MM/dd'));
	return dTime;
};



//react系列
//改变react内部state
function changeState(This,key,value){
	This.setState({
		[key]:[value],
	});
};

//react单选框
//reactRadio(this,'radioValue',ev)
function reactRadio(This,key,ev){
	let {checked,value}=ev.currentTarget;

	This.setState({
		[key]:checked?value:'',
	});
};

//react复选框
//普通：reactCheck(this,'checkArr',ev)
//全选：reactCheck(this,'checkArr',ev,'allCheck','checkPrefix',this.checkLength,true)
//选项控制全选:reactCheck(this,'checkArr',ev,'allCheck','allCheckValue',this.checkLength,false)
function reactCheck(This,key,ev,allCheck,prefix,checkLength,isAllCheck){
	let {checked,value}=ev.currentTarget;
	let checkArr=This.state[key];
	let allCheckValue='';

	if(isAllCheck){
		if(checked){
			for(let i=0;i<checkLength;i++){
				if(checkArr.indexOf(prefix+i)==-1)checkArr.push(prefix+i);
			}
		}else{
			checkArr=[];
		}
	}else{
		if(checked&&checkArr.indexOf(value)==-1){
			checkArr.push(value);
		}else{
			checkArr=checkArr.filter((item,index)=>item!=value);
		}
	}

	if(isAllCheck&&checked){
		allCheckValue=value;
	}else if(checkArr.length>=checkLength){
		allCheckValue=prefix;
	}
	This.setState({
		[allCheck]:allCheckValue,
		[key]:checkArr,
	});
};

//react下拉框
//单选：Type(key)=='string'
//多选：Type(key)=='array'
function reactSelect(This,key,ev){
	let {value,options}=ev.target;
	let optionArr=[];

	if(Type(This.state[key])=='array'){
		optionArr=Object.values(options)
		.filter((item,index)=>item.selected===true)
		.map((item1,index1)=>item1.value);
	}

	This.setState({
		[key]:Type(This.state[key])=='array'?optionArr:value,
	});
};



//金额格式化
function getDecimal(value){
	var oldValue=value;
	var value=+value;
	var arr=[];
	var length=length||2;
	var zero='';

	for(var i=0;i<length;i++){
		zero+='0';
	}

	if(Type(value)=='number'){
		value+='';
		value=value.split('.');
		value[0]=value[0].split('');
		value[1]=(value[1]||'')+zero;
		value[1]=value[1].substring(0,length);

		arr.unshift('.',value[1]);
		while(value[0].length>3){
			arr.unshift(',',value[0].splice(value[0].length-3,3).join(''));
		}

		arr=value[0].join('')+arr.join('');
	}else{
		arr=oldValue;
	}

	if(arr&&arr.length)arr=arr.replace('-,','-');
	return arr;
};

//红负绿正金额格式化
function colorPrice(value){
	var symbol=+value>0?'+':'';

	return symbol+getDecimal(value);
};

//用于限制金额的输入位数
function limitLength(value,length){
	var value=value;
    var arr=value+'';

    arr=arr.split('.');
    if(arr.length==length){
        arr[1]=arr[1].substring(0,length);
        value=arr.join('.');
    }
    return value;
};

//短日期格式化
function shortDate(value){
	return dateFormat0(value,'MM-dd hh:mm:ss');
};

//路由切换回到顶部防闪屏（用于单页应用）
function routerChange(){
	document.body.style.display='none';
    setTimeout(function(){
        document.body.style.display='block';
        document.documentElement.scrollTop=document.body.scrollTop=0;
    });
};

//科学运算（解决js处理浮点不正确的问题）
//num1（要进行运算的第一个数字）
//operator（运算符号,+,-,*,/）
//num2（要进行运算的第二个数字）
function computed(num1,operator,num2){
	var length1=(num1+'').split('.')[1];
	length1=length1?length1.length:0;
	var length2=(num2+'').split('.')[1];
	length2=length2?length2.length:0;

	var integer1=Math.pow(10,length1);
	var integer2=Math.pow(10,length2);
	var iMax=Math.max(integer1,integer2);
	var result='';

	switch(operator){
		case '+':
				num1=num1*iMax;
				num2=num2*iMax;
				result=(num1+num2)/iMax;
			break;
		case '-':
				num1=num1*iMax;
				num2=num2*iMax;
				result=(num1-num2)/iMax;
			break;
		case '*':
				num1=num1*integer1;
				num2=num2*integer2;
				result=(num1*num2)/integer1;
				result=result/integer2;
			break;
		case '/':
				num1=num1*integer1;
				num2=num2*integer2;
				result=(num1/num2)/integer1;
				result=result/integer2;
			break;
	}
	return result;
};
function changeTwoDecimal_f(x) {
		var f_x = parseFloat(x);
		if (isNaN(f_x)) {
			alert('function:changeTwoDecimal->parameter error');
			return false;
		}
		var f_x = Math.floor(x*100)/100;
		var s_x = f_x.toString();
		var pos_decimal = s_x.indexOf('.');
		if (pos_decimal < 0) {
			pos_decimal = s_x.length;
			s_x += '.';
		}
		while (s_x.length <= pos_decimal + 2) {
			s_x += '0';
		}
		return s_x;
}

//项目中用到的工具函数
export{
		reactRadio,//单选框
		reactCheck,//复选框
		reactSelect,//下拉框
		consoleNull,
		routerChange,
		toast,
		allHaveValue,
		computed,

		getDecimal,//格式化金额
		limitLength,
		colorPrice,
		shortDate,

		QSA,
		ajax,
		getStyle,
		prevSibling,
		nextSibling,
		firstChild,
		lastChild,
		bind,
		unBind,
		htmlFontSize,
		normalDate,
		dateFormat0,
		alerts,
		soleString32,
		autoEvent,
		customEvent,
		textHandle,
		loadingMask,
		Json,
		goTop,
		resetFile,
		alertss,
		brush,
		fly,
		isWeixin,
		cookie,
		lStore,
		sStore,
		inputType,
		strToJson,
		strToJson1,
		imgDrag,
		fix,
		preload,
		yydTimer,
		autoClipImage,
		toTwo,
		yydTabBar,
		Type,
		getLocation1,
		autoNotice1,
		networkHandle,
		setPromise,
		countDtime,
		createGaodeMapUrl1,
		createGaodeMapUrl2,
		createGaodeMapUrl3,
		getFlatternDistance,
		changeTwoDecimal_f,
		getPos,
		HasClass,
		manyDay,
		Scroll,
	};
