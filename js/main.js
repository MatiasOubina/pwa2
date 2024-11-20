import { obtenerTareas, agregarTarea, mostrarTareaEditar, cambiarEstadoTarea } from "./tareas.js";


/*****************
*                *
*    VARIABLES   *
*                *
*****************/
const offcanvas = new bootstrap.Offcanvas(document.querySelector('#menuOffcanvas'));
const btnAgregarTarea = document.querySelector('#crearTarea');
const btnCambiarEstado = document.querySelector('#cambiarEstado');
const btnGuardarTarea = document.querySelector('#guardarTarea');
const btnGuardaEstado = document.querySelector('#guardarEstado');
const btnSeleccionarTarea = document.querySelector('#tareasEst');
const modalEstado = document.querySelector('#modalEstado');
const modalTarea = document.querySelector('#modalTarea');
const btnCerrar = document.querySelectorAll('.cerrarModal');
let idTarea = 0;

/*****************
*                *
*    EVENTOS     *
*                *
*****************/
btnAgregarTarea.addEventListener('click', () => {
    offcanvas.hide()
    modalTarea.showModal()
})

btnGuardarTarea.addEventListener('click', function () {
    agregarTarea()
    modalTarea.close()
})

btnCambiarEstado.addEventListener('click', () => {
    offcanvas.hide()
    modalEstado.showModal()
})

btnSeleccionarTarea.addEventListener('change', (event) => {
    idTarea = event.target.value;
    mostrarTareaEditar(idTarea)

});

btnCerrar.forEach((boton) => {
    boton.addEventListener('click', () => {
        modalTarea.close();
        modalEstado.close();
    });
});

btnGuardaEstado.addEventListener('click', () => {
    cambiarEstadoTarea(idTarea)
    modalEstado.close()
})




/*****************
*                *
*   FUNCIONES    *
*  PRINCIPALES   *
*                *
*****************/

obtenerTareas()