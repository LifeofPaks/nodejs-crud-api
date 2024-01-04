const crypto = require('crypto')
const requestBodyParser = require('../util/body-parser')
const writeToFile = require('../util/write-to-file')

module.exports = async (req, res) =>{
    if(req.url === '/api/movies'){
       try{
        let body = await requestBodyParser(req)
        body.id = crypto.randomUUID()
        req.movies.push(body)
        writeToFile(req.movies)
        res.writeHead(201, {
            'Content-Type' : 'application/json'
        })
        res.end()
       }
       catch(err){
        console.log(err)
        res.writeHead(401, {
            'Content-Type' : 'application/json'
        })
        res.end({
            title: 'Validation Failed!',
            message: 'Request body is not valid'
        })
       }
    } else{
        res.writeHead(401, {
            'Content-Type' : 'application/json'
        })
        res.end({
            title: 'Request Unavailable',
            message: 'Route not found'
        })
    }
}