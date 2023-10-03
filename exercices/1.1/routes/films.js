var express = require('express');
var router = express.Router();

const FILMS = [
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

// Read all the movies
router.get('/', function(req, res, next) {
    console.log('GET /films');
    res.json(FILMS);
});

module.exports = router;