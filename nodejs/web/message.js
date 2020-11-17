function ezzc(){
window.document.getElementById("msg").value = ""; 	
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
   document.getElementById("ezTime").innerHTML = timeReturn; 
} 





