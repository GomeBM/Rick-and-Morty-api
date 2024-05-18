
const express = require('express')
const cors = require('cors')

const PORT = 3000
const app = express()
const baseURL = "https://rickandmortyapi.com/api"

//the more-characters endpoint requires an increasing counter for each subsequent api call
let characterPageCounter = 1 

app.use(cors())

//first api endpoint, will be used only once to fetch the first batch of characters
app.get('/characters', async (req,res)=>{
    try{
        const apiRes = await fetch(`${baseURL}/character`)
        if(!apiRes.ok){
            throw new Error(`HTTP error status : ${apiRes.status}`)
        }
        const data = await apiRes.json()
        console.log(`from app.js get(characters) method the response is : \n${data}`)
        res.json(data)
    }catch(error){
        console.error(`fetch error : ${error}`)
        res.status(500).send('internal server error')
    }
})

/*
after calling the first api endpoint (/characters),
this api endpoint will be used from now on to load more characters
*/
app.get('/more-characters', async (req,res)=>{
    try{
        characterPageCounter++
        const apiRes = await fetch(`${baseURL}/character/?page=${characterPageCounter}`)
        if(!apiRes.ok){
            throw new Error(`HTTP error status : ${apiRes.status}`)
        }
        const data = await apiRes.json()
        console.log(`from app.js get(characters) method the response is : \n${data}`)
        res.json(data)
    }catch(error){
        console.error(`fetch error : ${error}`)
        res.status(500).send('internal server error')
    }
        
})

app.listen(PORT, ()=>{
    console.log(`server running at : http://localhost:${PORT}`)
})
