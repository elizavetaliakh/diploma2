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

function handleData() {
    var login = document.getElementById("loginInput").value;
    var password = document.getElementById("passwordInput").value;
    $.ajax({
        url: '/api/v1/users/login/{log}/{password}',
        method: 'get',
        dataType: 'json',
        data: {
            "userName": login,
            "userPassword": password },     /* Параметры передаваемые в запросе. */
        success: function(data){   /* функция которая будет выполнена после успешного запроса.  */
		    alert(data);            /* В переменной data содержится ответ от index.php. */ }
    });
}
function registrateUser() {
    var login = document.getElementById("loginInput").value;
    var password = document.getElementById("passwordInput").value;
        $.ajax({
           type: 'POST',
           url: '/api/v1/users/save',
           contentType: 'application/json',
           data: JSON.stringify(data),
           success: function (response) {
               console.log('Пользователь сохранен в бд:', response);
               alert('Пользователь сохранен в бд.');
           },
           error: function (error) {
               console.error('ошибка в сохранении пользователя в бд:', error);
               alert('ошибка в сохранении пользователя в бд');
           }
    });
}
var userApi = Vue.resource('/api/v1/users/all')

Vue.component('user-row', {
    props: ['user'],
    template:
        '<tr>' +
        '<td>{{user.id}}</td><td>{{user.userRole}}</td><td>{{user.userName}}</td><td>{{user.userPassword}}</td><td>{{user.registrationDate}}</td>' +
        '</tr>'
});

Vue.component('users-list', {
    props: ['users'],
    template:
        '<table>' +
        '<user-row v-for="user in users" :user="user" :key="user.id" />' +
        '</table>',
    created: function () {
        userApi.get()
            .then(result => result.json()
                .then(data => data.forEach(user => this.users.push(user))
                )
            )
    }
});

Vue.config.devtools = false;

var app = new Vue({
    el: '#app',
    template: '<users-list :users="users" />',
    data: {
        users: []
    }
});

function handleData() {
    var login = document.getElementById("loginInput").value;
    var password = document.getElementById("passwordInput").value;
    $.ajax({
        url: '/api/v1/users/login/{log}/{password}',
        method: 'get',
        dataType: 'json',
        data: {
            "userName": login,
            "userPassword": password
        },
        success: function (data) {
            alert(data);
            location.replace("dbstructure.html");
            }
    });
}

function registrateUser() {
    var login = document.getElementById("loginInput").value;
    var password = document.getElementById("passwordInput").value;
    $.ajax({
        type: 'POST',
        url: '/api/v1/users/save',
        contentType: 'application/json',
        data: JSON.stringify({
            "userName": login,
            "userPassword": password
        }),
        success: function (response) {
            console.log('Пользователь сохранен в бд:', response);
            alert('Пользователь сохранен в бд.');
        },
        error: function (error) {
            console.error('ошибка в сохранении пользователя в бд:', error);
            alert('ошибка в сохранении пользователя в бд');
        }
    });
}