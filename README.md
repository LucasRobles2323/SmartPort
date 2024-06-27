# SmartPort
Proyecto de Software, digitalizar transporte publico

## Prototipo Funcional.

Se uso Flask para el backend, la razón es que nos enteramos que no se podia el martes de la semana de entrega, y otro trabajo mas pronto nos consumio todo el tiempo, asi que no pudimos pasar de Flask a ExpressJS como inicialmente queriamos.


Se debe tener instalado NodeJS, Ionic, XAMPP y Python (con el PATH activo, es lo que permite instalar librerias con pip).

Cuando se instala Python, se debe marcar la opción de "Add Python (version) to PATH". Agregarlo manualmente puede ser complicado, pese a la cantidad de tutoriales en youtube. Se recomienda borrar y volver a instalar marcando la casilla "Add Python (version) to PATH" en lugar de añadir python al PATH de windows manualmente.

![AddPyToPath](Otros/PythonAddToPath.png)


Una vez instalado Python con el PATH añadido, se dirigen a la carpeta BackEnd por consola **cmd**, y ejecutan el comando 
~~~
py libreries.py
~~~

Ahora debemos inicializar el prototipo en el siguiente orden.

### 1. Iniciar la Base de Datos SQL con XAMPP

Primero preparemos XAMPP, siga las siguientes instrucciones **EN ORDEN**.

1. Iniciar apache en XAMPP

![Apache](Otros/XAMPP_Apache.png)

2. Iniciar mysql en XAMPP

![SQL](Otros/XAMPP_MySQL.png)

3. Ahora con todo iniciado deberia verse asi (**IMPORTANTE:** el puerto en MySQL debe ser $3306$)

![Listo](Otros/XAMPP_Iniciado.png)

4. Ahora, en MySQL presionamos Admin.

![Admin](Otros/XAMPP_MySQL_Admin.png)

### 2. Iniciar el BackEnd

1. Abrir VSCode con el proyecto SmartPort del GitHub.

