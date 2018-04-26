const movieData = require('./data/movies');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');

const { includes, max, map, isString, isNumber } = require('lodash');

function* idSequence(initial) {
  let i = initial;
  while (true) { yield i++; } // eslint-disable-line no-constant-condition, no-plusplus
}

const movieIdGen = idSequence(max(map(movieData, 'id')) + 1);

const isMovie = (movie) => !!movie.title && isString(movie.title) 
&& !!movie.directors && isString(movie.directors) 
&& !!movie.description && isString(movie.description)
&& !!movie.year && isNumber(movie.year) ;
const hasMovie = (req, res, next) => {
    if (isMovie(req.body)) {
        next();
    } else {
        res.status(404).json({ error: 'invalid payload structure' });
    }
}
const byId = (id) => (movie) => movie.id === +id;


 // ----------  EXPRESS ----------

const app = express();
app.use(bodyParser.json()); 
app.use(morgan('combined')); 

app.get('/services/rest/movies', (req, res) => {
  res.json(movieData);
});

app.post('/services/rest/movies', hasMovie, (req, res) => {
    if (req.body.id) {
        const movie = movieData.find(byId(req.body.id));
        if (movie) {
            const updatedMovie = req.body;
            Object.assign(movie, updatedMovie);
            res.json(movie);
        } else {
            res.status(404).json({ error: 'contact not found' });
        }
    } else {
        const newMovie = req.body;
        newMovie.id = movieIdGen.next().value;
        movieData.push(newMovie);
        res.json(newMovie);
    }
});



app.get('/services/rest/movies/:id', (req, res) => {
  const movie = movieData.find(byId(req.params.id));
  movie ? res.json(movie) : res.status(404).json({ error: 'movie not found' });
});


function matchMoviesForQuery(query) {
    const text = query.text;
    return movieData
        .map(({title, authors}) => ({title, authors})) // expose fields available for search (here hde id)
        .filter((movie) => includes(JSON.stringify(movie).toLowerCase(), text.toLowerCase()));
}

app.get('/services/rest/search', (req, res) => {
  res.json(matchMoviesForQuery(req.query));
});

const delayedRequest = false;
app.get('/services/rest/search/delay', (req, res) => {
  const matches = matchMoviesForQuery(req.query);
  
  if (delayedRequest) {
    console.log(`Serving delayed for: ${text}`);
    setTimeout(() => res.json(matches), 2000)
  } else {
    console.log(`Serving instantly for: ${text}`);
    res.json(matches);
  }
  delayedRequest = !delayedRequest;
});


app.listen(1337, () => console.log('REST API running on port 1337'));
