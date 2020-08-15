var express = require('express');
var router = express.Router();
const { Wit, log } = require('node-wit');

const client = new Wit({
    accessToken: process.env.ACCESS_TOKEN,
    logger: new log.Logger(log.DEBUG) // optional
});

/* GET users listing. */
router.post('/query', function (req, res, next) {
    console.log(req.body);
    let response = "";
    client.message(req.body.message, {})
        .then((data) => {
            response = getResponse(data.entities); // TODO: make into a promise
            res.send(response);
        })
        .catch(err => {
            console.error(err);
            res.status(400).send({
                message: 'This is an error!'
            });
        });
});

let getResponse = (witData) => {
    console.log(witData);
    if ('greetings' in witData && !('bye' in witData)) {
        let num = Math.random()
        if (num < 0.25) return "Hi!"
        else return "Hello!"
    } else if ('bye' in witData) {
        let num = Math.random()
        if (num < 0.5) return "It has been a pleasure talking to you! Bye!";
        else return "Thanks for chatting!"
    } else if ('intent' in witData) {
        let intent = witData.intent[0].value;
        if (intent == 'get_skills') {
            if ('frontend' in witData) {
                return "My frontend experience includes HTML/CSS, React.js, Angular.js, and Bootstrap!";
            } else if ('backend' in witData) {
                return "My backend experience includes Java, Python, MongoDB, and MySQL!"
            } else {
                return "My skills include HTML/CSS, React.js, Angular.js, Bootstrap, Java, Python, MongoDB, and MySQL"
            }
        } else if (intent == 'get_education') {
            return "I am currently a junior Computer Science major at Georgia Tech, with a concentration in People and Artificial Intelligence. I am part of the Honors Program, and also actively involved in intramural sports and computer science clubs outside my classes."
        } else if (intent == 'get_internships') {
            if ('Amazon' in witData) {
                return "At Amazon, I worked on the Alexa engineering team. I designed and implemented a PHP script that programmatically reduced the complexity of Amazon Alexa’s natural language generation templates by 7%. I also expanded Amazon Alexa’s ability to generate cross-topic answers."
            } else if ('Itential' in witData) {
                return "I worked at Itential as a software engineering intern for two semesters. In my first semester, I created a Microsoft Azure adapter using Node.js and RESTFUL APIs and a web application using HTML, Ajax and Bootstrap that hosted real-time data of all private repositories in the company. I gained experience with network automation and programmable networking as well as Docker, Node.js, and mongoDB. In my second semester, I built on my Node.js and web programming skills to help develop two customer-facing applications using React.js and Node.js that automated time-consuming customer tasks and slashed service adapter integration from a multi-week process to less than a week."
            } else if ('UPS' in witData) {
                return "At UPS, I worked primarily with Java Spring Boot and Microsoft Azure to create and deploy an API-based email service, improve efficiency of database queries in production, and deploy a key vault that made UPS customs applications both more efficient and secure."
            } else {
                return "I am currently interning at Amazon this summer as a SWE. Previously, I have interned at Itential, a network automation company, and UPS. Type 'Amazon', 'Itential' or 'UPS' to learn more about these internships!"
            }
        } else if (intent == 'get_projects') {
            if ('vms' in witData) {
                return "I am the current engineering manager of a team of developers responsible for creating a vendor-agnostic volunteer management system for the Bits of Good club at Georgia Tech. I am responsible for the implementation of techical decisions in the project, such as software architecture, user authentication, and product features"
            } else if ('story_mania' in witData) {
                return "Story mania is a web-based multiplayer game where multiple users take turns adding words to form a story. It is designed using Firebase, semantic-ui, custom css, and React animations"
            } else if ('spl_it' in witData) {
                return "Spl.it is a cost-sharing mobile application for Android created using Android Studio. I worked together with a team, and my role was to implement the main cost-sharing page and connected application to a no-cloud database using Firebase"
            } else if ('sentiment_analysis' in witData) {
                return "Youtube Sentiment Analyzer is a Python application that scrapes the comments from a given YouTube video and performs sentiment analysis using natural language processing. I used matplotlib and pandas to display visual representations of video sentiment"
            } else if ('meal_tracker' in witData) {
                return "Meal tracker is an application that keeps track of meal expenditures and displays relevant statistics and visuals, created using a Django backend and Angular frontend. I implemented it as a multi-user platform that stores data in a cloud-based postgreSQL service"
            } else if ('lunch_buddy' in witData) {
                return "Lunch buddy is a mobile application that matches users with a “buddy” to eat lunch with based on their preferences and schedule. I used React Native and implemented Facebook authentication, Messenger integration, Firebase integration, and push notifications"
            } else if ('Google_glass' in witData) {
                return "I developed a Google glass application prototype that provides real-time localization and optimization of sparse order picking paths for warehouse navigation. I also performed a user study that compared various sparse order picking methods using heads-up displays"
            } else {
                return "Some of my previous projects include: volunteer management system, spl.it, youtube sentiment analyzer, meal tracker, and sparse order picking. Ask about any of these projects to learn more!";
            }
        } else if (intent == 'get_help') {
            return "Some of the things you can ask me about are my skills, education, previous internships, personal projects, and hobbies"
        } else if (intent == 'get_hobbies') {
            return "Some of my hobbies include playing the piano, playing tennis and exploring the outdoors/photography. I also recently started skating this summer after getting my first longboard."
        } else if (intent == 'get_info') {
            return "I'm a junior Computer Science major at Georgia Tech. As a visual learner, I enjoy the process of creating and designing applications and interfaces, and this website is a result of my interests. I have experience in web design (React and Angular) and RESTFUL APIs, and I am currently taking classes to further my knowledge in automation and machine learning."
        } else if (intent == 'get_thanks') {
            return "thank you!"
        } else if (intent == 'greet') {
            return "sup bro"
        }
    } else {
        return 'Sorry, I did not understand your command. Try asking me things like "what frontend skills do you have?", or type "help" for a list of things you can ask me about';
    }
}

module.exports = router;
