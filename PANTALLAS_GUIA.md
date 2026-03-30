# Sistema de Pantallas Modulares del Curso ICBF

## 📚 Descripción General

Este curso utiliza un **sistema de pantallas modular y reutilizable** que permite agregar nuevas pantallas sin modificar el código existente. Cada pantalla es una clase JavaScript independiente que se renderiza según su tipo.

---

## 🎯 Las Tres Pantallas Principales

### 1. **Pantalla de Bienvenida** (`screen-welcome.js`)
Muestra la bienvenida al módulo con:
- Mensaje de bienvenida + nombre del curso (arriba)
- Título del módulo + texto introductorio (centro)
- Indicador de progreso del curso (barra)
- Diseño limpio y sin elementos gráficos

**Uso en config:**
```js
{
  title: "Bienvenida",
  type: "welcome",
  config: {
    courseTitle: "Ley 1257",
    moduleNumber: 1,
    moduleTitle: "Introducción",
    introText: "Bienvenido...",
    progressPercent: 25
  }
}
```

---

### 2. **Pantalla de Video** (`screen-video.js`)
Reproductor de video 16:9 con:
- Video centrado con controles básicos (play/pausa, volumen, pantalla completa)
- Nombre del personaje + subtítulo debajo
- Espacios sugeridos para ilustraciones de personajes en laterales (Ayla, Simón)
- Menú de navegación (pill-nav)

**Uso en config:**
```js
{
  title: "Video Módulo",
  type: "video",
  config: {
    videoUrl: "https://ejemplo.com/video.mp4",
    videoTitle: "Introducción al tema",
    characterName: "Ayla",
    subtitle: "Explica los conceptos básicos",
    characterLeft: "Ayla",
    characterRight: "Simón"
  }
}
```

---

### 3. **Pantalla de Carrusel** (`screen-carousel.js`)
Carrusel horizontal con:
- 5 diapositivas (una por módulo)
- Cada diapositiva: ícono + título + objetivo + contenidos
- Paginación con dots
- Flechas de navegación izquierda/derecha
- Botón "Continuar" al final
- Incluye barra de progreso + menú de navegación

**Uso en config:**
```js
{
  title: "Módulos",
  type: "carousel",
  config: {
    slides: [
      {
        icon: "🌳",
        title: "Módulo 1",
        objective: "Aprender los conceptos básicos",
        contents: ["Tema 1", "Tema 2", "Tema 3"]
      },
      // ... más diapositivas
    ]
  }
}
```

---

## 🚀 Cómo Agregar una Nueva Pantalla

### **Paso 1: Crear la Clase de la Pantalla**

Archivo: `/js/screens/screen-miPantalla.js`

```javascript
import { Screen } from './screen-base.js';

export class MiPantallaScreen extends Screen {
  render() {
    // Destructurar configuración
    const {
      titulo = 'Mi Pantalla',
      contenido = 'Contenido por defecto'
    } = this.config;

    // Retornar HTML
    return `
      <div class="screen screen-miPantalla">
        <h1>${titulo}</h1>
        <p>${contenido}</p>
        <button id="mi-boton">Haz clic aquí</button>
      </div>
    `;
  }

  init() {
    // Aquí van TODOS los event listeners
    const boton = this.el.querySelector('#mi-boton');
    
    boton?.addEventListener('click', () => {
      console.log('Botón clickeado');
      
      // Opcional: disparar evento personalizado
      this.el.dispatchEvent(
        new CustomEvent('miPantalla-complete', {
          detail: { resultado: 'éxito' }
        })
      );
    });
  }
}
```

### **Paso 2: Importar en `app.js`**

Archivo: `/js/app.js` (línea ~30)

```javascript
import { MiPantallaScreen } from './screens/screen-miPantalla.js';
```

### **Paso 3: Agregar al Renderizador**

Archivo: `/js/app.js` (función `renderRoute`, línea ~280)

```javascript
function renderRoute(route) {
  // ... código existente ...
  
  } else if (route.type === 'miPantalla') {
    const screen = new MiPantallaScreen(route.config || {});
    screen.mount(appEl);
    
  } else if (route.type === 'video') {
    // ... siguiente pantalla
  }
}
```

### **Paso 4: Definir en `course.config.js`**

Archivo: `/js/course.config.js`

```javascript
modules: [
  {
    title: "Mi Módulo",
    pages: [
      {
        title: "Mi Pantalla Personal",
        type: "miPantalla",  // ← Tu nuevo tipo
        config: {
          titulo: "¡Hola desde mi pantalla!",
          contenido: "Este es contenido personalizado"
        }
      }
    ]
  }
]
```

### **Paso 5: Agregar Estilos CSS**

Archivo: `/css/screens.css` (al final)

```css
/* ─ Mi Pantalla ─ */
.screen-miPantalla {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.screen-miPantalla h1 {
  font-size: 2rem;
  color: var(--green-main);
}

#mi-boton {
  padding: 12px 24px;
  background: var(--green-main);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
```

---

## 📁 Estructura del Proyecto

```
/vercel/share/v0-project/
├── js/
│   ├── app.js                    (Punto de entrada, renderizador)
│   ├── course.config.js          (Configuración del curso)
│   ├── screens/
│   │   ├── screen-base.js        (Clase base - NO MODIFICAR)
│   │   ├── screen-welcome.js     (Pantalla de bienvenida)
│   │   ├── screen-video.js       (Pantalla de video)
│   │   ├── screen-carousel.js    (Pantalla de carrusel)
│   │   ├── screen-quiz.js        (EJEMPLO: Quiz interactivo)
│   │   └── screen-miPantalla.js  (TU NUEVA PANTALLA)
│   └── ...otros archivos
├── css/
│   ├── theme.css                 (Variables de color y tema)
│   ├── layout.css                (Estructura general)
│   ├── components.css            (Componentes reutilizables)
│   ├── screens.css               (Estilos de pantallas)
│   └── ...
└── pages/
    └── ...contenido HTML antiguo
```

---

## 🔧 Cómo Funciona el Sistema

### 1. **Renderizado Automático**
Cuando navegas a una página, `app.js` llama a `renderRoute(page)`:

```javascript
function renderRoute(route) {
  // route.type determina qué pantalla mostrar
  if (route.type === 'welcome') {
    new WelcomeScreen(route.config).mount(appEl);
  }
  // ...
}
```

### 2. **Ciclo de Vida de una Pantalla**
```
┌─────────────────────────────────┐
│ 1. Crear instancia               │
│    new MiPantallaScreen(config)  │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│ 2. Montar en el DOM              │
│    screen.mount(elemento)        │
│    ├─ Renderiza render()         │
│    └─ Llama init()               │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│ 3. Usuario interactúa            │
│    ├─ Event listeners activos    │
│    ├─ Dispatcher de eventos      │
│    └─ Cambios visuales           │
└────────────┬────────────────────┘
             │
┌────────────▼────────────────────┐
│ 4. Navegación a siguiente        │
│    page.dispatchEvent()          │
│    navigateTo(nextIndex)         │
└─────────────────────────────────┘
```

### 3. **Flujo de Datos**
```
course.config.js
    ↓
    └─→ pages[i].config  (JSON)
        ↓
        └─→ renderRoute(page)
            ↓
            └─→ new ScreenClass(page.config)
                ├─ render()  (HTML con config)
                └─ init()    (Event listeners)
```

---

## 💡 Consejos y Buenas Prácticas

### ✅ **DO** (Deberías hacer esto)

- ✅ Almacena TODO en `route.config` — sin hardcoding
- ✅ Usa `render()` solo para HTML
- ✅ Usa `init()` para event listeners
- ✅ Destructura config al inicio de `render()`
- ✅ Usa CSS classes, no inline styles
- ✅ Comenta tu código si es complejo
- ✅ Reutiliza pantallas en múltiples módulos

```javascript
// ✅ BIEN
export class MyScreen extends Screen {
  render() {
    const { title = 'Default' } = this.config;
    return `<h1>${title}</h1>`;
  }
  
  init() {
    this.el.querySelector('h1')?.addEventListener('click', () => {
      // manejo del evento
    });
  }
}
```

### ❌ **DON'T** (No hagas esto)

- ❌ No uses hardcoding — TODO debe ser configurable
- ❌ No mezcles HTML con event listeners en `render()`
- ❌ No uses `el.onclick = ...` — usa `addEventListener`
- ❌ No modifiques la clase `Screen` base
- ❌ No hagas AJAX en `render()` — hazlo en `init()`

```javascript
// ❌ MAL
export class MyScreen extends Screen {
  render() {
    return `
      <h1 onclick="myFunction()">Hardcoded</h1>
      <button onclick="fetch('/data')">Get Data</button>
    `;
  }
}
```

---

## 🎨 Colores Disponibles

En `/css/theme.css` están definidos estos colores:

```css
--green-main: #20b2aa      /* Verde principal */
--green-mid: #17998f       /* Verde medio */
--green-light: #4dd0c1     /* Verde claro */
--teal-main: #20b2aa       /* Teal/Turquesa */
--yellow-main: #ffc107     /* Amarillo */
--text-main: #333333       /* Texto principal */
--text-dim: #666666        /* Texto atenuado */
--border: #e0e0e0          /* Bordes */
--white: #ffffff           /* Blanco */
```

Úsalos en CSS así:
```css
.mi-elemento {
  color: var(--green-main);
  background: var(--white);
  border: 1px solid var(--border);
}
```

---

## 📋 Checklist para Agregar una Nueva Pantalla

- [ ] Crear archivo `/js/screens/screen-miNombre.js`
- [ ] Extender de `Screen`
- [ ] Implementar `render()`
- [ ] Implementar `init()`
- [ ] Importar en `/js/app.js`
- [ ] Agregar a `renderRoute()` en `/js/app.js`
- [ ] Definir en `/js/course.config.js`
- [ ] Agregar estilos en `/css/screens.css`
- [ ] Probar en el navegador
- [ ] Documentar si es compleja

---

## 🆘 Solución de Problemas

### La pantalla no aparece
- Verifica que `type` en config coincida con el que agregaste a `renderRoute()`
- Verifica que importaste la clase en `app.js`
- Abre la consola del navegador (F12) para ver errores

### Los event listeners no funcionan
- Verifica que los selectores CSS en `init()` son correctos
- Asegúrate que llamas a `this.el.querySelector()`, no `document.querySelector()`
- Los listeners deben estar en `init()`, no en `render()`

### Los estilos no se ven
- Verifica que agregaste las clases CSS a los elementos HTML
- Usa `.screen-miNombre` como clase principal
- Verifica que el CSS está en `/css/screens.css` o importado en `index.html`

---

## 📖 Recursos

- **Archivo de Documentación Completa:** `SCREEN_SYSTEM.md`
- **Ejemplo Práctico:** `screen-quiz.js`
- **Configuración del Curso:** `course.config.js`
- **Clase Base:** `screen-base.js` (NO MODIFICAR)

---

**¡Ahora estás listo para crear tus propias pantallas!** 🚀
