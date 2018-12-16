![logo](https://github.com/sabichos/muz/blob/master/src/assets/images/logo.png)
# Muz
A small sample gathering several technologies and techincs, written in [react.js](https://reactjs.org)


### Tested Technologies
1. Creating a Finite State Machine and integrating it with React (in order to replace redux)  
2. Creating an audio player that can play local files  
3. Using web sockets to broadcast notifications  
4. Creating, building, packing and using locally created npm packages  

## Quick Start
### Installation
1. Install npm packages (`npm i`) for `/machine` and for `/` (for the state machine project and the main project)  
2. Run `npm run build` for `/machine` to babel it  
3. Run `npm pack` for `/machine` to pack it  


### Run
1. Run `npm run api` for `/` in order to get the server up and running  
2. Run npm start for `/`  
3. Open the Browser and go to http://localhost:3000, use `?user=yotam` as a querystring in order to be identified  

## Test
### Machine Tests
state machine unit tests are being conducted with [mocha](https://mochajs.org)  
go to `./machine` and use `npm test` to run them

### Site Tests
There are not proper unit tests for the components functionality besides components loading functionlity tests that are using [jest](https://jestjs.io) for the html injection   
use `npm test` to run them

## Further Reading
* good articals and resources about finite state machines for javascript and react  
[Stent (repo)](https://github.com/krasimir/stent)  
[Machina.js (repo)](http://machina-js.org)  
[Mealy machine (artical)](https://en.wikipedia.org/wiki/Mealy_machine)  

* using web sockets  
[socket.io (repo)](https://socket.io)  
[Using socket.io with express.js](https://socket.io/docs/#Using-with-Express)