# Library CRUD RESTful API

## Description

This is a simple CRUD RESTful API for a library.
With goal of showcasing good practices and patterns in various languages and/or frameworks.
It supports books with fields: isbn, title, author and genre.

## API

### Books

#### Get all books

```http request
GET /books
```

#### Get book by id

```http request
GET /books/{id}
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

## Practices and patterns

### [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

The Conventional Commits specification is a lightweight convention on top of commit messages. It provides an easy set of
rules for creating an explicit commit history; which makes it easier to write automated tools on top of. This convention
dovetails with SemVer, by describing the features, fixes, and breaking changes made in commit messages.

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

## License

This project is licensed under the terms of the MIT license.

## Acknowledgements

This project is inspired by [Rimantas](https://github.com/belauzas)
