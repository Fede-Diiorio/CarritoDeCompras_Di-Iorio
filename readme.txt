<-- CON RESPECTO AL PROYECTO -->

Para esta tercer entrega, decidí utilizar el proyecto que he desarrollado previamente en un curso de desarrollo web de CoderHouse y complementarlo con lo aprendido en este curso. 
Con el fin de alcanzar los objetivos requeridos, desarrollé un programa que simula un carrito de compras.
El programa puede agregar y quitar del carrito teniendo en cuenta el stock de los mismos. Todo esto se lleva a cabo implementando DOM y el uso de Local Storage.

<-- COMO INSTALAR SASS PARA EL CORRECTO FUNCIONAMIENTO DE ESTE PROYECTO -->

1. Abrir la consola en esta carpeta con ctrl+ñ
    a. npm install nodemon node-sass
    b. npm init // Metralleta de enter

2. Abrir el archivo package.json y editarlo
    a. A continuación de && exit 1" colocar una , presionar enter
    y pegar el siguiente texto:

"build-css": "node-sass --include-path scss scss/main.scss css/style.css",
"watch-css": "nodemon -e scss -x \"npm run build-css\""

3. Crear las carpetas con sus respectivos archivos (EN CASO NO SE REQUIERE)
    a. scss/main.scss
    b. css/style.css

4. En la consola correr el comando
    a. npm run build-css //Por única vez
    b. npm run watch-css

--------------------------------------------

5. Cada vez que se quiera seguir compilando en SASS
    a. abrir la consola con ctrl+ñ
    b. npm run watch-css

//FIN