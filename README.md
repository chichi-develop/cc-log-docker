## Installation

### Add file

#### Download

- Google Drive: chichi-dev/cc-log-docker/cc-log-docker-secret.tar.gz

#### Extract

```
$ cd cc-log-docker
$ tar zxvf cc-log-docker-secret.tar.gz
```

- ./app/src/config/

### Docker Build

#### Create the cc-log-docker:

```
$ cd cc-log-docker
$ docker-compose up -d --build
```

### MongoDB User

```
mongo admin -u root
```

```
> use cclog
> db.createUser( {
    user: "******",
    pwd: "******",
      roles: [
        {
          role: "dbOwner",
          db: "cclog"
        }
      ]
    }
  )
```

```
db.system.users.find()
```
