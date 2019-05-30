const express = require('express'),
    router = express.Router(),
    ExecutivesModel = require('../models/ceos');

router.get('/', (req, res, next) => {
    renderExecs(res)
        ////////////////////////////////////////////////////
        // Instead of renderExecs we can do the following //
        ////////////////////////////////////////////////////

        // const allExcutives = await ExecutivesModel.getAll();
        // res.status(200).render('template', 
        //     {
        //         locals: {
        //             title: 'Apples CEO!',
        //             executiveList: allExcutives
        //         },
        //         partials: {
        //             partial: 'partial-ceos'
        //         }
        //     }
        // );
});

router.post('/', (req,res) => {
    const { name, year } = req.body;
    // Add the executive
    ExecutivesModel.add(name,year)
    .then(() => {
        renderExecs(res)

        ////////////////////////////////////////////////////
        // Instead of renderExecs we can do the following //
        ////////////////////////////////////////////////////

        // const allExcutives = await ExecutivesModel.getAll();
        // res.status(200).render('template', 
        //     {
        //         locals: {
        //             title: 'Apples CEO!',
        //             executiveList: allExcutives
        //         },
        //         partials: {
        //             partial: 'partial-ceos'
        //         }
        //     }
        // );
    })
    .catch(err => res.sendStatus(500).send(err.message));
})


async function renderExecs(res){
    const allExcutives = await ExecutivesModel.getAll();
    // We need this in post
    return res.status(200).render('template', {
        locals: {
            title: 'Apples CEO!',
            executiveList: allExcutives
        },
            partials: {
            partial: 'partial-ceos'
        }
    });
}

module.exports = router;