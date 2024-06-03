# Dicionary api

## Overview

This project is a backend test, basically it is a dictionary, where you can have definitions of words, add words to your favorites list, remove words from your favorites and see a history of words already visited.

## Techs

- Nestjs 
- Typescript
- MongoDB
- Docker
- Github actions
- Husky
- Prettier
- Axios
- Swagger

## Obs

I chose to use **Nest**, as it greatly facilitates concepts such as dependency injection and is 'almost ready' to scale, things such as documentation it also facilitates, so there were several factors that contributed to this choice.

## Challenges

The biggest challenge of the project was the popular database, I had never done this before, so it was a bit complicated at first, but with a lot of research I managed to solve it and everything worked out.


## Running Application

### Step 1: Clone this repo

First, clone your project repository:

```bash
git clone https://github.com/hebertsanto/API-Dictionary.git
```

Navigate to the `API-Dictionary` folder

### install packages

```bash
 npm install
```

### Running server

```bash
 npm run start:dev
```

### docker image

```bash
 dokcer componse -build
```

### Access the documentation

- **GET** `/api/docs`

>  This is a challenge by [Coodesh](https://coodesh.com/)


