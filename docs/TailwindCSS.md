# TailwindCSS

## Configuración

En la configuración de tailwind se reemplaza del tema todos los colores por la paleta de Nodeschool, y se agregan helpers de oscuro y claro que van aumentando su opacidad hasta 95%.

Incluye también helpers de height y width, que suman desde 1 hasta 9 pixeles.

Además esta configuración contiene un helper de box-shadow para la paleta de colores(`pallete`).

## El archivo de configuración

```js
const dark = {}
const light = {}
const pxHelpers = {}
const boxShadow = {}
const pallete = {
  yellow: "#FFDE00",
  grey: "#F5F5F5"
}
;[...Array(18)].map((_, i) => {
  // * dark-05 ~ dark-10 ~ dark-95
  const amount = (0.05 + i * 0.05).toFixed(2)
  const colorName = amount.split(".")[1]
  dark[colorName] = `rgba(0,0,0,${amount})`
  light[colorName] = `rgba(255,255,255,${amount})`
  if (i < 9) {
    // * w-1px h-1px ~ w-9px h-9px | dark-01 ~ dark-02 ~ dark-09
    const n = i + 1
    const pxName = `${n}px`
    dark[`0${n}`] = `rgba(0,0,0,0.0${n})`
    light[`0${n}`] = `rgba(255,255,255,0.0${n})`
    pxHelpers[pxName] = pxName
  }
})
Object.keys(pallete).map((color) => {
  const value = pallete[color]
  boxShadow[color] = `0 0 0 3px ${value}33`
})
module.exports = {
  theme: {
    extend: {
      width: pxHelpers,
      height: pxHelpers,
      zIndex: {
        1: 1
      },
      boxShadow,
      fontFamily: {
        poppins: "'Poppins', sans-serif"
      }
    },
    colors: {
      dark,
      light,
      transparent: "transparent",
      ...pallete
    },
    fontWeight: {
      normal: 400,
      bold: 600,
      black: 900
    }
  },
  ...
}

```

Entonces podríamos usar tailwind de la siguiente manera:

- `w-1px` Para declarar un elemento con un ancho de 1px.
- `w-9px` Para declarar el elemento con ancho de 9px.
- `shadow-grey` Agregará una box-shadow con el color gris de Nodeschool.
- `border-transparent` Borde transparente por si se necesita.
- `font-normal , font-bold, font-black` Para aumentar el font-weight

`font-popins` La fuente que se usa en la comunidad, normalmente usada para titulos y elementos de acción cómo botones, para el cuerpo normalmente se usa `font-sans` con el valor por default en TailwindCSS.


Se recomienda instalar el plugin de intellisense para VsCode de Tailwind, [puedes descargarlo aquí](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).