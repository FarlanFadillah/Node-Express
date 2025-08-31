const app = Vue.createApp({
    data() {
       return {
          users: [],
       }
    },
    methods: {
          async getUsers() {
             try {
                const res = await fetch('http://localhost:5000/users')
                const data = await res.json()
                this.users = data
             } catch (error) {
                console.log(error)
             }
          }
    },
    
}).mount('#app')