
$(function(){

	$('.section').on('change', function(){
		var url = "https://api.nytimes.com/svc/topstories/v2/home.json";
		url += '?' + $.param({
		'api-key': "6689b79959214fb6b3222a74112dbce3"
		});
		
		
		$.getJSON(url)
		.done(function(data){
			console.log('hello world');

			// for (var i = 0; i < 12; i++) {
			// 	console.log(data.results[i].multimedia[0].url);
				// if 
				// else//(if there is no photo skip it)
			// }

			$.each(data.results,function(key, value){
				$('.content').append('<p>'+value.title+'</p><img src ="'+value.multimedia[3].url+'">');
				console.log(value);
		})
		
		})




	})
});


