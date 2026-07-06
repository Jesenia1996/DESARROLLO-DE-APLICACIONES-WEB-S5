// --------------------------
// Variables globales
// --------------------------
const formulario = document.getElementById('formRegistro');
const nombreInput = document.getElementById('nombre');
const descripcionInput = document.getElementById('descripcion');
const categoriaSelect = document.getElementById('categoria');
const contadorSpan = document.getElementById('contador');
const listaRegistrosDiv = document.getElementById('listaRegistros');
const mensajeGeneral = document.getElementById('mensajeGeneral');

let registros = [];

// --------------------------
// Funciones de validación
// --------------------------
function validarNombre() {
    const valor = nombreInput.value.trim();
    const errorDiv = document.getElementById('errorNombre');

    if (valor === '') {
        nombreInput.classList.remove('is-valid');
        nombreInput.classList.add('is-invalid');
        errorDiv.textContent = 'Este campo es obligatorio';
        return false;
    } else if (valor.length < 3) {
        nombreInput.classList.remove('is-valid');
        nombreInput.classList.add('is-invalid');
        errorDiv.textContent = 'Debe tener al menos 3 caracteres';
        return false;
    } else {
        nombreInput.classList.remove('is-invalid');
        nombreInput.classList.add('is-valid');
        errorDiv.textContent = '';
        return true;
    }
}

function validarDescripcion() {
    const valor = descripcionInput.value.trim();
    const errorDiv = document.getElementById('errorDescripcion');

    if (valor === '') {
        descripcionInput.classList.remove('is-valid');
        descripcionInput.classList.add('is-invalid');
        errorDiv.textContent = 'Este campo es obligatorio';
        return false;
    } else if (valor.length < 10) {
        descripcionInput.classList.remove('is-valid');
        descripcionInput.classList.add('is-invalid');
        errorDiv.textContent = 'Debe tener al menos 10 caracteres';
        return false;
    } else {
        descripcionInput.classList.remove('is-invalid');
        descripcionInput.classList.add('is-valid');
        errorDiv.textContent = '';
        return true;
    }
}

function validarCategoria() {
    const valor = categoriaSelect.value;
    const errorDiv = document.getElementById('errorCategoria');

    if (valor === '') {
        categoriaSelect.classList.remove('is-valid');
        categoriaSelect.classList.add('is-invalid');
        errorDiv.textContent = 'Debe seleccionar una categoría';
        return false;
    } else {
        categoriaSelect.classList.remove('is-invalid');
        categoriaSelect.classList.add('is-valid');
        errorDiv.textContent = '';
        return true;
    }
}

// Validación completa del formulario
function validarFormulario() {
    const v1 = validarNombre();
    const v2 = validarDescripcion();
    const v3 = validarCategoria();
    return v1 && v2 && v3;
}

// --------------------------
// Funciones de gestión de registros
// --------------------------
function agregarRegistro(datos) {
    registros.push(datos);
    actualizarVista();
}

function eliminarRegistro(indice) {
    registros.splice(indice, 1);
    mostrarMensaje('Registro eliminado correctamente', 'success');
    actualizarVista();
}

function actualizarVista() {
    // Actualizar contador
    contadorSpan.textContent = registros.length;

    // Limpiar lista
    listaRegistrosDiv.innerHTML = '';

    // Crear tarjetas para cada registro
    registros.forEach((reg, indice) => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'col-md-4 col-sm-6';
        tarjeta.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${reg.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${reg.categoria}</h6>
                    <p class="card-text">${reg.descripcion}</p>
                    <button class="btn btn-danger btn-sm" onclick="eliminarRegistro(${indice})">Eliminar</button>
                </div>
            </div>
        `;
        listaRegistrosDiv.appendChild(tarjeta);
    });
}

function mostrarMensaje(texto, tipo) {
    mensajeGeneral.textContent = texto;
    mensajeGeneral.classList.remove('d-none', 'alert-success', 'alert-danger');
    mensajeGeneral.classList.add(`alert-${tipo}`);
    setTimeout(() => mensajeGeneral.classList.add('d-none'), 3000);
}

function limpiarFormulario() {
    formulario.reset();
    nombreInput.classList.remove('is-valid', 'is-invalid');
    descripcionInput.classList.remove('is-valid', 'is-invalid');
    categoriaSelect.classList.remove('is-valid', 'is-invalid');
}

// --------------------------
// Eventos
// --------------------------
// Validación en tiempo real
nombreInput.addEventListener('input', validarNombre);
nombreInput.addEventListener('blur', validarNombre);

descripcionInput.addEventListener('input', validarDescripcion);
descripcionInput.addEventListener('blur', validarDescripcion);

categoriaSelect.addEventListener('change', validarCategoria);
categoriaSelect.addEventListener('blur', validarCategoria);

// Envío del formulario
formulario.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita recarga de página

    if (validarFormulario()) {
        const nuevoRegistro = {
            nombre: nombreInput.value.trim(),
            descripcion: descripcionInput.value.trim(),
            categoria: categoriaSelect.value
        };
        agregarRegistro(nuevoRegistro);
        mostrarMensaje('¡Registro guardado exitosamente!', 'success');
        limpiarFormulario();
    } else {
        mostrarMensaje('Corrige los errores antes de continuar', 'danger');
    }
});