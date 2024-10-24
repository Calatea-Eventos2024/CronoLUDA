// Definición de roles y tiempo
const roles = [
    // { nombre: 'INTRODUCCIÓN AF', tiempo: 5, color: "#4A72B2" },
    { nombre: 'INTRODUCCIÓN AF', tiempo: 240, color: "#4A72B2"},
    { nombre: 'INTRODUCCIÓN EC', tiempo: 240, color: "#A01127" },
    { nombre: '1ª REFUTACIÓN AF', tiempo: 300, color: "#4A72B2" },
    { nombre: '1ª REFUTACIÓN EC', tiempo: 300, color: "#A01127" },
    { nombre: '2ª REFUTACIÓN AF', tiempo: 300, color: "#4A72B2" },
    { nombre: '2ª REFUTACIÓN EC', tiempo: 300, color: "#A01127" },
    { nombre: 'CONCLUSIÓN EC', tiempo: 240, color: "#A01127" },
    { nombre: 'CONCLUSIÓN AF', tiempo: 240, color: "#4A72B2" },
    { nombre: 'DELIBERACIÓN', tiempo: 900, color: "#fff" },
    { nombre: 'RETROALIMENTACIÓN', tiempo: 900, color: "#000" }
];

let indiceRolActual = 0;
let tiempoRestante = roles[indiceRolActual].tiempo;
let intervalo;

// Función para actualizar el reloj
function actualizarReloj() {
    let minutos = Math.floor(Math.abs(tiempoRestante / 60));
    let segundos = Math.abs(tiempoRestante % 60);

    minutos = String(minutos).padStart(2, '0');
    segundos = String(segundos).padStart(2, '0');

    let signo = tiempoRestante < 0 ? '-' : '';

    document.querySelector('.clock-face').textContent = signo + minutos + ':' + segundos;
    if (tiempoRestante >= 0) {
        if (tiempoRestante === 15 || tiempoRestante === 10 || tiempoRestante === 5 || tiempoRestante === 0) {
            document.getElementById('clock-face').style.backgroundColor = 'rgba(227, 4, 18, 0.6)'; // Rojo
            document.getElementById('clock-face').style.padding = '1px 50px';
        } else {
            document.getElementById('clock-face').style.backgroundColor = 'rgba(255, 255, 255, 0.65)'; // Blanco
            document.getElementById('clock-face').style.padding = '1px 50px';
        }
    } else{
        if (tiempoRestante %2 !== 0) {
            document.getElementById('clock-face').style.backgroundColor = 'rgba(255, 255, 255, 0.65)'; // Blanco
            document.getElementById('clock-face').style.padding = '0 50px 0 25px';

        } else {
            document.getElementById('clock-face').style.backgroundColor = 'rgba(227, 4, 18, 0.6)'; // Rojo
            document.getElementById('clock-face').style.padding = '0 50px 0 25px';
        }
    }

}

// Botón Empezar
document.getElementById('play').addEventListener('click', () => {
    if (intervalo) return;  // Si el reloj ya está corriendo, no hacer nada
    if (tiempoRestante === -20) return;
    intervalo = setInterval(() => {
        tiempoRestante--;
        actualizarReloj();
        if (tiempoRestante <= -20) {
            clearInterval(intervalo);
            intervalo = null;
        }
    }, 1000);
});

// Botón Pausa
document.getElementById('pause').addEventListener('click', () => {
    clearInterval(intervalo);
    intervalo = null;
});

// Botón Reiniciar
document.getElementById('reload').addEventListener('click', () => {
    tiempoRestante = roles[indiceRolActual].tiempo;
    actualizarReloj();
    clearInterval(intervalo);
    intervalo = null;
});

// Función para actualizar el rol y el reloj
function actualizarRol() {
    document.getElementById('currentRole').textContent = `${roles[indiceRolActual].nombre}`;
    // document.getElementById('currentRole').style.color = rolActual.color;
    document.getElementById('currentRole').style.color = `${roles[indiceRolActual].color}`;
    tiempoRestante = roles[indiceRolActual].tiempo;
    actualizarReloj();
    clearInterval(intervalo);
    intervalo = null;

    // Deshabilitar o habilitar botones de navegación de roles
    document.getElementById('prevRole').disabled = indiceRolActual === 0;
    document.getElementById('nextRole').disabled = indiceRolActual === roles.length - 1;
}

// Botón Rol Anterior
document.getElementById('prevRole').addEventListener('click', () => {
    if (indiceRolActual > 0) {
        indiceRolActual--;
        actualizarRol();
    }
});

// Botón Próximo Rol
document.getElementById('nextRole').addEventListener('click', () => {
    if (indiceRolActual < roles.length - 1) {
        indiceRolActual++;
        actualizarRol();
    }
});

actualizarReloj();

actualizarRol();
