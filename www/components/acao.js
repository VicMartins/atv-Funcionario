// This is a JavaScript file

$(document).on('click',"#buscar",function(){
    $(location).attr("href","buscarFuncionario.html");
});

$(document).on('click','#calcular',function(){
    var parametros ={
     "entrada":$("#entrada").val(),
     "saida":$("#saida").val()
    };
 });