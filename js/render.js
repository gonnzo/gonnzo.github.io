
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

	getScript("https://code.jquery.com/jquery-latest.min.js", function(){

		href = window.location.href

		if(href.match(/8888/)==null){
			url_base = 	"/";
		}else{
			count = (href.match(/\//g) || []).length;
			url_base = count==4?"./":"../".repeat(count-4); 
		}

		



		$.getScript(url_base+"js/customized-mmd.js", function(){

			//myDataFile = window.location.pathname.split('/');
			myDataFile = "data.md";

			$.ajax({
	            url : myDataFile,
	            success : function ( mydata ) {

	            	$("<link/>", { rel: "stylesheet", type: "text/css", href: "https://fonts.googleapis.com/css?family=Maitree:400,200" }).appendTo("head");
	            	$("<link/>", { rel: "stylesheet", type: "text/css", href: "https://fonts.googleapis.com/css?family=Oswald:400,700,300" }).appendTo("head");
	            	$("<link/>", { rel: "stylesheet", type: "text/css", href: url_base+"css/styles.css" }).appendTo("head");
	            	

	            	logo = "<div class='logo'><a href='"+url_base+"'><img src='"+url_base+"img/logo.png' /></a></div>"
	            	menu = "";
	            	menu2 = "";

	            	

	            	$.getJSON( url_base+"structure.json?r="+Math.random(), function( data ) {

						$.each( data.pages, function( key, val ) {
							if(menu!='') menu += "";
					  		menu += "<a href='"+url_base+val.url+"'>" +  val.title +"</a>";

					  		// CARGA LOS SUBMENUS
					  		console.log(href +" " + val.url + " " + href.indexOf(val.url))
					  		if(href.indexOf(val.url) > -1)
						  		$.each( val.pages, function( key2, val2 ) {
									menu2 
									+= "<a href='"+url_base+val2.url+"'><div class='brick'><span style='font-family: oswald; font-size:30pt'>" 
									+  val2.title 
									+ "</span><img src='"+ url_base +  val2.image +"' /></a>" 
									+ ""+val2.introduction+""
									+"</div>";

							  	});

					  	});

					  	menu = "<div class='menu'>"+ menu + "</div>";


					 
					  	
					


		            	console.log(menu)
		            	markdownData = mmd(mydata);
		            	title = markdownData.match(/<h1>(.*)<\/h1>/g);
		            	title = title[0].replace("<h1>","").replace("</h1>","");
		            	document.title = title;
		            	$('body').append('<div class="content">'+logo+menu+markdownData+menu2+'</div>');

	            	});
	            

					 
				}
	        });
		});
	});

});
