const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database Connected');
});

const sampleArr = (arr) => arr[Math.floor( Math.random()*(arr.length-1) )];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i<50; i++){
        const randomOf1000 = Math.floor(Math.random() * 1000);
        const randPrice = Math.floor(Math.random()*30)+10;
        
        const camp = new Campground({
            title: `${sampleArr(descriptors)} ${sampleArr(places)}`,
            location: `${cities[randomOf1000].city}, ${cities[randomOf1000].state}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quaerat maiores, quibusdam voluptatem aspernatur cupiditate iure pariatur natus fugit repellendus quidem, atque tempore magnam possimus quas nihil autem, ut sit.',
            price: randPrice
        });
        await camp.save();
    }
};

seedDB().then( () => {
    db.close();
});

