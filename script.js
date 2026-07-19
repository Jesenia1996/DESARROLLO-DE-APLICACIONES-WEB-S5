// ============================================================
// PROYECTO: Camino de Fe en mi Parroquia
// SEMANA 7: Estructura de plantillas + contenido dinámico
// ============================================================

// 🔹 ARREGLO DE OBJETOS: Servicios y actividades
const servicios = [
    {
        titulo: "Formación Litúrgica",
        descripcion: "Aprende el significado de cada rito, oración y gesto dentro de la Misa.",
        icono: "bi-book",
        activo: true
    },
    {
        titulo: "Encuentros de Oración",
        descripcion: "Espacios semanales para fortalecer la vida espiritual y la comunidad.",
        icono: "bi-heart-fill",
        activo: true
    },
    {
        titulo: "Retiros Espirituales",
        descripcion: "Jornadas especiales de reflexión, convivencia y crecimiento en la fe.",
        icono: "bi-sunrise",
        activo: true
    },
    {
        titulo: "Servicio en el Altar",
        descripcion: "Práctica guiada para servir como monaguillo en las celebraciones.",
        icono: "bi-star-fill",
        activo: true
    },
    {
        titulo: "Actividades Sociales",
        descripcion: "Obras de ayuda, campañas solidarias y trabajo comunitario.",
        icono: "bi-people-fill",
        activo: false
    },
    {
        titulo: "Capacitación Musical",
        descripcion: "Talleres de canto litúrgico para acompañar las celebraciones.",
        icono: "bi-music-note-beamed",
        activo: false
    }
];

// 🔹 ARREGLO DE OBJETOS: Cronograma de formación
const cronograma = [
    { actividad: "Catequesis básica",       dia: "Lunes",    horario: "16:00 - 17:30", estado: "Activo" },
    { actividad: "Práctica litúrgica",      dia: "Miércoles",horario: "17:00 - 18:30", estado: "Activo" },
    { actividad: "Encuentro de oración",    dia: "Viernes",  horario: "18:00 - 19:00", estado: "Activo" },
    { actividad: "Retiro espiritual",       dia: "Sábado",   horario: "09:00 - 13:00", estado: "Próximo" },
    { actividad: "Misa comunitaria",        dia: "Domingo",  horario: "10:00 - 11:30", estado: "Activo" },
    { actividad: "Capacitación musical",    dia: "Martes",   horario: "16:00 - 17:00", estado: "Suspendido" }
];

// 🔹 ARREGLO: Participantes registrados
let participantes = [];

// ============================================================
// 🔹 FUNCIÓN: Renderizar servicios en tarjetas
// ============================================================
function renderizarServicios() {
    const contenedor = document.getElementById("contenedorServicios");
    if (!contenedor) return;
    
    contenedor.innerHTML = "";

    servicios.forEach(servicio => {
        const badge = servicio.activo
            ? `<span class="badge bg-success">Disponible</span>`
            : `<span class="badge bg-secondary">Próximamente</span>`;

        const tarjeta = `
            <div class="col-md-6 col-lg-4">
                <div class="card p-3 text-center h-100">
                    <i class="bi ${servicio.icono} fs-1 text-danger mb-2"></i>
                    <h4 class="h6">${servicio.titulo}</h4>
                    <p class="small">${servicio.descripcion}</p>
                    ${badge}
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    });
}

// ============================================================
// 🔹 FUNCIÓN: Renderizar cronograma en tabla
// ============================================================
function renderizarCronograma() {
    const cuerpo = document.getElementById("cuerpoCronograma");
    if (!cuerpo) {
        console.error("No se encontró el elemento #cuerpoCronograma");
        return;
    }
    
    cuerpo.innerHTML = "";

    for (const item of cronograma) {
        let claseEstado = "";
        let mensajeEstado = "";

        if (item.estado === "Activo") {
            claseEstado = "bg-success text-white";
            mensajeEstado = "✅ Activo";
        } else if (item.estado === "Próximo") {
            claseEstado = "bg-warning text-dark";
            mensajeEstado = "⏳ Próximo";
        } else {
            claseEstado = "bg-secondary text-white";
            mensajeEstado = "⛔ Suspendido";
        }

        const fila = `
            <tr>
                <td>${item.actividad}</td>
                <td>${item.dia}</td>
                <td>${item.horario}</td>
                <td><span class="badge ${claseEstado}">${mensajeEstado}</span></td>
            </tr>
        `;
        cuerpo.innerHTML += fila;
    }
    
    console.log("Cronograma renderizado correctamente");
}

// ============================================================
// 🔹 FUNCIÓN: Renderizar lista de participantes
// ============================================================
function renderizarParticipantes() {
    const lista = document.getElementById("listaRegistros");
    const contador = document.getElementById("contador");
    
    if (!lista || !contador) return;
    
    contador.textContent = participantes.length;

    if (participantes.length === 0) {
        lista.innerHTML = `<p class="text-center text-muted">Aún no hay inscripciones registradas.</p>`;
        return;
    }

    lista.innerHTML = participantes.map((p, index) => {
        let colorCategoria = "";
        if (p.categoria === "Inicial") colorCategoria = "bg-info";
        else if (p.categoria === "Intermedio") colorCategoria = "bg-warning text-dark";
        else colorCategoria = "bg-danger";

        return `
            <div class="card mb-2 p-3 border-start border-4 border-danger">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h5 class="mb-1 text-start">${p.nombre}</h5>
                        <p class="mb-1 small">
                            <strong>Edad:</strong> ${p.edad} años |
                            <span class="badge ${colorCategoria}">${p.categoria}</span>
                        </p>
                        <p class="mb-0 small fst-italic">"${p.motivo}"</p>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarParticipante(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join("");
}

// ============================================================
// 🔹 FUNCIÓN: Mostrar mensaje dinámico
// ============================================================
function mostrarMensaje(texto, tipo = "success") {
    const mensaje = document.getElementById("mensaje");
    if (!mensaje) return;
    
    mensaje.className = `alert alert-${tipo} mb-3`;
    mensaje.textContent = texto;
    mensaje.classList.remove("d-none");

    setTimeout(() => {
        mensaje.classList.add("d-none");
    }, 4000);
}

// ============================================================
// 🔹 FUNCIÓN: Validar formulario
// ============================================================
function validarFormulario() {
    const nombre    = document.getElementById("nombre").value.trim();
    const edad      = document.getElementById("edad").value.trim();
    const categoria = document.getElementById("categoria").value;
    const motivo    = document.getElementById("motivo").value.trim();

    let esValido = true;

    document.getElementById("errorNombre").textContent    = "";
    document.getElementById("errorEdad").textContent      = "";
    document.getElementById("errorCategoria").textContent = "";
    document.getElementById("errorMotivo").textContent    = "";

    if (nombre === "") {
        document.getElementById("errorNombre").textContent = "⚠ El nombre es obligatorio.";
        esValido = false;
    } else if (nombre.length < 3) {
        document.getElementById("errorNombre").textContent = "⚠ El nombre debe tener al menos 3 caracteres.";
        esValido = false;
    }

    if (edad === "") {
        document.getElementById("errorEdad").textContent = "⚠ La edad es obligatoria.";
        esValido = false;
    } else if (parseInt(edad) < 8 || parseInt(edad) > 99) {
        document.getElementById("errorEdad").textContent = "⚠ La edad debe estar entre 8 y 99 años.";
        esValido = false;
    }

    if (categoria === "") {
        document.getElementById("errorCategoria").textContent = "⚠ Debe seleccionar una categoría.";
        esValido = false;
    }

    if (motivo === "") {
        document.getElementById("errorMotivo").textContent = "⚠ El motivo es obligatorio.";
        esValido = false;
    } else if (motivo.length < 10) {
        document.getElementById("errorMotivo").textContent = "⚠ El motivo debe tener al menos 10 caracteres.";
        esValido = false;
    }

    return esValido;
}

// ============================================================
// 🔹 EVENTO: Enviar formulario de inscripción
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("formularioInscripcion");
    
    if (formulario) {
        formulario.addEventListener("submit", function(e) {
            e.preventDefault();
            
            console.log("Formulario enviado");

            if (!validarFormulario()) {
                mostrarMensaje("❌ Por favor corrige los errores del formulario.", "danger");
                return;
            }

            const nuevo = {
                nombre:    document.getElementById("nombre").value.trim(),
                edad:      parseInt(document.getElementById("edad").value),
                categoria: document.getElementById("categoria").value,
                motivo:    document.getElementById("motivo").value.trim()
            };

            participantes.push(nuevo);
            renderizarParticipantes();

            if (participantes.length === 1) {
                mostrarMensaje("✅ ¡Primer participante registrado con éxito!", "success");
            } else {
                mostrarMensaje(`✅ ¡Registro exitoso! Ya son ${participantes.length} participantes.`, "success");
            }

            this.reset();
        });
    }

    // Renderizar datos al cargar la página
    renderizarServicios();
    renderizarCronograma();
    renderizarParticipantes();
    
    console.log("Página cargada correctamente");
});

// ============================================================
// 🔹 FUNCIÓN: Eliminar participante
// ============================================================
function eliminarParticipante(index) {
    if (confirm("¿Seguro que deseas eliminar este registro?")) {
        participantes.splice(index, 1);
        renderizarParticipantes();
        mostrarMensaje("🗑 Registro eliminado correctamente.", "warning");
    }
}

// ============================================================
// 🔹 EVENTO: Formulario de contacto
// ============================================================
document.addEventListener("DOMContentLoaded", function() {
    const formContacto = document.getElementById("formContacto");
    if (formContacto) {
        formContacto.addEventListener("submit", function(e) {
            e.preventDefault();
            alert("✅ ¡Mensaje enviado! Pronto nos pondremos en contacto contigo.");
            this.reset();
        });
    }
});