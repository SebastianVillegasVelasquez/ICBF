# PANTALLAS DE EJEMPLO - Ley 1257

Este documento muestra cómo se ven y funcionan las tres pantallas principales del curso.

---

## 1. PANTALLA DE BIENVENIDA (Welcome Screen)

### Ubicación en el código
- **Archivo**: `/js/screens/screen-welcome.js`
- **Clase**: `WelcomeScreen`
- **Tipo en config**: `"welcome"`

### Ejemplo de configuración en course.config.js

```javascript
{
  title: "Bienvenida al Módulo 1",
  type: "welcome",
  config: {
    courseTitle: "Ley 1257: Protección de la mujer",
    moduleNumber: 1,
    moduleTitle: "Introducción a la Ley 1257",
    introText: "La Ley 1257 de 2008 establece normas de sensibilización, prevención y sanción de formas de violencia y discriminación contra la mujer.",
    progressPercent: 10
  }
}
```

### Estructura visual

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║            Bienvenido al Módulo 1                         ║
║      Ley 1257: Protección de la mujer                    ║
║                                                            ║
║  ────────────────────────────────────────────────────────  ║
║                                                            ║
║         Introducción a la Ley 1257                        ║
║                                                            ║
║    La Ley 1257 de 2008 establece normas de               ║
║    sensibilización, prevención y sanción de formas        ║
║    de violencia y discriminación contra la mujer.         ║
║                                                            ║
║          Progreso del curso                               ║
║     [████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]  10%          ║
║                                                            ║
║  ────────────────────────────────────────────────────────  ║
║                                                            ║
║            Haz clic en "Adelante" para continuar          ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### Propiedades configurables

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `courseTitle` | string | Nombre del curso (mostrado en verde) |
| `moduleNumber` | number | Número del módulo |
| `moduleTitle` | string | Título grande del módulo |
| `introText` | string | Texto introductorio del módulo |
| `progressPercent` | number | Porcentaje de progreso (0-100) |

---

## 2. PANTALLA DE VIDEO (Video Screen)

### Ubicación en el código
- **Archivo**: `/js/screens/screen-video.js`
- **Clase**: `VideoScreen`
- **Tipo en config**: `"video"`

### Ejemplo de configuración en course.config.js

```javascript
{
  title: "Video: Contexto Histórico",
  type: "video",
  config: {
    videoUrl: "https://example.com/video1.mp4",
    videoTitle: "Contexto Histórico de la Ley 1257",
    characterName: "Ayla",
    subtitle: "Conoce cómo surgió esta importante normativa",
    characterLeft: "Ayla",
    characterRight: "Simón"
  }
}
```

### Estructura visual

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   Ayla                ┌─────────────────────┐   Simón     ║
║   ╔═══════╗        ┌──┤  Reproductor Video  ├──┐   ╔═══════╗
║   ║       ║        │  │      16:9           │  │   ║       ║
║   ║       ║        │  │  [●] Reproduciendo  │  │   ║       ║
║   ║       ║        │  │  ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬  │  │   ║       ║
║   ║       ║        │  │ ● 0:00 / 5:30      │  │   ║       ║
║   ║       ║        │  │ 🔊 ≣ ◻️               │  │   ║       ║
║   ║       ║        └──┤                     ├──┘   ║       ║
║   ║ (Ilus)║           └─────────────────────┘     ║(Ilus)║
║   ║       ║                                        ║       ║
║   ║       ║        Nombre del Personaje: Ayla     ║       ║
║   ║       ║        "Conoce cómo surgió esta       ║       ║
║   ║       ║        importante normativa"          ║       ║
║   ║       ║                                        ║       ║
║   ║       ║        Contexto Histórico de la Ley    ║       ║
║   ╚═══════╝        1257                           ╚═══════╝
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### Propiedades configurables

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `videoUrl` | string | URL del archivo de video MP4 |
| `videoTitle` | string | Título del video |
| `characterName` | string | Nombre del personaje que habla |
| `subtitle` | string | Subtítulo o descripción del video |
| `characterLeft` | string | Nombre del personaje izquierdo (ilustración) |
| `characterRight` | string | Nombre del personaje derecho (ilustración) |

### Controles de video
- ▶️ Play/Pausa
- 🔊 Volumen
- ◻️ Pantalla completa
- Barra de progreso

---

## 3. PANTALLA DE CARRUSEL (Carousel Screen)

### Ubicación en el código
- **Archivo**: `/js/screens/screen-carousel.js`
- **Clase**: `CarouselScreen`
- **Tipo en config**: `"carousel"`

### Ejemplo de configuración en course.config.js

```javascript
{
  title: "Carrusel de Temas",
  type: "carousel",
  config: {
    slides: [
      {
        icon: "👩‍⚖️",
        title: "Violencia contra la mujer",
        objective: "Acciones u omisiones que causen daño",
        contents: ["Violencia física", "Violencia psicológica", "Violencia sexual", "Violencia económica"]
      },
      {
        icon: "⚖️",
        title: "Derechos Humanos",
        objective: "Derechos fundamentales de toda persona",
        contents: ["Derecho a la vida", "Derecho a la libertad", "Derecho a la dignidad"]
      },
      {
        icon: "🛡️",
        title: "Protección",
        objective: "Medidas para garantizar seguridad",
        contents: ["Medidas cautelares", "Órdenes de restricción", "Programas de protección"]
      },
      {
        icon: "📋",
        title: "Responsabilidad",
        objective: "Obligaciones del Estado",
        contents: ["Prevención", "Investigación", "Sanción", "Reparación"]
      },
      {
        icon: "🤝",
        title: "Participación",
        objective: "Rol de la comunidad",
        contents: ["Denuncia", "Apoyo a víctimas", "Prevención comunitaria"]
      }
    ]
  }
}
```

### Estructura visual

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║                 ◄                    ►                     ║
║            ┌───────────────────────────┐                  ║
║            │                           │                  ║
║            │         👩‍⚖️              │                  ║
║            │                           │                  ║
║            │ Violencia contra la mujer │                  ║
║            │                           │                  ║
║            │  Acciones u omisiones que │                  ║
║            │  causen daño              │                  ║
║            │                           │                  ║
║            │  • Violencia física       │                  ║
║            │  • Violencia psicológica  │                  ║
║            │  • Violencia sexual       │                  ║
║            │  • Violencia económica    │                  ║
║            │                           │                  ║
║            └───────────────────────────┘                  ║
║                                                            ║
║              ● ○ ○ ○ ○                                     ║
║                                                            ║
║            ┌──────────────────────────┐                   ║
║            │    Continuar ➔           │                   ║
║            └──────────────────────────┘                   ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

### Propiedades configurables

#### Para cada slide (elemento en array `slides`)

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `icon` | string | Emoji o icono representativo |
| `title` | string | Título del slide |
| `objective` | string | Objetivo o descripción breve |
| `contents` | array | Lista de puntos de contenido |

### Interactividad del carrusel

- **Flechas laterales**: Navegar entre slides
- **Dots (puntos)**: Ir directamente a un slide
- **Botón "Continuar"**: Avanzar al siguiente módulo/página
- **Animación suave**: Transiciones con fade

---

## FLUJO COMPLETO DE UN MÓDULO

El módulo 2 "Conceptos Fundamentales" muestra todas las tres pantallas en secuencia:

```
MÓDULO 2: Conceptos Fundamentales
│
├─ Página 1: Welcome (Bienvenida)
│  └─ Muestra: Título, intro, progreso (20%)
│
├─ Página 2: Video (Definiciones Clave)
│  └─ Muestra: Video 16:9 + personaje + subtítulo
│
└─ Página 3: Carousel (Temas)
   └─ Muestra: 5 slides con temas, dots, flechas, botón
```

El usuario navega con:
- **Menú derecho (pill-nav)**: Adelante/Atrás entre páginas
- **Barra progreso (arriba-izq)**: Porcentaje del curso completado
- **Interacción en pantallas**: Carrusel, video, etc.

---

## CÓMO PERSONALIZAR CADA PANTALLA

### 1. Cambiar textos de bienvenida
Edita `course.config.js` → busca la pantalla `type: "welcome"` → modifica `config.introText`

### 2. Cambiar video
Edita la URL en `config.videoUrl` (debe ser MP4 o stream compatible)

### 3. Agregar más slides al carrusel
Edita `config.slides` → agrega más objetos con `{ icon, title, objective, contents }`

### 4. Cambiar porcentaje de progreso
Edita `config.progressPercent` en la pantalla welcome

---

## NOTAS IMPORTANTES

- Todas las pantallas incluyen automáticamente el **menú de navegación (pill-nav)** en el lateral derecho
- La **barra de progreso** en la esquina superior izquierda se actualiza según `progressPercent`
- Los videos utilizan **HTML5 nativo**, sin dependencias externas
- El carrusel tiene **animaciones suaves** con transiciones CSS
- Todo es **completamente responsivo** (funciona en móvil, tablet, escritorio)
