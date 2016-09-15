/**
 * Created by moritz on 12.09.16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ReplySchema = new Schema({
    username: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    subject: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    body: String
}, { _id: true });

ReplySchema.add({ replies: [ReplySchema] });

var CommentThreadSchema = new Schema({
    title: String,
    replies: [ReplySchema]
});

mongoose.model('Reply', ReplySchema);
mongoose.model('CommentThread', CommentThreadSchema);