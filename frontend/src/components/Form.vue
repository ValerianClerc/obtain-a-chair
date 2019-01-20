<template>
  <div class="input-form">
    <input name="user" type="text" v-model="username" /> <br />
    <input name="pass" type="password" v-model="password" /> <br />
    <button v-on:click="getASeat()">Get Transcript</button>
    <p>{{ username }}</p>
    <p>{{ transcript }}</p>
    <p>{{ haveDesiredCourse }}</p>
  </div>
</template>

<script>
import { APIService } from "../APIService";

const API_URL = "http://localhost:3000";
const apiService = new APIService();

export default {
  name: "Form",
  data: function() {
    return {
      transcript: [],
      currAction: "/getTranscript",
      username: "",
      password: "",
      haveDesiredCourse: false
    };
  },
  methods: {
    async getTranscript() {
      return apiService.getTranscript({
        user: this.username,
        pass: this.password
      });
    },
    async getASeat() {
      // get transcript
      // if not in transcript:
      //      call getCourse()
      //      if not full, then addCourse()
      //      call addCourse()
      //      get transcript
      //      if in transcript, break
      // display message
      await this.getTranscript()
        .then(data => {
          console.log("Get Transcript Worked");
          data = data.filter(course => course.completed == "RW");
          this.transcript = data;
          console.log(data);
          data = data.filter(course => course.course == "COMP 303");
          console.log(data);
          if (data.length != 0) {
            console.log("Course in transcript!");
            this.haveDesiredCourse = true;
          } else {
            console.log("Course not in transcript :'(");
            this.haveDesiredCourse = false;
          }
        })
        .catch(reject => console.log(reject));
      console.log("got results!");
    }
  },
  props: {
    msg: String
  }
};
</script>
