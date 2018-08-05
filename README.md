#popular table

## Quick Installation and Running on Local

```sh
npm install
npm start
```

## Build

```sh
npm run build
```

### Main Structure

```
search-table
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── components
        ├── chart
            ├── Axes.js
            ├── Axis.css
            ├── Axis.js
            ├── Bar.js
            └── Chart.js
        ├── inc
            ├── Alert.js
            └── Header.js
        ├── List.js
        ├── Login.js
        └── Stats.js
    ├── dummydata
        ├── profile.json
        ├── tables.json
    ├── App.test.js  
    ├── App.css
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── routes.js
    └
```

I categorized my component into 2 type, main and partial component.

Partial component is part of main component (inside foler chart and inc).

Main component is component of every page(login, list and stats).

### Extra Work

I made 'load more' button at search result page. Because not all of the result data is show first.
If there is a lot of table(e.g 1000 table), it will not make the page load longer.
