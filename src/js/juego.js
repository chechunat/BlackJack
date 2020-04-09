// Funcion de flecha anonima que se autoejecutara y será dificil acceder a las variables desde el navegador
const miModulo = (() => {

    'use strict' // Para obligar a que sea el código correcto

    /**
     * Referencia para conocer que carta es cada imagen
     * 
     * 2C = two of Clubs ( 2 de tréboles )
     * 2D = two of Diamonds ( 2 de diamantes )
     * 2H = two of Hearts ( 2 de corazones )
     * 2S = two of Spades ( 2 de picas )
     * 
     * Las cartas van del 2 al 10 y después hay J, Q, K y A
     * 
     */

    let deck = []; // Baraja de cartas
    const tipos = ['C', 'D', 'H', 'S'], //(Clubs,Diamons, Hearts y Spades)
        especiales = ['J', 'Q', 'K', 'A']; //Cartas especiales 

    // let puntosJugador   = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = []; // Array para poder poner varios jugadores

    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');


    //Funcion para inicializar el juego, por defecto 2 jugadores y el ultimo siempre sera la computadora
    const inicializarJuego = (numJugadores = 2) => {

        // Inicializamos los puntos de los jugadores a 0;
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0); // Añade un jugador e inicializa a 0
        }

        //Creamos una baraja nueva si esta vacia
        if (deck.length === 0) {
            deck = crearDeck();
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;

    }

    /**  
     * Funcion para crear la baraja de cartas y devolverla mezclada
     */
    const crearDeck = () => {
        /** 
         *  Un for para añadir al deck (baraja) las imagenes de las cartas que tenemos 
         */


        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let esp of especiales) {
            for (let tipo of tipos) {
                deck.push(esp + tipo);
            }
        }


        return _.shuffle(deck); // para mezclar la baraja, funcion de libreria undercore-min y devolverlo

    }



    // Función para seleccionar una carta
    const pedirCarta = () => {

        // Si no hay cartas en la baraja
        if (deck.length === 0) {

            crearDeck();

        }
        return deck.pop(); // Devuelvo la última carta de la baraja y la elimino;
    }

    // Función para obtener el valor de la carta
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1); // con substring sacamos desde el valor inicial hasta la posición indicada, con lo que si es un 10, cogerá el 10 entero.
        // los numeros valen su valor, pero las especiales tienen otro valor
        // Sin simplificar:

        // let puntos = 0;
        // if (isNaN(valor)) {
        //     puntos = (valor === 'A') ? 11 : 10;
        // } else {
        //     puntos = valor * 1; //Así lo convertimos a un número
        // }
        // console.log({ valor });

        // Simpificado: si valor no es un número, preguntara si el valor es A entonces es 11, sino será 10,
        // pero si es un número, el valor sera el valor de la carta que la multiplicaremos por 1 para 
        // convertir el string en un numero.

        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;
    }

    // Recie el turno de quien juega para saber la puntuación turno:0 primer jugador, ultimo: computadora
    // Recibe la carta para enviarla al valorcarta y saber el valor
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img'); //Creamos la imagen de la carta
        imgCarta.src = `../assets/cartas/${ carta }.png`; //Decimos la ruta de la imagen
        imgCarta.classList.add('carta'); //Añadimos la clase del css a la carta para controlar tamaños
        divCartasJugadores[turno].append(imgCarta); // Insertamos la imagen en el HTML

    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores; // En principio solo habrá 2 jugadores

        setTimeout(() => {
            if ((puntosComputadora > puntosMinimos) && (puntosComputadora <= 21) || (puntosMinimos > 21)) {

                alert('Has perdido!!!');

            } else if (puntosComputadora === puntosMinimos) {
                alert('Empate');
            } else {
                alert('Has ganado!!!');
            };
        }, 20);

    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {

            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

            // const imgCarta = document.createElement('img'); //Creamos la imagen de la carta
            // imgCarta.src = `assets/cartas/${ carta }.png`; //Decimos la ruta de la imagen
            // imgCarta.classList.add('carta'); //Añadimos la clase del css a la carta para controlar tamaños
            // divCartasComputadora.append(imgCarta); // Insertamos la imagen en el HTML

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }


    // Eventos

    // Boton Pedir Carta
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0); //Pongo 0 porque es el primer jugador

        crearCarta(carta, 0);


        if (puntosJugador > 21) {
            console.warn('Has perdido');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('Genial 21');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }


    });

    // Boton Detener
    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);

    });


    // Boton Nuevo Juego
    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    });

    //Si quieres que alguien pueda accder a alguna funcion...
    return {

        inicializarJuego

    };

})();