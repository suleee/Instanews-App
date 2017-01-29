
$(function() {
	$('.loading').hide();
	$('.section').on('change', function() {
		$('.menu').toggleClass('menu-up').css('max-height', '200');
		$('.logo').toggleClass('logoscale');
		// $('.menu').toggleClass('menu-height');
			
		// $('.loading').show();
		$('.list').empty();
		var catagory = $(this).val();

		var url = 'https://api.nytimes.com/svc/topstories/v2/' + catagory + '.json';
		url += '?' + $.param({'api-key': '6689b79959214fb6b3222a74112dbce3'});
		
		$.getJSON(url).done(function(data){
			$('.loading').hide();
			var results = data.results.filter(function(item){
				return item.multimedia.length;
			}).splice(0,12);

			var $finalimage = $('.list');
			var show = '';

			$.each(results, function(data, value){
				console.log(value);
				var main = value.abstract;
				var img = value.multimedia[4].url;

				show += '<li class="li-article">';
				show += 	'<div class="article-wrapper">';
				show += 		'<div class="text-wrapper">';
				show += 			'<p>';
				show += 				main;
				show += 			'</p>';
				show += 		'</div>';
				show +=			'<img class ="li-image" src="';
				show += 			img;
				show += 		'"alt="image"/>';
				show +=		'</div>';
				show += '</li>';
			});
			$finalimage.append(show);
		}).fail(function() {
			$('.message').append('Sorry there was a problem.');	
		}).always(function() {
			$('.loading').show();
		});
	});
});