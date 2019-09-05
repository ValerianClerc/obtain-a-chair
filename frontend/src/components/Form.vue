<template>
  <div class="input-form">
    <input name="user" type="text" v-model="username" />
    <br />
    <input name="pass" type="password" v-model="password" />
    <br />
    <button v-on:click="getTranscript()">Get Transcript</button>
    <button v-on:click="getASeat()">Get A Seat</button>
    <p>{{ username }}</p>
    <p>{{ transcript }}</p>
    <p>{{ haveDesiredCourse }}</p>
  </div>
</template>

<script>
import { APIService } from "../APIService";

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
      const that = this;
      await apiService
        .getTranscript({
          user: this.username,
          pass: this.password
        })
        .then(response => {
          console.log(response);
          const data = response.data;
          console.log("Transcript fetched: ");
          console.log(data);
          that.transcript = data.filter(course => course.completed == "RW");
        })
        .catch(reject => console.log(reject));
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
      await this.getTranscript();
      try {
        console.log("Get Transcript Worked");
        this.transcript = this.transcript.filter(
          course => course.completed == "RW"
        );
        console.log("Full transcript: " + this.transcript);
        this.transcript = this.transcript.filter(
          course => course.course == "COMP 321"
        );
        console.log("Specific course: " + this.transcript);
        if (this.transcript.length != 0) {
          console.log("Course in transcript!");
          this.haveDesiredCourse = true;
        } else {
          console.log("Course not in transcript :'(");
          this.haveDesiredCourse = false;
          // await apiService.addCourse()
        }
      } catch (e) {
        console.log("error! => " + e);
      }
    }
  },
  props: {
    msg: String
  }
};
</script>
