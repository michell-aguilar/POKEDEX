// Buscar datos de Pokémon dependiendo de su número o nombre
function buscarPokemon(contenedorNumero) {
    let inputId = `pokemonInput${contenedorNumero}`;
    let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
    let urlApi = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;

    fetch(urlApi)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            return response.json();
        })
        .then(datosPokemon => mostrarPokemon(datosPokemon, contenedorNumero))
        .catch(() => mostrarError(contenedorNumero));
}

// Mostrar información del Pokémon
function mostrarPokemon(datosPokemon, contenedorNumero) {
    let infoDivId = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);

    // Obtener habilidades
    let habilidades = datosPokemon.abilities.map(habilidad => habilidad.ability.name).join(', ');

    // Obtener poder (ataque base)
    let poder = datosPokemon.stats.find(stat => stat.stat.name === "attack").base_stat;

    infoDiv.innerHTML = `
        <div class="pokemon-card">
            <h2>${datosPokemon.name.toUpperCase()}</h2>
            <img class="pk-img" src="${datosPokemon.sprites.other['official-artwork'].front_default}" alt="${datosPokemon.name}">
            <p><strong>Habilidades:</strong> ${habilidades}</p>
            <p><strong>Poder (Ataque Base):</strong> ${poder}</p>
            <p><strong>Peso:</strong> ${datosPokemon.weight / 10} kg</p>
            <p><strong>Altura:</strong> ${datosPokemon.height / 10} m</p>
            <p><strong>Número:</strong> ${datosPokemon.id}</p>
        </div>
    `;
}

// Mostrar error
function mostrarError(contenedorNumero) {
    let infoDivId = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivId);
    infoDiv.innerHTML = `<p class="pk-ms">No se encontró el Pokémon. <br> Intenta de nuevo.</p>`;
}

// Mostrar Pokémon por defecto al cargar la página
window.onload = function() {
    document.getElementById("pokemonInput1").value = "25";
    buscarPokemon(1);
    document.getElementById("pokemonInput2").value = "4";
    buscarPokemon(2);
}
