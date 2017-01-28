
$(function(){
	$('.section').on('change', function(){
		$('.menu').toggleClass('menu-up').css('height', 'auto');
		// $().toggleClass('logoscale')

			$('.list').empty();
			var catagory = $(this).val();

			var url = 'https://api.nytimes.com/svc/topstories/v2/' + catagory + '.json';
			url += '?' + $.param({
			'api-key': '6689b79959214fb6b3222a74112dbce3'});
		
		$.getJSON(url)

	
		.done(function(data){
		var results = data.results.filter(function(item){
				return item.multimedia.length;
		}).splice(0,12);


		var $finalimage = $('.list')
		var show = '';

		$.each(results, function(data, value){
			console.log(value)
			var main = value.abstract;
			var img = value.multimedia[4].url;

			show += '<li class="li-article"><div id="wrapper"><p class="text">'
			show += main
			show += '</p></div>'
			show += '<img class ="li-image" src="' 
			show += img
			show += '"/></li>'
		})
		$finalimage.append(show);

		})
	})
});
