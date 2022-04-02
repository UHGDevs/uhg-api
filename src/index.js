
exports.Client = require('./client/Client');


/*
TESTS
*/
const Client = require('./client/Client')
const options = {key: ["d104f7a5-10e0-4a51-a966-e8bcab7df5133", "b20aa3e5-73ec-4e33-a921-8666ec4e5ca7a"]}
try {
  call()
} catch (e) {
  console.log(e)
}

async function call() {
  const api = new Client(options)
  let nastaveni =  ["mojang", "hypixel"]
  let result = await api.call("DavidCzPdy", nastaveni)
  console.log(result)
  await delay(10000)
   //result = api.call("DavidCzPdy", nastaveni)
}


function delay(ms) {return new Promise(res => setTimeout(res, ms))}
