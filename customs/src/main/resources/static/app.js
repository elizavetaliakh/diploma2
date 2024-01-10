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