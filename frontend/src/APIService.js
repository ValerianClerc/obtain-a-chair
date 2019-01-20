import axios from "axios";
const API_URL = "http://localhost:3000";

export class APIService {
  constructor() {}

  getTranscript(params) {
    const url = `${API_URL}/getTranscript`;
    return axios.post(url, params).then(response => response.data);
  }

  getCourse(params) {
    const url = `${API_URL}/getCourse`;
    return axios.post(url, params).then(response => response.data);
  }

  addCourse(params) {
    const url = `${API_URL}/addCourse`;
    return axios.post(url, params).then(response => response.data);
  }
}
