const Minerva = require("mcgill-minerva-api"),
  express = require("express"),
  bodyParser = require("body-parser"),
  cors = require('cors');

const app = express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/test", (req, res, next) => {
  console.log('test route!')
  res.json({
    msg: "successful response from test route!"
  })
})

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

  let minerva = new Minerva(username, password);

  minerva
    .getCourses(courseInfo)
    .then(function (courses) {
      console.log("Course retrieved");
      console.log(courses);
      res.json(courses);
    })
    .catch(reject => {
      console.log("Unable to get course");
      console.log(reject);
      res.json(reject);
    });
});

app.post("/addCourse", (req, res) => {
  let password = req.body.pass;
  let username = req.body.user;

  let minerva = new Minerva(username, password);

  newCourse = {
    season: req.body.season,
    year: req.body.year,
    crn: req.body.crn
  };
  if (
    newCourse.season == null ||
    newCourse.year == null ||
    newCourse.crn == null
  ) {
    res.status(400).json({
      msg: "Season, Year, or CRN was left empty"
    });
  }
  minerva
    .addCourses(newCourse)
    .then(resolve => {
      console.log("Course add attempted successfully");
      console.log(resolve);
      res.json(resolve);
    })
    .catch(reject => {
      console.log("Unable to try to add course");
      console.log(reject);
      res.json(reject);
    });
});

app.post("/getTranscript", (req, res) => {
  let password = req.body.pass;
  let username = req.body.user;

  console.log(req.body)

  console.log(`User : ${username}`);
  console.log(`Pass : ${password}`);

  let minerva = new Minerva(username, password);

  minerva
    .getTranscript()
    .then(function (transcript) {
      console.log(transcript);
      res.json(transcript);
    })
    .catch(function (err) {
      console.log(err);
      res.json(err);
    });
});

app.listen(3000, () => console.log("Server started on port 3000"));