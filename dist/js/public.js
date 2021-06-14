"use strict";let int,last_millisecond,second=0,millisecond=0,beginTime=new Date,speed=1,last_second=0,plan=0,stopTime=0,stop_minutes=0,stop_seconds=0,stop_milliseconds=0,current=0,front=0,size=0,video_play=!1,game_level=0,fault_tolerant=!0;const EMPTY_FUNCTION=function(){};let log=EMPTY_FUNCTION,error=EMPTY_FUNCTION,time=EMPTY_FUNCTION,timeLog=EMPTY_FUNCTION,timeEnd=EMPTY_FUNCTION,clear=EMPTY_FUNCTION;function reset(){window.clearInterval(int),millisecond=second=0,document.getElementById("RTime").innerText="0.00",document.getElementById("EstTime").innerText="*",document.getElementById("3BV").innerText="*/*",document.getElementById("3BV/s").innerText="*",document.getElementById("Ces").innerText="0@0",document.getElementById("Flags").innerText="0",document.getElementById("STNB").innerText="*",document.getElementById("QG").innerText="*",document.getElementById("Ops").innerText="*/*",document.getElementById("Isls").innerText="*",document.getElementById("Left").innerText="0@0",document.getElementById("Right").innerText="0@0",document.getElementById("Double").innerText="0@0",document.getElementById("Cl").innerText="0@0",document.getElementById("IOE").innerText="*",document.getElementById("Thrp").innerText="*",document.getElementById("Corr").innerText="*",document.getElementById("Path").innerText="0",document.getElementById("RQP").innerText="*"}function start(){beginTime=new Date,window.clearInterval(int),int=setInterval(timer,10),log("start:"+beginTime.getMinutes()+"."+beginTime.getSeconds()+"."+beginTime.getMilliseconds())}function timer(){const e=new Date;let n=e.getMinutes(),t=e.getSeconds(),i=e.getMilliseconds();i<beginTime.getMilliseconds()&&(i+=1e3,t--),t<beginTime.getSeconds()&&(t+=60,n--),n<beginTime.getMinutes()&&(n+=60),second=60*(n-beginTime.getMinutes())+(t-beginTime.getSeconds()),millisecond=parseInt((i-beginTime.getMilliseconds())/10),second<999?(change_top_count("time_count",second+1),document.getElementById("RTime").innerText=(second+millisecond/100).toFixed(2),document.getElementById("Ces").innerText=ces_count+"@"+(ces_count/(second+millisecond/100)).toFixed(2),document.getElementById("Left").innerText=left_count+"@"+(left_count/(second+millisecond/100)).toFixed(2),document.getElementById("Right").innerText=right_count+"@"+(right_count/(second+millisecond/100)).toFixed(2),document.getElementById("Double").innerText=double_count+"@"+(double_count/(second+millisecond/100)).toFixed(2),document.getElementById("Cl").innerText=left_count+right_count+double_count+"@"+((left_count+right_count+double_count)/(second+millisecond/100)).toFixed(2)):second>999&&(stop(),lose(),change_top_count("time_count",999),document.getElementById("RTime").innerText="999.99")}function adjustLayout(){const e=$("#border"),n=$("#video_control"),t=$("#video-iframe",parent.document),i=$("#video-stage",parent.document),o=e.outerWidth(),c=n.outerWidth();t.css("width",(o>c?o:c+8)+"px"),t.css("height",e.outerHeight()+n.outerHeight()+6+"px");const l=hasScrollbar(parent.window,parent.document)?getScrollbarWidth():0;let d=(parent.window.innerHeight-l-t.outerHeight())/2,s=(parent.window.innerWidth-l-t.outerWidth())/2;t.css("margin-top",parent.window.scrollY+(d>0?d:0)+"px"),t.css("margin-left",parent.window.scrollX+(s>0?s:0)+"px");const r=Math.max(window.parent.document.body.clientWidth,t.outerWidth()+parseInt(t.css("marginLeft"))),m=Math.max(window.parent.document.body.clientHeight,t.outerHeight()+parseInt(t.css("marginTop")));i.css("width",r+"px"),i.css("height",m+"px")}function start_avf(e){if(timeEnd("录像准备"),log(e),0===e)return!1;const n=$("#mark_span");if(n.html(e[0].player),n.attr("title",n.html()),gameover=!0,size=e[0].size,!document.getElementById("mouse_point")){const n=document.createElement("div");n.id="mouse_point",document.getElementById("container").appendChild(n);const t=document.createElement("img");t.src="image/mouse.png";const i=document.getElementById("mouse_point");i.appendChild(t),i.style.display="block",i.style.marginLeft=e[0].x+"px",i.style.marginTop=e[0].y+"px"}document.getElementById("video_control").style.display="block",game_level=e[0].level,adjustLayout(),log("start:"+(new Date).getMinutes()+"."+(new Date).getSeconds()+"."+(new Date).getMilliseconds()),window.clearInterval(int),int=setInterval(timer_avf,0),beginTime=0,last_second=0,last_millisecond=0,plan=0,stopTime=0,stop_minutes=0,stop_seconds=0,stop_milliseconds=0,current=0,front=0,video_play=!0,fault_tolerant=!0}function pause_avf(){!1!==gameover&&(0!==beginTime?(video_play=!1,window.clearInterval(int),beginTime=0,last_millisecond=millisecond,last_second=second):document.getElementById("mouse_point")&&plan<size&&(video_play=!0,window.clearInterval(int),int=setInterval(timer_avf,0)))}function restart_avf(){if(clear(),time("录像准备"),0===video)return!1;!0===gameover&&0===beginTime&&plan<video[0].size?(video_play=!0,window.clearInterval(int),int=setInterval(timer_avf,0),log(plan)):container.replay_video()}function change_speed(){const e=$("#range_speed"),n=e.val(),t=n+"% 100%";!0===video_play&&pause_avf(),speed=(n<=50?n/50:n<=75?.16*(n-50)+1:.2*(n-75)+5).toFixed(2),$("#speed_value").html(speed+"x"),e.css({"background-size":t}),!1===video_play&&pause_avf()}function reset_speed(){!0===video_play&&pause_avf(),speed=1,$("#speed_value").html("1.00x");const e=$("#range_speed");e.val(50),e.css({"background-size":"50% 100%"}),!1===video_play&&pause_avf()}function change_rate_value(){const e=$("#range_rate"),n=e.val(),t=n/10+"% 100%";!0===video_play&&pause_avf(),0!==video&&$("#rate_value").html((n/1e3*video[0].realtime).toFixed(2)),e.css({"background-size":t})}function change_rate(){const e=$("#rate_value").text();1e3*last_second+10*last_millisecond<1e3*e?(last_second=parseInt(e),last_millisecond=100*e%100,pause_avf()):(container.replay_video(),pause_avf(),last_second=parseInt(e),last_millisecond=100*e%100,pause_avf())}function timer_avf(){for($("#video-iframe",parent.document).is(":animated")&&window.clearInterval(int),0===beginTime&&(beginTime=new Date),stopTime=new Date,stop_minutes=stopTime.getMinutes(),stop_seconds=stopTime.getSeconds(),stop_milliseconds=stopTime.getMilliseconds(),stop_milliseconds<beginTime.getMilliseconds()&&(stop_milliseconds+=1e3,stop_seconds--),stop_seconds<beginTime.getSeconds()&&(stop_seconds+=60,stop_minutes--),stop_minutes<beginTime.getMinutes()&&(stop_minutes+=60),second=speed*(60*(stop_minutes-beginTime.getMinutes())+(stop_seconds-beginTime.getSeconds()))+last_second,millisecond=speed*parseInt((stop_milliseconds-beginTime.getMilliseconds())/10)+last_millisecond,1e3*second+10*millisecond>1e3*video[0].realtime&&(fault_tolerant?(second=video[size-1].sec,millisecond=video[size-1].hun,fault_tolerant=!1,log("录像实际时间: "+second+"."+millisecond)):videoError(i18n.errQuitUnexpectedly));plan<size&&1e3*second+10*millisecond>=1e3*video[plan].sec+10*video[plan].hun;)document.getElementById("mouse_point").style.marginLeft=video[plan].x+"px",document.getElementById("mouse_point").style.marginTop=video[plan].y+"px",video[plan].rows>container.columns||video[plan].columns>container.rows?(0!==current&&current.change_around_normal(),"lc"===video[plan].mouse?(leftClick=!0,!0===rightClick&&(left_invalid=!0)):"rc"===video[plan].mouse?(rightClick=!0,!0===leftClick?left_invalid=!0:right_invalid=!0):"lr"===video[plan].mouse?(leftClick=!1,!0===rightClick&&!0===right_invalid&&(right_invalid=!1),left_invalid=!1,leftClickWithShift=!1):"rr"===video[plan].mouse?(rightClick=!1,right_invalid=!1,leftClickWithShift=!1):"mc"===video[plan].mouse?middle_invalid=!0:"mr"===video[plan].mouse?(middle_invalid=!1,leftClickWithShift=!1):"sc"===video[plan].mouse?leftClickWithShift=!0:"mt"===video[plan].mouse&&toggleQuestionMode(),plan++):(front=current,current=container.childObject[(video[plan].columns-1)*container.columns+(video[plan].rows-1)],front!==current&&(0!==front&&(!0===rightClick&&!0===leftClick||!0===middle_invalid||!0===leftClickWithShift?front.change_around_normal():!1===front.isOpen&&!1===rightClick&&!0===leftClick&&"opening"===front.getStyle()&&!1===left_invalid&&front.changeStyle("block")),!0===rightClick&&!0===leftClick||!0===middle_invalid||!0===leftClickWithShift?current.change_around_opening():!1===current.isOpen&&!1===rightClick&&!0===leftClick&&"block"===current.getStyle()&&!1===left_invalid&&current.changeStyle("opening")),"mv"===video[plan].mouse||("lc"===video[plan].mouse?(leftClick=!0,current.change_around_normal(),change_top_image("face","face_click"),!0===rightClick?(left_invalid=!0,current.change_around_opening()):"block"===current.getStyle()&&0!==plan&&current.changeStyle("opening")):"rc"===video[plan].mouse?(rightClick=!0,current.change_around_normal(),change_top_image("face","face_click"),!0===leftClick?(left_invalid=!0,current.change_around_opening()):(right_count++,"openedBlockBomb"===current.getStyle()?!1===question?(ces_count++,current.changeStyle("block"),change_top_count("mine_count",container.minenumber=container.minenumber+1)):(ces_count++,current.changeStyle("question"),change_top_count("mine_count",container.minenumber=container.minenumber+1)):"block"===current.getStyle()?(ces_count++,current.changeStyle("openedBlockBomb"),change_top_count("mine_count",container.minenumber=container.minenumber-1)):"question"===current.getStyle()?(ces_count++,current.changeStyle("block")):right_invalid=!0)):"lr"===video[plan].mouse?(leftClick=!1,change_top_image("face","face_normal"),leftClickWithShift?(current.change_around_normal(),double_count++):!0===rightClick?(current.change_around_normal(),double_count++,!0===right_invalid&&(right_count--,right_invalid=!1)):!1===left_invalid&&left_count++,!1===current.isOpen&&!1===rightClick&&!1===leftClickWithShift?("opening"===current.getStyle()||"question"===current.getStyle()||"block"===current.getStyle()&&!left_invalid||1===plan||2===plan)&&current.open():(!0===rightClick||!0===leftClickWithShift)&&!0===current.isOpen&&current.bombNumAround>0&&current.openaround(),left_invalid=!1,leftClickWithShift=!1):"rr"===video[plan].mouse?(rightClick=!1,change_top_image("face","face_normal"),!0===leftClick&&(double_count++,!0===right_invalid&&right_count--,current.change_around_normal(),!0===current.isOpen&&current.bombNumAround>0&&current.openaround()),right_invalid=!1,leftClickWithShift=!1):"mc"===video[plan].mouse?(middle_invalid=!0,current.change_around_opening()):"mr"===video[plan].mouse?(middle_invalid=!1,double_count++,current.change_around_normal(),!0===current.isOpen&&current.bombNumAround>0&&current.openaround(),leftClickWithShift=!1):"sc"===video[plan].mouse?leftClickWithShift=!0:"mt"===video[plan].mouse&&toggleQuestionMode()),plan++);document.getElementById("rate_value").innerText=(second+millisecond/100).toFixed(2),document.getElementById("range_rate").value=1e3*((second+millisecond/100)/video[0].realtime).toFixed(2),document.getElementById("range_rate").style="background-size: "+100*((second+millisecond/100)/video[0].realtime).toFixed(2)+"% 100%;",change_top_count("time_count",parseInt(second)+1),document.getElementById("RTime").innerText=(second+millisecond/100).toFixed(2),counters_3BV(),document.getElementById("Ces").innerText=ces_count+"@"+(ces_count/(second+millisecond/100)).toFixed(2),document.getElementById("Right").innerText=right_count+"@"+(right_count/(second+millisecond/100)).toFixed(2),document.getElementById("Left").innerText=left_count+"@"+(left_count/(second+millisecond/100)).toFixed(2),document.getElementById("Flags").innerText=container.bombNumber-container.minenumber,document.getElementById("Double").innerText=double_count+"@"+(double_count/(second+millisecond/100)).toFixed(2),document.getElementById("Cl").innerText=left_count+right_count+double_count+"@"+((left_count+right_count+double_count)/(second+millisecond/100)).toFixed(2),second>video[size-1].sec+2&&(log(second+"."+speed+"."+second/speed),log("录像播放错误"),stop())}function stop(){window.clearInterval(int);const e=new Date;log("stop:"+e.getMinutes()+"."+e.getSeconds()+"."+e.getMilliseconds());let n=e.getMinutes(),t=e.getSeconds(),i=e.getMilliseconds();i<beginTime.getMilliseconds()&&(i+=1e3,t--),t<beginTime.getSeconds()&&(t+=60,n--),n<beginTime.getMinutes()&&(n+=60),log("运行时间:"+(60*(n-beginTime.getMinutes())+(t-beginTime.getSeconds())+(i-beginTime.getMilliseconds())/1e3).toFixed(2))}function change_top_image(e,n){document.getElementById(e).getElementsByTagName("img")[0].src="image/"+n+".bmp"}function change_control_image(e,n){document.getElementById("video_control").getElementsByTagName("img")[e].src="image/"+n+".bmp"}function change_top_sunglasses(){const e=document.getElementById("face").getElementsByTagName("img")[0].src.split("/");"face_sunglasses.bmp"!==e[e.length-1]&&(document.getElementById("face").getElementsByTagName("img")[0].src="image/face_normal.bmp")}function change_top_count(e,n){const t=parseInt(Math.abs(n)/100)%10,i=parseInt(Math.abs(n)/10)%10,o=Math.abs(n)%10,c=document.getElementById(e).getElementsByTagName("img");n<-10?(c[0].src="image/number_minus.bmp",c[1].src="image/number_"+i+".bmp",c[2].src="image/number_"+o+".bmp"):n<0?(c[0].src="image/number_minus.bmp",c[1].src="image/number_0.bmp",c[2].src="image/number_"+o+".bmp"):n<10?(c[0].src="image/number_0.bmp",c[1].src="image/number_0.bmp",c[2].src="image/number_"+o+".bmp"):n<100?(c[0].src="image/number_0.bmp",c[1].src="image/number_"+i+".bmp",c[2].src="image/number_"+o+".bmp"):n<1e3&&(c[0].src="image/number_"+t+".bmp",c[1].src="image/number_"+i+".bmp",c[2].src="image/number_"+o+".bmp")}function counters_3BV(){let e=0,n=0,t=0,i=0,o=0;const c=[];c.push("up"),c.push("right"),c.push("down"),c.push("left"),c.push("leftUp"),c.push("rightUp"),c.push("leftDown"),c.push("rightDown");for(let n=0;n<container.columns*container.rows;n++)0===container.childObject[n].bombNumAround&&container.childObject[n].is_bv&&(e++,counters_Ops(container.childObject[n],c),container.childObject[n].is_bv=!0);for(let e=0;e<container.columns*container.rows;e++)!container.childObject[e].isBomb&&container.childObject[e].is_bv&&(n++,container.childObject[e].isOpen&&(t++,0===container.childObject[e].bombNumAround&&i++));for(let e=0;e<container.columns*container.rows;e++)container.childObject[e].bombNumAround>0&&container.childObject[e].is_bv&&(o++,countersIslands(container.childObject[e],c));document.getElementById("3BV").innerText=t+"/"+n,document.getElementById("Ops").innerText=i+"/"+e,document.getElementById("Isls").innerText=o,0!==t&&(document.getElementById("EstTime").innerText=(n/(100*t/(100*second+millisecond))).toFixed(2),document.getElementById("3BV/s").innerText=(100*t/(100*second+millisecond)).toFixed(2),document.getElementById("RQP").innerText=((second+millisecond/100)*(second+millisecond/100+1)/t).toFixed(3),10===container.bombNumber?document.getElementById("STNB").innerText=(47.299/(Math.pow(second+millisecond/100,1.7)/t)).toFixed(3):40===container.bombNumber?document.getElementById("STNB").innerText=(153.73/(Math.pow(second+millisecond/100,1.7)/t)).toFixed(3):99===container.bombNumber&&(document.getElementById("STNB").innerText=(435.001/(Math.pow(second+millisecond/100,1.7)/t)).toFixed(3)),plan>0&&(document.getElementById("Path").innerText=Math.round(video[plan-1].path)),document.getElementById("QG").innerText=(Math.pow(second+millisecond/100,1.7)/t).toFixed(3),document.getElementById("Thrp").innerText=(t/ces_count).toFixed(3),document.getElementById("Corr").innerText=(ces_count/(left_count+right_count+double_count)).toFixed(3),document.getElementById("IOE").innerText=(t/(left_count+right_count+double_count)).toFixed(3));for(let e=0;e<container.columns*container.rows;e++)container.childObject[e].is_bv=!0}function counters_Ops(e,n){e.is_bv=!1;for(let t=0;t<n.length;t++){const i=e.neighbors[n[t]];null!=i&&void 0!==i&&!i.isBomb&&i.is_bv&&(0===i.bombNumAround?counters_Ops(i,n):i.bombNumAround>0&&(i.is_bv=!1))}}function countersIslands(e,n){e.is_bv=!1;for(let t=0;t<n.length;t++){const i=e.neighbors[n[t]];null!=i&&void 0!==i&&i.bombNumAround>0&&i.is_bv&&countersIslands(i,n)}}function write_counters(){counters_3BV(),change_top_count("time_count",parseInt(second)+1),document.getElementById("RTime").innerText=(second+millisecond/100).toFixed(2),document.getElementById("Flags").innerText=container.bombNumber-container.minenumber,document.getElementById("Ces").innerText=ces_count+"@"+(ces_count/(second+millisecond/100)).toFixed(2),document.getElementById("Left").innerText=left_count+"@"+(left_count/(second+millisecond/100)).toFixed(2),document.getElementById("Right").innerText=right_count+"@"+(right_count/(second+millisecond/100)).toFixed(2),document.getElementById("Double").innerText=double_count+"@"+(double_count/(second+millisecond/100)).toFixed(2),document.getElementById("Cl").innerText=left_count+right_count+double_count+"@"+((left_count+right_count+double_count)/(second+millisecond/100)).toFixed(2),document.getElementById("Path").innerText=path}function question_marks(){"标记问号"===document.getElementById("question").innerHTML?(document.getElementById("question").innerHTML="取消问号",question=!0):"取消问号"===document.getElementById("question").innerHTML&&(document.getElementById("question").innerHTML="标记问号",question=!1)}function isIE(){return window.ActiveXObject||"ActiveXObject"in window}function hasScrollbar(e,n){return e=e||this.window,(n=n||this.document).body.scrollHeight>(e.innerHeight||n.documentElement.clientHeight)}function getScrollbarWidth(){const e=document.createElement("div");e.style.cssText="visibility: hidden;overflow: scroll;",document.body.appendChild(e);const n=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),n}"localhost"!==location.hostname&&"hgraceb.github.io"!==location.hostname||(log=function(...e){console.log(...e)},error=function(...e){console.error(...e)},time=function(e){console.time(e)},timeLog=function(e,...n){console.timeLog(e,...n)},timeEnd=function(e){console.timeEnd(e)},clear=function(){console.clear()}),function(e,n,t){t=t||window;let i=!1;t.addEventListener("resize",(function(){i||(i=!0,requestAnimationFrame((function(){t.dispatchEvent(new CustomEvent("parentResize")),i=!1})))}))}(0,0,parent.window);