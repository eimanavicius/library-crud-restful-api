# Library CRUD RESTful API

## Description

This is a simple CRUD RESTful API for a library.
With goal of showcasing good practices and patterns in various languages and/or frameworks.
It supports books with fields: isbn, title, author and genre.

## API

### Books

#### Get all books

```http request
GET /books`
```

#### Get book by id

```http request
GET /books/{id}`
```

#### Create book

```http request
POST /books
Content-Type: application/json

{
    "isbn": "978-3-16-148410-0",
    "title": "The Hitchhiker's Guide to the Galaxy",
    "author": "Douglas Adams",
    "genre": "Science Fiction"
}
```

## License

This project is licensed under the terms of the MIT license.

## Acknowledgements

This project is inspired by [Rimantas](https://github.com/belauzas)
