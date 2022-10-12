const request = require("request")

async function getGoogleHomePage() {
  return new Promise((resolve, reject) => {
    request("http://www.google.com", (error, response, body) => {
      if (error) return reject(error)
      console.log("statusCode:", response && response.statusCode)
      console.log("body:", body)
      resolve(body)
    })
  })
}

getGoogleHomePage()
  .then(result => {
    console.log("RESULT --> ", result)
  })
  .catch(err => {
    console.error("ERROR --> ", err)
  })
