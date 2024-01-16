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
        dataType: 'application/json',
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

var loginOuter;
var passwordOuter;
var userIdOutput = 3;
function handleData() {
    var login = document.getElementById("loginInput").value;
    var password = document.getElementById("passwordInput").value;
    loginOuter = login;
    passwordOuter = password;
    $.ajax({
        url: '/api/v1/users/login/' + encodeURIComponent(login) + '/' + encodeURIComponent(password),
        method: 'get',
        dataType: 'application/json',
        success: function (data) {
            alert("login");
        }
    });
}

function registrateUser() {
    let login = $('#loginInput').val();
    let password = $('#passwordInput').val();
    console.log('login = ' + login + ' password = ' + password);
    $.ajax({
        type: 'POST',
        url: '/api/v1/users/save',
        contentType: 'application/json',
        data: JSON.stringify({
            "userRole": 'ROLE_USER',
            "registrationDate": new Date(),
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

function loadDbStructure() {
    $.ajax({
            url: '/api/queries/allById/3',
            method: 'get',
            dataType: 'application/json',
            data: {"userId": 3},
            success: function (data) {
                document.getElementById("sqlHistory").value += data;
            }
        });
}

function makeQuery() {
    document.getElementById("sqlText").value='';
        var database = document.getElementById("databases").value;
        var selectMargin = document.getElementById("select").value;
        var distinctSwitch = document.getElementById("distinct").checked;
        var distinctTrue;
        if(distinctSwitch==true) { distinctTrue = ' DISTINCT'; }
        else { distinctTrue = ''; }
        var fromMargin = document.getElementById("from").value;
        var whereMargin = document.getElementById("where").value;
        var andSwitch = document.getElementById("and").checked;
        var andTrue;
        if(andSwitch==true) { andTrue = ' AND'; }
        else { andTrue = ''; }
        var groupByMargin = document.getElementById("groupBy").value;
        var groupByText = '';
        if(groupByMargin!='') { groupByText = ' GROUP BY ' + groupByMargin; }
        var orderByMargin = document.getElementById("orderBy").value;
        var orderByText = '';
        if(orderByMargin!='') { orderByText = ' ORDER BY ' + orderByMargin; }

        if(selectMargin=='' || fromMargin=='' || whereMargin=='') { alert('Заполните обязательные поля!'); }
        else {
            var query = 'SELECT ' + selectMargin + distinctTrue + ' FROM ' + fromMargin + ' WHERE ' + whereMargin +
                andTrue + groupByText + orderByText + ';'; }

        document.getElementById("sqlText").value=(query);
    }

    function saveQuery() {
        var sqlText = document.getElementById("sqlText").value;
        if(sqlText != '') {
             document.getElementById("sqlHistory").value += sqlText + '\n';
             $.ajax({
                     type: 'POST',
                     url: '/api/queries/save',
                     contentType: 'application/json',
                     data: JSON.stringify({
                        "userId": 1,
                        "queryDefinition": sqlText
                     }),
                     success: function (response) {
                         console.log('Запрос сохранен в бд:', response);
                         alert('Запрос сохранен в бд.');
                     },
                     error: function (error) {
                         console.error('ошибка в сохранении запроса в бд:', error);
                         alert('ошибка в сохранении запроса в бд');
                     }
                 });
        }
    }