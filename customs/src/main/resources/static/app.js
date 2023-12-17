
// import Vue from "vue";
// Vue.component('usercomponent',{
//     template : '<div class = "Table"><div class = "Row" v-bind:style = "styleobj"><div class = "Cell"><p>{{itr.userRole}}</p></div><div class = "Cell"><p>{{itr.userName}}</p></div><div class = "Cell"><p>{{itr.userPassword}}</p></div><div class = "Cell"><p>{{itr.registrationDate}}</p></div><div class = "Cell"><p><button v-on:click = "$emit(\'removeelement\')">Delete user</button></p></div></div></div></div>',
//     props: ['itr', 'index'],
//     data: function() {
//        return {
//           styleobj : {
//              backgroundColor:this.getcolor(),
//              fontSize : 15,
//           }
//        }
//     },
//     methods:{
//        getcolor : function() {
//           if (this.index % 2) {
//              return "#FFE633";
//           } else {
//              return "#D4CA87";
//           }
//        }
//     }
//  });
//  Vue.component('dbusers',{
//     data: function() {
//         return {
//             users: [],
//         }
//     },
//     methods: {
//         getUsers() {
//             Vue.prototype.$axios().get('http://localhost:8081/api/v1/users/all')
//             .then((response) => console.log(response.data))
//             .catch(error => console.log(error));
//         }
//     }
//  })
//  var vm = new Vue({
//     el: '#databinding',
//     data: {
//          userRole: '',
//          userName: '',
//          userPassword: '',
//          registrationDate: '',
//          custdet:[],
//          styleobj: {
//              backgroundColor: '#2196F3!important',
//              cursor: 'pointer',
//              padding: '8px 16px',
//              verticalAlign: 'middle',
//          }
//     },
//     mounted() {
//         Vue.prototype.$axios()
//           .get('https://jsonplaceholder.typicode.com/posts')
//           .then(response => (this.info = response))
//           .catch(error => console.log(error));
//     },
//     methods :{
//        showdata : function() {
//           this.custdet.push({
//              userRole: this.userRole,
//              userName: this.userName,
//              userPassword: this.userPassword,
//              registrationDate: this.registrationDate
//           });
//           this.userRole = "";
//           this.userName = "";
//           this.userPassword = "";
//           this.registrationDate = "";
//        }
//     }
//  });

var userApi = Vue.resource('/api/v1/users/all')

Vue.component('user-row',{
    props: ['user'],
    template:
        '<tr>' +
            '<td>{{user.id}}</td><td>{{user.userRole}}</td><td>{{user.userName}}</td><td>{{user.userPassword}}</td><td>{{user.registrationDate}}</td>' +
        '</tr>'
});

Vue.component('users-list',{
    props: ['users'],
    template:
        '<table>' +
            '<user-row v-for="user in users" :user="user" :key="user.id" />' +
        '</table>',
    created: function() {
        userApi.get()
            .then(result => result.json()
            .then(data => data.forEach(user => this.users.push(user))
            )
        )
    }
});
Vue.config.devtools = false
var app = new Vue({
    el: '#app',
    template: '<users-list :users="users" />',
    data: {
        users: []
    }
});