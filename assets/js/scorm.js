/**
 * ==========================================================
 * SCORM 1.2 WRAPPER ROBUSTO
 *
 * Maneja:
 * - Inicialización
 * - Ubicación del curso
 * - Progreso
 * - Estado del curso
 * - Finalización segura
 *
 * Compatible con:
 * - Moodle
 * - SCORM Cloud
 * - Ejecución local sin SCORM
 * ==========================================================
 */

let scormAPI = null;
let initialized = false;

/**
 * Busca la API SCORM en los frames padres
 */
function findAPI(win) {

    let attempts = 0;

    while (win && attempts < 500) {

        if (win.API) {
            return win.API;
        }

        attempts++;
        win = win.parent;
    }

    return null;
}

/**
 * Obtiene descripción de error SCORM
 */
function getErrorInfo() {

    if (!scormAPI) return "SCORM API no encontrada";

    const code = scormAPI.LMSGetLastError();

    if (code === "0") return "Sin error";

    return scormAPI.LMSGetErrorString(code);
}

/**
 * Inicializa conexión SCORM
 */
export function initSCORM() {

    scormAPI = findAPI(window);

    if (!scormAPI) {

        console.warn("SCORM API no encontrada. Ejecutando en modo local.");
        return false;

    }

    const result = scormAPI.LMSInitialize("");

    initialized = result === "true";

    if (!initialized) {

        console.error("Error inicializando SCORM:", getErrorInfo());
        return false;

    }

    console.log("SCORM inicializado correctamente");

    // Configuración inicial del curso

    const status = scormAPI.LMSGetValue("cmi.core.lesson_status");

    if (!status || status === "not attempted") {

        scormAPI.LMSSetValue("cmi.core.lesson_status", "incomplete");

        scormAPI.LMSSetValue("cmi.core.score.min", "0");
        scormAPI.LMSSetValue("cmi.core.score.max", "100");
        scormAPI.LMSSetValue("cmi.core.score.raw", "0");

        scormAPI.LMSCommit("");
    }

    return true;
}


/**
 * Guarda ubicación del estudiante
 */
export function setLocation(pageIndex) {

    if (!initialized) return;

    try {

        scormAPI.LMSSetValue("cmi.core.lesson_location", pageIndex.toString());

        scormAPI.LMSCommit("");

    } catch (err) {

        console.warn("Error guardando ubicación SCORM");

    }
}


/**
 * Obtiene ubicación guardada
 */
export function getLocation() {

    if (!initialized) return 0;

    try {

        const location = scormAPI.LMSGetValue("cmi.core.lesson_location");

        if (!location) return 0;

        return parseInt(location);

    } catch {

        return 0;

    }
}


/**
 * Guarda progreso como score (0-100)
 */
export function setProgress(percent) {

    if (!initialized) return;

    try {

        scormAPI.LMSSetValue("cmi.core.score.raw", percent.toString());

        scormAPI.LMSCommit("");

    } catch (err) {

        console.warn("Error guardando progreso SCORM");

    }
}


/**
 * Marca el curso como incompleto
 */
export function setIncomplete() {

    if (!initialized) return;

    try {

        scormAPI.LMSSetValue("cmi.core.lesson_status", "incomplete");

        scormAPI.LMSCommit("");

    } catch (err) {

        console.warn("Error marcando curso incompleto");

    }
}


/**
 * Marca el curso como completado
 */
export function setCompleted() {

    if (!initialized) return;

    try {

        scormAPI.LMSSetValue("cmi.core.lesson_status", "completed");

        scormAPI.LMSCommit("");

    } catch (err) {

        console.warn("Error marcando curso completado");

    }
}


/**
 * Finaliza la sesión SCORM
 */
export function finishSCORM() {

    if (!initialized) return;

    try {

        scormAPI.LMSCommit("");
        scormAPI.LMSFinish("");

        initialized = false;

        console.log("Sesión SCORM finalizada");

    } catch (err) {

        console.warn("Error cerrando sesión SCORM");

    }
}


/**
 * Permite verificar si SCORM está activo
 */
export function isSCORMActive() {
    return initialized;
}