'use strict'

const pokemonBuscador = document.getElementById("nombrePokemon"); // Campo de entrada del nombre de Pokémon
const pokeLupa = document.getElementById("elBuscador"); // Icono de la lupa
const appNode = document.getElementById("buscador"); // Nodo principal donde se mostrará la información del Pokémon

// Modo oscuro
let toggle = document.getElementById("toggle"); // Interruptor
let label_toggle = document.getElementById("label_toggle"); // Etiqueta del interruptor

// Agrega un evento al interruptor
toggle.addEventListener("change", (event) => {
  let checked = event.target.checked; // Estado del interruptor de tema
  document.body.classList.toggle("dark"); // Alterna la clase "dark" del cuerpo del documento

  // Si el modo oscuro está activado
    if (checked === true) {
    const modoNoche = document.createElement("img"); // Crea una nueva imagen
    // Cambia la imagen a la versión en modo claro
    document.getElementById('umbreonImg').src = "https://i.postimg.cc/26xyLwc8/light-mode2.png";
    document.body.appendChild(modoNoche);
    } else {
    // Cambia la imagen a la versión en modo oscuro
    document.getElementById('umbreonImg').src = "https://i.postimg.cc/CLHb0GH7/dark-mode2.png";
    }
});

// Recargar página en el logo
const recargar = document.getElementById("encabezado");
recargar.addEventListener("click", recargaPagina);

// Función para recargar la página
function recargaPagina() {
  window.location.reload();
}

// Click de la lupa
pokeLupa.addEventListener("click", buscarPokemon);

// Click con enter
document.addEventListener("keyup", function (e) {
  if (e.key === "Enter" && !e.shiftKey) { // Si se presiona la tecla Enter sin la tecla Shift
    let boton = document.getElementById("elBuscador"); // Obtiene el icono de la lupa
    boton.click(); // Simula un clic en el icono de la lupa
  }
});

async function buscarPokemon() {
  let valor = pokemonBuscador.value; // Obtiene el valor del campo de entrada del nombre de Pokémon

  if (valor.trim() === "") {
    return;
  }

  appNode.innerHTML = ""; // Limpia el nodo principal antes de insertar la información del Pokémon
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1126");
  const responseJSON = await response.json();

  let resultado = responseJSON.results.filter(
    (pokemon) =>
      pokemon.name.includes(valor.toLowerCase()) || 
      pokemon.url.includes(`/${valor}/`)
  );

  if (resultado.length === 0) {
    const mensajeError = document.createElement("p"); // Crea un nuevo elemento p
    mensajeError.innerText = "Este pokemon no está disponible. ¡Prueba con otro!"; // Establece el texto del elemento p
    appNode.appendChild(mensajeError); // Añade el elemento p al nodo principal
  }

  for (let i = 0; i < resultado.length; i++) {
    await insertarPokemon(`${resultado[i].url}`);
  }


};

async function insertarPokemon(url) {
    try {
    //   appNode.innerHTML = ""; // Limpia el nodo principal antes de insertar la información del Pokémon
      const responsePokemon = await fetch(url);
      const responsePokemonJSON = await responsePokemon.json(); // Convierte la respuesta a JSON

  
  
      const todaLaInfo = []; // Array para almacenar toda la información del Pokémon
      const resultado = []; // Array para almacenar los resultados de la respuesta
      
      for (let pokemonInfo in responsePokemonJSON) { // Para cada propiedad en la respuesta
        resultado.push([pokemonInfo, responsePokemonJSON[pokemonInfo]]); // Añade la propiedad y su valor al array resultado
      }
      console.table(resultado); // Muestra el array resultado en la consola
  
      // Diccionario de colores para los tipos de Pokémon
      const typeColors = {
        electric: "#E8E100",
        normal: "#B09398",
        fire: "#FF675C",
        water: "#0596C7",
        ice: "#AFEAFD",
        rock: "#999799",
        flying: "#7AE7C7",
        grass: "#4A9681",
        psychic: "#FFC6D9",
        ghost: "#561D25",
        bug: "#A2FAA3",
        poison: "#795663",
        ground: "#D2B074",
        dragon: "#DA627D",
        steel: "#1D8A99",
        fighting: "#2F2F2F",
        default: "#2A1A1",
        };
  
      const contenedor = document.createElement("div"); // Crea un nuevo div
      contenedor.classList.add("ficha"); // Añade la clase "ficha" al div
    
      // Crea una nueva imagen para la imagen delantera del Pokémon
      const imagenPokemon = document.createElement("img");
      imagenPokemon.src = resultado[16][1].front_default;
    
      // Crea una nueva imagen para la imagen posterior del Pokémon
      const imagenPokemon2 = document.createElement("img");
      if (resultado[16][1].back_default) {
          imagenPokemon2.src = resultado[16][1].back_default;
      };
    
      // Crea un nuevo elemento h2 para el nombre del Pokémon
      const nombrePokemon = document.createElement("h2");
      nombrePokemon.innerText = `Nombre: ${resultado[11][1]}`;
      
    
      // Crea un nuevo elemento h3 para el número del Pokémon
      const numPokemon = document.createElement("h3");
      numPokemon.innerText = `#${resultado[7][1]}`;
    
      // Crea un nuevo elemento p para el tipo del Pokémon
      const tipoPokemon1 = document.createElement("p");
      tipoPokemon1.innerText = `Tipo: ${resultado[18][1][0].type.name}`;
      tipoPokemon1.style.color = typeColors[resultado[18][1][0].type.name]; // Asigna el color del primer tipo del Pokémon
      
      // Crea un nuevo elemento p para el segundo tipo del Pokémon
      const tipoPokemon2 = document.createElement("p"); 
        if (resultado[18][1][1]) {
          tipoPokemon2.innerText = `Tipo 2: ${resultado[18][1][1].type.name}`;
          tipoPokemon2.style.color = typeColors[resultado[18][1][1].type.name];
        };
    
      // Crea nuevos elementos p para la estatura y el peso del Pokémon. Se dividen entre 10 porque la API no devuelve los resultados en m y kg
      const estaturaPokemon = document.createElement("p");
      estaturaPokemon.innerText = `Estatura: ${resultado[5][1]/10}m`;
      const pesoPokemon = document.createElement("p");
      pesoPokemon.innerText = `Peso: ${resultado[19][1]/10}kg`;
    
      // Crea nuevos elementos p para los puntos de vida, ataque, defensa y velocidad del Pokémon
      const vidaPokemon = document.createElement("p");
      vidaPokemon.innerText = `Vida: ${resultado[17][1][0].base_stat}PV`;
      const ataquePokemon = document.createElement("p");
      ataquePokemon.innerText = `Ataque: ${resultado[17][1][1].base_stat}ATQ`;
      const defensaPokemon = document.createElement("p");
      defensaPokemon.innerText = `Defensa: ${resultado[17][1][2].base_stat}DF`;
      const velocidadPokemon = document.createElement("p");
      velocidadPokemon.innerText = `Velocidad: ${resultado[17][1][5].base_stat}SP`;
    
      // Añade todos los elementos al contenedor
      contenedor.append(
        nombrePokemon,
        numPokemon,
        tipoPokemon1,
        tipoPokemon2,
        estaturaPokemon,
        pesoPokemon,
        vidaPokemon,
        ataquePokemon,
        defensaPokemon,
        velocidadPokemon,
        imagenPokemon,
        imagenPokemon2,
        );
    
      // Añade el contenedor a todaLaInfo
      todaLaInfo.push(contenedor);
      
      // Añade todaLaInfo al appNode
      appNode.appendChild(...todaLaInfo);
      } catch (error) { // Si ocurre un error
      console.error(error); // Registra el error en la consola
      };
    };