const express = require('express');
const path = require('node:path');
const { serialize, parse } = require('../utils/json');

const router = express.Router();
const jsonDbPath = path.join(__dirname, '/../data/films.json');

const listOfFilms = [
  {
    id: 1,
    title: 'Creed',
    duration: 113,
    budget: 1.5,
    link: 'https://www.imdb.com/title/tt3076658/',
  },
  {
    id: 2,
    title: 'Barbie',
    duration: 114,
    budget: 2,
    link: 'https://www.imdb.com/title/tt1517268/?ref_=fn_al_tt_1',
  },
  {
    id: 3,
    title: 'Le challenge',
    duration: 103,
    budget: 1,
    link: 'https://www.imdb.com/title/tt15671028/?ref_=hm_tpks_tt_t_9_pd_tp1_pbr_ic',
  },
];

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
  const minimumFilmDuration = req?.query?.['minimum-duration']
    ? Number(req.query['minimum-duration'])
    : undefined;

  const films = parse(jsonDbPath, listOfFilms);

  if (minimumFilmDuration === undefined) return res.json(films);

  if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
    return res.sendStatus(400);

  const filmsReachingMinimumDuration = films.filter((film) => film.duration >= minimumFilmDuration);
  return res.json(filmsReachingMinimumDuration);
});

// Read the film identified by an id
router.get('/:id', (req, res) => {
  const films = parse(jsonDbPath, listOfFilms);
  const indexOfFilmFound = films.findIndex((film) => film.id === req.params.id);

  if (indexOfFilmFound < 0) return res.sendStatus(404);

  return res.json(films[indexOfFilmFound]);
});

// Create a film
router.post('/', (req, res) => {
  const title = req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
  const link = req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;
  const duration =
    typeof req?.body?.duration !== 'number' || req.body.duration < 0
      ? undefined
      : req.body.duration;
  const budget =
    typeof req?.body?.budget !== 'number' || req.body.budget < 0 ? undefined : req.body.budget;

  if (!title || !link || !duration || !budget) return res.sendStatus(400);

  const films = parse(jsonDbPath, listOfFilms);
  const existingFilm = films.find((film) => film.title.toLowerCase() === title.toLowerCase());
  if (existingFilm) return res.sendStatus(409);

  const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
  const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
  const nextId = lastId + 1;

  const newFilm = { id: nextId, title, duration, budget, link };

  films.push(newFilm);
  serialize(jsonDbPath, films);

  return res.json(newFilm);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const films = parse(jsonDbPath, listOfFilms);
  const foundIndex = films.findIndex((film) => film.id === Number(req.params.id));

  if (foundIndex < 0) return res.sendStatus(404);

  const itemsRemovedFromFilms = films.splice(foundIndex, 1);
  const itemRemoved = itemsRemovedFromFilms[0];

  serialize(jsonDbPath, films);

  return res.json(itemRemoved);
});

// Update one or more properties of a film identified by its id
router.patch('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    (title !== undefined && !title.trim()) ||
    (link !== undefined && !link.trim()) ||
    (duration !== undefined && (typeof req?.body?.duration !== 'number' || duration < 0)) ||
    (budget !== undefined && (typeof req?.body?.budget !== 'number' || budget < 0))
  )
    return res.sendStatus(400);

  const films = parse(jsonDbPath, listOfFilms);
  const foundIndex = films.findIndex((film) => film.id === Number(req.params.id));

  if (foundIndex < 0) return res.sendStatus(404);

  const updatedFilm = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

// Update a film only if all properties are given or create it if it does not exist and the id is not existant
router.put('/:id', (req, res) => {
  const title = req?.body?.title;
  const link = req?.body?.link;
  const duration = req?.body?.duration;
  const budget = req?.body?.budget;

  if (
    !req.body ||
    !title ||
    !title.trim() ||
    !link ||
    !link.trim() ||
    duration === undefined ||
    typeof req?.body?.duration !== 'number' ||
    duration < 0 ||
    budget === undefined ||
    typeof req?.body?.budget !== 'number' ||
    budget < 0
  )
    return res.sendStatus(400);

  const id = Number(req.params.id);

  const films = parse(jsonDbPath, listOfFilms);
  const foundIndex = films.findIndex((film) => film.id === id);

  if (foundIndex < 0) {
    const newFilm = { id, title, duration, budget, link };
    films.push(newFilm);

    serialize(jsonDbPath, films);

    return res.json(newFilm);
  }

  const updatedFilm = { ...films[foundIndex], ...req.body };

  films[foundIndex] = updatedFilm;

  serialize(jsonDbPath, films);

  return res.json(updatedFilm);
});

module.exports = router;
