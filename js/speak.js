const selectVoice = document.querySelector('#selectVoice')

export function cargarVoces() {
    Speakit.languageFilter = 'es-AR'
    Speakit.getVoices().then((voices) => {
        if (voices.length > 0) {
            selectVoice.innerHTML = ''
            voices.forEach((voice) => {
                selectVoice.innerHTML += `<option value="${voice.lang}">${voice.name}</option>`
            })
        }
    })

}

cargarVoces()

export function reproducirTexto(texto) {
    const savedVoice = localStorage.getItem('selectedVoice');
    const savedSlider = localStorage.getItem('sliderValue');
    const nameVoice = localStorage.getItem('nameVoice');

    Speakit.utteranceRate = savedSlider
    Speakit.readText(texto, savedVoice, nameVoice)
}