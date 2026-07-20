document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioInscripcion');
    const spinnerCarga = document.getElementById('spinnerCarga');
    const alertaMensaje = document.getElementById('alertaMensaje');
    const listaRegistros = document.getElementById('listaRegistros');
    const contador = document.getElementById('contador');
    
    // Inicializar Modal de Bootstrap
    const modalRegistro = new bootstrap.Modal(document.getElementById('modalRegistro'));

    // Arreglo para almacenar los registros (Renderizado dinámico - Semana 7)
    let participantes = [];

    // Función para mostrar alertas de Bootstrap
    function mostrarAlerta(mensaje, tipo) {
        alertaMensaje.className = `alert alert-${tipo} alert-dismissible fade show`;
        alertaMensaje.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        `;
        alertaMensaje.classList.remove('d-none');
        
        // Ocultar automáticamente después de 5 segundos
        setTimeout(() => {
            alertaMensaje.classList.add('d-none');
        }, 5000);
    }

    // Validación dinámica del formulario (Semana 6)
    function validarFormulario() {
        let esValido = true;
        const nombre = document.getElementById('nombre');
        const edad = document.getElementById('edad');
        const categoria = document.getElementById('categoria');
        const motivo = document.getElementById('motivo');

        // Limpiar errores previos
        document.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = '');
        document.querySelectorAll('.form-control, .form-select').forEach(el => el.classList.remove('is-invalid'));

        if (nombre.value.trim().length < 3) {
            document.getElementById('errorNombre').textContent = 'El nombre debe tener al menos 3 caracteres.';
            nombre.classList.add('is-invalid');
            esValido = false;
        }

        if (edad.value < 8 || edad.value > 99 || edad.value === '') {
            document.getElementById('errorEdad').textContent = 'La edad debe estar entre 8 y 99 años.';
            edad.classList.add('is-invalid');
            esValido = false;
        }

        if (categoria.value === '') {
            document.getElementById('errorCategoria').textContent = 'Debe seleccionar una categoría.';
            categoria.classList.add('is-invalid');
            esValido = false;
        }

        if (motivo.value.trim().length < 10) {
            document.getElementById('errorMotivo').textContent = 'El motivo debe tener al menos 10 caracteres.';
            motivo.classList.add('is-invalid');
            esValido = false;
        }

        return esValido;
    }

    // Renderizado dinámico de datos en Tabla Bootstrap (Semana 7)
    function renderizarRegistros() {
        contador.textContent = participantes.length;

        if (participantes.length === 0) {
            listaRegistros.innerHTML = '<p class="text-center text-muted">Aún no hay inscripciones registradas.</p>';
            return;
        }

        let html = `
            <div class="table-responsive">
                <table class="table table-striped table-hover table-bordered align-middle">
                    <thead class="table-danger">
                        <tr>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Categoría</th>
                            <th>Motivo</th>
                            <th class="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        participantes.forEach((p, index) => {
            html += `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.edad}</td>
                    <td><span class="badge bg-primary">${p.categoria}</span></td>
                    <td>${p.motivo}</td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-danger btn-eliminar" data-index="${index}">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `</tbody></table></div>`;
        listaRegistros.innerHTML = html;
    }

    // Delegación de eventos para el botón eliminar (evita usar onclick en HTML)
    listaRegistros.addEventListener('click', (e) => {
        if (e.target.closest('.btn-eliminar')) {
            const btn = e.target.closest('.btn-eliminar');
            const index = parseInt(btn.getAttribute('data-index'));
            
            if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
                participantes.splice(index, 1);
                renderizarRegistros();
                mostrarAlerta('Registro eliminado correctamente.', 'warning');
            }
        }
    });

    // Evento submit del formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validarFormulario()) {
            mostrarAlerta('Por favor, corrige los errores resaltados en el formulario.', 'danger');
            return;
        }

        // Mostrar Spinner (simulación de proceso)
        spinnerCarga.classList.remove('d-none');
        document.getElementById('btnRegistrar').disabled = true;

        // Simular demora de red de 2 segundos
        setTimeout(() => {
            const nuevoParticipante = {
                nombre: document.getElementById('nombre').value.trim(),
                edad: document.getElementById('edad').value,
                categoria: document.getElementById('categoria').value,
                motivo: document.getElementById('motivo').value.trim()
            };

            participantes.push(nuevoParticipante);
            
            // Ocultar spinner y rehabilitar botón
            spinnerCarga.classList.add('d-none');
            document.getElementById('btnRegistrar').disabled = false;

            // Limpiar formulario y errores visuales
            formulario.reset();
            document.querySelectorAll('.form-control, .form-select').forEach(el => el.classList.remove('is-invalid'));

            // Actualizar tabla y mostrar Modal de éxito
            renderizarRegistros();
            modalRegistro.show();
            
        }, 2000);
    });

    // Renderizado inicial al cargar la página
    renderizarRegistros();
});