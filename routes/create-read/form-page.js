const express = require('express');
const router  = express.Router();
const Task = require('../../models/Task');

/* GET Form Page */
router.get('/form', (req, res, next) => {
  res.render('form-views/form');
});

/* POST Form Page */
router.post('/form-input', (req, res, next) => {
  console.log('the form info: ', req.body);

  Task.create(req.body)
  .then(taskFromDB => {
  res.redirect(`/task-details/`);
  })
  .catch(err => next(err));
});

/*View Task List */
router.get('/task-list', (req, res, next) => {
  Task.find()
  .then(taskFromDB => {
    const data = {
      pageTitle: 'Task List',
      tasks: taskFromDB
    };
    res.render('task-views/task-list', data);
  })
  .catch(err => next(err));
});

//View Details of task//
router.get('/task-details/:taskID', (req, res, next) => {
  Task.findById(req.params.taskID)
  .then(taskFromDB => {
    const data = {
      pageTitle: taskFromDB.title,
      task: taskFromDB
    };
    res.render('task-views/task-details', data)
});
})

module.exports = router;