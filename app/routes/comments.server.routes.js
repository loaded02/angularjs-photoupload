/**
 * Created by moritz on 12.09.16.
 */
var users = require('../../app/controllers/users.server.controller'),
    comments = require('../../app/controllers/comments.server.controller');

module.exports = function (app) {
    // app.route('/api/comments')
    //     .get(comments.list)
    //     .post(comments.create);

    app.route('/api/comments/:commentThreadId')
        .get(comments.read)
        .put(users.requiresLogin, comments.update);
        //.delete(comments.delete);

    app.param('commentThreadId', comments.commentThreadByID);
};