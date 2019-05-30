const express = require('express'),
    router = express.Router(),
    ExecutivesModel = require('../models/ceos');

router.get('/', async (req, res, next) => {
    const allExcutives = await ExecutivesModel.getAll();

    res.render('template', {
        locals: {
            title: 'Apples CEO!',
            executiveList: allExcutives
        },
        partials: {
            partial: 'partial-ceos'
        }
    });

});

router.post('/', (req,res) => {

    const {names,year} = req.query;
    console.log(names);
})

module.exports = router;