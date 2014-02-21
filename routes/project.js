var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project
    .find()
    .exec(afterQuery);



  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  var newProject = new models.Project({
    "title": form_data.project_title,
    "date": new Date(form_data.date),
    "summary": form_data.summary,
    "image": form_data.image_url
  });
  console.log(newProject);
  //var newProject = new models.Project(form_data);
  newProject.save(afterSaving);

  function afterSaving(err) {
    if(err) {console.log(err);res.send(500);}
    res.send(200); //redirect to home
  }

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project
    .find({"_id":projectID})
    .remove()
    .exec(afterRemoving);



  function afterRemoving(err) {
    if(err) console.log(err);
    res.send();
  }

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}