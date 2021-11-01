


(function($){
	$.fn.onPageFilter = function(opt){

		let defaults = {
			targets:null,
			bindings:null,
			auto: false,
			applyingElement: null
		};

		let options = $.extend(true, defaults, opt);
		if(options.targets == null) console.log("onPageFilter : Vous n'avez pas défini les elements cibles (targets)");
		if(options.bindings == null) console.log("onPageFilter : Vous n'avez défini pas les liens de filtrage []");
		if(!options.auto && options.applyingElement == null) console.log("onPageFilter : Vous n'avez pas l'élément pour l'application du filtre, l'option auto étant false");
		
		let $obj = $(this);

		let filterFields = [], $lines = $(options.targets);
		options.bindings.forEach(function(binding){
			filterFields.push($obj.find(binding[0]));
		});

		if(options.auto){
			filterFields.forEach(function($field){
				$field.on({
					keyup: function(){onPageFilter_Filter($obj)},
					change: function(){onPageFilter_Filter($obj)}
				});
			});
		}else{
			$obj.find(options.applyingElement).click(function(){
				onPageFilter_Filter($obj)
			})
		}

		function onPageFilter_Filter($obj){
			let regexList = [];
			filterFields.forEach(function($field, i){
				if($field.val().trim() != ""){
					regexList.push([new RegExp($field.val(), "i"), options.bindings[i][1], options.bindings[i][2]]);
				}
			});
			$lines.each(function(){
				let isRight = true, $line = $(this), regex; 
				for(let i = 0;i<regexList.length;i++){
					regex = regexList[i];
					if(
						(regex[2] == undefined && !regex[0].test($line.find(regex[1]).text())) || 
						(regex[2] != undefined && !regex[0].test($line.find(regex[1]).attr(regex[2])))
					){
						isRight = false;
						break;
					}
				};
				if(isRight) $line.show();
				else $line.hide();
			});
		}

		return this;
	}
})(jQuery);