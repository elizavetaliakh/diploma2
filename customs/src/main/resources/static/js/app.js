var userIdOutput = 3;
function handleData() {
    let login = $('#loginInput').val();
    let password = $('#passwordInput').val();
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
        url: '/api/queries/all',
        method: 'get',
        dataType: 'application/json',
        success: function (data) {
            let query = data.filter(item => {return item.userId == '3'})[0].queryDefinition;
            alert(query);
            //document.getElementById("sqlHistory").value(data);
        }
    });
}

function makeQuery() {
    document.getElementById("sqlText").value='';
    var tableSelect = document.getElementById("tables").value;
    var selectMargin = document.getElementById("select").value;
    var distinctSwitch = document.getElementById("distinct").checked;
    var distinctTrue;
    if(distinctSwitch==true) {
        distinctTrue = ' DISTINCT'; }
    else {
        distinctTrue = ''; }
    var fromMargin = document.getElementById("from").value;
    var whereMargin = document.getElementById("where").value;
    var andSwitch = document.getElementById("and").checked;
    var andTrue;
    if(andSwitch==true) {
        andTrue = ' AND'; }
    else {
        andTrue = ''; }
    var groupByMargin = document.getElementById("groupBy").value;
    var groupByText = '';
    if(groupByMargin!='') {
        groupByText = ' GROUP BY ' + groupByMargin; }
    var orderByMargin = document.getElementById("orderBy").value;
    var orderByText = '';
    if(orderByMargin!='') {
        orderByText = ' ORDER BY ' + orderByMargin; }
    if(selectMargin=='' || fromMargin=='' || whereMargin=='') {
        alert('Заполните обязательные поля!'); }
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
        dataType: 'text',
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
        //data: {"query": sqlText},
        success: function (data) {
            console.log("Success" + data);
        }
    });
}

function drawTable() {
    var select = document.getElementById("tables");
    var tableValue = select.value;
    var catalog = "customs";

    $.ajax({
        url: '/api/operations/getcolumns',
        method: 'get',
        dataType: 'text',
        data: {"catalog": catalog, "table": tableValue},
        success: function (data) {
            console.log("Columns: " + data);
            localStorage.setItem('cols', data.toString());
        }
    });
    $.ajax({
        url: '/api/operations/getrows',
        method: 'get',
        dataType: 'text',
        success: function (data) {
            console.log("Rows: " + data);
            localStorage.setItem('rows', data.toString());
        }
    });
    $.ajax({
        url: '/api/operations/getcolumnsnames',
        method: 'get',
        dataType: 'application/json',
        data: {"catalog": catalog, "table": tableValue},
        success: function (data) {
            console.log("Columns names: " + data);
        }
    });

    var columns = Number(localStorage.getItem('cols'));
    var rows = Number(localStorage.getItem('rows'));

    let table = document.querySelector('#tableDb');
    for (let i = 0; i < rows + 2; i++) {
    	let tr = document.createElement('tr');

    	for (let i = 0; i < columns; i++) {
    		let td = document.createElement('td');
    		tr.appendChild(td);
    	}

    	table.appendChild(tr);
    }
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