const formulario = document.getElementById("formularioInscripcion");
const lista = document.getElementById("listaRegistros");
const contador = document.getElementById("contador");
const mensaje = document.getElementById("mensaje");

let total = 0;

formulario.addEventListener("submit", function(e){

    // evita recargar la página
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = document.getElementById("edad").value;
    const categoria = document.getElementById("categoria").value;
    const motivo = document.getElementById("motivo").value.trim();

    // validación
    if(
        nombre === "" ||
        edad === "" ||
        categoria === "" ||
        motivo === ""
    ){
        mensaje.className = "alert alert-danger";
        mensaje.textContent = "Todos los campos son obligatorios.";
        mensaje.classList.remove("d-none");
        return;
    }

    // mensaje éxito
    mensaje.className = "alert alert-success";
    mensaje.textContent = "Participante registrado correctamente.";
    mensaje.classList.remove("d-none");

    // eliminar mensaje luego de 3 segundos
    setTimeout(() => {
        mensaje.classList.add("d-none");
    },3000);

    // borrar texto inicial
    if(lista.innerHTML.includes("Aún no hay")){
        lista.innerHTML = "";
    }

    // crear tarjeta
    const tarjeta = document.createElement("div");

    tarjeta.className = "card mb-3";

    tarjeta.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>

            <p>
                <strong>Edad:</strong> ${edad}
            </p>

            <p>
                <strong>Categoría:</strong> ${categoria}
            </p>

            <p>
                <strong>Motivo:</strong> ${motivo}
            </p>

            <button class="btn btn-danger eliminar">
                Eliminar
            </button>
        </div>
    `;

    // agregar tarjeta
    lista.appendChild(tarjeta);

    // actualizar contador
    total++;
    contador.textContent = total;

    // botón eliminar
    tarjeta.querySelector(".eliminar")
        .addEventListener("click", function(){

            tarjeta.remove();

            total--;
            contador.textContent = total;

            if(total === 0){
                lista.innerHTML =
                `<p class="text-center text-muted">
                    Aún no hay inscripciones registradas.
                </p>`;
            }
        });

    // limpiar formulario
    formulario.reset();
});