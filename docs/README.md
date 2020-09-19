# Documentación para desarrollo

## Componentes de UI

El diseño es creado por el equipo organizador de la comunidad, dejamos caer nuestra inspiración en los canvas de figma. [Ver Figma](https://www.figma.com/file/0OwX2E9ex58fR1m0zEqRIR/NodeSchool-SM?node-id=891%3A6)

Tanto el website cómo el blog tienen componentes comúnes, estos cómponentes son piezas de UI primitivas cómo Botones, Inputs, Burguer, etc.

- [Button](./Button.md)

---

Usamos tailwindcss, puedes ver la configuración [acá](https://github.com/nodeschoolsm/website/blob/master/tailwind.config.js)

Cómo framework JS se usa [NextJS](https://nextjs.org/)

Para hacer tests se recomienda [Jest](https://jestjs.io/) y además se promueve la elaboración de tests unitarios en el desarrollo del website más no es un **must** hacer dichos tests.

Para promover una guia de estilo y tener código consistente se usa [ESLint](https://eslint.org/). [Ver configuración](https://github.com/nodeschoolsm/website/blob/master/.eslintrc.js)


Para formatear el código respetando la guía de estilos configurada para el linter se usa Prettier, puedes [ver acá el archivo de configuración](https://github.com/nodeschoolsm/website/blob/master/.prettierrc)

El repo tiene husky, en cada commit que realices ejecutará un lint aplicando la configuración del linter y en el push ejecutará el linter y además la secuencia de tests disponibles en el repo.