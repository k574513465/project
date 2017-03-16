/**
 * Created by Administrator on 2016/12/8.
 */
$(function () {
    //价格同步
    $(".quantity select").change(function () {
        $(".money>i").text($(this).val()*200);
    });
    //获取服务器数据
    var $province = null;//省份
    var $city = null;//市
    var $county = null;//县/区
    var $provinceCity = null;//省份选中的值
    var $tData = null;//产品介绍
    var $s = null;//85px图
    var $big = null;//800px图
    var $small = null;//310px图
    var $c = null;//颜色属性
    function  ajaxData() {
        $.getJSON("../json/a.json",function(data){
                console.log(data);
                $tData = data.t;
                $province = data.p;
                $city = data.c;
                $county = data.a;
                $c = data.z;
                $s = data.s;
                $big = data.b;
                $small = data.d;
                $.each($province,function(i,val){
                    $("#province").append("<option value='"+val+"'>"+val+"</option>");
                });
            }
        );
    }
    ajaxData();
    $("#province").change(function(){
    	//省份下拉框改变时
        $provinceCity = $(this).val();
        $("#city,#county").hide();
        if($provinceCity != ""){
            $("#city").show().html("<option value=''>--请选择市--</option>");
        }
        $.each($city[$provinceCity],function(j,val){
                $("#city").append("<option value='"+val+"'>"+val+"</option>");
        })
    });
    $("#city").change(function(){
    	//市级下拉框改变时
        $("#county").show().html("<option value=''>--请选择区/县--</option>");
        if($(this).val() == ""){
            $("#county").hide()
        }
        var $province_city = $provinceCity+"-"+$(this).val();
//      console.log($county[$province_city]);
        $.each($county[$province_city],function(j,val){
            $("#county").append("<option value='"+val+"'>"+val+"</option>");
        })
    });

    //放大镜
        $(".big-photo").bind({
            mouseover:function(){
                $("#mouse,#maxPhoto").show()
            },
            mousemove:function(e){
                var mouseW = $("#mouse").width();
                var mouseH = $("#mouse").height();
                var x = e.pageX-$(this).offset().left-mouseW/2;
                var y = e.pageY-$(this).offset().top-mouseW/2;
                var w = $(this).width()-$("#mouse").width();
                var h = $(this).height()-$("#mouse").height();
                var $scale = $("#maxPhoto img").width()/$(this).width();
                x <= 0 ? x = 0 : x;
                y <= 0 ? y = 0 : y;
                x >= w ? x = w : x;
                y >= h ? y = h : y;
                $("#mouse").css({left:x,top:y});
                $("#maxPhoto>img").css({marginLeft:-$scale*x,marginTop:-$scale*y});
            },
            mouseout:function(){
                $("#mouse,#maxPhoto").hide()
            }
        });
    //评分
    var flag = false;
    $(".score>span").bind({
        "mouseover": function () {
            if (flag) {
                var $num = 5 - $(this).index();
                $(".score").css({"background-position-y": $num * 16});

            }
        },
        "click": function () {
            if (flag) {
                var $nums = $(this).index() + 1;
                $(".score").css({"background-position-y": -$nums * 16});
                alert("您给此商品的评分是：" + $nums + "分");
                flag = false;
            }
        }
    });
    //Tab切换
    $(".photo-type>ul>li").click(function(){
        $(this).addClass("productC").siblings().removeClass("productC");
        $(".productCon").text($tData[$(this).index()]);
    });
    //选中
    var $checkColor = $(".colour>ul>li>img:first").attr("src");
    $(".colour>ul>li").click(function () {
        $checkColor = $(this).find("img").attr("src");//获取选中图片路径】
        //console.log($checkColor);
        $(".little-photo").html("");
        $(".color>i").text($c[$(this).index()]);//改变颜色字体
        $(".big-photo>img").attr("src",$small[$checkColor][0]);//改变展示图片路径
        $("#maxImg>img,#maxPhoto>img").attr("src",$big[$checkColor][0]);//改变最大图片路径
        $(this).addClass("checked").siblings().removeClass("checked");//改变样式
        //console.log($s[$checkColor].length);
        $.each($s[$checkColor],function (i,val) {
            //console.log(i);
            //console.log(val);
            $(".little-photo").append("<li><img src='"+val+"' alt=''></li>"); //改变图路径
        });
    });
    $(".little-photo").on("click","li",function(){
        $(".big-photo>img").attr("src",$small[$checkColor][$(this).index()]);
        //console.log($(this).index());
        $("#maxImg>img,#maxPhoto>img").attr("src",$big[$checkColor][$(this).index()]);
    });
    $(".sizeMm>ul>li").click(function () {
        $(this).addClass("checked").siblings().removeClass("checked");
        $(".sizes>i").text($(this).text());
    });
    //遮盖层
    $("#client").height($(document).height());
    // $("#client,#maxImg").hide();
    $(".clear-photo").click(function(){
        $("#client,#maxImg").show();
    });
    $("#off").click(function(){
        $("#client,#maxImg").hide();
    });
    //加入购物车
    $(".shopping").click(function(){
        $(".info").text("您购买的产品是：免烫高支棉条纹衬衣；尺寸:"+$(".sizeMm .checked").text()+"；颜色："+$(".color i").text()+ "；数量："+$(".quantity>select").val()+ "；总价："+$(".money>i").text()+"元;收货地址:"+$("#province").val()+$("#city").val()+$("#county").val());
        $("#client,.addShopping").show();
        flag = true;
    });
    $(".no").click(function(){
        $("#client,.addShopping").hide();
    });
    //闪色
// function sColor()
// {
// $('.se').css("background",function(){
//  	return '#'+Math.floor(Math.random()*Math.pow(16,6)-1).toString(16);
//  })
// }
//  setInterval(sColor,100);
});