// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars') //不用再填寫副檔名
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
    // 參數變數
    const movieOne = {
        id: 1,
        title: 'Jurassic World: Fallen Kingdom',
        image: 'https://movie-list.alphacamp.io/posters/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg',
    }

    // past the movie data into 'index' partial template
    res.render('index', { movie: movieOne });
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})