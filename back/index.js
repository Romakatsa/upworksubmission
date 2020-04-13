const express = require('express');
const https = require('https');
const fetch = require("node-fetch");
const {URL, URLSearchParams} = require('url');

const api = express();

const port = 5000;
const api_key = process.env.API_KEY || "DEMO-API-KEY";

const options = {
  method: 'GET',
  headers: {'x-api-key' : api_key}
}

api.get('/votes', async (request, response) => {

    try {
        var url = new URL('https://api.thecatapi.com/v1/votes')
        url.search = new URLSearchParams({limit: 1500}).toString()
        const apiResponse = await fetch(url, options);
        const json = await apiResponse.json();
        response.statusCode = 200;
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
        response.json(json);
    } catch (error) {
        console.log(error);
        response.statusCode = 500;
        response.send({error: 'Server error'})
    }
})

api.listen(port, function () {
    console.log("Server is running on "+ port +" port");
});