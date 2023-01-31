# be.tech API boilerplate

Be.tech backend APIs for mobile and web clients. It uses Node.js with TypeScript with DDD as architectural approach.

- Our main web framework is `Nestjs` and various dependencies from the Nestjs ecosystem.
- To store data we use the `PostgreSQL` database and Prisma as ORM.
- For the API documentation, we use code first flow with the `Swagger` 2.0 plugin. Swagger specification is our single source of truth for the documentation.

## Requirements

| Tool            | Version |
|-----------------|---------|
| node            | 16.15.1 |
| pnpm            | 7.1.9   |
| npm             | 8.5.5   |
| Docker          | 20.10   |
| Docker Compose  | 2.6.0   |

## Installation

### Setup your local environment variables

1. Copy example environment variables: `cp .env.example .env`
2. Edit `.env` file and update configuration

### Install tools

1. Install Node.js: https://nodejs.org/en/download/
2. Install Docker: https://docs.docker.com/get-docker/

### Install NPM packages

`pnpm install`

## Usage

### Run local database and other dependencies by Docker

To run all dependencies for local development, please use Docker and Docker Compose:

1. Copy example Docker Compose configuration: `cp docker-compose.yml.example docker-compose.yml`
2. Make sure you already copied the `.env` file as described in the setup section
3. Startup database container by command: `docker compose up <serviceName1> <serviceNameN>` or use `pnpm docker:up` command to start all dependent service containers.

`pnpm docker:up` - starts all docker services by Docker Compose except application service.
`pnpm docker:down` - stops all docker services.

### Run application with dependencies by Docker

1. Copy example Docker Compose configuration: `cp docker-compose.yml.example docker-compose.yml`
2. Make sure you already copied the `.env` file as described in the setup section
3. Build containers by command: `docker compose build`
4. Startup containers by command: `docker compose up`

### Start application in debug mode

#### Preconditions

- Make sure you already copied the `.env` file as described in the setup section
- Make sure you already have the database up and running and configured connection by the `.env` file (to set up a local database and other dependencies you can use Docker, please see "Run local database and other dependencies by Docker" section)
- Run `pnpm db:migrate` to create database schema (tables, indexes, etc)

`pnpm start:dev` - starts the application, watches the code and automatically recompiles typescript code, and restarts the application

### Linting

`pnpm lint` - lints the code using both eslint and prettier

### Database migration

To update database schema, please use following pnpm scripts: `db:*`

#### Generate database client classes when you modify `schema.prisma` file

`pnpm db:generate`

> All generated code will be stored here: ./node_modules/.prisma (default)

#### Validate Prisma schema when you modify `schema.prisma` file

`pnpm db:validate`

#### Apply all migrations

`pnpm db:migrate`

#### Deletes and recreates the database

`pnpm db:reset`

#### Applies all pending migrations, and creates the database if it does not exist

`pnpm db:deploy`

For more details, please take a look on Prisma documentation: https://www.prisma.io/docs/


## Environment variables

### Required

These environment variables are required to start the container in the natural environment (i.e. AWS).

| Name                      | Description                                                                     |
|---------------------------|---------------------------------------------------------------------------------|
| WEB_PORT                  | Http application port                                                           |
| DATABASE_URL              | Database connection url in format: postgresql://host/db                         |
| REDIS_HOST                | IP or url for connection to Redis                                               |
| REDIS_PORT                | TCP port for connection to Redis                                                |
| REDIS_PASS                | Password for connection to Redis. If redis has a password                       |
| REDIS_DB                  | Redis batabase index                                                            |

