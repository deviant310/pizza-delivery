# Pizza Delivery frontend


## Installation
Its better to start from [backend](https://github.com/jfxteam/sa-pizza-delivery/blob/master/README.md)

Then do the following steps:
___



Clone the repository to your server and run command:
```bash
npm -i
``` 

If you want to build your bundle in the ```/dist``` folder run the command:
```bash
npm run build:prod
``` 
or you can specify the output folder to get build on your [backend](https://github.com/jfxteam/sa-pizza-delivery/blob/master/README.md) root folder:

```bash
npm run build:prod -- --env.output-path=../sa-pizza-delivery/frontend
```

Your bundle is ready, go to the server and run the app!