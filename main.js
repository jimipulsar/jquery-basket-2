

// Utilizzare il DB del Basket già creato nell’esercizio
// precedente, per creare un’interfaccia grafica.
// Tutti i giocatori verranno visualizzati tramite il loro
// codice in una sidebar. Una volta cliccato sul codice
// giocatore, nel corpo principale verranno
// visualizzate le statistiche corrispondenti.
// Utilizzare jquery, handlebars e il DB del precedente
// esercizio


function numeroRandom(min, max){

  var numero = Math.floor(Math.random()*(max-min+1)+min);
  return numero;

}

//genero il codice del giocatore
function generaCodice(){
  var lettereMaiuscole = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var codice = "";

  for (var i = 0; i < 3; i++) {
    codice += lettereMaiuscole.charAt(Math.floor(Math.random() * lettereMaiuscole.length));
  }

  for (var k = 0; k < 3; k++){
    codice += numeroRandom(1,9);
  }

  return codice;
}

//creo un array con all'interno uno o più oggetti per creare i giocatori

  var array_players = [];

  for (var i = 0; i < 100; i++) {

    var player =
      {
        codice_giocatore: generaCodice(),
        puntiFatti: numeroRandom(1,50),
        rimbalzi: numeroRandom(1,20),
        falli: numeroRandom(1,4),
        perc_da_due: numeroRandom(0,100) + "%",
        perc_da_tre: numeroRandom(0,100) + "%",
      };

      array_players.push(player); //così si fa il push di un oggetto all'interno di un array

      var source = $('#codici-giocatori').html();
      var template = Handlebars.compile(source);

      var context = {
        codGiocatore: player.codice_giocatore,
      };

      var html = template(context);

      $('#idCodGiocatori').append(html);

  }

  $('.codice-giocatore-singolo').click(function(){


    var codice_singolo = $(this).text();


    for (var i = 0; i < array_players.length; i++) {

       var giocatore = array_players[i];

        if (codice_singolo == giocatore.codice_giocatore) {

          var statistiche = $('#statistiche-giocatori').html();
          var template = Handlebars.compile(statistiche);

          var context = {
            codGioc: giocatore.codice_giocatore,
            pntFatt: giocatore.puntiFatti,
            rimb: giocatore.rimbalzi,
            falli: giocatore.falli,
            pntdue: giocatore.perc_da_due,
            pnttre: giocatore.perc_da_tre,
          };

          var stat = template(context);

          $('#stat-giocatore').html(stat);

       }

      }
    });
