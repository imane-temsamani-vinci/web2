var express = require('express');
var router = express.Router();

const films = [
    {
        id: 1,
        title: "Creed",
        duration: 113,
        budget: 1.5,
        link: "https://www.imdb.com/title/tt3076658/"
    },
    {
        id: 2,
        title: "Barbie",
        duration: 114,
        budget: 2,
        link: "https://www.imdb.com/title/tt1517268/?ref_=fn_al_tt_1"
    },
    {
        id: 3,
        title: "Le challenge",
        duration: 103,
        budget: 1,
        link: "https://www.imdb.com/title/tt15671028/?ref_=hm_tpks_tt_t_9_pd_tp1_pbr_ic"
    }
];

// Read all the films, filtered by minimum-duration if the query param exists
router.get('/', (req, res) => {
    console.log('GET /films');
    const minimumFilmDuration = req?.query?.['minimum-duration']
        ? Number(req.query['minimum-duration'])
        : undefined;
    if (minimumFilmDuration === undefined) return res.json(films);

    if (typeof minimumFilmDuration !== 'number' || minimumFilmDuration <= 0)
        return res.json('Wrong minimum duration');

    const filmsReachingMinimumDuration = films.filter(
        (film) => film.duration >= minimumFilmDuration
    );
    return res.json(filmsReachingMinimumDuration);
});

// Read the film identified by an id
router.get('/:id', (req, res) => {
    console.log(`GET /films/${req.params.id}`);

    const indexOfFilmFound = films.findIndex((film) => film.id == req.params.id);

    if (indexOfFilmFound < 0) return res.sendStatus(404);

    return res.json(films[indexOfFilmFound]);
});

// Create a film
router.post('/', (req, res) => {
    console.log('POST /films');
    const title =
        req?.body?.title?.trim()?.length !== 0 ? req.body.title : undefined;
    const link =
        req?.body?.link?.trim().length !== 0 ? req.body.link : undefined;
    const duration =
        typeof req?.body?.duration !== 'number' || req.body.duration < 0
            ? undefined
            : req.body.duration;
    const budget =
        typeof req?.body?.budget !== 'number' || req.body.budget < 0
            ? undefined
            : req.body.budget;


    if (!title || !link || !duration || !budget) return res.json('Bad request');

    const lastItemIndex = films?.length !== 0 ? films.length - 1 : undefined;
    const lastId = lastItemIndex !== undefined ? films[lastItemIndex]?.id : 0;
    const nextId = lastId + 1;

    const newFilm = { id: nextId, title, duration, budget, link };

    films.push(newFilm);

    return res.json(newFilm);
});

module.exports = router;