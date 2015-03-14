/*******Start of Tabbing*/
(function( $ ) {
	$.fn.tabs = function( options ) {	
		var opts = $.extend({},$.fn.tabs.defaults,options);
			return this.each(function() {			
				var elem = $( this ),
				Lis = elem.children('ul').children(),
				activeTab = Lis.eq(opts.active);
				opts.disabled?Lis.eq(opts.disabled).addClass('disable'):'';
				jQuery.data(elem,"tab",{
					id:elem.attr('id'),
					prevAct:activeTab.addClass('active')
				});
				$('#'+activeTab.attr('bind')).show();
				$.each(Lis,function(){
					if(!$(this).hasClass('disable')){
						$($(this)).on(opts.openEvent,function(){
							var actualElm = jQuery.data(elem,"tab");
							$('#'+actualElm.id+' .tabCont').hide();
							$('#'+$(this).attr('bind')).fadeIn();
							actualElm.prevAct.removeClass('active');
							opts.onClick?opts.onClick($(this),actualElm.prevAct):'';
							actualElm.prevAct = $(this).addClass('active');
						});	
					}
				});		
			});		 		
	};	
	// Plugin defaults – added as a property on our plugin function.
	$.fn.tabs.defaults = {
		active:0,
		disabled:false,
		onClick : false,
		openEvent: "click",
		heightStyle:'auto'
	};
})( jQuery );
/*******End of Tabbing*/