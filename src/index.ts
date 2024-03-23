import { app } from './app';
import { appDataSource } from './config/data-source';

const start = async () => {
  
  try {
    appDataSource.initialize()
    .then(() => {
      console.log('connected to DB')
    })
    .catch((error) => console.log(error))
  } catch(err) {
    console.log(err);
  }
  
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });  
}

start();