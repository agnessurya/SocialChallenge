vue create client di terminal 1 lagi sambil kerjain server

cd server


## Server Setup
npm init -y 
npm i supertest
npm i jest
npm i pg 
npm i express 
npm i sequelize
npm i bcryptjs
npm i jsonwebtoken
npm i cors
npm i --save-dev nodemon
npm i --save-dev sequelize-cli
touch .gitignore => node_modules

## Database Setup
npx sequelize init
set config
npx sequelize db:create
npx sequelize model:generate --name --attributes

For User:
set up hooks in model before create with bcyrptjs
setup validation in model

For Conjungtion Table dont forget setup FK Foreign Key


npx sequelize db:migrate

check dbeaver apakah sudah terkoneksi

Seeding sesuai kebutuhan
npx sequelize seed:generate --name
for user add hashing password

copy data json ke dalam server untuk table entity (kalau ada)

npx sequelize db:seed:all

check dbeaver apakah sudah masuk seedingnya

set up asosiasi on model
Add Relation Many to Many [M:N](https://sequelize.org/master/manual/advanced-many-to-many.html)



## App.js Setup
touch app.js
for port add : process.env.PORT || 3000
jangan lupa module.export = app di app.js buat test
jangan lupa app.use(cors())

JANGAN LUPA AWAIT :D

## App.js Setup
jangan lupa npm i axios di client