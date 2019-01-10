const Minerva = require("mcgill-minerva-api"),
    express = require("express"),
    bodyParser = require("body-parser");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.post("/request", (req, res) => {
    let testJSON = {
        tempkey: "tempvalue"
    };

    console.log(req.body);
    let password = req.body.pass;
    let username = req.body.user;
    console.log(`User : ${username}`);
    console.log(`Pass : ${password}`);

    let minerva = new Minerva(username, password); // or store 'em in environment MG_USER & MG_PASS

    //   minerva
    //     .getTranscript()
    //     .then(function(transcript) {
    //       console.log(transcript);
    //     })
    //     .catch(function(err) {
    //       console.log(err);
    //     });
    let courseInfo = {
        dep: "MATH",
        number: "340",
        season: "w",
        year: "2019"
    };

    minerva
        .getCourses(courseInfo)
        .then(function (courses) {
            console.log("MADE IT");
            console.log(courses);
            // => [{
            //  is_full false,
            //  crn: '709',
            //  department: 'COMP',
            //  course_number: '250',
            //  type: 'Lecture',
            //  days: ['MWF'],
            //  time: ['09:35 AM-10:25 AM'],
            //  instructor: 'Martin Robillard',
            //  status: 'Active'
            //  },{
            //    ...
            //  }]
        })
        .catch(reject => {
            console.log("FAILED");
            console.log(reject);
        });

    newCourse = {
        season: "w",
        year: "2019",
        crn: "611"
    }
    // minerva.addCourses(newCourse)
    //     .then((resolve) => {
    //         console.log(resolve)
    //     })
    //     .catch((reject) => {
    //         console.log(reject)
    //     })

    setTimeout(() => {
        minerva
            .getTranscript()
            .then(function (transcript) {
                console.log(transcript);
            })
            .catch(function (err) {
                console.log(err);
            });
    }, 10000)
    res.json(testJSON);
});

app.listen(3000, () => console.log("Server started on port 3000"));