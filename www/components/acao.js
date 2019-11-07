// This is a JavaScript file

$(document).on('click',"#cadProprietario",function(){
    $(location).attr("href","cadProprietario.html");
});
$(document).on('click',"#cadVeiculo",function(){
    $(location).attr("href","cadveiculo.html");
});
$(document).on('click',"#buscarVeiculo",function(){
    $(location).attr("href","buscarVeiculo.html");
});

$(document).on('click','#cadveiculo',function(){
  let data = new Date();
  let codUsuario;
    var parametrosUser = {
      "nmUsuario":$("#nomeProp").val(),
      "placaveiculo":$("#placaveiculo").val(),
      "modeloveiculo":$("#modeloveiculo").val(),
      "tipoveiculo":$("#tipoveiculo").val(),
      "marcaveiculo":$("#marcaveiculo").val()
    }

     $.ajax({
        type:"post",//como vou enviar os dados ao servidor
        url:"https://gerenciadordeestacionamento.000webhostapp.com/cadUsuario.php",//para onde vou enviar
        data:parametrosUser,// o que eu vou enviar
        //caso dê certo esse código é executado
        success: function(data){
            navigator.notification.alert(data);
            $("#nomeprop").val("");
            $("#tipoveiculo").val("");
            $("#placaveiculo").val("");
            $("#marcaveiculo").val("");
            $("#modeloveiculo").val("");
            $("#horaentrada").val("");
        },
        //caso dê erro esse código é executado
        error: function(data){
            navigator.notification.alert("Erro ao cadastrar! " + data.log);
        }
    });
  });

$(document).on('keyup','#placaveiculo',function(){
    var parametros ={
     "placa":$("#placaveiculo").val()
    };    
    $.ajax({
        type:"post",//como vou enviar os dados ao servidor
        url:"https://gerenciadordeestacionamento.000webhostapp.com/buscar.php",
        //para onde vou enviar
        dataType:"json",
        data:parametros,// o que eu vou enviar
        //caso dê certo esse código é executado
        success: function(data){
         $.each(data.veiculo, function(i,dados){
            $("#nomeProp").val(dados.nome);
            $("#marcaveiculo").val(dados.marca);
            $("#modeloveiculo").val(dados.modelo);
            $("#tipoveiculo").val(dados.tipo);
            $("#cdVeiculo").val(dados.cdVeiculo);
         });
        },
        //caso dê erro esse código é executado
        error: function(data){
            navigator.notification.alert("Erro ao cadastrar! " + data.log);
        }
    });
  });

  $(document).on('click','#cadentrada',function(){
    var parametrosEntrada = {
      "hr_entrada":$("#horaentrada").val(),
      "cd_veiculo":$("#cdVeiculo").val()
    }

     $.ajax({
        type:"post",//como vou enviar os dados ao servidor
        url:"https://gerenciadordeestacionamento.000webhostapp.com/cadentrada.php",//para onde vou enviar
        data:parametrosEntrada,// o que eu vou enviar
        //caso dê certo esse código é executado
        success: function(data){
            navigator.notification.alert(data);
            $("#nomeProp").val("");
            $("#marcaveiculo").val("");
            $("#modeloveiculo").val("");
            $("#tipoveiculo").val("");
            $("#cdVeiculo").val("");
            $("#placaveiculo").val("");
        },
        //caso dê erro esse código é executado
        error: function(data){
            navigator.notification.alert("Erro ao cadastrar! " + data.log);
        }
    });
  });

  $(document).on('keyup','#placabusca',function(){
    var parametrosBusca ={
     "placa":$("#placabusca").val()
    };    
    $.ajax({
        type:"post",//como vou enviar os dados ao servidor
        url:"https://gerenciadordeestacionamento.000webhostapp.com/buscarVeiculos.php",
        //para onde vou enviar
        dataType:"json",
        data:parametrosBusca,// o que eu vou enviar
        //caso dê certo esse código é executado
        success: function(dataR){
         $.each(dataR.veiculo, function(i,dadosR){
            $("#nomeProp").val(dadosR.nome);
            $("#marcaveiculo").val(dadosR.marca);
            $("#modelobusca").val(dadosR.modelo);
            $("#tipoveiculo").val(dadosR.tipo);
            $("#cdVeiculo").val(dadosR.cdVeiculo);
            $("#entradabusca").val(dadosR.hrentrada);
         });
        },
        //caso dê erro esse código é executado
        error: function(data){
            navigator.notification.alert("Erro ao Buscar! " + data);
        }
    });
  });

   $(document).on('click','#calcular',function(){

     cauculaHr();

  });

  function hmToMins(str) {
  const [hh, mm] = str.split(':').map(nr => Number(nr) || 0);
  return hh * 60 + mm;
  }

  function cauculaHr(){
      const hrEntrada = hmToMins($("#entradabusca").val());
      const hrSaida = hmToMins($("#saidabusca").val());
      const hrDif = hrSaida - hrEntrada;
      
      if(isNaN(hrDif)) return;

      const hhmm = [
        Math.floor(hrDif / 60),
        Math.round(hrDif % 60)
      ].map(nr => `00${nr}`.slice(-2)).join(':');

      const tipoVeiculo = $("#tipoveiculo").val();
      if(tipoVeiculo == "carro"){
        let total = 0;
        
        if(hrDif >= 60){
          total = Math.ceil(hrDif/60);
          let valort = (total - 1) * 3;
          let valortotal = 5 + valort;
          alert("Foi utilizado " + hhmm+ ". O valor total é R$ " + valortotal + ",00");
        $("#resultado").val(valortotal);

        }else{
          let valortotal = 5
          alert("Foi utilizado " + hhmm+ ". O valor total é R$ " + valortotal + ",00");
        }


      }else if(tipoVeiculo == "moto"){
        if(hrDif >= 60){
          total = Math.ceil(hrDif/60);
          let valort = (total - 1) * 2;
          let valortotal = 3 + valort;
          alert("Foi utilizado " + hhmm+ ". O valor total é R$ " + valortotal + ",00");
           $("#resultado").val(valortotal);
          
        }else{
          let valortotal = 3
          alert("Foi utilizado " + hhmm+ ". O valor total é R$ " + valortotal + ",00");
        }
      }

  }
 