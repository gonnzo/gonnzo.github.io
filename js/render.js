
function getScript(source, callback) {
    var script = document.createElement('script');
    var prior = document.getElementsByTagName('script')[0];
    script.async = 1;
    prior.parentNode.insertBefore(script, prior);

    script.onload = script.onreadystatechange = function( _, isAbort ) {
        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
            script.onload = script.onreadystatechange = null;
            script = undefined;

            if(!isAbort) { if(callback) callback(); }
        }
    };

    script.src = source;
}

document.addEventListener("DOMContentLoaded", function(event) { 

	getScript("http://code.jquery.com/jquery-latest.min.js", function(){

		$.getScript("../js/functions.js", function(){

			myDataFile = window.location.pathname.split('/');
			myDataFile = "../"+myDataFile[myDataFile.length-2]+"/data.md";

			$.ajax({
	            url : myDataFile,
	            success : function ( mydata ) {

	            	$("<link/>", { rel: "stylesheet", type: "text/css", href: "https://fonts.googleapis.com/css?family=Maitree:400,200" }).appendTo("head");
	            	$("<link/>", { rel: "stylesheet", type: "text/css", href: "https://fonts.googleapis.com/css?family=Oswald:400,700,300" }).appendTo("head");
	            	$("<link/>", { rel: "stylesheet", type: "text/css", href: "../css/styles.css" }).appendTo("head");
	            	
	            	
	            	$('body').append('<div class="content">'+mmd(mydata)+'</div>');
	            
	            

					 
				}
	        });
		});
	});

});
