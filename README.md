# MiniMax - Alpha-Beta Pruning Visualizer -Grp5

Este proyecto es una visualización interactiva del algoritmo MiniMax y la poda Alpha-Beta en árboles de decisiones. Está construido con HTML, CSS, JavaScript, y utiliza la librería Bootstrap para el diseño y jQuery para la manipulación del DOM.

## Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Características](#características)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu_usuario/minimax-alpha-beta-visualizer.git
    ```
2. Navega al directorio del proyecto:
    ```bash
    cd minimax-alpha-beta-visualizer
    ```
3. Abre el archivo `index.html` en tu navegador web.

## Uso

Una vez que hayas abierto `index.html`, verás una interfaz que te permite generar y manipular un árbol de decisiones. Puedes añadir nodos, editar valores, y ejecutar los algoritmos MiniMax y poda Alpha-Beta.

### Opciones del Menú

- **Limpiar todo**: Reinicia el árbol a su estado inicial.
- **Generar árbol ejemplo**: Crea un árbol de ejemplo para probar las funcionalidades.
- **Ejecutar**:
  - **MiniMax**: Ejecuta el algoritmo MiniMax en el árbol actual.
  - **Poda Alpha-Beta**: Ejecuta el algoritmo de poda Alpha-Beta en el árbol actual.

### Interacción

- Haz clic en un nodo para ver opciones adicionales, como añadir hijos, editar el valor o eliminar el nodo.
- Usa los botones de navegación para avanzar y retroceder en los pasos de ejecución del algoritmo.
- Visualiza el resultado final de los algoritmos presionando "Ver resultado".

## Estructura del Proyecto

- `index.html`: Contiene la estructura principal del HTML.
- `css/`
  - `menu.css`: Estilos para el menú de navegación.
  - `style.css`: Estilos generales del proyecto.
- `js/`
  - `main.js`: Lógica principal del proyecto, incluyendo la implementación de MiniMax y poda Alpha-Beta.
  - `jquery-1.8.3.js`: Biblioteca jQuery.
  - `jquery-ui-1.9.2.custom.min.js`: Biblioteca jQuery UI.

## Características

- **Interfaz amigable**: Usa Bootstrap y FontAwesome para un diseño moderno y accesible.
- **Interactividad**: Añade, edita y elimina nodos del árbol fácilmente.
- **Visualización**: Observa paso a paso la ejecución de los algoritmos MiniMax y poda Alpha-Beta.
- **Documentación**: Incluye un manual de usuario y un video tutorial para facilitar el uso.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu contribución (`git checkout -b feature/nueva-característica`).
3. Confirma tus cambios (`git commit -am 'Añadir nueva característica'`).
4. Sube la rama (`git push origin feature/nueva-característica`).
5. Abre un Pull Request.

## Licencia

Derechos reservados.
