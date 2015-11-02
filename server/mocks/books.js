module.exports = function(app) {
  var express = require('express');
  var booksRouter = express.Router();

  var books =[
    {
      id: 1,
      title: "titulo 1",
      description: "description del libro 1",
      author: "author 1"
    },
    {
      id: 2,
      title: "titulo 2",
      description: "description del libro 2",
      author: "author 2"
    },
    {
      id: 3,
      title: "titulo 3",
      description: "description del libro 3",
      author: "author 3"
    }
  ];

  booksRouter.get('/', function(req, res) {
    res.send({
      'books': books
    });
  });

  booksRouter.post('/', function(req, res) {
    var newBook = req.body.book;
    var newId = books.length + 1;
    books.push(newBook);
    res.send({
      book: newBook
    });
  });

  booksRouter.get('/:id', function(req, res) {
    res.send({
      'books': {
        id: req.params.id
      }
    });
  });

  booksRouter.put('/:id', function(req, res) {
    res.send({
      'books': {
        id: req.params.id
      }
    });
  });

  booksRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/books', booksRouter);
};
