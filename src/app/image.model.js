var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection(process.env.DB);
autoIncrement.initialize(connection);

var imgSchema = new Schema({
     fileId: String,
	 uploadIP: String,
	 updateDate: {
		 type: Date,
		 default: Date.now
	 }
});

bookSchema.plugin(autoIncrement.plugin, "Image");
module.exports = connection.model("Image", imgSchema);
