const express = require('express')
const ejs = require('ejs')
const path = require('path')

const app = express();
const port = 3000;

app.use(express.static('./public'))

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})