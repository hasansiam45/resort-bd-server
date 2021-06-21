const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
const cors = require('cors')
const port = process.env.PORT || 5000;




app.use(cors());
app.use(express.json());


app.get('/',(req, res) =>{

        res.send('hello world')

})






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pqklg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    
    console.log(err)
  
    const resortCollection = client.db("resortBd").collection("resorts");
    const bookingCollection = client.db("resortBd").collection("bookings");
    const adminCollection = client.db("resortBd").collection("admins");
    const reviewCollection = client.db("resortBd").collection("reviews");
    

    // get resorts data from backend
    app.get('/resorts', (req, res) => {
    
        resortCollection.find()
            .toArray((err, resorts) => {
                res.send(resorts)
            })
    
    })
    
    
    // get admins data from backend
    app.get('/admins', (req, res) => {
    
        adminCollection.find()
            .toArray((err, admins) => {
                res.send(admins)
            })
    
    })
    
    
    // get reviews from backend
    app.get('/reviews', (req, res) => {
    
        reviewCollection.find()
            .toArray((err, review) => {
                res.send(review)
            })
    
    })

    // get all bookings data from backend
    app.get('/allBookings', (req, res) => {
    
        bookingCollection.find()
            .toArray((err, bookings) => {
                res.send(bookings)
            })
    
    })


    // get individual bookings from backend
    app.get('/bookings', (req, res) => {
    
        bookingCollection.find({
            email: req.query.email
        })
            .toArray((err, booking) => {
                res.send(booking)
            })
    
    })

    
    // adding new resorts
    app.post('/addResorts', (req, res) => {
    
        const newResort = req.body;
        
        resortCollection.insertOne(newResort)
            .then(result => {
            
                res.send(result.insertedCount>0)
            
            })
    
    })

      // adding new Admin
    app.post('/addAdmins', (req, res) => {
    
        const newAdmin = req.body;
        adminCollection.insertOne(newAdmin)
            .then(result => {
                res.send(result.insertedCount>0)
            })
    })
    // adding new bookings
    app.post('/addBookings', (req, res) => {

        const newBooking = req.body;
        
        bookingCollection.insertOne(newBooking)
            .then(result => {
            
                res.send(result.insertedCount>0)
            
            })
    
    })

    // adding user Reviews
    app.post('/addReviews', (req, res) => {
    
        const newReview = req.body;
        
        reviewCollection.insertOne(newReview)
            .then(result => {
            
                res.send(result.insertedCount > 0)
                
            })
    
    })



    // deleting resorts
    app.delete('/delete/:id', (req, res) => {
    
        const id = ObjectId(req.params.id)
        console.log(id)
        resortCollection.deleteOne({
        
            _id: id
            
        })
            .then(result => {
                console.log(result)
            })
        .catch(err => console.log(err))
    
    })
    
  // perform actions on the collection object
//   client.close();
    
});







app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})