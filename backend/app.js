const Minerva = require('mcgill-minerva-api'),
      express = require('express'),
      bodyParser = require('body-parser');


const app = express();


let username = "";
let password = "";

let minerva = new Minerva(username, password); // or store 'em in environment MG_USER & MG_PASS

minerva.getCourses({
    dep: 'COMP',
    number: '251',
    season: 'w',
    year: '2019'
  }).then(function(courses) {
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
});


app.listen(3000, () => console.log("Server started on port 3000"));
