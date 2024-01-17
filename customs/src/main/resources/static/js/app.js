//var userApi = Vue.resource('/api/v1/users/all')

//Vue.component('user-row', {
//    props: ['user'],
//    template:
//        '<tr>' +
//        '<td>{{user.id}}</td><td>{{user.userRole}}</td><td>{{user.userName}}</td><td>{{user.userPassword}}</td><td>{{user.registrationDate}}</td>' +
//        '</tr>'
//});
//
//Vue.component('users-list', {
//    props: ['users'],
//    template:
//        '<table>' +
//        '<user-row v-for="user in users" :user="user" :key="user.id" />' +
//        '</table>',
//    created: function () {
//        userApi.get()
//            .then(result => result.json()
//                .then(data => data.forEach(user => this.users.push(user))
//                )
//            )
//    }
//});
//
//Vue.config.devtools = false;
//
//var app = new Vue({
//    el: '#app',
//    template: '<users-list :users="users" />',
//    data: {
//        users: []
//    }
//});

//function handleData() {
//    var login = document.getElementById("loginInput").value;
//    var password = document.getElementById("passwordInput").value;
//    $.ajax({
//        url: '/api/v1/users/login/{log}/{password}',
//        method: 'get',
//        dataType: 'application/json',
//        data: {
//            "userName": login,
//            "userPassword": password
//        },
//        success: function (data) {
//            alert("login");
//            location.replace("dbstructure.html");
//            }
//    });
//}

var loginOuter;
var passwordOuter;
var userIdOutput = 3;
function handleData() {
    let login = $('#loginInput').val();
    let password = $('#passwordInput').val();
    loginOuter = login;
    passwordOuter = password;
    $.ajax({
        url: '/api/v1/users/login/' + login + '/' + password,
        method: 'get',
        dataType: 'application/json',
        success: function (data) {
            console.log("Success");
            window.location.href = 'dbstructure.html';
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
        let sqlText = $('#sqlText').val();
        console.log('sql query text = ' + sqlText + ' user id = ' + userIdOutput);
        $.ajax({
            type: 'POST',
            url: '/api/queries/save',
            contentType: 'application/json',
            data: JSON.stringify({
                "userId": userIdOutput,
                "queryDefinition": sqlText
            }),
            success: function (response) {
                console.log('Запрос сохранен в бд:', response);
                alert('Запрос сохранен в бд.');
                document.getElementById("sqlHistory").value += sqlText + '\n';
            },
            error: function (error) {
                console.error('Ошибка в сохранении запроса в бд:', error);
                alert('Ошибка в сохранении запроса в бд');
            }
    })
    }

function executeQuery() {
    let sqlText = $('#sqlText').val();
    console.log('sql query text = ' + sqlText + ' user id = ' + userIdOutput);
        $.ajax({
            url: '/api/operations/setsqlquery',
            method: 'get',
            dataType: 'application/json',
            data: {"query": sqlText},
            success: function (data) {
                console.log("Success" + data);
                $('#queryResults').val() = data;
            }
        });
}

function showPieDiagram() {
    anychart.onDocumentReady(function () {
                // create pie chart with passed data
                var data = anychart.data.set([
                  ["значение 1", 69.2, 24.2],
                  ["значение 2", 85, 334],
                  ["значение 3", 32.1, 1045],
                  ["значение 4", 8.2, 3038],
                ]);

                var wealth = data.mapAs({ x: 0, value: 1 });

                var chart = anychart.pie(wealth);
                chart
                  .labels()
                  .hAlign("center")
                  .position("outside")
                  .format("{%Value} trn.n({%PercentOfCategory}%)");
                chart
                  .legend()
                  // set legend position and items layout
                  .position("right")
                  .itemsLayout("vertical")
                  .align("center");

                // set container id for the chart
                chart.container("container");
                // initiate chart drawing
                chart.draw();
              });
}