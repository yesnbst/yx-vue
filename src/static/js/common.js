$(function(){
	$(".radio_item a").on("touchstart", function(){
		$(this).find(".radio").addClass("radio_select");
		$(this).parent().siblings().find(".radio").removeClass("radio_select");
	})
	$(".check_item a").on("touchstart", function(){
		if (!$(this).find("span.r").hasClass("checkbox_select")) {
			$(this).find("span.r").addClass("checkbox_select");
		} else {
			$(this).find("span.r").removeClass("checkbox_select");
		}
	})
})