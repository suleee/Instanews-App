
$(function() {

	$('.section').on('change', function() {
		$('.menu').toggleClass('menu-up').css('height', 'auto');
		$('.logo').toggleClass('logo-scale');
			
		$('.loading').show();
		$('.list').empty();
		var catagory = $(this).val();

		var url = 'https://api.nytimes.com/svc/topstories/v2/' + catagory + '.json';
		url += '?' + $.param({'api-key': '6689b79959214fb6b3222a74112dbce3'});
		
		$.getJSON(url).done(function(data){
			var results = data.results.filter(function(item){
				return item.multimedia.length;
			}).splice(0,12);

			var $finalimage = $('.list');
			var article = '';

			$.each(results, function(data, value){
				console.log(value);
				var main = value.abstract;
				var img = value.multimedia[4].url;
				var link = value.url;

				article += '<li class="li-article">';
				article += 	'<a href =';
				article += 		link
				article += 	'></a><div></div>'
				article += 		'<div class="article-wrapper">';
				article += 			'<div class="text-wrapper">';
				article += 				'<p>';
				article += 					main;
				article += 				'</p>';
				article += 			'</div>';
				article +=				'<img class ="li-image" src="';
				article += 				img;
				article += 			'"alt="image"/>';
				article +=		'</div>';
				article += '</li>';
			});
			$finalimage.append(article);
		}).fail(function() {
			$('.message').append('Sorry there was a problem.');	
		}).always(function() {
			$('.loading').hide();
		});
	});
});