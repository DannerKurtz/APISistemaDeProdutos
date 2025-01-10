// Importing the server where express is set up
import { server } from './server';

// Defining the port that will be listened to when initializing the application
server.listen(5002, () => {
  console.log('server funcionando');
});
