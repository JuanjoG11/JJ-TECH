// Voice Assistant Logic with Speech Recognition
const startVoiceBtn = document.getElementById('start-assistant'); // Now targets the image in floating container
let synthesis = window.speechSynthesis;
let recognition;
let voiceModal;

// Check browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const hasRecognition = !!SpeechRecognition;

function createVoiceModal() {
    if (document.querySelector('.voice-modal')) {
        document.querySelector('.voice-modal').classList.add('active');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'voice-modal';
    modal.innerHTML = `
        <div class="voice-header">
            <div class="voice-status">
                <div class="voice-waves" id="voice-waves">
                    <div class="voice-bar"></div><div class="voice-bar"></div><div class="voice-bar"></div><div class="voice-bar"></div>
                </div>
                JJ TECH AI
            </div>
            <i class="fas fa-times" style="cursor:pointer;" onclick="closeVoiceAssistant()"></i>
        </div>
        <div class="voice-content" id="voice-text">
            Activando sistemas...
        </div>
        <div class="voice-controls">
            ${hasRecognition ? '<div class="listening-indicator">Escuchando...</div>' : '<p style="font-size:12px">Tu navegador no soporta micrófono. Usa los botones.</p>'}
        </div>
    `;
    document.body.appendChild(modal);
    voiceModal = modal;

    setTimeout(() => modal.classList.add('active'), 100);
}

function speak(text) {
    if (synthesis.speaking) synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 1.0;
    utterance.pitch = 1.0; // More natural, less robotic depth

    const textBox = document.getElementById('voice-text');
    if (textBox) typeWriter(textBox, text);

    // Animate waves while speaking
    const waves = document.getElementById('voice-waves');
    if (waves) waves.style.opacity = 1;

    utterance.onend = () => {
        if (waves) waves.style.opacity = 0.5;
        if (hasRecognition) startListening(); // Auto-listen after speaking
    };

    synthesis.speak(utterance);
}

function typeWriter(element, text, i = 0) {
    if (i === 0) element.innerHTML = '';
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(element, text, i + 1), 30);
    }
}

function closeVoiceAssistant() {
    if (voiceModal) {
        voiceModal.classList.remove('active');
        synthesis.cancel();
        if (recognition) recognition.stop();
    }
}

function processCommand(text) {
    text = text.toLowerCase();
    let response = "Hmm, interesante. Cuéntame más o agenda una demo para verlo en acción.";

    if (text.match(/hola|inicio|comenzar|buenos días|buenas tardes/)) {
        response = "¡Hola! Soy el asistente de JJ TECH. Puedo ayudarte a agendar una demo en minutos y explicarte cómo llevar tu negocio al siguiente nivel. ¿Qué tienes en mente?";
    }

    // Web Services
    else if (text.match(/web|página|sitio|internet|online|ecommerce|tienda/)) {
        response = "Creamos webs que venden por ti, 24/7. Nada de plantillas aburridas. ¿Te gustaría ver una demo de lo que podemos hacer?";
    }

    // Pricing (500k COP)
    else if (text.match(/precio|costo|cuánto vale|cotización|presupuesto|dinero/)) {
        response = "Nuestros servicios inician desde 500.000 pesos colombianos. Una inversión pequeña para el retorno que obtendrás. ¿Agendamos una videollamada para darte una cotización exacta?";
    }

    // Demo/Videocall
    else if (text.match(/demo|videollamada|reunión|cita|agendar|ver/)) {
        response = "¡Excelente decisión! Te conectaré con Juan en una videollamada para mostrarte el potencial. Deja tus datos en el formulario y te enviaremos el link de Zoom de inmediato.";
        document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
    }

    // Timeline
    else if (text.match(/tiempo|cuánto tarda|duración|demora/)) {
        response = "Trabajamos a la velocidad de la luz. En cuestión de días tendrás tu sistema listo. Agendemos una videollamada para definir cronogramas.";
    }

    // Contact
    else if (text.match(/contacto|llamar|correo|email|teléfono/)) {
        response = "Estamos a un clic de distancia. Escríbenos abajo o di 'agendar' para coordinar una llamada ahora mismo.";
        document.querySelector('#contacto').scrollIntoView({ behavior: 'smooth' });
    }

    // Fallback
    else {
        response = "Entiendo. Lo mejor sería charlarlo en una videollamada rápida para no perder tiempo. ¿Te parece bien si agendamos?";
    }

    speak(response);
}

function startListening() {
    if (!hasRecognition) return;

    try {
        recognition = new SpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();

        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            console.log('User said:', speechResult);
            // Show what user said briefly
            const textBox = document.getElementById('voice-text');
            textBox.innerHTML = `<em>"${speechResult}"</em>`;

            setTimeout(() => processCommand(speechResult), 1000);
        };

        recognition.onerror = (event) => {
            console.log('Speech recognition error: ' + event.error);
        };
    } catch (e) {
        console.error(e);
    }
}

if (startVoiceBtn) {
    startVoiceBtn.addEventListener('click', () => {
        createVoiceModal();
        const greetings = [
            "¡Hola! Soy tu asistente inteligente. ¿Listo para agendar una demo y digitalizar tu negocio?"
        ];
        speak(greetings[0]);
    });
}
