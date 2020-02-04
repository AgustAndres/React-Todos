import axios from 'axios'

class HelloWorldService {
   executeHelloWorldService() {
      return axios.get('http://localhost:8080/hello-world')
      //returns a promise back
   }

   executeHelloWorldBeanService() {
      return axios.get('http://localhost:8080/hello-world-bean')
   }

   executeHelloWorldPathVariableService(name) {
     /*let username = "1"
      let password = "1"

      let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)*/
      return axios.get(`http://localhost:8080/hello-world-path-variable/${name}`
      /*,
        {
           headers: {
              authorization: basicAuthHeader
           }
        }*/
      )
      //returns a promise back
   }
}

export default new HelloWorldService()