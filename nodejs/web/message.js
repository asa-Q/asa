var messages = 0;
var getMsgc = 0;
var curMsgc = 0;
var ezMsgs = "";
function showMsg(){
	var ezForm = document.getElementById("ezForm");
	ezForm.action ="/?msgC="+curMsgc;
	ezForm.submit();
}


  function GetRequest() {  
              var url = location.search;         
//	alert(url);
/*search 属性是一个可读可写的字符串，可设置或返回当前 URL 的查询部分（问号 ? 之后的部分）。*/  
  
              var theRequest=new Array();        //定义一个数组
  
              if (url.indexOf("?") != -1) {      
/*indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。-1代表不存在*/
 
                 var str = url.substr(1);       //截取出字符串
                 strs = str.split("&");         //分割成为数组
                 for(var i = 0; i < strs.length; i ++) {  
                     //将传递的参数组合key=>val 形式
                     theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);   
                 }   
             }   
             return theRequest;   
         }   


function ezzc(){
   ezMsgs = window.document.getElementById("ezTexts").value;
   messages =  ezMsgs.length; 
   var time = new Date(); 
     
   var hours = (time.getHours()).toString(); 
   if(hours.length < 2){ 
    hours = "0" + hours; 
   } 
   var minutes = (time.getMinutes()).toString(); 
   if(minutes.length < 2){ 
    minutes = "0" + minutes; 
   } 
   var seconds = (time.getSeconds()).toString(); 
   if(seconds.length < 2){ 
    seconds = "0" + seconds; 
   } 
   var timeReturn = hours + ":" + minutes + ":" + seconds; 
	var ezRequest =	GetRequest();
	getMsgc  = parseInt(ezRequest['msgC']);
	curMsgc = messages+getMsgc;
   document.getElementById("ezTime").innerHTML = timeReturn; 
   document.getElementById("ezMessages").innerHTML = curMsgc; 
} 





