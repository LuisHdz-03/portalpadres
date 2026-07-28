# Portal de Padres de Familia - CETIS 27

El portal web oficial del ecosistema digital del CETIS 27, diseñado específicamente para los padres de familia y tutores del plantel. Esta aplicación cliente permite una consulta ágil, clara y segura del estatus escolar, reportes de incidencias y visualización de datos de los estudiantes, garantizando una comunicación transparente entre la institución y el hogar.

---

## Características Principales

*   **Consulta de Estatus en Tiempo Real:** Interfaz intuitiva diseñada para que los tutores supervisen de manera rápida la información del alumno.
*   **Visualización de Reportes e Incidencias:** Módulo dedicado para dar seguimiento a las incidencias registradas en el plantel por el personal administrativo.
*   **Enfoque de Accesibilidad y UX:** Diseño limpio y responsivo adaptado para un público general, facilitando la navegación tanto en dispositivos móviles como en computadoras de escritorio.
*   **Despliegue Continuo (CI/CD):** Configuración lista para entornos de producción en la nube mediante optimizaciones de enrutamiento y rendimiento.

---

## Stack Tecnológico

*   **Frontend Core:** React.js
*   **Herramienta de Construcción (Build Tool):** Vite (Garantizando un entorno de desarrollo ultra rápido y compilaciones optimizadas)
*   **Lenguaje:** TypeScript (Tipado estricto para evitar errores en producción)
*   **Despliegue:** Vercel (`vercel.json`)
*   **Calidad de Código:** ESLint & Prettier

---

## Estructura del Portal Cliente

El proyecto se mantiene ligero y enfocado exclusivamente en las necesidades del usuario final (el tutor):

```text
portalpadres/
├── public/                 # Recursos estáticos (Logotipos institucionales e iconos)
├── src/                    # Código fuente principal de la aplicación
│   ├── app/               # Vistas principales y componentes de navegación
│   ├── components/        # Componentes UI reutilizables y formularios (Login, Cards)
│   └── main.tsx           # Punto de entrada de la aplicación React
├── index.html              # Plantilla base HTML5
├── vercel.json            # Configuración de redirecciones y despliegue para Vercel
└── vite.config.ts         # Configuración del empaquetador Vite
