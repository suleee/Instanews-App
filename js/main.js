
$(function(){

	$('.section').on('change', function(){
		var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
		url += '?' + $.param({
		'api-key': "6689b79959214fb6b3222a74112dbce3"
		});
		
		
		$.getJSON(url)
		.done(function(data){
			console.log(data);
			$.each(data.results,function(key, value){
				$('.content').append('<p>'+value.title+'</p><img src ="'+value.multimedia.url+'">');
			})
		
		})




	})
});


