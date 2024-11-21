import { reproducirTexto } from "./speak.js";

export const apiURL = new URL("https://6701a574b52042b542d844db.mockapi.io/tpDos");
export const tareas = [];

const contenedorTareas = document.querySelector('#tareas-container')
const listaTareas = document.querySelector('#tareasEst')
const bodyEstado = document.querySelector('#bodyEstado')
const mensajeInicio = document.querySelector('#mensajeInicio')


export async function obtenerTareas() {
    try {
        const response = await fetch(apiURL);
        if (response.status === 200) {
            const data = await response.json()
            tareas.length = 0;
            tareas.push(...data)
            tareas.sort((a, b) => a.estado === "pendiente" ? -1 : b.estado === "pendiente" ? 1 : 0);

            if (tareas.length > 0) {

                mensajeInicio.style.display = 'none'

                contenedorTareas.innerHTML = "";

                listaTareas.innerHTML = `<option value>Seleccionar</option>`

                tareas.forEach((tarea) => {
                    contenedorTareas.innerHTML += mostrarTareas(tarea)
                    listaTareas.innerHTML += listarTareas(tarea)
                })
            }

            const reproducir = document.querySelectorAll('.reproducir');

            reproducir.forEach((boton) => {
                boton.addEventListener('click', () => {
                    const tareaId = boton.id; //
                    const tarea = tareas.find(t => t.id == tareaId);
                    const tituloDetalle = "Titulo de la tarea: " + tarea.titulo + " Descripción:" + tarea.descripcion
                    if (tarea) {
                        reproducirTexto(tituloDetalle);
                    }
                });
            });

        } else {
            throw new Error('Error al obtener las tareas.')
        }
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
    }
}

export function mostrarTareas({ id, titulo, fechaCreacion, estado }) {
    let icono;

    if (estado === "finalizado") {
        icono = ` <button class="btn" style="cursor: text">
                  <i class="bi bi-check-circle" style="font-size: 2rem; color: green;"></i>
                </button>`
    } else {
        icono = `<button class="btn reproducir" id="${id}">
                  <i class="bi bi-play-circle-fill" style="font-size: 2rem; color: crimson;"></i>
                </button>`
    }

    return `<div class="div-card mt-3 border border-dark rounded p-3" style= "width: 24rem">
              <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5 class="card-title" id="textToSpeak">${titulo || 'Tarea sin título'}</h5>
                            <p class="card-text"><strong>Fecha y hora:</strong> ${fechaCreacion}</p>
                        </div>
                        ${icono}
                    </div>
                </div>
            </div>`
}

export function agregarTarea() {
    const fechaAlta = new Date();

    const nuevaTarea = {

        fechaCreacion: fechaAlta.toLocaleString('es-AR'),
        fechaConclusion: "",
        titulo: document.querySelector('#tituloTarea').value,
        descripcion: document.querySelector('#descriTarea').value,
        estado: document.querySelector('#estadoTarea').value
    }

    const opciones = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaTarea)
    }

    fetch(apiURL, opciones)
        .then((respuesta) => {
            if (respuesta.status === 201) {
                document.querySelector('#tituloTarea').value = "";
                document.querySelector('#descriTarea').value = "";
                return respuesta.json()
            } else {
                throw new Error("No se pudo subir la tarea")
            }
        })
        .then(() => {
            obtenerTareas()
        })
}

export function listarTareas({ id, titulo, estado }) {

    return `<option value="${id}" >${titulo} | ${estado}</option>`

}

export function mostrarTareaEditar(idTarea) {

    const tarea = tareas.find(t => t.id == idTarea)
    bodyEstado.innerHTML =
        `
            <div class="mb-3" id="detalleTarea">
              <label for="titulo" class="form-label">Título</label>
                <input type="text" class="form-control" id="titulo" value="${tarea.titulo || 'Sin Título'}" disabled>
                  </div>
                    <div class="mb-3">
                      <label for="descripcion" class="form-label">Detalle</label>
                        <textarea class="form-control" id="descripcion" rows="3" disabled>${tarea.descripcion || 'No se agregó ningún detalle'}</textarea>
                    </div>
                  <div class="mb-3">
                  <label for="cambioEstado" class="form-label">Estado</label>
                    <select class="form-select" id="cambioEstado">
                       <option value="pendiente">Pendiente</option>
                       <option value="finalizado">Finalizado</option>
                    </select>
            </div>
       `
}

export function cambiarEstadoTarea(idTarea) {
    const fechaModificacion = new Date();

    const modificarTarea = {
        id: idTarea,
        fechaConclusion: fechaModificacion.toLocaleString('es-AR'),
        estado: document.querySelector('#cambioEstado').value
    }

    const opciones = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modificarTarea)
    }

    fetch(`${apiURL}/${idTarea}`, opciones)
        .then((respuesta) => {
            if (respuesta.status === 200) {
                return respuesta.json()
            } else {
                throw new Error("No se pudo modificar el estado de la tarea")
            }
        })
        .then(() => {
            bodyEstado.innerHTML = "";
            bodyEstado.innerHTML = ` <div class="mb-3 detalleEstados">
                        <label for="estadoTarea" class="form-label">Seleccionar tarea</label>
                        <select class="form-select" id="tareasEst">
                        <option value>Seleccionar</option>
                        </select>
                    </div>`
            obtenerTareas();
        })
        .catch((error) => {
            console.error("Error al cambiar el estado de la tarea:", error);
        });
}