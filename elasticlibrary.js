const elasticsearch = require('elasticsearch');
const elasticClient = new elasticsearch.Client({
  	host: '127.0.0.1:9200'

});

module.exports = {  //makes it easy to use all the functions 
	// 1. Create index
	createIndex: function(req, res, indexName){

	    elasticClient.indices.create({
	        index: indexName.index   
	    }).then( (response) => {
	        return res.status(200).json(response)
	    }, (err) => {
	        return res.status(500).json(err)
	    });
	},
	
	// 2. Check if index exists
	checkIndex: function(req, res, indexName){
	    elasticClient.indices.exists({
	        index: indexName
	    }).then((resp) => {
	        return res.status(200).send(resp)
	    },(err) => {
	        return res.status(500).send(err)
	    });
	},

	// 3. Add/Update a document
	addDoc: function(req, res, indexName, docType, payload){
	    elasticClient.index({
	        index: indexName,
	        type: docType,
	        body: payload
	    }).then((resp) => {
	        return res.status(200).send({
				error: false,
				error_code: 200,
				message: "Document successfully added",
				resp
			})
	    }, (err) => {
	        return res.status(500).send(err)
	    });
	},

	// 4. Update a document
	updateDoc: function(req, res, index, _id, docType, payload){
		elasticClient.update({
		  index: index,
		  type: docType,
		  id: _id,
		  body: payload
		}, (err, resp) => {
		  	if(err) return res.send(err);
			  return res.send(resp);
		})
	},

	// 5. Search
	search: function(req, res, indexName, docType, payload){
		elasticClient.search({
	        index: indexName,
	        type: docType,
			body: payload
			
	    }).then((resp) => {
	        console.log(resp);
	        return res.json(resp)
	    }, (err) => {
	        console.log(err.message);
	        return res.json(err.message)
	    });
	},

	 // Delete a document from an index
	deleteDoc: function(req, res, index, _id, docType){
		elasticClient.delete({
		    index: index,
			type: docType,
			id: _id,
		}, function(err, resp) {
		    if (err) return res.json(err);
		    return res.json(resp);
		});
	}

};