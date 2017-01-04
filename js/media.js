;(function($,window){
	
	$.fn.media=function (config) {
	    /*默认配置*/
		var options={
			auto:true,
			interval:5000
		};
		/*覆盖默认配置*/
		if(config){
			$.extend(options,config);
		}
		
		options.$media=$(this.get(0));
		options.$subcarousel=$(options.$media.find('.sub-carousel').get(0));
		options.$prevControl=$(options.$media.find('.carousel-control[data-slide="prev"]').get(0));
		options.$nextControl=$(options.$media.find('.carousel-control[data-slide="next"]').get(0));
		new Media(options);
	}
	/*定义media对象*/
	function Media(config) {
		  this.$media=config.$media;
		  this.$subcarousel=config.$subcarousel;
		  this.$prevControl=config.$prevControl;
		  this.$nextControl=config.$nextControl;
		  this.auto=config.auto;
		  this.interval=config.interval
		  this.timer=null;
		  this.initial();
	}
	
	Media.prototype={
		initial:function () {
			this.forbidPlay();
			this.bind();
			if(this.auto){
				this.autoPlay();
			}
			
		},
		
		/*禁止原有的自动播放*/
		forbidPlay:function () {
			
			 this.$media.find('.carousel').each(function (){
			 	    $('#'+this.id).carousel({
		   	             interval:false
		             });
			 });
		},
		 /*绑定事件*/
		bind:function  () {
			var that=this;
			/* 主控制器与文本控制器关联*/
			that.$prevControl.click(function () {
				   that.$subcarousel.carousel('prev');
			});
			that.$nextControl.click(function () {
				   that.$subcarousel.carousel('next');
			});
			
		  
			
		},
		
		/*自定义 定时器实现捆绑的自动轮播*/
	
			play:function (){
				var that=this;
				that.timer=window.setTimeout(function () {
					   that.$nextControl.click();
					   that.play();
				},that.interval);
			},
	 			
	        autoPlay:function () {
	        	var that=this;
	        	that.$media.mouseover(function () {
			   		clearTimeout(that.timer);
			    });
				that.$media.mouseout(function () {
					that.play();
				});
				this.play();
	        	
	        }
	}
	
	
})(jQuery,window);
