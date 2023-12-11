// app.js
// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require handlebars in the project
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars') //不用再填寫副檔名
app.use(express.static('public'))  //先走 public 這個資料夾，看有沒有檔案

// routes setting
// index
app.get('/', (req, res) => {
    // past the movie data into 'index' partial template
    res.render('index', { movie: movieList.results});
})

//搜尋電影
app.get('/search', (req, res) => {
    //取得網址的 search=?
    keyword = req.query.keyword 
    const newMovieList = movieList.results.filter(movie => {
        return (movie.title.toLowerCase().includes(keyword.toLowerCase()))
    })
    res.render('index', { movie: newMovieList, keyword: keyword});
})

// movie Info
app.get('/movies/:movie_id', (req, res) => {
    movieID = req.params.movie_id
    movieOne = movieList.results.filter(item => Number(item.id) === Number(movieID))
    // movieOne = movieList.results[Number(movieID)-1]
    res.render('show', { movie: movieOne[0] });
})

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on http://localhost:${port}`)
})