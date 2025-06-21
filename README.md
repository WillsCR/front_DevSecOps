# front_DevSecOps

<!-- Badge de estado del workflow CodeQL -->
![CodeQL](https://github.com/WillsCR/front_DevSecOps/actions/workflows/codeql.yml/badge.svg)

> Este badge muestra el estado del análisis de seguridad CodeQL. Si está verde, el análisis pasó correctamente; si está rojo, hubo algún fallo en el workflow.
<!-- Badge de estado del workflow Trivy -->
![Trivy](https://github.com/WillsCR/front_DevSecOps/actions/workflows/trivy.yml/badge.svg)

> Este badge muestra el estado del escaneo de seguridad de contenedores e infraestructura realizado por Trivy.

<!-- Badge de estado del workflow SonarCloud -->
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=WillsCR_front_DevSecOps&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=WillsCR_front_DevSecOps)
> Este badge muestra el estado del análisis de vulnerabilidades de SonarCloud.


## Descripción
Aplicación web simple de notas personales con pipeline DevSecOps integrado.

## Características
- Login básico (autenticación de usuario con formulario y validación)
- Gestión de notas (crear, ver, eliminar, interfaz intuitiva y persistencia en backend)
- Pipeline CI/CD con controles de seguridad (análisis de código con SonarCloud, escaneo de dependencias, CodeQL, Trivy, despliegue automatizado)
- Ejemplo de integración con backend dockerizado
- Archivo .env-example para configuración rápida del entorno

## Instalación Local
```bash
# Clonar el frontend
 git clone https://github.com/tu-usuario/miapp-segura.git
 cd miapp-segura

# Instalar dependencias
 npm install

# Copiar y editar el archivo de entorno para desarrollo
 cp .env-example .env
# Edita las variables de entorno:
#PORT=8080
#NODE_ENV=production
#VITE_BACKEND_IP=http://localhost:3000

# Iniciar la aplicación en modo desarrollo
 npm run dev
```

## Alternativa: Ejecutar con Docker
```bash
# Construir la imagen
 docker build -t miapp-segura-frontend .

# Ejecutar el contenedor
 docker run  -p 8080:8080 --name miapp-segura-frontend miapp-segura-frontend
```

## Backend (dockerizado)
El backend necesario para la app está disponible en:
https://github.com/javierm-0/back_DevSecOps.git

Sigue las instrucciones de ese repositorio para levantar el backend (puedes usar Docker Compose). Asegúrate de que el backend esté corriendo y la variable `VITE_BACKEND_IP` apunte a la URL correcta.

