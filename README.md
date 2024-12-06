# UTN TRABAJOS PRÁCTICOS

Este repositorio incluye trabajos presentados en los distintos módulos de la diplomatura en Desarrollo Web Full Stack de la Universidad Nacional Tecnológica

## Trabajo Práctico 1

El primer trabajo consiste en una página web estática utlizando HTML y CSS

### Modelo del Trabjo

Se optó por desarrollar una tienda online de instrumentos musicales que muestra las categorías de productos y los más populares en ventas. A su vez permite contactarse con la misma a través de un mensaje directo rellenando un formulario o a través de otros canales como correo electrónico o WhatsApp

### Herramientas Utilizadas

- Fuentes de la librería de Google (Google Fonts)
- Íconos de la librería de BoxIcons
- Imágenes extraídas de la web
- Formulario (funcionalidad del mismo) con formspree.io


## Trabajo Práctico 2

El segundo trabajo consiste en una página web en la cual, una de sus secciones, extrae datos de APIs mediante JavaScript

### Modelo del Trabajo

Para este trabajo se utilizaron APIs de Harry Potter para crear una página que brinde información sobre la saga relacionada a Hogwarts y otros lugares, criaturas y objetos del mundo mágico. Junto con información de cada personaje de la historia (nombre, especie, casa a la que pertenece, etcétera)

### Herramientas Utilizadas

- Imágenes Extraídas de la web
- Chat GPT para desarrollo de texto sobre lugares y objetos del mundo mágico


## Trabajo Práctico 4

### Aplicacion de Gestión de Usuarios

Esta es una aplicación de administración de usuarios construida con Node.js. La aplicación te permite gestionar usuarios mediante argumentos desde la línea de comandos. A continuación, se detallan las funcionalidades y cómo usarlas.

### Integrantes

-Emmanuel Isaac
-Carlos Romano
-Luis Furtado
-Juan Pablo Rosso
-Thiago Cugliari
-Carlos Pastore

### Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/JuanPabloRosso/TP-1-Rosso-Juan-Pablo-Backend.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd TP-1-Rosso-Juan-Pablo-Backend

    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

### Comandos

La aplicación proporciona varios comandos para gestionar usuarios:

#### `list`

Lista todos los usuarios en el sistema.

```bash
node index.js list
```

#### `search`

Busca un usuario por su ID.

```bash
node index.js search <id>
```

Reemplaza `<id>` con el ID del usuario que deseas buscar.

#### `add`

Añade un nuevo usuario.

```bash
node index.js add <nombre> <apellido> <email> <password>
```

Reemplaza `<nombre>`, `<apellido>`, `<email>` y `<password>` con los datos del nuevo usuario.

#### `update`

Actualiza la información de un usuario existente.

```bash
node index.js update <id> <nombre> <apellido> <email> <password>
```

Reemplaza `<id>` con el ID del usuario que deseas actualizar, y `<nombre>`, `<apellido>`, `<email>` y `<password>` con la nueva información del usuario.

#### `delete`

Elimina un usuario por su ID.

```bash
node index.js delete <id>
```

Reemplaza `<id>` con el ID del usuario que deseas eliminar.

#### `help`

Muestra una lista de todos los comandos disponibles y cómo usarlos.

```bash
node index.js help
```


## Trabajo Práctico 5

### API Formula 1

El quinto trabajo práctico consiste en el desarrollo de una API para gestionar pilotos de Formula 1 permitiendo la creación, lectura, actualización y borrado de cada uno de estos. El sistema CRUD cuanta con un proceso de autenticación que autoriza a ejecutar las acciones antes mencionadas a aquellos usuarios que estén registrados y hayan iniciado sesión mediante un nombre de usuario y una contraseña

### Teconologías empleadas

- Node.js
- TypeScript
- MongoDB
- Json Web Token
- Bcrypt

### Instalación



1. Clona el repositorio:

```bash
git clone https://github.com/carlosmpastore/utn_trabajos_practicos.git  
```

2. Navega al directorio del proyecto:
3. 
```bash 
cd trabajo_practico_5/backend
```

3. Instala las dependencias:

```bash
npm install
```

4. Configuración Variables de Entorno

El nombre de las variables de entorno utilizadas en el proyecto se encuentran en el archivo .env.example. Debe crearse un archivo .env con las mismas para poder ejecutarse el sistema


5. Inicialización del servido

```bash 
npm run start
```


### Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.
