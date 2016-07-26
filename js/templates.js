



$( document ).ready(function() {

	$.getScript("http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.js", function(){
		$.getScript("../js/functions.js", function(){

			myDataFile = window.location.pathname.split('/');
			myDataFile = "../"+myDataFile[myDataFile.length-2]+"/data.txt";

			$.ajax({
	            url : myDataFile,
	            success : function ( mydata ) {

	            	regexp = /"content".*:.*"([\s\S]*)"/gi;
	            	

	            	mydata = mydata.replace(regexp,nl2br(mydata.match(regexp)));
	            	
	            	
	            	mydata = JSON.parse(clearString(mydata))
	            	console.log(mydata);

	            	console.log(mydata.title);
	        
					$.get('../js/content.htm', function(template) {

						document.title = mydata.title

						$.tmpl(template, mydata).appendTo('body');
					});


					 
				}
	        });
		});
	});

});
