(function($){
	$.fn.customPaginate = function(options){
		var paginationConatainer = this;
		var itemsToPaginate;

		var defaults = {
			itemsPerPage : 2
		};

		var settings = {};
		$.extend(settings, defaults, options);

		var itemsPerPage = settings.itemsPerPage;

		itemsToPaginate = $(settings.itemsToPaginate);

		var numberOfPaginationLinks = Math.ceil((itemsToPaginate.length / itemsPerPage));

		$("<ul></ul>").prependTo(paginationConatainer);

		for(var index = 0; index < numberOfPaginationLinks; index++){
			paginationConatainer.find("ul").append("<li><a id='page-"+(index+1)+"' href='#!'>"+ (index+1) +"</a></li>");
		}

		itemsToPaginate.filter(":gt(" + (itemsPerPage - 1) + ")").hide();
		
		$("#page-1").addClass("active");

		paginationConatainer.find("ul li a").on('click', function(){

			if (!$(this).hasClass("active")) {
			    $("a.active").removeClass("active");
			    $(this).addClass("active");
			  }
			
			var linkNumber = $(this).text();

			var itemsToHide = itemsToPaginate.filter(":lt(" + ((linkNumber-1) * itemsPerPage) + ")");
			$.merge(itemsToHide, itemsToPaginate.filter(":gt(" + ((linkNumber * itemsPerPage) - 1) + ")"));
			itemsToHide.hide();

			var itemsToShow = itemsToPaginate.not(itemsToHide);
			itemsToShow.show();
		});
	}
}(jQuery));