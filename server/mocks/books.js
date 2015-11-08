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
    var data = [];
    books.forEach(function(item){
      data.push({
        type: 'books',
        id: item.id.toString(),
        attributes:{
          title: item.title,
          description: item.description,
          author: item.author
        }
      });
    });

    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: data
    });
  });

  booksRouter.post('/', function(req, res) {
    var newBook = req.body.data.attributes;
    var newId = books.length + 1;

    books.push({
      title: newBook.title,
      description: newBook.description,
      author: newBook.author,
      id: newId
    });
    res.set('Content-Type', 'application/vnd.api+json');
    res.send({
      data: {
        type: 'books',
        id: newId,
        attributes: newBook
      }
    });
  });

  booksRouter.get('/:id', function(req, res) {
    res.send({
      'books': {
        id: req.params.id
      }
    });
  });

  booksRouter.patch('/:id', function(req, res) {
    var bookAttrs = req.body.data.attributes;
    var bookId = req.param('id');
    books.forEach(function(item){
      if(item.id === parseInt(bookId)){
        item.title = bookAttrs.title;
        item.description = bookAttrs.description;
        item.author = bookAttrs.author;
      }
    });
    res.send({
      data: {
        type: 'books',
        id: bookId,
        attributes: bookAttrs
      }
    });
  });

  booksRouter.delete('/:id', function(req, res) {
    var bookId = req.param('id');
    for (var i=0; i < books.length; i++) {
      if (parseInt(bookId) === books[i].id) {
        books.splice(i, 1);
        break;
      }
    }
    res.status(204).end();
  });

  app.use('/api/books', booksRouter);
};
