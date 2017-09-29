$(document).ready(function (){
	var pulsar = document.getElementById("imagen");
	if(pulsar.addEventListener){
      	pulsar.addEventListener("click", aleatorio, false);
    }  else {
    	pulsar.attachEvent("onclick", aleatorio);
      }
    });
        var pos = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];    
    function aleatorio(){
//        $("#imagen").css('background-color', '#ff0000');
        if(pos.length == 0){
            pos = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
        }
        shuffle(pos);
        var images = ["imagen01.png","imagen02.png","imagen03.png","imagen04.png","imagen05.png","imagen06.png","imagen07.png","imagen08.png","imagen09.png","imagen10.png","imagen11.png","imagen12.png","imagen13.png","imagen14.png"];
      //  console.log(pos[0]); Para ver el consola la posicion de array de las imagenes
        var imagenAleatoria = images[pos[0]];//images[Math.floor(Math.random() * images.length)]
        pos.splice(0,1);
        $( "#imagen" ).attr( 'src', 'images/' + imagenAleatoria );
    }

    function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}