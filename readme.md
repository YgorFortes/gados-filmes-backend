### Fork project

clone your project
```bash
    git clone https://github.com/<your user name>/gados-filmes-backend
```
check remotes
```bash
    git remote -v
    origin  https://github.com/<your user name>/YOUR_FORK.git (fetch)
    origin  https://github.com/<your user name>/YOUR_FORK.git (push)
```
add main project to upstream
```bash
    git remote add upstream https://github.com/AndersonAndrad/gados-filmes-backend.git
```
check have all links repositories
```bash
    git remote -v
    origin    https://github.com/<your user name>/YOUR_FORK.git (fetch)
    origin    https://github.com/<your user name>/YOUR_FORK.git (push)
    upstream  https://github.com/AndersonAndrad/gados-filmes-backend.git (fetch)
    upstream  https://github.com/AndersonAndrad/gados-filmes-backend.git (push)
```

### In your project
After install docker in your OS
 
run docker (pass any name)
```bash
    docker build -t your_image_name .
```

run docker container
```bash
    docker-compose up -d
```

- copy and past env.example to env and pass necessary data

- create your model in prisma/schema.prisma

- sync prisma
```bash
    prisma db push 
```

- after insert model run to generate migration
```bash
    prisma migrate dev --name <migration name>
```
```bash
    prisma migrate dev
```

