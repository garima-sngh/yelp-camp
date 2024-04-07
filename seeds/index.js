const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
};
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

main().catch(err => console.log("OH NO, ERROR", err));

async function main() {
    await mongoose.connect(dbUrl);
    console.log('SEEDING DATABASE CONNECTED')
};

const sample = arr => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const randomCity = sample(cities);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            author: '6379a8ea4801fc704ea06c5a', // MY AUTHOR ID
            location: `${randomCity.city}, ${randomCity.state}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Non eveniet repellendus nihil esse nemo voluptatibus sapiente quam, necessitatibus tenetur saepe, illo facere doloribus corporis aliquid consectetur debitis! Repudiandae, id autem!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    randomCity.longitude,
                    randomCity.latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtjn9nexd/image/upload/v1654213740/YelpCamp/e4feuxfhpbhmovvfecyj.jpg',
                    filename: 'YelpCamp/e4feuxfhpbhmovvfecyj'
                },
                {
                    url: 'https://res.cloudinary.com/dtjn9nexd/image/upload/v1654238670/YelpCamp/jnw56mupxb3xepam9k1o.jpg',
                    filename: 'YelpCamp/jnw56mupxb3xepam9k1o'
                }
            ],

        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close()
});