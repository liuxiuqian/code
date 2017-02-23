$(function(){
   $('video').attr({width:$(this).width(),height:$(window).height()});
   $('.intro').css('height',$(window).height());
   $(window).resize(function(){
      $('video').attr({width:$(this).width(),height:$(this).height()});
      $('.intro').css('height',$(window).height());
      //$('video').height($(this).height()+'px');
   })
   
   
   
   $('.caidan').click(function(){
      $('.nav-header').fadeToggle('slow');
   })
   
   
   //鼠标经过轮播图的时候显示左右两边的控件
   $('.lunbo-one').hover(function(){
      $('.lunbo-right').css('opacity','0.8');
      $('.lunbo-left').css('opacity','0.8');
   },function(){
      $('.lunbo-right').css('opacity','');
      $('.lunbo-left').css('opacity','');     
   })
   
   
   //鼠标点击轮播图左右控件的时候进行切换
   var lunw = 0;
   var pl = 0;
   var pr = 0;
   var ull = 0;
   var lunLength = $(".lunbo-lun>li").length//定义轮播个数。
   $(".lunbo-oneb>ul").width(100*lunLength+"%");
   $(".lunbo-oneb>ul>li").width(100/lunLength+"%");
   //判断轮播个数如果等于1单独显示，大于1开启轮播。
    if(lunLength == 1){
   		$(".lunbo-left,.lunbo-right").css("display","none");
    }else{
   		pl = parseInt($('.lunbo-one').css('padding-left'));
	   	pr = parseInt($('.lunbo-one').css('padding-right'));
	   	bianr = (parseInt(-$('.lunbo-lun').width()))/2;
	   	$('.lunbo-right').click(function(){
	      ull =  parseInt($('.lunbo-lun').css('left'));
	      console.log(bianr)
	      if(ull<=bianr){         
	        $('.lunbo-lun').stop().animate({left:bianr-pr-30+'px'},500,function(){
	          $('.lunbo-lun').animate({left:bianr-pr+'px'},500);
	        });
	        return;
	      }
	      lunw += -($('.lunbo-one').width()+pr);
	      $('.lunbo-lun').stop().animate({left:lunw+'px'},1000);
	    })
	    $('.lunbo-left').click(function(){
	      ull =  parseInt($('.lunbo-lun').css('left'));
	      if(ull>=0){         
	        $('.lunbo-lun').stop().animate({left:'30px'},500,function(){
	          $('.lunbo-lun').animate({left:'0'},500);
	        });
	        return;
	      }
	      lunw += $('.lunbo-one').width()+pl;
	      $('.lunbo-lun').stop().animate({left:lunw+'px'},1000)
	    })
	  }
   
   //滚动条监听事件
   //工作经验滚动条距离
   var wh = $(window).height()/2;
   var skillt = $('.aa').eq(1).offset().top;
   var lunt = $('.aa').eq(2).offset().top;
   var projectt = $('.aa').eq(3).offset().top; 
   var lianxiwo = $('.aa').eq(4).offset().top;
   $(window).scroll(function(){
      var wt = $(this).scrollTop();
      $('.nav-scroll>li').siblings().removeClass('active');
      if(wt<=skillt){
         $('.nav-scroll>li').eq(0).addClass('active');
         $('.nav-header').css('display','');         
      }
      if(wt>skillt&&wt<lunt){
         $('.nav-scroll>li').eq(1).addClass('active'); 
         $('.nav-header').css('display','block');          
      }
      if(wt>=lunt&&wt<projectt){
         $('.nav-scroll>li').eq(2).addClass('active');        
      }
      if(wt>=projectt&&wt<lianxiwo-500){
         $('.nav-scroll>li').eq(3).addClass('active'); 
         $('.nav-header').css('display','block');  
      }
      if(wt>=lianxiwo-500){
         $('.nav-scroll>li').eq(4).addClass('active'); 
         $('.nav-header').css('display','block');  
      } 
   })
   $('.nav-scroll>li').each(function(i){
      $(this).click(function(){
      	var index = $(this).index();
      	if(index == 4){
      	 	$(window).scrollTop($('.lianxiwo').offset().top+300);
      	}else{
      	 	var at = $('.aa').eq(i).offset().top;
         	var int = setInterval(function(){
            var to = $(window).scrollTop();  
            var a = to>at?-3:3;
            to+=a;
            if(to>=at&&to<=at+2){
               clearInterval(int);
            }
            $(window).scrollTop(to);
	        },1);
      	}
         
      })
   })
   
  $(function(){
    /*obj:$('.box'),speed:200, welcome:'正在初始化...' */
    function Type(obj, speed, welcome){
//            需要注意的是这里用到了this来声明, 而不是var, 因为用var是用来定义私有方法的.
        this.obj = obj;
        this.speed = speed;
        this.welcome = welcome;
    }
//        用prototype属性来定义类的方法.
    Type.prototype = {
        init : function(){
            var str = this.obj.html();
            this.obj.html(this.welcome);
            this.add(str);
        },
        add : function(con){
            var me = this;
            var str;
            var strlen = 0;
            var t = setInterval(function(){
                str = con.substring(0, strlen);
                me.obj.html(str);
                //内容打印完毕清除
                if(strlen == con.length){
                    clearInterval(t);
                    
                }
                strlen = strlen +1;
            }, me.speed);
        }
    }
    var a = new Type($('.box'), 100, '正在初始化...');
    a.init();
	}); 
   
})
