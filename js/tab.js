;(function($) {
	$.fn.tab=function (config) {
		 /*默认配置*/
		var options={
			type:'click',
			interval:300,
		};
		/*覆盖默认配置*/
		if(config){
			$.extend(options,config);
		}
		options.$tab=$(this.get(0));
		options.$tabPanel=$(options.$tab.find('.tab-panel').get(0));
		options.$tabs=$(options.$tab.find('.tabs').get(0));
		new Tab(options);
	};
	
	
	function Tab(config){
		this.$tab=config.$tab;
		this.$tabPanel=config.$tabPanel;
		this.$tabs=config.$tabs;
		this.type=config.type;
		this.interval=config.interval;
		this.isfadeing = false;
		this.init();
	}
	
	
	Tab.prototype={
		init:function (){
			this.bind();
		},
		
		bind:function () {
			var that=this;
			this.$tabs.find('li>a').on(this.type,function (e) {
					if($(this).data('to')) {
			         	var index = $(this).data('to').slice(1) - 0
			         } else {
			         	return;
			         }
			         that.toggleTab(index,$(this));
			         e.returnValue = false || e.preventDefault();
			});
		},
		
		toggleTab:function (index,$target) {
			var that=this;
			    if(!that.isfadeing) {
						
						if(!$target.parent().hasClass('active')) {
							
							that.$tabs.children().removeClass('active');
						    $target.parent().addClass('active');
							that.isfadeing = true;
							var  $targetContetn=that.$tabPanel.find('.content').eq(index);
							var $current = $targetContetn.siblings('.show').hide(0).removeClass('show');
						
							$targetContetn.fadeIn(that.interval, function() {
								$targetContetn.addClass('show');
								that.isfadeing = false;
							});
						
						}
				}
		}
	};
})(jQuery);



