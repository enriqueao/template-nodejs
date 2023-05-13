# Example Clean Arch API
## Stack Used
* Redis
* Postgress
* TypeScript
* Docker
* Clean Architecture
* Dependency Injection

you need create a env file called `.env.local` in project root with
```
# App env
PORT=8080
HOST=0.0.0.0

# Database
DB_HOST=database
DB_PORT=5433
DB_USERNAME=username
DB_PASSWORD=password
DB_NAME=wordle-db

# Cache
REDIS_HOST=cache
REDIS_PORT=6380
REDIS_PASSWORD=password
```

## Host

local: http://localhost:8080
