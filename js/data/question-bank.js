export const QUESTIONS_BANK = {
    // --- SECCIÓN: HISTORIA Y CONCEPTOS ---
    'dh-001': {
        question: 'En una discusión, alguien afirma: “Los derechos humanos nacen completos con la Declaración Universal de 1948; antes solo existían deberes morales sin valor jurídico”. ¿Cuál opción refuta mejor esa afirmación desde una lectura histórica?',
        options: [
            'Es correcta: antes de 1948 no había normas ni antecedentes sobre derechos.',
            'Es incorrecta: 1948 consolida un hito internacional, pero la idea de derechos se construye históricamente con antecedentes filosóficos y luchas sociales.',
            'Es correcta parcialmente: antes de 1948 existían derechos, pero solo para personas con propiedad.',
            'Es incorrecta: la historia de los derechos humanos comienza exclusivamente con el DIH y los Convenios de Ginebra.'
        ],
        correct: 1,
        feedback: {
            correct: 'La Declaración Universal marca un hito de codificación, pero se apoya en procesos históricos previos y en una evolución progresiva del reconocimiento.',
            incorrect: 'Recuerda que los derechos no aparecieron de la nada en 1948; son el resultado de siglos de evolución filosófica y luchas sociales.'
        }
    },
    'dh-002': {
        question: '¿Cuál de las siguientes medidas podría considerarse regresiva respecto a un derecho social, aunque no lo elimine formalmente?',
        options: [
            'Incrementar gradualmente la cobertura en zonas rurales.',
            'Reasignar recursos destinados a salud preventiva hacia gastos administrativos sin justificación suficiente.',
            'Implementar indicadores de evaluación de calidad del servicio.',
            'Establecer planes piloto antes de una expansión nacional.'
        ],
        correct: 1,
        feedback: {
            correct: 'Correcto. La regresividad se configura cuando se reducen o desvían recursos esenciales sin una justificación constitucionalmente válida.',
            incorrect: 'La regresividad no siempre es eliminar el derecho; puede ser quitarle los recursos necesarios para que funcione correctamente.'
        }
    },

    // --- SECCIÓN: PARTICIPACIÓN Y MECANISMOS ---
    'part-003': {
        question: '¿Cuál elemento distingue estructuralmente el plebiscito frente al referendo?',
        options: [
            'El plebiscito solo puede convocarse por iniciativa ciudadana.',
            'El referendo versa sobre decisiones administrativas, mientras el plebiscito reforma la Constitución.',
            'El plebiscito consulta una decisión política del Ejecutivo; el referendo somete normas jurídicas a aprobación o derogación popular.',
            'El referendo requiere cabildo abierto previo obligatorio.'
        ],
        correct: 2,
        feedback: {
            correct: 'Exacto. El plebiscito es para decisiones políticas del Presidente, mientras el referendo trata sobre la validez de normas jurídicas.',
            incorrect: 'La diferencia clave es el objeto: el plebiscito es para decisiones políticas y el referendo para normas (leyes).'
        }
    },
    'part-004': {
        question: 'En una situación de contaminación ambiental que afecta la salud de una comunidad, ¿qué criterio determina la procedencia simultánea de tutela y acción popular?',
        options: [
            'Que la acción popular sea más lenta que la tutela.',
            'Que exista conexión entre el derecho colectivo afectado y un derecho fundamental cuya vulneración genere perjuicio irremediable.',
            'Que la tutela siempre tenga prioridad por jerarquía constitucional.',
            'Que la comunidad carezca de representación jurídica.'
        ],
        correct: 1,
        feedback: {
            correct: 'Correcto. La tutela procede transitoriamente si la afectación del bien colectivo (ambiente) compromete derechos fundamentales (vida/salud).',
            incorrect: 'La clave es la "conexidad": si el daño ambiental pone en riesgo inminente la salud o vida de las personas, la tutela entra a actuar.'
        }
    },

    // --- SECCIÓN: ENFOQUE DIFERENCIAL Y SOCIAL ---
    'iva-005': {
        question: 'Desde el enfoque diferencial, ¿cuál es la principal razón para diseñar políticas específicas para comunidades étnicas?',
        options: [
            'Garantizar privilegios culturales especiales frente al resto de la población.',
            'Reconocer que la igualdad formal es suficiente para eliminar brechas históricas.',
            'Corregir desigualdades estructurales derivadas de discriminación histórica y proteger la identidad cultural.',
            'Sustituir la legislación general por normativas comunitarias autónomas en todos los casos.'
        ],
        correct: 2,
        feedback: {
            correct: 'Correcto. Busca materializar la igualdad real reconociendo contextos históricos de exclusión.',
            incorrect: 'El enfoque diferencial no busca privilegios, sino corregir desventajas históricas para lograr una igualdad real.'
        }
    },

    // --- SECCIÓN: DIH ---
    'dih-006': {
        question: '¿Cuál situación vulnera de manera más directa el principio de proporcionalidad en el DIH?',
        options: [
            'Atacar un objetivo militar claramente identificado.',
            'Realizar una operación cuyo daño incidental a civiles es excesivo frente a la ventaja militar concreta esperada.',
            'Utilizar armamento permitido por tratados internacionales.',
            'Capturar combatientes enemigos durante hostilidades.'
        ],
        correct: 1,
        feedback: {
            correct: 'Correcto. La proporcionalidad prohíbe ataques donde el daño colateral civil sea mayor al beneficio militar obtenido.',
            incorrect: 'El principio de proporcionalidad se centra en el equilibrio entre la ventaja militar y el posible daño incidental a civiles.'
        }
    },

    // --- SECCIÓN: TUTELA Y DERECHOS SOCIALES ---
    'dh-007': {
        question: 'La tutela procede para proteger un derecho social cuando:',
        options: [
            'El derecho está expresamente listado como fundamental en la Constitución.',
            'Existe vulneración directa de un derecho económico sin mayor análisis.',
            'La afectación del derecho social compromete simultáneamente un derecho fundamental.',
            'Se trate exclusivamente de políticas públicas presupuestales.'
        ],
        correct: 2,
        feedback: {
            correct: 'Correcto. La tutela ampara derechos económicos o sociales por conexidad cuando afectan la vida o la dignidad.',
            incorrect: 'Los derechos sociales se protegen vía tutela cuando su falta de garantía pone en riesgo un derecho fundamental.'
        }
    },

    // --- SECCIÓN: VEEDURÍA Y CONTROL ---
    'part-008': {
        question: 'Una veeduría ciudadana carece de conocimiento técnico sobre el contrato que vigila. ¿Cuál sería la principal consecuencia?',
        options: [
            'Ninguna, porque la participación no requiere formación técnica.',
            'Se limita la efectividad del control social al no poder identificar riesgos o incumplimientos complejos.',
            'La veeduría pierde automáticamente validez jurídica.',
            'El contrato queda suspendido hasta que haya formación especializada.'
        ],
        correct: 1,
        feedback: {
            correct: 'Exacto. El conocimiento técnico fortalece la vigilancia y evita que el control sea solo un trámite formal.',
            incorrect: 'Sin conocimiento técnico, la veeduría existe pero su capacidad de detectar fallos reales se reduce drásticamente.'
        }
    },

    // --- SECCIÓN: DERECHOS COLECTIVOS ---
    'dh-009': {
        question: '¿Cuál característica diferencia un derecho colectivo de un derecho individual?',
        options: [
            'Solo puede ser ejercido por autoridades públicas.',
            'Su titularidad recae en una pluralidad indeterminada de personas y protege intereses comunes.',
            'Siempre requiere daño material comprobado para su exigibilidad.',
            'Solo puede reclamarse en escenarios internacionales.'
        ],
        correct: 1,
        feedback: {
            correct: 'Correcto. Los derechos colectivos pertenecen a todos (como el aire puro) y no a una sola persona de forma exclusiva.',
            incorrect: 'La diferencia es el titular: en el individual eres tú, en el colectivo es la comunidad o un grupo indeterminado.'
        }
    },

    // --- SECCIÓN: DISCAPACIDAD ---
    'iva-010': {
        question: 'Desde el modelo social de la discapacidad, la principal obligación institucional consiste en:',
        options: [
            'Diseñar programas asistenciales temporales.',
            'Exigir certificación médica para acceder a cualquier derecho.',
            'Identificar y remover barreras físicas, sociales y actitudinales que limitan la participación.',
            'Delegar la atención exclusivamente a la familia.'
        ],
        correct: 2,
        feedback: {
            correct: '¡Así es! El problema no es la persona, sino las barreras del entorno que impiden su inclusión.',
            incorrect: 'El modelo social se enfoca en eliminar barreras ambientales y sociales, no en tratar a la persona como un "enfermo".'
        }
    },

    // --- SECCIÓN: VERDADERO/FALSO (Adaptadas a opciones) ---
    'dh-011': {
        question: '¿Es cierto que la obligación de proteger los derechos recae sobre el Estado incluso si la vulneración proviene de particulares?',
        options: ['Falso', 'Verdadero'],
        correct: 1,
        feedback: {
            correct: 'Correcto. El Estado debe prevenir, investigar y sancionar violaciones cometidas por cualquier tercero.',
            incorrect: 'El Estado tiene el deber de garantía, lo que lo obliga a protegernos de abusos de particulares.'
        }
    },
    'part-012': {
        question: '¿La revocatoria del mandato permite terminar el periodo de un gobernante por incumplir su programa?',
        options: ['Falso', 'Verdadero'],
        correct: 1,
        feedback: {
            correct: 'Correcto. Es un instrumento de control político directo de la ciudadanía.',
            incorrect: 'Es verdadero: es el mecanismo para retirar del cargo a alcaldes o gobernadores que no cumplen lo prometido.'
        }
    },
    'dh-013': {
        question: '¿Frente a los derechos sociales el Estado SOLO tiene obligaciones de cumplimiento progresivo?',
        options: ['Falso', 'Verdadero'],
        correct: 0,
        feedback: {
            correct: '¡Bien! El Estado también tiene deberes inmediatos como la no discriminación.',
            incorrect: 'Es falso. Aunque hay metas a largo plazo, hay mínimos que deben garantizarse de inmediato.'
        }
    },
    'dh-014': {
        question: '¿La protección del patrimonio cultural se considera un derecho colectivo?',
        options: ['Falso', 'Verdadero'],
        correct: 1,
        feedback: {
            correct: 'Correcto. Su preservación beneficia a la comunidad en su conjunto.',
            incorrect: 'Es verdadero, ya que el patrimonio no le pertenece a un solo individuo sino a la colectividad.'
        }
    },
    'iva-015': {
        question: '¿El enfoque de derechos en personas mayores implica reconocer su autonomía y participación activa?',
        options: ['Falso', 'Verdadero'],
        correct: 1,
        feedback: {
            correct: '¡Exacto! Supera la visión asistencialista de verlos solo como sujetos de ayuda.',
            incorrect: 'Es verdadero. La vejez no quita la autonomía ni el derecho a decidir.'
        }
    },
    'dih-016': {
        question: '¿El principio de humanidad en el DIH permite causar sufrimiento innecesario por ventaja militar?',
        options: ['Falso', 'Verdadero'],
        correct: 0,
        feedback: {
            correct: 'Correcto. El principio de humanidad prohíbe sufrimientos superfluos sin importar la ventaja.',
            incorrect: 'Es falso. El sufrimiento innecesario está prohibido siempre por las leyes de la guerra.'
        }
    },
    'part-017': {
        question: '¿El cabildo abierto permite a los ciudadanos intervenir ante concejos municipales?',
        options: ['Falso', 'Verdadero'],
        correct: 1,
        feedback: {
            correct: 'Correcto. Es un mecanismo de deliberación pública directa.',
            incorrect: 'Es verdadero. Es el espacio donde la gente puede hablar directamente en el Concejo sobre temas locales.'
        }
    },
    'iva-018': {
        question: '¿La igualdad material exige tratar de manera idéntica a todas las personas?',
        options: ['Falso', 'Verdadero'],
        correct: 0,
        feedback: {
            correct: '¡Exacto! Exige tratar diferente a quienes están en condiciones de desventaja para nivelar la balanza.',
            incorrect: 'Es falso. Tratar igual a los desiguales es injusto. La igualdad material reconoce las diferencias.'
        }
    },
    'dh-019': {
        question: '¿La responsabilidad por daño ambiental genera reparación aunque afecte a una comunidad indeterminada?',
        options: ['Falso', 'Verdadero'],
        correct: 1,
        feedback: {
            correct: 'Correcto. Los intereses difusos dan lugar a acciones de restauración general.',
            incorrect: 'Es verdadero. Al ser un derecho de todos, el daño debe repararse para beneficio de todos.'
        }
    },
    'dh-020': {
        question: '¿Los migrantes pierden sus derechos humanos al estar fuera de su país de origen?',
        options: ['Falso', 'Verdadero'],
        correct: 0,
        feedback: {
            correct: '¡Así es! Son universales y no dependen de fronteras o estatus legal.',
            incorrect: 'Es falso. Los derechos humanos son inherentes a la persona, sin importar en qué país se encuentre.'
        }
    }
};