var userIdOutput = 3;
function handleData() {
    let login = $('#loginInput').val();
    let password = $('#passwordInput').val();
    if(login == '' || password == '') { alert("Заполните поля"); }
    else {
    $.ajax({
         url: '/api/v1/users/login/' + login + '/' + password,
         method: 'get',
         dataType: 'application/json',
         success: function (data) {
             alert("Вы вошли в аккаунт");
         },
         error: function (error) {
         }
    }); }
}

function registrateUser() {
    let login = $('#loginInput').val();
    let password = $('#passwordInput').val();
    console.log('login = ' + login + ' password = ' + password);
    if (login == '' || password == '') { alert("Заполните поля"); }
    else {
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
            alert('Вы зарегистрировались');
        },
        error: function (error) {
            alert('Пользователь с таким логином уже существует');
        }
    }); }
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
    let q = "SELECT o FROM Operation o";
    console.log('sql query text = ' + q + ' user id = ' + userIdOutput);
    $.ajax({
        url: '/api/operations/ownquery',
        method: 'get',
        // dataType: 'application/json',
        data: {"query": q},
        error : function() {
            alert("Error");
        },
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].custom);
            }
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

    var columns = Number(localStorage.getItem('cols'));
    var rows = Number(localStorage.getItem('rows'));

    $.ajax({
        url: '/api/operations/getcolumnsnames',
        method: 'get',
        data: {"catalog": catalog, "table": tableValue},
        success: function (data) {
            console.log("Columns names: " + data);
            let i = 0;
            data.forEach((element) => {
                localStorage.setItem("col"+i.toString(), element);
                i+=1;
                console.log(localStorage.getItem('col'+i.toString()));
            })
        }
    });
    for (let i=0; i<columns; i++) {
        let colName = localStorage.getItem('col'+i.toString());
        $.ajax({
            url: '/api/operations/getcolumndatatype',
            method: 'get',
            data: {"catalog": catalog, "table": tableValue, "column": colName},
            success: function (data) {
                console.log("Column type " + i + ": " + data);
                localStorage.setItem("type"+i.toString(), data);
                console.log(localStorage.getItem('type'+i.toString()));
            }
        });
    }

    let q = "SELECT o FROM Operation o";//здесь будет пользовательсий запрос

    if(tableValue == "operations") {
        $.ajax({
            url: '/api/operations/all',
            method: 'get',
            dataType: 'json',
            //data: {"query": q},
            success: function (data) {
                console.log("Success" + data);
                let table = document.querySelector('#tableDb');
                    for (let i = -2; i < rows; i++) {
                        let tr = document.createElement('tr');
                        for (let j = 0; j < columns; j++) {
                            let td = document.createElement('td');
                            if (i == -2) {
                                td.innerHTML = '<input type="checkbox">' + localStorage.getItem('col'+j.toString());
                                td.id = localStorage.getItem('col'+j.toString());
                                td.onclick = "tdSelect(" + localStorage.getItem('col'+j.toString()) + ")";
                            }
                            else if (i == -1) {
                                td.innerHTML = "+";
                                //td.innerHTML = localStorage.getItem('type'+j.toString());
                                td.id = localStorage.getItem('type'+j.toString());
                            }
                            else {
                                if (localStorage.getItem('col'+j.toString()) == "insp_total_cost_eur") {
                                    td.innerHTML = data[i].inspTotalCostEur; }
                                else if (localStorage.getItem('col'+j.toString()) == "to_mail_message_id") {
                                    td.innerHTML = data[i].toMailMessageId; }
                                else if (localStorage.getItem('col'+j.toString()) == "date_photography") {
                                    td.innerHTML = data[i].datePhotography; }
                                else if (localStorage.getItem('col'+j.toString()) == "date_inspection") {
                                    td.innerHTML = data[i].dateInspection; }
                                else if (localStorage.getItem('col'+j.toString()) == "date_custom") {
                                    td.innerHTML = data[i].dateCustom; }
                                else if (localStorage.getItem('col'+j.toString()) == "date_warehouse") {
                                    td.innerHTML = data[i].dateWarehouse; }
                                else if (localStorage.getItem('col'+j.toString()) == "sign_passport") {
                                    td.innerHTML = data[i].signPassport; }
                                else if (localStorage.getItem('col'+j.toString()) == "date_send") {
                                    td.innerHTML = data[i].dateSend; }
                                else if (localStorage.getItem('col'+j.toString()) == "sign_auto_release") {
                                    td.innerHTML = data[i].signAutoRelease; }
                                else if (localStorage.getItem('col'+j.toString()) == "sign_risk") {
                                    td.innerHTML = data[i].signRisk; }
                                else if (localStorage.getItem('col'+j.toString()) == "insp_cost") {
                                    td.innerHTML = data[i].inspCost; }
                                else if (localStorage.getItem('col'+j.toString()) == "sign_medical") {
                                    td.innerHTML = data[i].signMedical; }
                                else if (localStorage.getItem('col'+j.toString()) == "release_weight") {
                                    td.innerHTML = data[i].releaseWeight; }
                                else if (localStorage.getItem('col'+j.toString()) == "insp_corrected") {
                                    td.innerHTML = data[i].inspCorrected; }
                                else if (localStorage.getItem('col'+j.toString()) == "to_send") {
                                    td.innerHTML = data[i].toSend; }
                                else if (localStorage.getItem('col'+j.toString()) == "sign_req") {
                                    td.innerHTML = data[i].signReq; }
                                else if (localStorage.getItem('col'+j.toString()) == "insp_weight_mail") {
                                    td.innerHTML = data[i].inspWeightMail; }
                                else if (localStorage.getItem('col'+j.toString()) == "refuse_note") {
                                    td.innerHTML = data[i].refuseNote; }
                                else if (localStorage.getItem('col'+j.toString()) == "detencion_cause") {
                                    td.innerHTML = data[i].detencionCause; }
                                else if (localStorage.getItem('col'+j.toString()) == "detencion_note") {
                                    td.innerHTML = data[i].detencionNote; }
                                else if (localStorage.getItem('col'+j.toString()) == "insp_currency_code") {
                                    td.innerHTML = data[i].inspCurrencyCode; }
                                else if (localStorage.getItem('col'+j.toString()) == "insp_full_name") {
                                    td.innerHTML = data[i].inspFullName; }
                                else if (localStorage.getItem('col'+j.toString()) == "status") {
                                    td.innerHTML = data[i].status; }
                                else if (localStorage.getItem('col'+j.toString()) == "custom") {
                                    td.innerHTML = data[i].custom; }
                                else if (localStorage.getItem('col'+j.toString()) == "pto") {
                                    td.innerHTML = data[i].pto; }
                                else if (localStorage.getItem('col'+j.toString()) == "lnp_photography") {
                                    td.innerHTML = data[i].lnpPhotography; }
                                else if (localStorage.getItem('col'+j.toString()) == "lnp_inspection") {
                                    td.innerHTML = data[i].lnpInspection; }
                                else if (localStorage.getItem('col'+j.toString()) == "lnp_custom") {
                                    td.innerHTML = data[i].lnpCustom; }
                                else if (localStorage.getItem('col'+j.toString()) == "lnp_warehouse") {
                                    td.innerHTML = data[i].lnpWarehouse; }
                                else if (localStorage.getItem('col'+j.toString()) == "status_text") {
                                    td.innerHTML = data[i].statusText; }
                                else if (localStorage.getItem('col'+j.toString()) == "detencion_code") {
                                    td.innerHTML = data[i].detencionCode; }
                                else if (localStorage.getItem('col'+j.toString()) == "sugn_medical_comment") {
                                    td.innerHTML = data[i].signMedicalComment; }
                                else if (localStorage.getItem('col'+j.toString()) == "sign_risk_detail") {
                                    td.innerHTML = data[i].signRiskDetail; }
                                else if (localStorage.getItem('col'+j.toString()) == "good_description") {
                                    td.innerHTML = data[i].goodDescription; }
                                else if (localStorage.getItem('col'+j.toString()) == "name_insp") {
                                    td.innerHTML = data[i].nameInsp; }
                                else if (localStorage.getItem('col'+j.toString()) == "requirement") {
                                    td.innerHTML = data[i].requirement; }
                                else if (localStorage.getItem('col'+j.toString()) == "release_note") {
                                    td.innerHTML = data[i].releaseNote; }
                                else if (localStorage.getItem('col'+j.toString()) == "sign_passport_detail") {
                                    td.innerHTML = data[i].signPassportDetail; }
                                else if (localStorage.getItem('col'+j.toString()) == "refuse_cause") {
                                    td.innerHTML = data[i].refuseCause; }
                                else { td.innerHTML = "-"; }
                                tr.appendChild(td);
                            }
                            tr.appendChild(td);
                        }
                        table.appendChild(tr);
                    }
            }
        });
    }
}

function drawOwnTable() {
    var select = document.getElementById("tables");
    var tableValue = select.value;
    var catalog = "customs";
    var columns = Number(localStorage.getItem('cols'));
    var rows = Number(localStorage.getItem('rows'));
    var sqlQuery = "SELECT o FROM Operation o";
if(tableValue == "operations") {
    $.ajax({
        url: '/api/operations/ownquery',
        method: 'get',
        // dataType: 'application/json',
        data: {"query": q},
        error : function() {
            alert("Error");
        },
        success: function (data) {
            console.log("Success" + data);
            let table = document.querySelector('#tableDb');
                for (let i = -2; i < rows; i++) {
                	let tr = document.createElement('tr');
                	for (let j = 0; j < columns; j++) {
                	    let td = document.createElement('td');
                		if (i == -2) {
                		    td.innerHTML = '<input type="checkbox">' + localStorage.getItem('col'+j.toString());
                		    td.id = localStorage.getItem('col'+j.toString());
                		    td.onclick = "tdSelect(" + localStorage.getItem('col'+j.toString()) + ")";
                        }
                        else if (i == -1) {
                            td.innerHTML = "+";
                            //td.innerHTML = localStorage.getItem('type'+j.toString());
                            td.id = localStorage.getItem('type'+j.toString());
                        }
                        else {
                            if (localStorage.getItem('col'+j.toString()) == "insp_total_cost_eur") {
                                td.innerHTML = data[i].inspTotalCostEur; }
                            else if (localStorage.getItem('col'+j.toString()) == "to_mail_message_id") {
                                td.innerHTML = data[i].toMailMessageId; }
                            else if (localStorage.getItem('col'+j.toString()) == "date_photography") {
                                td.innerHTML = data[i].datePhotography; }
                            else if (localStorage.getItem('col'+j.toString()) == "date_inspection") {
                                td.innerHTML = data[i].dateInspection; }
                            else if (localStorage.getItem('col'+j.toString()) == "date_custom") {
                                td.innerHTML = data[i].dateCustom; }
                            else if (localStorage.getItem('col'+j.toString()) == "date_warehouse") {
                                td.innerHTML = data[i].dateWarehouse; }
                            else if (localStorage.getItem('col'+j.toString()) == "sign_passport") {
                                td.innerHTML = data[i].signPassport; }
                            else if (localStorage.getItem('col'+j.toString()) == "date_send") {
                                td.innerHTML = data[i].dateSend; }
                            else if (localStorage.getItem('col'+j.toString()) == "sign_auto_release") {
                                td.innerHTML = data[i].signAutoRelease; }
                            else if (localStorage.getItem('col'+j.toString()) == "sign_risk") {
                                td.innerHTML = data[i].signRisk; }
                            else if (localStorage.getItem('col'+j.toString()) == "insp_cost") {
                                td.innerHTML = data[i].inspCost; }
                            else if (localStorage.getItem('col'+j.toString()) == "sign_medical") {
                                td.innerHTML = data[i].signMedical; }
                            else if (localStorage.getItem('col'+j.toString()) == "release_weight") {
                                td.innerHTML = data[i].releaseWeight; }
                            else if (localStorage.getItem('col'+j.toString()) == "insp_corrected") {
                                td.innerHTML = data[i].inspCorrected; }
                            else if (localStorage.getItem('col'+j.toString()) == "to_send") {
                                td.innerHTML = data[i].toSend; }
                            else if (localStorage.getItem('col'+j.toString()) == "sign_req") {
                                td.innerHTML = data[i].signReq; }
                            else if (localStorage.getItem('col'+j.toString()) == "insp_weight_mail") {
                                td.innerHTML = data[i].inspWeightMail; }
                            else if (localStorage.getItem('col'+j.toString()) == "refuse_note") {
                                td.innerHTML = data[i].refuseNote; }
                            else if (localStorage.getItem('col'+j.toString()) == "detencion_cause") {
                                td.innerHTML = data[i].detencionCause; }
                            else if (localStorage.getItem('col'+j.toString()) == "detencion_note") {
                                td.innerHTML = data[i].detencionNote; }
                            else if (localStorage.getItem('col'+j.toString()) == "insp_currency_code") {
                                td.innerHTML = data[i].inspCurrencyCode; }
                            else if (localStorage.getItem('col'+j.toString()) == "insp_full_name") {
                                td.innerHTML = data[i].inspFullName; }
                            else if (localStorage.getItem('col'+j.toString()) == "status") {
                                td.innerHTML = data[i].status; }
                            else if (localStorage.getItem('col'+j.toString()) == "custom") {
                                td.innerHTML = data[i].custom; }
                            else if (localStorage.getItem('col'+j.toString()) == "pto") {
                                td.innerHTML = data[i].pto; }
                            else if (localStorage.getItem('col'+j.toString()) == "lnp_photography") {
                                td.innerHTML = data[i].lnpPhotography; }
                            else if (localStorage.getItem('col'+j.toString()) == "lnp_inspection") {
                                td.innerHTML = data[i].lnpInspection; }
                            else if (localStorage.getItem('col'+j.toString()) == "lnp_custom") {
                                td.innerHTML = data[i].lnpCustom; }
                            else if (localStorage.getItem('col'+j.toString()) == "lnp_warehouse") {
                                td.innerHTML = data[i].lnpWarehouse; }
                            else if (localStorage.getItem('col'+j.toString()) == "status_text") {
                                td.innerHTML = data[i].statusText; }
                            else if (localStorage.getItem('col'+j.toString()) == "detencion_code") {
                                td.innerHTML = data[i].detencionCode; }
                            else if (localStorage.getItem('col'+j.toString()) == "sugn_medical_comment") {
                                td.innerHTML = data[i].signMedicalComment; }
                            else if (localStorage.getItem('col'+j.toString()) == "sign_risk_detail") {
                                td.innerHTML = data[i].signRiskDetail; }
                            else if (localStorage.getItem('col'+j.toString()) == "good_description") {
                                td.innerHTML = data[i].goodDescription; }
                            else if (localStorage.getItem('col'+j.toString()) == "name_insp") {
                                td.innerHTML = data[i].nameInsp; }
                            else if (localStorage.getItem('col'+j.toString()) == "requirement") {
                                td.innerHTML = data[i].requirement; }
                            else if (localStorage.getItem('col'+j.toString()) == "release_note") {
                                td.innerHTML = data[i].releaseNote; }
                            else if (localStorage.getItem('col'+j.toString()) == "sign_passport_detail") {
                                td.innerHTML = data[i].signPassportDetail; }
                            else if (localStorage.getItem('col'+j.toString()) == "refuse_cause") {
                                td.innerHTML = data[i].refuseCause; }
                            else { td.innerHTML = "-"; }
                            tr.appendChild(td);
                        }
                        tr.appendChild(td);
                	}
                	table.appendChild(tr);
                }
        }
});
}
}

function tdSelect(tdText) {
    document.getElementById("select").value = document.getElementById("select").value + tdSelect + ', ';
}

function showPieDiagram() {
var catalog = 'customs';
var table = document.getElementById('tables').value;
// список значений для диаграммы:
var valuesListField = document.getElementById('fieldsValues').options[document.getElementById('fieldsValues').selectedIndex].text;
let q = "SELECT o FROM Operation o";//здесь будет пользовательсий запрос
//$.ajax({
//    url: '/api/operations/all',
//    method: 'get',
//    dataType: 'json',
//    //data: {"query": q},
//    success: function (data) {
//        console.log("Success" + data);
//    }
//});

var fieldsRecountField = document.getElementById('fieldsRecount').options[document.getElementById('fieldsRecount').selectedIndex].text;
var filterDateField = document.getElementById('fieldsDate').options[document.getElementById('fieldsDate').selectedIndex].text;
var dateFrom, dateTo;
if(filterDateField!='-') {
    dateFrom = document.getElementById('dateFrom').value;
    dateTo = document.getElementById('dateTo').value;
}
var filterValueField = document.getElementById('valuesFilterFields').options[document.getElementById('valuesFilterFields').selectedIndex].text;
var filterValueFieldValue = document.getElementById('valuesFilterValues').value;

(function () {
    function ac_add_to_head(el) {
        var head = document.getElementsByTagName("head")[0];
        head.insertBefore(el, head.firstChild);
    }
    function ac_add_link(url) {
        var el = document.createElement("link");
        el.rel = "stylesheet";
        el.type = "text/css";
        el.media = "all";
        el.href = url;
        ac_add_to_head(el);
    }
    function ac_add_style(css) {
        var ac_style = document.createElement("style");
        if (ac_style.styleSheet) ac_style.styleSheet.cssText = css;
        else ac_style.appendChild(document.createTextNode(css));
        ac_add_to_head(ac_style);
    }
    ac_add_link(
        "https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css"
    );
    ac_add_link(
        "https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.min.css"
    );
    ac_add_style(
        document.getElementById(
            "ac_style_src-pie-and-donut-charts-pie-chart"
        ).innerHTML
    );
    ac_add_style(
        ".anychart-embed-src-pie-and-donut-charts-pie-chart{width:600px;height:450px;}"
    );
})();
anychart.onDocumentReady(function () {
// set chart theme
anychart.theme('lightProvence');
// create pie chart with passed data
var data = anychart.data.set([
    ['чета 1', 20],
    ['чета 2', 85],
    ['еще чета 3', 32],
    ['и 4', 8]
]);

var wealth = data.mapAs({ x: 0, value: 1 });

var chart = anychart.pie(wealth);
    chart
    .labels()
    .hAlign('center')
    .position('outside')
    .format('{%Value} trn.n({%PercentOfCategory}%)');
// set chart title text settings
    chart.title('The global wealth pie');
// set legend title text settings
    chart
    .legend()
// set legend position and items layout
    .position('center-bottom')
    .itemsLayout('horizontal')
    .align('center');
// set container id for the chart
    chart.container('container');
// initiate chart drawing
    chart.draw();
});
}
function showBarChart() {
    var data = anychart.data.set([
        ["значение 1", 14],
        ["значение 2", 19],
        ["значение 3", 14],
        ["значение 4", 25],
        ["значение 5", 9],
    ]);
    var chart = anychart.bar();
    var series = chart.bar(data);
    chart.xAxis().title("Значения по полю");
    chart.yAxis().title("Количество, шт");
    chart.container("container");
    chart.draw();
};
function showLineChart() {
    var data = [
    ["2023-08-10", 80],
    ["2023-09-10", 120],
    ["2023-10-10", 130],
    ["2023-11-10", 76],
    ["2023-12-10", 80]
    ];
    var chart = anychart.line();
    var series = chart.line(data);
    var xAxis = chart.xAxis();
    xAxis.title("Период (единичный отрезок)");
    var yAxis = chart.yAxis();
    yAxis.title("Показатель (СИ)");
    chart.container("container");
    chart.draw();
}

// функции для страницы dbManipulations.html
function addClient() {
    let fullName = document.getElementById('fullName').value;
    let dateBirth = document.getElementById('dateBirth').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
    let email = document.getElementById('email').value;
    let passportNumber = document.getElementById('passportNumber').value;
    if(fullName!=null && dateBirth!=null && phoneNumber!=null && email!=null && passportNumber!=null) {
        $.ajax({
                type: 'POST',
                url: '/api/clients/save',
                dataType: 'text',
                contentType: 'application/json',
                data: JSON.stringify({
                    "clientFullName": fullName,
                    "birthDate": dateBirth,
                    "clientPhoneNumber": phoneNumber,
                    "clientEmail": email,
                    "passportNumber": passportNumber
                }),
                success: function (response) {
                    console.log('Клиент сохранен в бд:', response);
                    alert('Клиент сохранен в бд.');
                },
                error: function (error) {
                    console.error('Ошибка в сохранении клиента в бд:', error);
                    alert('Ошибка в сохранении клиента в бд');
                }
            })
    }
    else alert("Заполните поля");
}
function changeClient() {
    let clientId = document.getElementBuId('idClientChange').value;
    let fullName = document.getElementById('fullName2').value;
    let dateBirth = document.getElementById('dateBirth2').value;
    let phoneNumber = document.getElementById('phoneNumber2').value;
    let email = document.getElementById('email2').value;
    let passportNumber = document.getElementById('passportNumber2').value;
    if(clientId!=null && fullName!=null && dateBirth!=null && phoneNumber!=null && email!=null && passportNumber!=null){
        $.ajax({
             type: 'POST',
             url: '/api/clients/update',
             dataType: 'text',
             contentType: 'application/json',
             data: JSON.stringify({
                "clientId": clientId,
                "clientFullName": fullName,
                "birthDate": dateBirth,
                "clientPhoneNumber": phoneNumber,
                "clientEmail": email,
                "passportNumber": passportNumber
             }),
             success: function (response) {
                  console.log('Клиент сохранен в бд:', response);
                  alert('Клиент сохранен в бд.');
             },
             error: function (error) {
                  console.error('Ошибка в сохранении клиента в бд:', error);
                  alert('Ошибка в сохранении клиента в бд');
             }
        })
    }
}
function deleteClient() {
    let clientId = document.getElementBuId('idClientDelete').value;
    if(clientId!=null) {
        $.ajax({
             type: 'DELETE',
             url: '/api/clients/delete/' + clientId,
             dataType: 'text',
             success: function (response) {
                  console.log('Клиент удален из бд:', response);
                  alert('Клиент удален из бд.');
             },
             error: function (error) {
                  console.error('Ошибка в удалении клиента из бд:', error);
                  alert('Ошибка в удалении клиента из бд');
             }
        })
    }
}