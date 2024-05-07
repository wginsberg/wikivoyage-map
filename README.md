# [Wikivoyage Map](https://whereugo.ing)

Wikivoyage Map is a web application that visually maps all the pages of Wikivoyage.org onto an interactive map interface.

<img src="./screenshot.png">

## Setup

This project works with node version 21.

Install dependencies:
```
npm install
```

Run the application:
```
npm start
```

This repository contains a copy of all of the data it displays. To update the dataset with the latest pages from Wikivoyage run the following commands (it may take several minutes):
```
> npm run fetch-wiki-data     # downloads raw data from Wikivoyage

> npm run build-data          # processes data into into an intermediate sqlite database and the final public/world.json file
```

Note that text from Wikivoyage is licenced under <a href="https://creativecommons.org/licenses/by-sa/3.0/" rel="noopener noreferrer" target="_blank">Creative Commons Attribution-ShareAlike 3.0</a> and can be redistributed with attribution back to Wikivoyage directly.
