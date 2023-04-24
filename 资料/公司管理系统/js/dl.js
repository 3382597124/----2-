$(function () {
    $(".i2").on("click", function () {
        
         var ty = $(this).siblings(".sr2").prop("type");
        if(ty==="text"){
            $(this).siblings(".sr2").prop("type","password")
            $(".i2 img").attr("src","./images/byj.png")
        }
        else{
            $(this).siblings(".sr2").prop("type","text")
            $(".i2 img").attr("src","./images/zyj.png")
        }
        
    })
    $(".btn").on("click",function(){
        var tex1 = $(this).siblings(".sr1").val();
        var tex2 = $(this).siblings(".sr2").val();
        if(tex1===""||tex2===""){
            alert("请输入账号或密码")
        }
        else{
            $(".btn").prop("href","./index.html")
        }
    })
})