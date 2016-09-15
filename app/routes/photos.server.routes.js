/**
 * Created by moritz on 12.09.16.
 */
var users = require('../../app/controllers/users.server.controller'),
    photos = require('../../app/controllers/photos.server.controller');

module.exports = function (app) {
    app.route('/api/photo')
        .get(photos.getPhoto);

    app.route('/api/photos')
        .get(photos.getPhotos);
};