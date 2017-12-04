// Server routes

// Bring controllers
var headlinesInControllersFile = require("../controllers/headlines");
var notesInControllersFile = require("../controllers/notes");

module.exports = function(router) {
  // homepage route
  router.get("/", function(req, res) {
    res.render("home");
  });

  // handlebars rendering
  router.get("/saved", function(req, res) {
    res.render("saved");
  });

  // scrapes
  router.get("/api/fetch", function(req, res) {
    headlinesInControllersFile.fetch(function(err, docs) {
    
      if (!docs || docs.insertedCount === 0) {
        res.json({
          message: "No new articles today. Check back tomorrow!"
        });
      }
      else {
        
        res.json({
          message: "Added " + docs.insertedCount + " new articles!"
        });
      }
    });
  });

  //route for headlines
  router.get("/api/headlines", function(req, res) {
    
    headlinesInControllersFile.get(req.query, function(data) {
     
      res.json(data);
    });
  });

  // deletes headlines
  router.delete("/api/headlines/:id", function(req, res) {
   
    var query = { _id: req.params.id };

    headlinesInControllersFile.delete(query, function(err, data) {
      res.json(data);
    });
  });

  // updates headline
  router.put("/api/headlines", function(req, res) {
    
    headlinesInControllersFile.update(req.body, function(err, data) {
   
      res.json(data);
    });
  });

  // handles notes
  router.get("/api/notes/", function(req, res) {

    notesInControllersFile.get({}, function(err, data) {
      
      res.json(data);
    });
  });

  // notes for particular headline id
  router.get("/api/notes/:headline_id", function(req, res) {
    var query = { _id: req.params.headline_id };

   
    notesInControllersFile.get(query, function(err, data) {
      
      res.json(data);
    });
  });

  // deletes a note for perticular id
  router.delete("/api/notes/:id", function(req, res) {
    var query = { _id: req.params.id };

    notesInControllersFile.delete(query, function(err, data) {
      
      res.json(data);
    });
  });

  // saving note
  router.post("/api/notes", function(req, res) {
    notesInControllersFile.save(req.body, function(data) {
      
      res.json(data);
    });
  });
};