# 0.7. Temas Individuales por Integrante (Informes)

## Informe sobre el trabajo de IoT services

# Proyecto IoT con Azure y ESP32

## Parte Conceptual

### Definición de máquina virtual

Una máquina virtual (VM) es un entorno informático que funciona como un sistema aislado con su propia CPU, memoria, interfaz de red y almacenamiento. Para su creación necesita recursos del hardware que lo hostea. *(Redhat-s.f.)*

### Definición de máquina host

La máquina host es el entorno físico donde el hipervisor es ejecutado para la creación de máquinas virtuales. Este proporciona los recursos físicos que el hiperviso necesita para crearlas.
*(Redhat-s.f.)*

### Definición de máquina invitada 

La máquina invitada es el entorno virtual que se ejecuta dentro de la máquina host después de que el hipervisor las cree. Estas máquinas operan, con algunas limitaciones dependiendo del hipervisor, como una máquina física.
(VMware, s.f.)

### Definición de hipervisor

Un hipervisor es el software que agrupa los recursos informáticos del sistema en que se ejecuta para luego distribuirlos entre las diferentes máquinas virtuales. Luego de asignarlos, se encarga de gestionar como estas usan los recursos. 
*(Redhat-s.f.)*

### Definición de hipervisor tipo 1

Este se utiliza para entornos de producción. Su ejecución se realiza directamente sobre el hardware físico del servidor para no requerir de un sistema operativo anfitrión.
*(Redhat-s.f.)*

### Definición de hipervisor tipo 2

Este se utiliza para entornos de desarrollo y pruebas. Su ejecución se realiza directamente sobre el sistema operativo para obtener los recurso ya, previamente, asignados a este. 
*(Redhat-s.f.)*

### Definición de virtualización

Es la tecnología que permite representar virtualmente a un servidor, almacenamiento, redes y otros artefactos físicos. Los software de virtualización mimican las funciones del hardware real para poder correr máquinas virtuales. Con la virtualización se puede 
*(Amazon-s.f.)*

### Definición de Sistema Operativo

Es un conjunto de programas y servicios que gestionan los recursos físicos de una computadora; también brindan una interfaz de usuario para que se pueda interactura con las aplicaciones de sistema (esta puede ser por linea de comandos o por GUI). Los más usados son Linux, Windows y masOS.
*(IBM, s.f.)*

### Definición de Vmware Workstation

Es un software de hipervisor tipo 2 que permite ejecutar y crear máquinas virtuales creadas dentro este mismo entorno. *(VMware-s.f.)*
---

## Consideraciones Técnicas
Se necesita descargar Vmware workstation para la creación de las máquinas virtuales 


### Componentes del proyecto:

- **Hipervisor tipo 2**: creará las máquinas virtuales.
- **ISO de sistemas operativos**: se usaron dos para esta prueba, una de Windows y otra de Ubuntu
- **HTML**: se uso para la creación del Frontend
- **Python**: se necesito instalar Python para la creación del backend de la aplicación

---

## Pasos para crear una máquina virtual

1. Ingresar a **Create a New Virtual Machine** en Workstation.
![1](./img/1.png)
2. Añadir una ISO en **Installer** (se debe tene una previamente descargada).
![2](./img/2.png)
3. Agregar credenciales de inico (Primera foto es Windows y la Segunda Ubuntu).
![3](./img/3.png)
![4](./img/4.png)
4. Nombrar la máquina virtual.
![5](./img/5.png)
5. Darle un espacio definido (100gb para Windows y 80 para Ubuntu).
![Estructura física del dispositivo](./img/6.png)
6. Entrar a la pestaña de  **Customize Hardware**.
![Estructura física del dispositivo](./img/7.png)
7. Dentro de esta pestaña se debe añadir los recursos necesarios (Agregamos 8 gb de memoria ram y 4 cores de cpu para cada instalación)
![Estructura física del dispositivo](./img/8.png)
8. Finalizar la instalación luego de verificar los cambios
-![Estructura física del dispositivo](./img/9.png)

Luego de concluir con esta parte, se procedió a instalar los equipos. No se detallará la instalación debido a que no se tuvo que realizar procedimientos fuera de lo común.
---


## Encontrar ip pública de Windows y de Ubuntu
Se pusieron los comandos **ipconfig** en el cmd de Windows y **ip a** en Linux:
-![Estructura física del dispositivo](./img/10.png)

-![Estructura física del dispositivo](./img/11.png)

La ip de Windows es **192.168.88.128** y la de Ubuntu **192.168.88.129**

## Pasos para crear un servidor de Python en Ubuntu

1. Abrir la terminal y agregar los siguientes comandos en orden:
mkdir servidor
cd servidor
sudo apt install python3-venv  
python3 -m venv myenv          
source myenv/bin/activate      
pip install flask     

**Esto creará una instancia virtualizada de Python dentro de Ubuntu**

2. Crear la aplicación con el siguiente comando: 
nano app.py

Allí se incluyó el código respectivo en la carpeta código: ubuntu-back.py

3. Se ejecuto en la terminal el siguiente comando para ejecutar el servidor: 

source venv/bin/activate
python3 app.py
-![Estructura física del dispositivo](./img/12.png)

## Pasos para crear un frontend en Windows


1. Se descargó Python desde internet en esta página (se escogió la última versión):
[Python](https://www.python.org/downloads/)
-![Estructura física del dispositivo](./img/13.png)

2. Se añadió el PATH dentro de la descarga.
-![Estructura física del dispositivo](./img/14.png)

3. Se creo el frontend con el siguiente código: Windows-front.html

4. Se ejecuto un servidor web con python con el siguiente comando en el powershell del escritorio
python -m http.server 8000
-![Estructura física del dispositivo](./img/15.png)

5. Se abrió una pestaña de localhost para ver el HTML y al presionar botones de enviar data se puede ver que en Ubuntu aparece el mensaje **Hola desde Windows** y al obtenerlo aparece en la consola del navegador el mismo mensaje.

## Pasos para crear un servidor de Windows

1. Crear un archivo de Python **app.py** y agregar el comando de Windows-front.html.

2. Poner el siguiente comando en powershell del escritorio:  
pip install flask flask-cors

3. Correr la aplicación en powershell:
python3 app.py

## Pasos para crear un cliente en Ubuntu

1. Crear un archivo de html:
nano front.html

2. Ingresar el código de ubuntu-front.html

3. Correr un servidor local con python3 -m http.server 8000:
-![Estructura física del dispositivo](./img/18.png)

4. Abrimos el front en localhost y podemos ver que se pueden enviar y recibir datos con los mensajes de verificación
-![Estructura física del dispositivo](./img/19.png)

## Comparación

1. Ambas corridas demostraron que Windows consume más que Linux, se recomienda usarlo solo para cliente.
-![Estructura física del dispositivo](./img/17.png)
-![Estructura física del dispositivo](./img/20.png)
## Referencias

- [Fusion and Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion)
- [¿Qué es un hipervisor?](https://www.redhat.com/es/topics/virtualization/what-is-a-hypervisor)
- [¿Qué es una máquina virtual?](https://www.redhat.com/es/topics/virtualization/what-is-a-virtual-machine)
