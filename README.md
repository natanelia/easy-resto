# EasyResto (API Service)
EasyResto is a restaurant transaction and management system specifically created for Mie OO, Indonesia.

This project is created for the fullfilment of Information System course in Bandung Institute of Technology, Indonesia.

# Installation
- Copy `config.json.default` to `config.json` and change the content as needed.
- Run `npm install`.
- Run `node index.js` and wait until server is listening. This one is to generate initial tables.
- Terminate the `node` instance using `Ctrl + C`.
- Run `./node_modules/.bin/sequelize db:seed:all` to fill database.

# How to Run
- Run `node index.js` in the cloned directory.

# Technology Stacks
- Express
- MySQL
- Sequelize

---
Created with :muscle: by [Natan](mailto:natanelia7@gmail.com).
