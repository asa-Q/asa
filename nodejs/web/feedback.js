 var websocket = new WebSocket("ws://39.107.238.138:8887");
                
                function showMessage(str,type){
                        alert(str);
                        var div = document.createElement('div');
                        if('enter' == type){
                                div.style.color = 'blue';
                        }else if ('leave' == type){
                                div.style.color = 'red';
                        }
                        div.innerHTML = str;
                        document.body.appendChild(div);
                }
                
        websocket.onopen = function(){
            console.log('websocket open');
                                document.getElementById('sendBtn').onclick = function(){
                                var txt = document.getElementById('sendTxt').value;
                                if(txt){
                                        websocket.send(txt);
                                }
                        }
        }

        websocket.onclose = function(){
            console.log('websocket close');
        }

        websocket.onmessage = function(event){
            console.log(event.data);
            var mes = JSON.parse(event.data);
            showMessage(mes.msg,mes.type);
        }



