# uiw-slider
![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)
[![npm version](https://badge.fury.io/js/uiw-slider.svg)](https://www.npmjs.com/package/uiw-slider)

A lightweight, simple-to-use slider allowing users to make selections from a range of values.

[`Demo`](https://vinhnghi223.github.io/uiw-slider/)

Since this is a web component, you can just use directly in your HTML like
[`this`](https://github.com/vinhnghi223/uiw-slider/blob/master/src/index.html)
To use it with other framework e.g Angular, React, Vue etc. see [`Framework Integrations`](https://stenciljs.com/docs/overview) from Stencil site.

![](https://raw.githubusercontent.com/vinhnghi223/uiw-slider/master/screenshot.png)

## Note
Feature custom color of your choice is still under development

## Using this component

There are three strategies to use web components built with Stencil.

### Script tag

- Put a script tag similar to this `<script type='module' src='https://unpkg.com/uiw-slider@<latest-version>/dist/uiw-slider.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### Node Modules
- Run `npm install uiw-slider --save`
- Put a script tag similar to this `<script type='module' src='node_modules/uiw-slider/dist/uiw-slider.esm.js'></script>` in the head of your index.html
- Then you can use the element anywhere in your template, JSX, html etc

### In a stencil-starter app
- Run `npm install uiw-slider --save`
- Add an import to the npm packages `import uiw-slider;`
- Then you can use the element anywhere in your template, JSX, html etc

## Feedback

If you have found a bug or have another issue with the library —
please [create an issue](https://github.com/vinhnghi223/uiw-slider/issues).

If you have a question regarding the library or it's integration with your project —
consider asking a question at [StackOverflow](https://stackoverflow.com/).

Have any ideas or propositions? Feel free to develop it further. See Developer guide below.

Cheers!

## Developer guide

You're welcome to make this component even more flexible, scalable and robust!
Fork, clone, create a feature branch, implement your feature, cover it with tests, commit, create a PR.

```bash
npm install
npm start // run development server serving src/index.html
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```
### Known problems/limitations
input number currently supports only integer values
it is possible to manually enter fractions (for example 10.9) but the value will be still 10. That said if max value is 10 and user manually enters 10.9 it will not show error about max value

### Honorable mentions
the width of input field is changing dynamicaly based on lenght of number (max width is to fix the parent container)

## Support

If you like this library consider to add star on [GitHub repository](https://github.com/vinhnghi223/uiw-slider).

Thank you!
