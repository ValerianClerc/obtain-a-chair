import axios from "axios";

export class APIService {
  constructor() {
    this.API_URL = "http://localhost:3000";
  }

  getTranscript(params) {
    const url = `${this.API_URL}/getTranscript`;
    return axios.post(url, params);
  }

  getCourse(params) {
    const url = `${this.API_URL}/getCourse`;
    return axios.post(url, params).then(response => response.data);
  }

  addCourse(params) {
    const url = `${this.API_URL}/addCourse`;
    return axios.post(url, params).then(response => response.data);
  }
}
