const http = require('http');

class StoreAPI {
  constructor(url) {
    this.url = url;
  }
  async getSortResult(sortId) {
    return new Promise((resolve, reject) => {
      let uri = `${this.url}/sorted/${sortId}`;
      console.log(`[StoreAPI] Requesting to ${uri}`);
      http.get(uri, (resp) => {
        if(resp.statusCode != 200) {
          console.log("[StoreAPI] Error: Status code " + resp.statusCode);
          return reject("HTTP Status: " + resp.statusCode);
        }
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          let result = JSON.parse(data);
          console.log('[StoreAPI] History entry received: ' + sortId);
          return resolve({
            sortId,
            input: result.input,
            output: result.output,
          })
        });
      }).on("error", (err) => {
        console.log("[StoreAPI] Error: " + err.message);
        reject(err.message)
      });
    });
  }
}

module.exports = StoreAPI;
