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
This is the first version of our relational database schema.

![Database schema](./db-info/scjema/db-schema.png)