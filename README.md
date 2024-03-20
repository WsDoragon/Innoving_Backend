# Requisitos
* MariaDB
* NodeJS LTS (Estable)

# Pasos
* Importar a MariaDB (MySQL) el archivo “innoving.sql”
   ```MySQL
   
   #Importar la base de datos
   SOURCE Ruta\a\innoving.sql
   
   ```
* Añadir archivo “.env” con las siguientes variables:
  ```ENV
  PORT: Puerto a utilizar por el BackEnd.
  NODE_ENV=development
  DB_NAME: Nombre Base de datos.
  DB_USER: Usuario Base de datos.
  DB_HOST: Host Base de datos.
  DB_DRIVER=mysql
  DB_PASSWORD: Contraseña Base de datos.
  EMAIL_ADDRESS: E-mail para enviar correos.
  EMAIL_PASSWORD: Contraseña E-mail.
  EMAIL_PORT: Puerto utilizado por E-mail (No ingresar de no ser necesario).
  JWT_SECRET: Clave para validar JWT.

  ```
* En terminal dentro de la carpeta introducir ```npm install``` para instalar las dependencias necesarias para el funcionamiento.
* Iniciar:
  > * Utilizar ```npm run dev``` para inicializar como desarrollo el backEnd.
  > * Utilizar ```npm start``` para inicializar el backEnd.
