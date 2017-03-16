$(function () {
    //搜索
    $("#mySearch").keydown(function (event) {
        if(event.keyCode == 13){
            alert("您搜索的内容是："+$(this).val());
        }
    });
//导航
    var navData = {
        "品牌":["特步","安踏","贵人鸟","奥康","骆驼","耐克","阿迪达斯","达芙妮","阿迪达斯","达芙妮","阿迪达斯"],
        "男装":["耐克","阿迪达斯","达芙妮","奥康","骆驼","特步","安踏","贵人鸟","阿迪达斯","达芙妮"],
        "女装":["貂毛大衣","连衣裙","苹果","貂毛大衣","连衣裙","苹果","貂毛大衣","连衣裙","苹果"],
        "鞋包配饰":["珠宝","鳄鱼皮包","鳄鱼皮包","鳄鱼皮包","鳄鱼皮包","鳄鱼皮包","鳄鱼皮包"]
    };
    $(".nav-main li:not(:first)").mouseover(function(){
        var $brandKey = $(this).find("a").text();//获取选中的标签
        $(".title>i").text($brandKey);
        $(".menWear").html("");
        $.each(navData[$brandKey],function (i,val) {
            $(".menWear").append("<li><a href='javascript:;'>"+val+"</a></li><li>|</li>");//创建标签
        });
        $(".menWear>li:last-child").remove(); //删除最后一个竖线
        $(".boxNan").show().css("left",$(this).index()*52+30);
    });
    $(".boxNan").mouseover(function(){
        $(".boxNan").show();
    });
    $(".nav-main,#nav,.boxNan").mouseout(function(){
        $(".boxNan").hide();
    });
    //改变背景色
    var aData = ["#4a4a4a","#bc3bd8","#e4527c","#0abfcf","#fba90d","#b0d400"];
    $("#theme>li").click(function () {
        $(this).addClass("setY").siblings().removeClass("setY");
        $("#nav,.brandType-title>h3").css({background:aData[$(this).index()]});
    });
    //图片旋转
    $('.lunboBox').mouseover(function () {
        $(".active").addClass("transform").removeClass("transform1");
    }).mouseout(function () {
        $(".active").removeClass("transform").addClass("transform1");
    });
    
    //轮播图
    var $this = 0;
    $(".btn").click(function () {
        if($(this).index() != $this){
            $this = $(this).index()-1;
            doTime();
        }
    });
    function doTime(){
        $this == 4 ? $this = 0 : $this++;
        $(".btn").removeClass("setBtn").eq($this).addClass("setBtn");
        $(".carouse-ul>li").fadeOut(800).eq($this).fadeIn(500);
    }
    var timer = setInterval(doTime,2000);
    $(".carousel").mouseover(function(){
        clearInterval(timer);
    }).mouseout(function(){
        timer = setInterval(doTime,2000);
    });
    
    //文字向上无缝滚动
    var $actHuo = $(".actHuo");
    $actHuo.append($actHuo.html());
    function scroll(){
        $actHuo.css({marginTop:"-=5"});
        if($actHuo.css("marginTop") == "-105px"){
            $actHuo.css({marginTop:"0"});
        }
    }
    var link = setInterval(scroll,200);
    $(".actHuo-div li a").mouseover(function(){
        clearInterval(link);
    }).mouseout(function(){
        link = setInterval(scroll,200);
    });
    $actHuo.on("mouseover","li a",function(){
        $("#mouseInfo").show();
    });
    $actHuo.on("mousemove","li a",function(e){
        var divX = e.pageX+10;
        var divY = e.pageY+15;
        $("#mouseInfo").html($(this).html()).css({left:divX,top:divY});
    });
    $actHuo.on("mouseout","li a",function(){
        $("#mouseInfo").hide();
    });
    //Tab切换
    $(".set-type li").click(function () {
        var $index = $(this).index();//按钮获取索引值
        $(".brand-photo").stop().animate({marginLeft:-$index*792},100);
        $(this).addClass("photo-color").siblings().removeClass("photo-color");
    });
    //鼠标跟随
    var divX = 0;
    var divY = 0;
    $(".brands li").bind({
        mouseover:function(){
            $("#maxMouse").show()
        },
        mousemove:function(e){
            divX = e.pageX-$(this).offset().left-10;
            divY = e.pageY-$(this).offset().top+40;
            $("#maxMouse").css({left:divX,top:divY});
        },
        mouseout:function(e){
            $("#maxMouse").hide();
        }
    });
   
// function sColor()
// {
// $('.se').css("background",function(){
//  	return '#'+Math.floor(Math.random()*Math.pow(16,6)-1).toString(16);
//  })
// }
//  setInterval(sColor,200);
});




