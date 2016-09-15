/**
 * Created by moritz on 08.09.16.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function() {
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model');
    require('../app/models/photo.server.model');
    require('../app/models/comment.server.model');

    /*Debug Dummies*/
    var CommentThread = mongoose.model('CommentThread');
    var Reply = mongoose.model('Reply');
    var Photo = mongoose.model('Photo');
    function addPhoto(title, filename){
        var comment = new CommentThread({title: title +" Comments"});
        comment.save(function(err, comment){
            var photo = new Photo({title:title, filename:filename});
            photo.commentId = comment.id;
            photo.save(function(){
                console.log(title + " Saved.");
            });
        });
    }
    CommentThread.remove().exec(function(){
        Photo.remove().exec(function(){
                addPhoto('Strength', 'arch.jpg');
                addPhoto('Power', 'pyramid.jpg');
                addPhoto('Beauty', 'flower.jpg');
                addPhoto('Thoughtful', 'lake.jpg');
                addPhoto('Summer Fun', 'volcano.jpg');
                addPhoto('Sunsets', 'jump.jpg');
            });
    });

    return db;
};