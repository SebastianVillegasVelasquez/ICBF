# 📊 FLUJO DEL SISTEMA DE PANTALLAS - VISUALIZACIÓN

## 1️⃣ ESTRUCTURA GENERAL DEL FLUJO

```
┌─────────────────────────────────────────────────────────────┐
│              USUARIO ABRE EL CURSO                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   app.js - init()      │
        │ Carga course.config.js │
        └────────────┬───────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │ buildRoutes() - Procesa todos  │
        │ los módulos y páginas          │
        │ Array de rutas creado ✓        │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │ navigateTo(0)                  │
        │ Primera página del curso       │
        └────────────┬───────────────────┘
                     │
                     ▼
        ┌────────────────────────────────┐
        │ renderRoute(route)             │
        │ Verifica route.type            │
        └────────────┬───────────────────┘
                     │
      ┌──────────────┼──────────────┬──────────────┐
      │              │              │              │
      ▼              ▼              ▼              ▼
   'cover'       'welcome'       'video'      'carousel'
      │              │              │              │
      ▼              ▼              ▼              ▼
  Portada      Welcome        Video         Carousel
  Screen       Screen         Screen        Screen
```

---

## 2️⃣ CICLO DE UNA PANTALLA (EN DETALLE)

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   1. OBTENER LA RUTA (route)                                 │
│   ├─ route.title        : "Título de la página"              │
│   ├─ route.type         : "welcome"                          │
│   └─ route.config       : { title: "...", content: "..." }   │
│                                                               │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   2. INSTANCIAR LA CLASE (crear objeto)                      │
│   ├─ const screen = new WelcomeScreen(route.config)          │
│   └─ Se ejecuta constructor()                                │
│      ├─ super(config)                                        │
│      ├─ this.el = null                                       │
│      └─ this.config = config                                 │
│                                                               │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   3. MONTAR EN EL DOM (screen.mount(element))                │
│   ├─ renderizar()                                            │
│   │  └─ const html = this.render()                           │
│   │     └─ Retorna string HTML                               │
│   ├─ asignar                                                 │
│   │  └─ element.innerHTML = html                             │
│   ├─ guardar referencia                                      │
│   │  └─ this.el = element                                    │
│   └─ inicializar                                             │
│      └─ this.init()                                          │
│         └─ Agrega event listeners                            │
│                                                               │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   4. USUARIO INTERACTÚA (clicks, cambios, etc)               │
│   ├─ Usuario hace clic en botón                              │
│   ├─ Se dispara event listener (addEventListener)            │
│   └─ Lógica en init() se ejecuta                             │
│      ├─ Cambios visuales                                     │
│      ├─ Validaciones                                         │
│      └─ Disparo de eventos (dispatchEvent)                   │
│                                                               │
└───────────────────────────────┬───────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   5. NAVEGACIÓN A SIGUIENTE PANTALLA                         │
│   ├─ Usuario hace clic en "Adelante"                         │
│   ├─ navigateTo(currentIndex + 1)                            │
│   ├─ Se destruye pantalla anterior                           │
│   └─ Se repite desde paso 1 con nueva ruta                   │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 3️⃣ FLUJO DE CONFIG → PANTALLA

```
course.config.js
│
└─ modules[0]
   └─ pages[0]
      {
        title: "Bienvenida",
        type: "welcome",           ◄─── Define qué pantalla usar
        config: {                  ◄─── Datos personalizados
          courseTitle: "Ley 1257",
          moduleNumber: 1,
          moduleTitle: "Introducción",
          introText: "Bienvenido...",
          progressPercent: 25
        }
      }
           │
           ▼
   app.js - renderRoute(route)
      │
      ├─ if (route.type === 'welcome')
      │  │
      │  └─ const screen = new WelcomeScreen(route.config)
      │     {
      │       courseTitle: "Ley 1257",
      │       moduleNumber: 1,
      │       ...
      │     }
      │     │
      │     ▼
      │  screen-module-intro.js - render()
      │     │
      │     └─ const { courseTitle = '...', ... } = this.config
      │        └─ return `
      │             <div class="screen screen-welcome">
      │               <h1>${courseTitle}</h1>
      │               ...
      │             </div>
      │           `
      │
      └─ screen.mount(appEl)
         └─ appEl.innerHTML = html
         └─ this.el = appEl
         └─ this.init()
            └─ Agrega event listeners
```

---

## 4️⃣ ESTRUCTURA DE CARPETAS COMPLETA

```
proyecto/
│
├─ index.html                   ◄─── Archivo principal
│  └─ <div id="app"></div>      ◄─── Aquí se montan pantallas
│
├─ js/
│  ├─ app.js                    ◄─── PUNTO DE ENTRADA
│  │  ├─ buildRoutes()
│  │  ├─ renderRoute()          ◄─── RENDERIZADOR DE PANTALLAS
│  │  ├─ navigateTo()
│  │  └─ updateUI()
│  │
│  ├─ course.config.js          ◄─── CONFIGURACIÓN DEL CURSO
│  │  └─ modules[i].pages[j].config
│  │
│  ├─ screens/                  ◄─── CARPETA DE PANTALLAS
│  │  ├─ screen-base.js         ◄─── CLASE BASE (NO MODIFICAR)
│  │  │  └─ render()
│  │  │  └─ init()
│  │  │  └─ mount(element)
│  │  │
│  │  ├─ screen-module-intro.js      ◄─── Pantalla 1
│  │  ├─ screen-video.js        ◄─── Pantalla 2
│  │  ├─ screen-carousel.js     ◄─── Pantalla 3
│  │  ├─ screen-quiz.js         ◄─── EJEMPLO: Nueva pantalla
│  │  └─ screen-miPantalla.js   ◄─── TU NUEVA PANTALLA
│  │
│  └─ otros archivos...
│
├─ css/
│  ├─ theme.css                 ◄─── COLORES Y VARIABLES
│  ├─ layout.css
│  ├─ components.css
│  ├─ screens.css               ◄─── ESTILOS DE PANTALLAS
│  └─ ...
│
└─ PANTALLAS_GUIA.md            ◄─── DOCUMENTACIÓN (TÚ ESTÁS AQUÍ)
```

---

## 5️⃣ EJEMPLO: FLUJO COMPLETO (Welcome Screen)

```
1. Usuario abre course → app.js init()
   │
2. buildRoutes() crea array de rutas
   │
3. navigateTo(0) → primera ruta
   │
4. getRoute(0) retorna:
   {
     title: "Bienvenida",
     type: "welcome",
     config: { courseTitle: "...", progressPercent: 0 }
   }
   │
5. renderRoute(route) → if (route.type === 'welcome')
   │
6. new WelcomeScreen(route.config)
   ├─ constructor() → this.config = { courseTitle, progressPercent, ... }
   │
7. screen.mount(appEl)
   ├─ render()
   │  └─ const { courseTitle, progressPercent } = this.config
   │  └─ return HTML con ${courseTitle}, ${progressPercent}
   │
   ├─ appEl.innerHTML = html
   │
   ├─ this.el = appEl
   │
   └─ init()
      └─ No hay event listeners en Welcome
         (El usuario solo ve info)
      │
8. Barra de progreso superior actualiza con updateUI()
   │
9. Usuario ve:
   ┌──────────────────────────────┐
   │  Progreso: ██░░░░░░░░ 0%     │  ◄─ Barra superior
   ├──────────────────────────────┤
   │                              │
   │  Bienvenido al Módulo 1      │  ◄─ from config
   │  Ley 1257                    │
   │                              │
   │  Introducción                │
   │  Texto introductorio...      │
   │                              │
   │  0%                          │  ◄─ progressPercent
   │                              │
   ├──────────────────────────────┤
   │ [Atrás] [Adelante]           │  ◄─ Navegación (pill-nav)
   └──────────────────────────────┘
   │
10. Usuario hace clic en "Adelante"
    │
11. navigateTo(1) → siguiente ruta
    │
12. Repite desde paso 4 con nueva pantalla...
```

---

## 6️⃣ AGREGAR NUEVA PANTALLA: PASO A PASO VISUAL

```
┌─────────────────────────────────────────────────────────────┐
│ PASO 1: Crear archivo screen-miPantalla.js                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  import { Screen } from './screen-base.js';                │
│                                                             │
│  export class MiPantallaScreen extends Screen {            │
│    render() {                                              │
│      const { titulo = 'Mi Pantalla' } = this.config;       │
│      return `<div class="screen screen-miPantalla">        │
│                <h1>${titulo}</h1>                          │
│              </div>`;                                      │
│    }                                                       │
│                                                             │
│    init() {                                                │
│      // Event listeners aquí                              │
│    }                                                       │
│  }                                                         │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ PASO 2: Importar en app.js                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  import { MiPantallaScreen } from './screens/...'          │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ PASO 3: Agregar a renderRoute() en app.js                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  } else if (route.type === 'miPantalla') {                │
│    const screen = new MiPantallaScreen(route.config);      │
│    screen.mount(appEl);                                    │
│  }                                                          │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ PASO 4: Definir en course.config.js                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  {                                                         │
│    title: "Mi Página",                                    │
│    type: "miPantalla",  ◄─ Tu nuevo tipo                  │
│    config: {                                              │
│      titulo: "¡Mi pantalla personalizada!"               │
│    }                                                       │
│  }                                                         │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ PASO 5: Agregar estilos en screens.css                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  .screen-miPantalla {                                      │
│    display: flex;                                         │
│    justify-content: center;                               │
│    align-items: center;                                   │
│  }                                                         │
│                                                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│ ✅ LISTO!                                                    │
│ Tu pantalla se renderizará automáticamente cuando          │
│ navegues a esa página.                                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 7️⃣ CICLO DE DATOS (DATA FLOW)

```
┌─────────────────┐
│ course.config   │  ← Fuente de datos (JSON)
│ (estática)      │
└────────┬────────┘
         │
         ├─→ modules
         │   └─→ pages[0..n]
         │       └─→ type: 'welcome' | 'video' | etc
         │       └─→ config: { ...datos personalizados }
         │
         ▼
┌─────────────────┐
│ app.js          │  ← Lógica principal
│ buildRoutes()   │     Procesa y crea rutas
└────────┬────────┘
         │
         ├─→ Array routes[]
         │   └─→ routes[0].type
         │   └─→ routes[0].config
         │
         ▼
┌─────────────────┐
│ renderRoute()   │  ← Renderizador
│ (dinámico)      │     Elige pantalla según type
└────────┬────────┘
         │
         ├─→ if (type === 'welcome')
         │   └─→ new WelcomeScreen(config)
         │
         └─→ Montar en DOM
             ├─ render()   ← Usa this.config
             ├─ init()     ← Agrega listeners
             └─ Display
```

---

## 8️⃣ COMUNICACIÓN ENTRE PANTALLAS

```
Pantalla A                Pantalla B
(e.g., Quiz)              (e.g., Results)
    │
    └─ dispatchEvent('quiz-complete')
       │
       ▼
    app.js
    (escucha eventos)
       │
       └─ navigateTo(nextIndex)
          │
          ▼
          renderRoute(nextRoute)
          │
          └─ new ResultsScreen(config)
```

---

**¡Este es el corazón del sistema de pantallas! 🚀**
