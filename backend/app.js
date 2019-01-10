const Minerva = require("mcgill-minerva-api"),
    express = require("express"),
    bodyParser = require("body-parser");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.post("/getCourse", (req, res) => {
    let testJSON = {
        tempkey: "tempvalue"
    };

    let password = req.body.pass;
    let username = req.body.user;

    let courseInfo = {
        dep: req.body.subject,
        number: req.body.classNum,
        season: req.body.season,
        year: req.body.year
    };

    console.log(`User : ${username}`);
    console.log(`Pass : ${password}`);

    console.log(`Course Info: ${courseInfo}`);

    let minerva = new Minerva(username, password); // or store 'em in environment MG_USER & MG_PASS

    minerva
        .getCourses(courseInfo)
        .then(function (courses) {
            console.log("MADE IT");
            console.log(courses);
            res.json(courses);
        })
        .catch(reject => {
            console.log("FAILED");
            console.log(reject);
            res.json(reject);
        });

   
    
});


app.post('/addCourse', (req, res) => {
    newCourse = {
        season: req.body.season,
        year: req.body.year,
        crn: req.body.crn
    };
    minerva.addCourses(newCourse)
        .then((resolve) => {
            console.log(resolve);
            res.json(resolve);
        })
        .catch((reject) => {
            console.log(reject);
            res.json(reject);
        });
});


app.post('/getTranscript', (req, res) => {

    let password = req.body.pass;
    let username = req.body.user;

    console.log(`User : ${username}`);
    console.log(`Pass : ${password}`);

    let minerva = new Minerva(username, password); // or store 'em in environment MG_USER & MG_PASS

    minerva.getTranscript()
    .then(function(transcript) {
        console.log(transcript);
        res.json(transcript);
    })
    .catch(function(err) {
        console.log(err);
        res.json(err);
    });

});

app.listen(3000, () => console.log("Server started on port 3000"));
