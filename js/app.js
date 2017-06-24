var num;

$(document).ready(function(){  
  initGame();
  $(".button").on("click", function(e){
    initGame();
  })

  $('#userGuess').on('keypress', function(e){
    if (e.which == 13) {
      let guess = Array.from($(this).val());
      $(this).val("");
      let result = game(num, guess);

      if ((!(guess.length == 4)) || hasDuplicates(guess) || isNaN(guess.join("")) == true) {
        $(".alert").removeClass("hidden");
      }
      else {
        $(".alert").addClass("hidden");
        $(".table").removeClass("hidden");
        $("tbody").prepend("<tr><td>" + guess.join("") + "</td><td>" + result.picas + "</td><td>" + result.fijas + "</td></tr>");

        if (result.fijas == 4) $('#modal').modal();
      }
    }
  })
});

//Generar un numero de 4 digitos (Array)
function generateNumber() {
  return _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
}

//Verificar si un array tiene 4 digitos
function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

//Función que inicializa el juego
function initGame() {
  num = generateNumber();
  console.log(num.join(""));
  $("tbody").empty();
}

//Función principal. Cuenta las picas y las fijas
function game(num, guess) {
  let count = {
    fijas:0, 
    picas:0
  };
  let g = guess.join('');
  for (let i = 0; i < num.length; i++) {
    if (num[i] == guess[i]) count.fijas++;
    else if (g.search(num[i]) != -1) count.picas++;    
  }
  return count;    
}