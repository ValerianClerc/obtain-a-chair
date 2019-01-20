<template>
  <div class="input-form">
    <input name="user" type="text" v-model="username" /> <br />
    <input name="pass" type="password" v-model="password" /> <br />
    <button v-on:click="getTranscript()">Get Transcript</button>
    <p>{{ username }}</p>
    <p>{{ transcript }}</p>
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
      password: ""
    };
  },
  methods: {
    getTranscript() {
      apiService
        .getTranscript({
          user: this.username,
          pass: this.password
        })
        .then(data => {
          data = data.filter(course => course.completed == "RW");
          this.transcript = data;
          console.log(data);
        });
    }
  },
  props: {
    msg: String
  }
};
</script>
