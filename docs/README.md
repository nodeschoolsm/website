# Documentación para desarrollo

Puedes colaborar mejorando el blog y website con código en cualquiera de estás formas:

1. Agregando componentes primitivos
2. Desarrollando las páginas informativas

Para desarrollar los componentes que se usen en Nodeschool se usa Storybook cada componente listado puede tener está estructura para mantener una codebase saludable y entendible.

Si quieres colaborar con componentes busca los issues que comiencen con el prefijo `[BOOK] - ` esto significa que son componentes de UI que se reutilizan bastante en las plataformas de la comunidad y nos vendría bien una manita codeandolos.

Si lo que gustas es colaborar con una pantalla del blog o website dentro de los issues busca los que tengan el prefijo `[DEV] - ` ya que estos corresponden al desarrollo de dichas plataformas.

## Los componentes de UI

El diseño es creado por el equipo organizador de la comunidad, dejamos caer nuestra inspiración en los canvas de figma. [Ver Figma](https://www.figma.com/file/0OwX2E9ex58fR1m0zEqRIR/NodeSchool-SM?node-id=891%3A6)

Tanto el website cómo el blog tienen componentes comúnes, estos cómponentes son piezas de UI primitivas cómo Botones, Inputs, Burguer, etc.

### Listado necesario a codear

- [Button](./Button.md)

## Instalando dependencias y arrancando

Para instalar dependencias ejecutamos el comando con el que estamos acostumbrados `install`

```
npm install
```

Si usas yarn,

```
yarn install
```

**Iniciando el proyecto**

```js
// package.json
  "scripts": {
    "start:book": "start-storybook -p 7777",
    "build:book": "build-storybook",
    "start": "next dev",
    "build": "NODE_ENV=production next build && next export",
    "lint": "eslint ./pages",
    "test": "jest"
  },
```

Si quieres iniciar el modo desarrollo para componentes ejecuta `start:book`, si quieres arrancar el desarrollo para el blog y website hace `npm run start` ó `yarn start`.

Igulamente para probar el resultado final en los comandos build, `build:book` hará un build para storybook y solamente `build` iniciará el build de next para el website y blog.

## Naming conventions y Folder structure

Los componentes que estén en la master del repo son los componentes disponibles para ser usados por el website y blog, estos residen en [./components](https://github.com/nodeschoolsm/website/tree/master/components) y se sugiere mantener la siguiente estructura de archivos:

```
components/
|-- Componente/
|--|-- index.js
|--|-- index.test.js
|--|-- index.book.js
|--|-- docs.mdx
```

### Resolución de uso

**index.js**

Dónde vivel el código a elaborar para dicho componente.

**index.test.js**

En caso exista un test para dicho componente pedimos lo nombres de esta manera, ten en cuenta que no es necesario incluir el archivo .test.js y puedes hacer omisión de este.

**index.book.js**

El archivo para mostrar el componente en Storybook, es necesario para visualizar y hacer pruebas del componente antes de aprobarlo.

**docs.mdx**

Explicación con tus propias palabras de cómo utilizar el componente.

## Config files

Usamos TailwindCSS, puedes ver la configuración [acá](https://github.com/nodeschoolsm/website/blob/master/tailwind.config.js)

Cómo framework JS se usa [NextJS](https://nextjs.org/)

Para hacer tests se recomienda [Jest](https://jestjs.io/) y además se promueve la elaboración de tests unitarios en el desarrollo del website más no es un **must** hacer dichos tests.

Para promover una guia de estilo y tener código consistente se usa [ESLint](https://eslint.org/). [Ver configuración](https://github.com/nodeschoolsm/website/blob/master/.eslintrc.js)

Para formatear el código respetando la guía de estilos configurada para el linter se usa Prettier, puedes [ver acá el archivo de configuración](https://github.com/nodeschoolsm/website/blob/master/.prettierrc)

El repo tiene husky, en cada commit que realices ejecutará un lint aplicando la configuración del linter y en el push ejecutará el linter y además la secuencia de tests disponibles en el repo.

**[Más información de TailwindCSS](https://github.com/nodeschoolsm/website/blob/master/docs/TailwindCSS.md)**

## Haciendo PR

Para los PR no existe una template por el momento, lo que si es necesario es agregar un prefijo correspondiente del cambio que se gusta integrar, por ejemplo si es para agregar componentes el prefijo `[BOOK]` , para desarrollo en general `[DEV]`.

De ahí las siempre recomendadas prácticas de hacer commits continuamente, dejar mensajes claros y concisos de que se está agregando y lo más importante,... no tener miedo, dejá llegar tu PR, si te equivocaste, para aprender se hacen las cosas :' )

## Recomendaciones

Una que otra ocación ejecutar `test` y `lint` para autoevaluarnos el hecho de pegarnos a la guía de estilos.

Instalar plugins cómo ESLint , Prettier y Jest.
