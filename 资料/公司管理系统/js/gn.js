$(function(){
    $("td").on("click","a",function(){
      var zf = $(this).text();
      console.log( $(this).text());
      if(zf=="作废 "){
        $(this).parents("tr").remove();
      }
    })
  })