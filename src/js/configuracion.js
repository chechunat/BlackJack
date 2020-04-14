// Archivo para conprobar los jugadores que participan y si son humanos o computadora.
// Por defecto será un Humano contra la Banca

// Abrir pantalla con especificaciones de jugadores


//Referencias al HTML
const sectionBanca = document.querySelector('#sectionBanca');


// Crear HTML con jugadores finales
export const crearBancaHtml =() =>{
    
    const htmlBanca =`
        <div class="row container mt-2 col text-center">
        <div class="col">
            <img class="imgJugador" src="../src/assets/jugadores/banca.png" alt="banca" width="70px">
            <h1>Computadora - <small>0</small> </h1>
            <div id="computadora-cartas" class="divCartas">
                <img class="carta" src="assets/cartas/red_back.png" alt="">      
            </div>

        </div>
        </div>`
    
    const div = document.createElement('div');    
    div.innerHTML = htmlBanca;