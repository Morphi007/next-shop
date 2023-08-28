```bash
page: https://next-shop-production.vercel.app/
# Next.js Teslo shop App
yarn run dev
# or
yarn dev

para correr local mente se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detache**

- MongoDB URL Local:

```
mongodb://localhost:27017/teslodb
```

## Configurar las variables de entorno

Renombrar el archivo **.env.templante** a **\_.env.**

## Llenar la base de datos con informacion de pruebas

`http://localhost:3000/api/seed`




