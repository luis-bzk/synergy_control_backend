<h1 align="center"><b>SynergyControl</b> - La unión inteligente para gestionar, controlar y potenciar tu negocio</h1>
<h2 align="center"><b>Backend</b></h2>

<p align="center">Servicio API del lado del backend</p>

- [Introducción](#introducción)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Crear Base de Datos.](#crear-base-de-datos)

## Introducción

SynergyControl es mucho más que un simple sistema; es la solución definitiva para facilitar y optimizar todas las
operaciones de tu empresa. Con una interfaz intuitiva y poderosas capacidades, nuestra plataforma te permite crear
productos, gestionar inventarios, realizar ventas, fidelizar clientes, administrar empleados, crear tareas, controlar
datos, generar informes, gestionar facturación y mucho más, todo en un solo lugar.

Nuestro enfoque es la sinergia, la idea de que todas las partes de tu negocio trabajen en armonía para lograr resultados
excepcionales. Con SynergyControl, tus departamentos se conectarán de manera fluida y eficiente, garantizando una visión
integral y una toma de decisiones más informada.

La inteligencia empresarial es la clave de nuestro sistema. Te brindamos análisis en tiempo real y datos precisos para
que puedas entender mejor el rendimiento de tu negocio y detectar oportunidades de crecimiento. Ya no te sentirás
abrumado por la complejidad de la gestión, porque SynergyControl te simplificará cada paso del camino.

Únete a la próxima generación de empresarios exitosos y descubre cómo SynergyControl puede revolucionar tu empresa. No
importa el tamaño o el sector, estamos aquí para ayudarte a alcanzar tus metas de manera más rápida y efectiva.

¡Prepárate para experimentar la potencia de la sinergia empresarial con SynergyControl!

## Instalación

Para poder realizar la reconstrucción e instalación de los módulos se requiere ejecutar los siguientes comandos

```bash copy
npm run install
npm run dev
```

## Configuración

Cambiar el nombre del archivo __.env.template__ a __.env__ y establecer las variables de entorno

## Crear Base de Datos.

La base que se esta usando es PostgreSql, es necesario ejecutar el siguiente codigo para la creacion de la base de datos
y el schema correspondiente.

```sql copy
create database synergy_control;

\c synergy_control;

CREATE SCHEMA CORE;
```