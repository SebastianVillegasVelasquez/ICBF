# SISTEMA DE PANTALLAS - Ley 1257

## ✅ Estado del Proyecto

Todo está completamente configurado y listo para usar. El curso ahora usa un **sistema modular de pantallas** en lugar de archivos HTML.

---

## 📁 Estructura de Archivos

```
/js/screens/
├── screen-base.js          # Clase base (render + mount + init)
├── screen-welcome.js       # Pantalla de bienvenida
├── screen-video.js         # Reproductor de video
├── screen-carousel.js      # Carrusel de temas
└── screen-quiz.js          # Pantalla de quiz (ejemplo)

/css/
├── screens.css             # Estilos para todas las pantallas

/js/
├── app.js                  # Renderizador actualizado
└── course.config.js        # NUEVO - Configuración modular del curso

/
├── index.html              # Sin header, con pill-nav y progress bar
└── PANTALLAS_EJEMPLOS.md   # Documentación de uso
```

---

## 🎯 Lo que se hizo

### 1. ✅ Eliminadas páginas HTML antiguas
Borré todos los archivos de `/pages/` y `/assets/pages/`:
- `intro.html`
- `module1.html`
- `module2.html`
- `bienvenida.html`

### 2. ✅ Creado course.config.js modular
El nuevo archivo define **10 módulos** con secuencias de pantallas:

```javascript
// Cada módulo tiene un array de páginas
// Cada página usa un "tipo" específico
modules: [
  {
    title: "Bienvenida",
    pages: [
      {
        type: "welcome",  // Pantalla de bienvenida
        config: { ... }
      }
    ]
  }
]
```

### 3. ✅ Pantallas funcionales

#### **Welcome (Bienvenida)**
- Mensaje de bienvenida + nombre del curso (arriba)
- Título del módulo + texto intro (centro)
- Indicador de progreso (barra teal → amarillo)
- Se usa para iniciar cada módulo

#### **Video (Reproductor)**
- Video 16:9 con controles HTML5
- Nombre del personaje + subtítulo (debajo)
- Espacios laterales para ilustraciones (Ayla, Simón)
- Controles: play/pausa, volumen, pantalla completa

#### **Carousel (Carrusel)**
- Carrusel horizontal con 5 slides
- Cada slide: icono + título + objetivo + contenidos
- Navegación: flechas + dots + botón "Continuar"
- Transiciones suaves con animaciones CSS

### 4. ✅ UI actualizada

**Removido:**
- Header completo
- Menú hamburguesa (comentado, disponible si se necesita)
- Sidebar con módulos

**Agregado:**
- Barra de progreso tipo "chevron" (arriba-izq)
  - Fondo teal, relleno amarillo
  - Muestra porcentaje
- Menú de navegación vertical (pill-nav, derecha)
  - Botones: Inicio, Atrás, Adelante, Descargar
  - Verde oscuro, siempre accesible

---

## 🚀 Cómo el curso funciona ahora

### Flujo de navegación

```
app.js (init)
  ↓
buildRoutes() [lee course.config.js]
  ↓
navigateTo(0) [primera página]
  ↓
renderRoute(route)
  ├─ Si type == "cover" → renderModuleCover()
  ├─ Si type == "welcome" → new WelcomeScreen().mount()
  ├─ Si type == "video" → new VideoScreen().mount()
  ├─ Si type == "carousel" → new CarouselScreen().mount()
  └─ Si type == "html" → fetch y renderizar
  ↓
updateUI() [actualiza progress bar]
  ├─ Calcula porcentaje (visitedSet / totalRoutes)
  ├─ Actualiza barra chevron
  └─ Deshabilita botones si es primera/última página
```

### Datos fluyen así

```
course.config.js (definición estática)
      ↓
router.js (buildRoutes crea rutas)
      ↓
app.js (navigateTo → renderRoute)
      ↓
screen-*.js (render() crea HTML)
      ↓
screen-base.js (mount() inserta en DOM + init())
      ↓
Usuario ve pantalla + puede interactuar
```

---

## 📚 Documentación disponible

Hay 4 archivos `.md` con documentación completa:

1. **PANTALLAS_EJEMPLOS.md** ← EMPIEZA AQUÍ
   - Ejemplos visuales de cada pantalla
   - Configuración paso a paso
   - Estructura de datos

2. **PANTALLAS_GUIA.md**
   - Guía completa en español
   - Cómo agregar nuevas pantallas
   - Ejemplos de extensión

3. **FLUJO_VISUAL.md**
   - Diagramas ASCII del flujo
   - Arquitectura del sistema

4. **SCREEN_SYSTEM.md**
   - Documentación técnica
   - API de clases

---

## 🎮 Ejemplo: Módulo 2 completo

En `course.config.js`, el módulo 2 "Conceptos Fundamentales" tiene:

```javascript
{
  title: "Conceptos Fundamentales",
  description: "Definiciones y terminología clave",
  showCover: true,
  pages: [
    // Página 1: Bienvenida
    { type: "welcome", config: { ... } },
    
    // Página 2: Video
    { type: "video", config: { 
        videoUrl: "https://...",
        characterName: "Simón",
        ... 
      } 
    },
    
    // Página 3: Carrusel con 5 slides
    { type: "carousel", config: { 
        slides: [
          { icon: "👩‍⚖️", title: "Violencia...", ... },
          { icon: "⚖️", title: "Derechos...", ... },
          { icon: "🛡️", title: "Protección...", ... },
          { icon: "📋", title: "Responsabilidad...", ... },
          { icon: "🤝", title: "Participación...", ... }
        ]
      } 
    }
  ]
}
```

Esto crea **3 páginas navegables** en secuencia.

---

## 🔧 Para editar el curso

### Cambiar texto de bienvenida
```javascript
// En course.config.js, busca:
{ type: "welcome", config: {
    moduleTitle: "AQUÍ", ← Edita este
    introText: "O AQUÍ" ← Y este
  }
}
```

### Cambiar video
```javascript
// En course.config.js, busca:
{ type: "video", config: {
    videoUrl: "AQUÍ va la URL", ← Nueva URL
    characterName: "Nuevo nombre" ← Nuevo personaje
  }
}
```

### Agregar slide al carrusel
```javascript
// En course.config.js, en config.slides:
slides: [
  // Slides existentes...
  {  // ← Nuevo slide
    icon: "🆕",
    title: "Nuevo tema",
    objective: "Descripción breve",
    contents: ["Punto 1", "Punto 2", "Punto 3"]
  }
]
```

---

## 🎨 Colores y estilos

Todo usa **variables CSS** definidas en `/css/theme.css`:

- `--green-main`: #20b2aa (botones, títulos)
- `--yellow-main`: #ffc107 (relleno progreso)
- `--teal-main`: #20b2aa (fondo barra progreso)
- `--amber-main`: #c17f3a (pill-nav, menú)

Para personalizar colores, edita `theme.css`.

---

## ✨ Características

✅ **Completamente modular** — Agregar pantallas es trivial
✅ **Sin hardcoding** — Todo en `course.config.js`
✅ **Responsivo** — Funciona en móvil, tablet, escritorio
✅ **Rápido** — Pantallas se montan instantáneamente
✅ **Accesible** — Aria labels, navegación por teclado
✅ **Extensible** — Puedes crear nuevas pantallas fácilmente

---

## 📖 Próximos pasos

1. Revisa **PANTALLAS_EJEMPLOS.md** para ver ejemplos visuales
2. Modifica `course.config.js` con tu contenido
3. Agrega videos MP4 con las URLs correctas
4. Si necesitas una pantalla personalizada, sigue la guía en **PANTALLAS_GUIA.md**

---

## 🆘 Troubleshooting

### "La pantalla no se ve"
- Verifica que `type` esté correcto: `"welcome"`, `"video"` o `"carousel"`
- Revisa que `config` tenga todas las propiedades requeridas

### "El video no carga"
- Usa URLs de video MP4 directas
- Verifica que el servidor permita CORS

### "El carrusel no aparece"
- Asegúrate de que `slides` no esté vacío
- Cada slide debe tener: `icon`, `title`, `objective`, `contents`

---

## 📞 Contacto

Para dudas sobre las pantallas, revisa los archivos `.md` en la raíz del proyecto.
