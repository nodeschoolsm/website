# Cómo colaborar

Nos encantaría que nos colabores a mejorar la comunidad, ni siquiera dudes en hacerlo, si no sabes cómo, nos puedes ayudar en cualquiera de estas maneras:

- Reportando un problema en el website
- Promover la mejora de cierta pieza de código
- Reparando un bloque mal documentado o infuncional
- Proponiendo mejoras visuales y en código
- Colaborando en promover la comunidad
- Discutiendo una manera distinta de cómo manejar el dev track

## ¿Dónde puedo ver con qué colaborar ?

**Issues**

Acá viven features, errores, propuestas, etc relacionadas a este repo, puedes inicar viendo los issues cómo punto de partida.

- [Ver los issues](https://github.com/nodeschoolsm/website/issues)

**Proyecto**

Esta es una manera de visualizar issues que tiene un fin, por ejemplo hacer la landing page, blog, etc. Esto ayuda a dejar un rasgo público de colaboración con la comunidad.

Si gustas colaborar elaborando una página/vista del web o blog te recomiendo visualizar los proyectos.

- [Ver proyectos](https://github.com/nodeschoolsm/website/projects)

<sub>Los proyectos son una manera de "trackear" issues relacionados a cumplir con x cosa y agregar vistas kanban con automatización<sub>

## Colaborando con código

Para el website y el blog usamos **Nextjs, Tailwindcss y Netlify**, por el momento el equipo organizador elabora los _diseños_ del website y luego nos ponemos a codear. Si gustas enviarnos una mejora visual, no dudes en hacerlo : ( .

**Clonar el repo**

```
https://github.com/nodeschoolsm/website.git
```

**Instalar dependencias**

```
cd website
yarn install
```

**Iniciar el modo desarrollo de Next**

```
yarn dev
```

Mientras codeas, ejecuta `yarn lint` para evaluar si el código agregado respeta los lineamientos de la guía de estilos.

Al momento de hacer un `commit` o `push` se ejecutarán comandos de lint y testing para push.

**Haciendo push y proponiendo cambios**

Si tu propuesta resuleve un issue [linkealo en tu PR](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue). Si no, puedes ir al issue, y proponer el PR cómo solución.

## Reporte de errores/bugs/features usando [issues](https://github.com/nodeschoolsm/website/issues)

Para dejar documentadas las colaboraciones y además para promover las colaboraciones open source, pedimos usar issues para reportar inconvenientes y demás cosas relacionadas a este repo. [Abrir un issue](https://github.com/nodeschoolsm/website/issues/new/choose)

## La guía de estilos para codear

El proyecto intenta mantener una consistencia usando la guía [JavaScript Standard Style](https://standardjs.com/). Y cómo linter eslint. [Configuración eslintrc](https://github.com/nodeschoolsm/website/blob/master/.eslintrc.js)

Se modificaron ciertas condiciones de la guia anteriormente sugerida, estas son:

- usar `"` double quotes para strings y template literals en reemplazo por singlequotes `'`
- evaluación "smart" del operador `===` y `==`
- no espaciado luego del nombre de una función `function one()` en vez de `function one ()`

## Licencia

Al contribuir aceptas que tu contenido sea disponible bajo la licencia MIT.

## Código de conducta , FAQ y DevDocs

- [CoC](https://github.com/nodeschoolsm/about/blob/master/CoC.md)
- [FAQ](https://github.com/nodeschoolsm/about/blob/master/FAQ.md)
- [DOCS](https://github.com/nodeschoolsm/website/tree/master/docs)

## Por último

No tengas pena, mucho menos miedo por colaborar, enviar PR's erróneos, issues sin template, por favor, todos aprendemos y se aprende **haciendo** : ).


