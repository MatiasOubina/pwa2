import { obtenerTareas, agregarTarea, mostrarTareaEditar, cambiarEstadoTarea } from "./tareas.js";

/*****************
*                *
*    VARIABLES   *
*                *
*****************/
const offcanvas = new bootstrap.Offcanvas(document.querySelector('#menuOffcanvas'));
const btnAgregarTarea = document.querySelector('#crearTarea');
const btnCambiarEstado = document.querySelector('#cambiarEstado');
const btnConfiguracion = document.querySelector('#configuracion');
const btnGuardarTarea = document.querySelector('#guardarTarea');
const btnGuardaEstado = document.querySelector('#guardarEstado');
const btnGuardarConfiguracion = document.querySelector('#guardarConfiguracion');
const btnSeleccionarTarea = document.querySelector('#tareasEst');
const modalEstado = document.querySelector('#modalEstado');
const modalTarea = document.querySelector('#modalTarea');
const modalConfiguracion = document.querySelector('#modalConfiguracion');
const btnCerrar = document.querySelectorAll('.cerrarModal');
let idTarea = 0;
const rangeSlider = document.getElementById('rangeSlider');
const rangeValue = document.getElementById('rangeValue');
const selectVoice = document.querySelector('#selectVoice');


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

btnConfiguracion.addEventListener('click', () => {
    offcanvas.hide()
    modalConfiguracion.showModal()
})


btnSeleccionarTarea.addEventListener('change', (event) => {
    idTarea = event.target.value;
    mostrarTareaEditar(idTarea)
});

rangeSlider.addEventListener('input', () => {
    rangeValue.textContent = rangeSlider.value;
    Speakit.utteranceRate = rangeSlider.value;
});

btnGuardarConfiguracion.addEventListener('click', () => {

    const selectedVoice = selectVoice.value;
    const sliderValue = rangeSlider.value;
    const nameVoice = selectVoice.selectedOptions[0].text


    localStorage.setItem('selectedVoice', selectedVoice);
    localStorage.setItem('sliderValue', sliderValue);
    localStorage.setItem('nameVoice', nameVoice);

    modalConfiguracion.close();

});


btnCerrar.forEach((boton) => {
    boton.addEventListener('click', () => {
        modalTarea.close();
        modalEstado.close();
        modalConfiguracion.close();
    });
});

btnGuardaEstado.addEventListener('click', () => {
    cambiarEstadoTarea(idTarea)
    modalEstado.close()
})

if (!localStorage.getItem('selectedVoice') && !localStorage.getItem('sliderValue') && !localStorage.getItem('nameVoice')) {

    localStorage.setItem('selectedVoice', 'es-ES');
    localStorage.setItem('sliderValue', '1');
    localStorage.setItem('nameVoice', 'Google español');
}

/*****************
*                *
*   FUNCIONES    *
*  PRINCIPALES   *
*                *
*****************/

obtenerTareas()