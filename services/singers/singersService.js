'use strict';

const
    singers = [{
        id: 1,
        name: 'Elvis Presley',
        origin: 'Memphis, Tenessee - USA',
        styles: [
            'Rock and Roll',
            'Balads'
        ]
    }, {
        id: 2,
        name: 'Frank Sinatra',
        origin: 'New Jersey - USA',
        breeds: [
            'Jazz',
            'Swing'
        ]
    }];


function getSingers(req, res) {
    res.json(singers);
}

function getSingerByID(req, res) {
    let id = req.params.id || 0,
        result = {};

     for (let i = 0; i < singers.length; i++) {
        if (singers[i].id == id) {
            result = singers[i];
            break;
        }
     }

     res.json(result);
}

module.exports = {
    getSingers: getSingers,
    getSingerByID: getSingerByID
};