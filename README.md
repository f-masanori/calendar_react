### docker 上でのReact環境構築方法

Dockerfile

```dockerfile
FROM node:8.16.0-alpine  
WORKDIR /usr/src/app

```

docker-compose.yml

```docker-compose.yml
version: '3.3'

services: 
    node:
        build: .
        volumes:
        - ./:/usr/src/app
        ports:
        - "3000:3000"
        command: sh -c "cd calender_react && yarn start"
```

これで

``docker-compose run --rm node sh -c "npx create-react-app アプリ名 --typescript"``

### Dockerコンテナへの入り方

### npm インストール時
CXX=clang++ npm install　　
オプションつける
