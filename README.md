# fs5-recomendador-backend
uRecommend.me - backend

## Team
- Melissa Dávila ([@Meldavmar](https://github.com/Meldavmar))
- José Alberto Pérez ([@japmelian](https://github.com/japmelian))
- Alejandro Suárez ([@Aletf7](https://github.com/Aletf7))

## Dataset
In this project we are using a subset of [The Movies Database](https://www.kaggle.com/rounakbanik/the-movies-dataset) created by [Rounak Banik](https://github.com/rounakbanik)) and posted in [Kaggle](https://www.kaggle.com). This dataset contains metadata from 45.000 movies released on or before July 2017.

As the original datasets is about 1Gb of data, we decided to preprocess this raw data in order to work with the information that we want to work with. Because of that we randomly selected 10.000 movies with a subset of the attributes of the main dataset.

This data has been cleaned and proccessed in order to fullfill the requirements of the database schema.

## Database schema
Our database `urecommendme` has three (3) collections named `media`, `tags` and `users`.

### `media` collection
The documents in this collections have the following media objects:

**KEY**|**TYPE**|**VEXPLANATION**
:-----:|:-----:|:-----
`id`|string| ID of media document
`original_language`|string| Original media language
`original_title`|string| Original media title
`overview`|string| Media overview
`release_date`|string| Media release date
`runtime`|number| Media length
`title`|string| Media title (default)
`rating`|number| Media rating
`tags`|array of `tags` items| Media tags in format `{id: number, name: string}`
`ratings`|array of `ratings` items| Media ratings from users in format `{id: number, rating: number}`

### `tags` collection
The documents in this collections have the following tag objects:

**KEY**|**TYPE**|**VEXPLANATION**
:-----:|:-----:|:-----
`id`|string| ID of tag document
`name`|string| Tag name
`media`|array of `id: number` from `media` items| Media tagged

### `users` collection
The documents in this collections have the following user objects:

**KEY**|**TYPE**|**VEXPLANATION**
:-----:|:-----:|:-----
`id`|string| ID of user document
`name`|string| Username
`password`|string| User password
`email`|string| User email
`ratings`|array of `ratings` items| Media rated by the user in format `{id: number, rating: number}`


## Endpoints definition
In the above table there is a detailed information about the endpoints of our app.

**ENTITY**|**TYPE**|**URL**|**PERMISSIONS**|**EXPLANATION**
:-----:|:-----:|:-----|:-----:|:-----
media|DELETE|/media/:id\_media|admin|Delete media id\_media
media|GET|/media|users|Return a list of all media items
media|GET|/media/:id\_media|users|Returns a media by id\_media
media|GET|/media/tag/:id\_tag|users|Returns all media items tagged by id\_tag
media|POST|/media|admin|New media item
media|PUT|/media/:id\_media|admin|Update media by id\_media
tags|DELETE|/tags/:id\_tag|admin|Delete the tag id\_tag
tags|GET|/tags|users|Return a list of all tags
tags|GET|/tags/:id\_tag|users|Return a specific tag by id\_tag
tags|POST|/tags|admin|New tag
users|DELETE|/users/:id\_user|users|Delete user
users|GET|/users|admin|Return a list of all users
users|GET|/users/:id\_user|admin|Return a specific user by id\_user
users|PUT|/users/:id\_user|users|Update user info by id\_user
users|POST|/users|users|Create new user