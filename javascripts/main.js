

      // Test browser support
      window.SpeechRecognition = window.SpeechRecognition       ||
                                 window.webkitSpeechRecognition ||
                                 null;



		//caso não suporte esta API DE VOZ                              
		if (window.SpeechRecognition === null) {
	        document.getElementById('ws-unsupported').classList.remove('hidden');
	        document.querySelector('#gravar i').setAttribute('style','box-shadow: inset 0 0 20px 100px red;color:#000;');
	    }else {
	    	var recognizer = new window.SpeechRecognition();
	    	var transcription = document.getElementById("transcription");

        	//Para o reconhecedor de voz, não parar de ouvir, mesmo que tenha pausas no usuario
        	recognizer.continuous = true;

        	recognizer.onresult = function(event){
        		transcription.textContent = "";
        		for (var i = event.resultIndex; i < event.results.length; i++) {
        			if(event.results[i].isFinal){
        				transcription.textContent = event.results[i][0].transcript+' (Taxa de acerto [0/1] : ' + event.results[i][0].confidence + ')';
        			}else{
		            	transcription.textContent += event.results[i][0].transcript;
        			}
        		}
        	}

        	document.querySelector("#gravar i").addEventListener("click",function(){
        		try {
		            recognizer.start();
					document.getElementById("status").getElementsByTagName("span")[0].className = "gravando";
					document.getElementById("status").getElementsByTagName("span")[0].innerHTML = "gravando";
		          } catch(ex) {
		          	alert("error: "+ex.message);
		          }
        	})
	    }
