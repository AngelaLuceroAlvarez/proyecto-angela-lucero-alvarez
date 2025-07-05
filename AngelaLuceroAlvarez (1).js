
// -------------------------------
// Punto 1: Estructura de Datos
// -------------------------------

const libros = [
  { id: 1, titulo: "Cien Años de Soledad", autor: "Gabriel García Márquez", anio: 1967, genero: "Realismo mágico", disponible: true },
  { id: 2, titulo: "1984", autor: "George Orwell", anio: 1949, genero: "Distopía", disponible: true },
  { id: 3, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", anio: 1943, genero: "Fábula", disponible: false },
  { id: 4, titulo: "Crónica de una Muerte Anunciada", autor: "Gabriel García Márquez", anio: 1981, genero: "Novela", disponible: true },
  { id: 5, titulo: "Rayuela", autor: "Julio Cortázar", anio: 1963, genero: "Ficción", disponible: true },
  { id: 6, titulo: "Don Quijote", autor: "Miguel de Cervantes", anio: 1605, genero: "Clásico", disponible: false },
  { id: 7, titulo: "La Odisea", autor: "Homero", anio: -800, genero: "Épica", disponible: true },
  { id: 8, titulo: "Fahrenheit 451", autor: "Ray Bradbury", anio: 1953, genero: "Ciencia ficción", disponible: true },
  { id: 9, titulo: "Los Juegos del Hambre", autor: "Suzanne Collins", anio: 2008, genero: "Distopía", disponible: true },
  { id: 10, titulo: "Orgullo y Prejuicio", autor: "Jane Austen", anio: 1813, genero: "Romance", disponible: false }
];

const usuarios = [
  { id: 1, nombre: "Ana Torres", email: "ana.torres@email.com", librosPrestados: [3, 6] },
  { id: 2, nombre: "Luis Pérez", email: "luis.perez@email.com", librosPrestados: [] },
  { id: 3, nombre: "Sofía Ramírez", email: "sofia.ramirez@email.com", librosPrestados: [10] },
  { id: 4, nombre: "Carlos Gómez", email: "carlos.gomez@email.com", librosPrestados: [1, 4] },
  { id: 5, nombre: "Lucía Fernández", email: "lucia.fernandez@email.com", librosPrestados: [] }
];

// -------------------------------
// Punto 2: Funciones de Gestión de Libros
// -------------------------------

function agregarLibro(id, titulo, autor, anio, genero) {
  const nuevoLibro = {
    id,
    titulo,
    autor,
    anio,
    genero,
    disponible: true
  };
  libros.push(nuevoLibro);
  console.log("Libro agregado exitosamente.");
}

function buscarLibro(criterio, valor) {
  const resultados = libros.filter(libro =>
    libro[criterio]?.toString().toLowerCase().includes(valor.toLowerCase())
  );
  if (resultados.length === 0) {
    console.log("No se encontraron libros con ese criterio.");
  } else {
    console.log("Resultados de la búsqueda:");
    console.log(resultados);
  }
}

function ordenarLibros(criterio) {
  for (let i = 0; i < libros.length - 1; i++) {
    for (let j = 0; j < libros.length - 1 - i; j++) {
      if (libros[j][criterio] > libros[j + 1][criterio]) {
        let temp = libros[j];
        libros[j] = libros[j + 1];
        libros[j + 1] = temp;
      }
    }
  }
  console.log(`Libros ordenados por ${criterio}:`);
  console.log(libros);
}

function borrarLibro(id) {
  const index = libros.findIndex(libro => libro.id === id);
  if (index !== -1) {
    libros.splice(index, 1);
    console.log(`Libro con ID ${id} eliminado.`);
  } else {
    console.log("No se encontró un libro con ese ID.");
  }
}

// -------------------------------
// Punto 3: Gestión de Usuarios
// -------------------------------

function registrarUsuario(nombre, email) {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre: nombre.trim(),
    email: email.toLowerCase(),
    librosPrestados: []
  };
  usuarios.push(nuevoUsuario);
  console.log("Usuario registrado exitosamente.");
}

function mostrarTodosLosUsuarios() {
  console.log("Lista de usuarios:");
  console.log(usuarios);
}

function buscarUsuario(email) {
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (usuario) {
    console.log("Usuario encontrado:");
    console.log(usuario);
  } else {
    console.log("Usuario no encontrado.");
  }
}

function borrarUsuario(nombre, email) {
  const index = usuarios.findIndex(
    u => u.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() &&
         u.email.toLowerCase() === email.toLowerCase()
  );
  if (index !== -1) {
    usuarios.splice(index, 1);
    console.log("Usuario eliminado correctamente.");
  } else {
    console.log("No se encontró un usuario con esos datos.");
  }
}

// -------------------------------
// Punto 4: Sistema de Préstamos
// -------------------------------

function prestarLibro(idLibro, idUsuario) {
  const libro = libros.find(l => l.id === idLibro);
  const usuario = usuarios.find(u => u.id === idUsuario);

  if (!libro || !usuario || !libro.disponible) {
    console.log("Error en préstamo. Verifique datos.");
    return;
  }

  libro.disponible = false;
  usuario.librosPrestados.push(idLibro);
  console.log(`El libro "${libro.titulo}" fue prestado a ${usuario.nombre}.`);
}

function devolverLibro(idLibro, idUsuario) {
  const libro = libros.find(l => l.id === idLibro);
  const usuario = usuarios.find(u => u.id === idUsuario);

  if (!libro || !usuario) {
    console.log("Error al devolver. Verifique datos.");
    return;
  }

  const index = usuario.librosPrestados.indexOf(idLibro);
  if (index === -1) {
    console.log("El usuario no tiene este libro prestado.");
    return;
  }

  libro.disponible = true;
  usuario.librosPrestados.splice(index, 1);
  console.log(`El libro "${libro.titulo}" fue devuelto por ${usuario.nombre}.`);
}


// -------------------------------
// Punto 5: Reporte con map/filter/reduce
// -------------------------------

function generarReporteLibros() {
  console.log("=== Reporte de Libros ===");

  const totalLibros = libros.length;
  const librosPrestados = libros.filter(libro => !libro.disponible).length;

  const librosPorGenero = libros.reduce((contador, libro) => {
    if (contador[libro.genero]) {
      contador[libro.genero]++;
    } else {
      contador[libro.genero] = 1;
    }
    return contador;
  }, {});

  const libroMasAntiguo = libros.reduce((min, libro) => libro.anio < min.anio ? libro : min, libros[0]);
  const libroMasNuevo = libros.reduce((max, libro) => libro.anio > max.anio ? libro : max, libros[0]);

  console.log(`Cantidad total de libros: ${totalLibros}`);
  console.log(`Cantidad de libros prestados: ${librosPrestados}`);
  console.log("Cantidad de libros por género:");
  console.log(librosPorGenero);
  console.log(`Libro más antiguo: "${libroMasAntiguo.titulo}" (${libroMasAntiguo.anio})`);
  console.log(`Libro más nuevo: "${libroMasNuevo.titulo}" (${libroMasNuevo.anio})`);
}

// -------------------------------
// Punto 6: Libros con más de una palabra (solo letras)
// -------------------------------

function librosConPalabrasEnTitulo() {
  const resultado = libros.filter(libro => {
    const palabras = libro.titulo.trim().split(/\s+/);
    if (palabras.length <= 1) return false;
    const soloLetras = palabras.every(palabra => /^[A-Za-zÁÉÍÓÚÑáéíóúñ]+$/.test(palabra));
    return soloLetras;
  }).map(libro => libro.titulo);

  console.log("Libros con más de una palabra en el título (solo letras):");
  console.log(resultado);
}

// -------------------------------
// Punto 7: Cálculos estadísticos con Math
// -------------------------------

function calcularEstadisticas() {
  const anios = libros.map(libro => libro.anio);
  const suma = anios.reduce((acc, anio) => acc + anio, 0);
  const promedio = Math.round(suma / anios.length);

  const frecuencia = {};
  let maxFrecuencia = 0;
  let anioMasFrecuente = anios[0];

  anios.forEach(anio => {
    frecuencia[anio] = (frecuencia[anio] || 0) + 1;
    if (frecuencia[anio] > maxFrecuencia) {
      maxFrecuencia = frecuencia[anio];
      anioMasFrecuente = anio;
    }
  });

  const anioMin = Math.min(...anios);
  const anioMax = Math.max(...anios);
  const diferencia = anioMax - anioMin;

  console.log("=== Estadísticas de libros ===");
  console.log(`Promedio de años de publicación: ${promedio}`);
  console.log(`Año de publicación más frecuente: ${anioMasFrecuente}`);
  console.log(`Diferencia entre el libro más antiguo y el más nuevo: ${diferencia} años`);
}

// -------------------------------
// Punto 8: Normalización de cadenas
// -------------------------------

function normalizarDatos() {
  libros.forEach(libro => {
    libro.titulo = libro.titulo.toUpperCase();
  });

  libros.forEach(libro => {
    libro.autor = libro.autor.trim();
  });

  usuarios.forEach(usuario => {
    usuario.email = usuario.email.toLowerCase();
  });

  console.log("Datos normalizados correctamente.");
}

// -------------------------------
// Punto 9: Menú principal
// -------------------------------

function menuPrincipal() {
  let opcion;

  do {
    opcion = prompt(
      "📚 SISTEMA DE GESTIÓN DE BIBLIOTECA\n\n" +
      "1. Agregar libro\n" +
      "2. Buscar libro\n" +
      "3. Ordenar libros\n" +
      "4. Borrar libro\n" +
      "5. Registrar usuario\n" +
      "6. Mostrar todos los usuarios\n" +
      "7. Buscar usuario\n" +
      "8. Borrar usuario\n" +
      "9. Prestar libro\n" +
      "10. Devolver libro\n" +
      "11. Generar reporte de libros\n" +
      "12. Libros con más de una palabra (solo letras)\n" +
      "13. Calcular estadísticas\n" +
      "14. Normalizar datos\n" +
      "15. Salir\n\n" +
      "Ingrese el número de opción:"
    );

    switch (opcion) {
      case "1":
        agregarLibro(
          parseInt(prompt("ID del libro:")),
          prompt("Título del libro:"),
          prompt("Autor:"),
          parseInt(prompt("Año de publicación:")),
          prompt("Género:")
        );
        break;
      case "2":
        buscarLibro(prompt("Buscar por (titulo, autor o genero):"), prompt("Valor:"));
        break;
      case "3":
        ordenarLibros(prompt("Ordenar por (titulo o anio):"));
        break;
      case "4":
        borrarLibro(parseInt(prompt("ID del libro a eliminar:")));
        break;
      case "5":
        registrarUsuario(prompt("Nombre:"), prompt("Email:"));
        break;
      case "6":
        mostrarTodosLosUsuarios();
        break;
      case "7":
        buscarUsuario(prompt("Email del usuario:"));
        break;
      case "8":
        borrarUsuario(prompt("Nombre:"), prompt("Email:"));
        break;
      case "9":
        prestarLibro(
          parseInt(prompt("ID del libro a prestar:")),
          parseInt(prompt("ID del usuario:"))
        );
        break;
      case "10":
        devolverLibro(
          parseInt(prompt("ID del libro a devolver:")),
          parseInt(prompt("ID del usuario:"))
        );
        break;
      case "11":
        generarReporteLibros();
        break;
      case "12":
        librosConPalabrasEnTitulo();
        break;
      case "13":
        calcularEstadisticas();
        break;
      case "14":
        normalizarDatos();
        break;
      case "15":
        alert("Gracias por usar el sistema. ¡Hasta luego!");
        break;
      default:
        alert("Opción no válida. Por favor intente de nuevo.");
    }

  } while (opcion !== "15");
}
