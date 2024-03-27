const express = require("express")
const morgan = require('morgan')
const app = express()

app.use(express.json())
let contacts = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.use(morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  }))
app.get('/api/persons', (request,response) => {
    response.json(contacts)
})

app.get('/info', (request,response) => {
    response.send(
        `<div>
        <p>Phonebook has info for ${contacts.length} people </p>
        <p>${new Date()}</p>
        </div>`
    )
})

app.get('/api/persons/:id', (request,response) => {
    const contactId = Number(request.params.id)
    const contact = contacts.find(contact => contact.id === contactId)
    if(!contact){
        response.status(404).end()
    }
    else
    response.json(contact)
})

app.delete('/api/persons/:id', (request,response) => {
    const contactId = Number(request.params.id)
    contacts = contacts.filter(contact => contact.id !== contactId)
    response.status(204).end()
})

const generateId = () => {
    const id = Math.floor(Math.random() * 999)
    return id
}
app.post('/api/persons',(request,response) => {
    if(!request.body.name){
      response.status(404).json({
        error : "name is missing"
      })
    }
    else if (!request.body.number){
        response.status(404).json({
            error : "number is missing"
        })
    }
    else if (contacts.find(contact => contact.name === request.body.name)){
        response.status(404).json({
            error : "name must be unique"
        })
    }
    else {
        const newContact = {
            "id" : generateId(),
            "name" : request.body.name,
            "number" : request.body.number            
        }
        contacts = contacts.concat(newContact)
        response.json(contacts)
    }

})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})