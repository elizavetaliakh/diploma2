var userIdOutput = 3;

function handleData() {
    let login = $('#loginInput').val();
    let password = $('#passwordInput').val();
    if (login == '' || password == '') {
        alert("Заполните поля");
    } else {
        $.ajax({
            url: '/api/v1/users/login/' + login + '/' + password,
            method: 'get',
            dataType: 'application/json',
            success: function (data) {
                alert("Вы вошли в аккаунт");
            },
            error: function (error) {
            }
        });
    }
}

function registrateUser() {
    let login = $('#loginInput').val();
    let password = $('#passwordInput').val();
    console.log('login = ' + login + ' password = ' + password);
    if (login == '' || password == '') {
        alert("Заполните поля");
    } else {
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
        });
    }
}

function loadDbStructure() {
    $.ajax({
        url: '/api/queries/all',
        method: 'get',
        dataType: 'application/json',
        success: function (data) {
            let query = data.filter(item => {
                return item.userId == '3'
            })[0].queryDefinition;
            alert(query);
            //document.getElementById("sqlHistory").value(data);
        }
    });
}

function makeQuery() {
    document.getElementById("sqlText").value = '';
    var tableSelect = document.getElementById("tables").value;
    var selectMargin = document.getElementById("select").value;
    var distinctSwitch = document.getElementById("distinct").checked;
    var distinctTrue;
    if (distinctSwitch == true) {
        distinctTrue = ' DISTINCT';
    } else {
        distinctTrue = '';
    }
    var fromMargin = document.getElementById("from").value;
    var whereMargin = document.getElementById("where").value;
    var andSwitch = document.getElementById("and").checked;
    var andTrue;
    if (andSwitch == true) {
        andTrue = ' AND';
    } else {
        andTrue = '';
    }
    var groupByMargin = document.getElementById("groupBy").value;
    var groupByText = '';
    if (groupByMargin != '') {
        groupByText = ' GROUP BY ' + groupByMargin;
    }
    var orderByMargin = document.getElementById("orderBy").value;
    var orderByText = '';
    if (orderByMargin != '') {
        orderByText = ' ORDER BY ' + orderByMargin;
    }
    if (selectMargin == '' || fromMargin == '' || whereMargin == '') {
        alert('Заполните обязательные поля!');
    } else {
        var query = 'SELECT ' + selectMargin + distinctTrue + ' FROM ' + fromMargin + ' WHERE ' + whereMargin +
            andTrue + groupByText + orderByText + ';';
    }
    document.getElementById("sqlText").value = (query);
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
        error: function () {
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
                localStorage.setItem("col" + i.toString(), element);
                i += 1;
                console.log(localStorage.getItem('col' + i.toString()));
            })
        }
    });
    for (let i = 0; i < columns; i++) {
        let colName = localStorage.getItem('col' + i.toString());
        $.ajax({
            url: '/api/operations/getcolumndatatype',
            method: 'get',
            data: {"catalog": catalog, "table": tableValue, "column": colName},
            success: function (data) {
                console.log("Column type " + i + ": " + data);
                localStorage.setItem("type" + i.toString(), data);
                console.log(localStorage.getItem('type' + i.toString()));
            }
        });
    }

    let q = "SELECT o FROM Operation o";//здесь будет пользовательсий запрос

    if (tableValue == "operations") {
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
                            td.innerHTML = '<input type="checkbox">' + localStorage.getItem('col' + j.toString());
                            td.id = localStorage.getItem('col' + j.toString());
                            td.onclick = "tdSelect(" + localStorage.getItem('col' + j.toString()) + ")";
                        } else if (i == -1) {
                            td.innerHTML = "+";
                            //td.innerHTML = localStorage.getItem('type'+j.toString());
                            td.id = localStorage.getItem('type' + j.toString());
                        } else {
                            if (localStorage.getItem('col' + j.toString()) == "insp_total_cost_eur") {
                                td.innerHTML = data[i].inspTotalCostEur;
                            } else if (localStorage.getItem('col' + j.toString()) == "to_mail_message_id") {
                                td.innerHTML = data[i].toMailMessageId;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_photography") {
                                td.innerHTML = data[i].datePhotography;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_inspection") {
                                td.innerHTML = data[i].dateInspection;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_custom") {
                                td.innerHTML = data[i].dateCustom;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_warehouse") {
                                td.innerHTML = data[i].dateWarehouse;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_passport") {
                                td.innerHTML = data[i].signPassport;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_send") {
                                td.innerHTML = data[i].dateSend;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_auto_release") {
                                td.innerHTML = data[i].signAutoRelease;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_risk") {
                                td.innerHTML = data[i].signRisk;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_cost") {
                                td.innerHTML = data[i].inspCost;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_medical") {
                                td.innerHTML = data[i].signMedical;
                            } else if (localStorage.getItem('col' + j.toString()) == "release_weight") {
                                td.innerHTML = data[i].releaseWeight;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_corrected") {
                                td.innerHTML = data[i].inspCorrected;
                            } else if (localStorage.getItem('col' + j.toString()) == "to_send") {
                                td.innerHTML = data[i].toSend;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_req") {
                                td.innerHTML = data[i].signReq;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_weight_mail") {
                                td.innerHTML = data[i].inspWeightMail;
                            } else if (localStorage.getItem('col' + j.toString()) == "refuse_note") {
                                td.innerHTML = data[i].refuseNote;
                            } else if (localStorage.getItem('col' + j.toString()) == "detencion_cause") {
                                td.innerHTML = data[i].detencionCause;
                            } else if (localStorage.getItem('col' + j.toString()) == "detencion_note") {
                                td.innerHTML = data[i].detencionNote;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_currency_code") {
                                td.innerHTML = data[i].inspCurrencyCode;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_full_name") {
                                td.innerHTML = data[i].inspFullName;
                            } else if (localStorage.getItem('col' + j.toString()) == "status") {
                                td.innerHTML = data[i].status;
                            } else if (localStorage.getItem('col' + j.toString()) == "custom") {
                                td.innerHTML = data[i].custom;
                            } else if (localStorage.getItem('col' + j.toString()) == "pto") {
                                td.innerHTML = data[i].pto;
                            } else if (localStorage.getItem('col' + j.toString()) == "lnp_photography") {
                                td.innerHTML = data[i].lnpPhotography;
                            } else if (localStorage.getItem('col' + j.toString()) == "lnp_inspection") {
                                td.innerHTML = data[i].lnpInspection;
                            } else if (localStorage.getItem('col' + j.toString()) == "lnp_custom") {
                                td.innerHTML = data[i].lnpCustom;
                            } else if (localStorage.getItem('col' + j.toString()) == "lnp_warehouse") {
                                td.innerHTML = data[i].lnpWarehouse;
                            } else if (localStorage.getItem('col' + j.toString()) == "status_text") {
                                td.innerHTML = data[i].statusText;
                            } else if (localStorage.getItem('col' + j.toString()) == "detencion_code") {
                                td.innerHTML = data[i].detencionCode;
                            } else if (localStorage.getItem('col' + j.toString()) == "sugn_medical_comment") {
                                td.innerHTML = data[i].signMedicalComment;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_risk_detail") {
                                td.innerHTML = data[i].signRiskDetail;
                            } else if (localStorage.getItem('col' + j.toString()) == "good_description") {
                                td.innerHTML = data[i].goodDescription;
                            } else if (localStorage.getItem('col' + j.toString()) == "name_insp") {
                                td.innerHTML = data[i].nameInsp;
                            } else if (localStorage.getItem('col' + j.toString()) == "requirement") {
                                td.innerHTML = data[i].requirement;
                            } else if (localStorage.getItem('col' + j.toString()) == "release_note") {
                                td.innerHTML = data[i].releaseNote;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_passport_detail") {
                                td.innerHTML = data[i].signPassportDetail;
                            } else if (localStorage.getItem('col' + j.toString()) == "refuse_cause") {
                                td.innerHTML = data[i].refuseCause;
                            } else {
                                td.innerHTML = "-";
                            }
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
    if (tableValue == "operations") {
        $.ajax({
            url: '/api/operations/ownquery',
            method: 'get',
            // dataType: 'application/json',
            data: {"query": q},
            error: function () {
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
                            td.innerHTML = '<input type="checkbox">' + localStorage.getItem('col' + j.toString());
                            td.id = localStorage.getItem('col' + j.toString());
                            td.onclick = "tdSelect(" + localStorage.getItem('col' + j.toString()) + ")";
                        } else if (i == -1) {
                            td.innerHTML = "+";
                            //td.innerHTML = localStorage.getItem('type'+j.toString());
                            td.id = localStorage.getItem('type' + j.toString());
                        } else {
                            if (localStorage.getItem('col' + j.toString()) == "insp_total_cost_eur") {
                                td.innerHTML = data[i].inspTotalCostEur;
                            } else if (localStorage.getItem('col' + j.toString()) == "to_mail_message_id") {
                                td.innerHTML = data[i].toMailMessageId;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_photography") {
                                td.innerHTML = data[i].datePhotography;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_inspection") {
                                td.innerHTML = data[i].dateInspection;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_custom") {
                                td.innerHTML = data[i].dateCustom;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_warehouse") {
                                td.innerHTML = data[i].dateWarehouse;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_passport") {
                                td.innerHTML = data[i].signPassport;
                            } else if (localStorage.getItem('col' + j.toString()) == "date_send") {
                                td.innerHTML = data[i].dateSend;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_auto_release") {
                                td.innerHTML = data[i].signAutoRelease;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_risk") {
                                td.innerHTML = data[i].signRisk;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_cost") {
                                td.innerHTML = data[i].inspCost;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_medical") {
                                td.innerHTML = data[i].signMedical;
                            } else if (localStorage.getItem('col' + j.toString()) == "release_weight") {
                                td.innerHTML = data[i].releaseWeight;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_corrected") {
                                td.innerHTML = data[i].inspCorrected;
                            } else if (localStorage.getItem('col' + j.toString()) == "to_send") {
                                td.innerHTML = data[i].toSend;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_req") {
                                td.innerHTML = data[i].signReq;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_weight_mail") {
                                td.innerHTML = data[i].inspWeightMail;
                            } else if (localStorage.getItem('col' + j.toString()) == "refuse_note") {
                                td.innerHTML = data[i].refuseNote;
                            } else if (localStorage.getItem('col' + j.toString()) == "detencion_cause") {
                                td.innerHTML = data[i].detencionCause;
                            } else if (localStorage.getItem('col' + j.toString()) == "detencion_note") {
                                td.innerHTML = data[i].detencionNote;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_currency_code") {
                                td.innerHTML = data[i].inspCurrencyCode;
                            } else if (localStorage.getItem('col' + j.toString()) == "insp_full_name") {
                                td.innerHTML = data[i].inspFullName;
                            } else if (localStorage.getItem('col' + j.toString()) == "status") {
                                td.innerHTML = data[i].status;
                            } else if (localStorage.getItem('col' + j.toString()) == "custom") {
                                td.innerHTML = data[i].custom;
                            } else if (localStorage.getItem('col' + j.toString()) == "pto") {
                                td.innerHTML = data[i].pto;
                            } else if (localStorage.getItem('col' + j.toString()) == "lnp_photography") {
                                td.innerHTML = data[i].lnpPhotography;
                            } else if (localStorage.getItem('col' + j.toString()) == "lnp_inspection") {
                                td.innerHTML = data[i].lnpInspection;
                            } else if (localStorage.getItem('col' + j.toString()) == "lnp_custom") {
                                td.innerHTML = data[i].lnpCustom;
                            } else if (localStorage.getItem('col' + j.toString()) == "lnp_warehouse") {
                                td.innerHTML = data[i].lnpWarehouse;
                            } else if (localStorage.getItem('col' + j.toString()) == "status_text") {
                                td.innerHTML = data[i].statusText;
                            } else if (localStorage.getItem('col' + j.toString()) == "detencion_code") {
                                td.innerHTML = data[i].detencionCode;
                            } else if (localStorage.getItem('col' + j.toString()) == "sugn_medical_comment") {
                                td.innerHTML = data[i].signMedicalComment;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_risk_detail") {
                                td.innerHTML = data[i].signRiskDetail;
                            } else if (localStorage.getItem('col' + j.toString()) == "good_description") {
                                td.innerHTML = data[i].goodDescription;
                            } else if (localStorage.getItem('col' + j.toString()) == "name_insp") {
                                td.innerHTML = data[i].nameInsp;
                            } else if (localStorage.getItem('col' + j.toString()) == "requirement") {
                                td.innerHTML = data[i].requirement;
                            } else if (localStorage.getItem('col' + j.toString()) == "release_note") {
                                td.innerHTML = data[i].releaseNote;
                            } else if (localStorage.getItem('col' + j.toString()) == "sign_passport_detail") {
                                td.innerHTML = data[i].signPassportDetail;
                            } else if (localStorage.getItem('col' + j.toString()) == "refuse_cause") {
                                td.innerHTML = data[i].refuseCause;
                            } else {
                                td.innerHTML = "-";
                            }
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
    var valuesList = [];
    $.ajax({
        url: '/api/operations/all',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            console.log("Success" + data);
            data.forEach(d => {
                switch (valuesListField) {
                    case 'to_mail_message_id':
                        valuesList.push(d.toMailMessageId);
                        break;
                    case 'custom':
                        valuesList.push(d.custom);
                        break;
                    case 'pto':
                        valuesList.push(d.pto);
                        break;
                    case 'lnp_photography':
                        valuesList.push(d.lnpPhotography);
                        break;
                    case 'lnp_inspection':
                        valuesList.push(d.lnpInspection);
                        break;
                    case 'lnp_custom':
                        valuesList.push(d.lnpCustom);
                        break;
                    case 'lnp_warehouse':
                        valuesList.push(d.lnpWarehouse);
                        break;
                    case 'good_description':
                        valuesList.push(d.goodDescription);
                        break;
                    case 'name_insp':
                        valuesList.push(d.nameInsp);
                        break;
                    case 'requirement':
                        valuesList.push(d.requirement);
                        break;
                    case 'sign_passport':
                        valuesList.push(d.signPassport);
                        break;
                    case 'sign_passport_detail':
                        valuesList.push(d.signPassportDetail);
                        break;
                    case 'sign_auto_release':
                        valuesList.push(d.signAutoRelease);
                        break;
                    case 'sign_risk':
                        valuesList.push(d.signRisk);
                        break;
                    case 'insp_cost':
                        valuesList.push(d.inspCost);
                        break;
                    case 'insp_currency_code':
                        valuesList.push(d.inspCurrencyCode);
                        break;
                    case 'insp_full_name':
                        valuesList.push(d.inspFullName);
                        break;
                    case 'status':
                        valuesList.push(d.status);
                        break;
                    case 'status_text':
                        valuesList.push(d.statusText);
                        break;
                    case 'sign_medical':
                        valuesList.push(d.signMedical);
                        break;
                    case 'sign_medical_comment':
                        valuesList.push(d.signMedicalComment);
                        break;
                    case 'release_weight':
                        valuesList.push(d.releaseWeight);
                        break;
                    case 'release_note':
                        valuesList.push(d.releaseNote);
                        break;
                    case 'refuse_cause':
                        valuesList.push(d.refuseCause);
                        break;
                    case 'refuse_note':
                        valuesList.push(d.refuseNote);
                        break;
                    case 'detencion_cause':
                        valuesList.push(d.detencionCause);
                        break;
                    case 'detencion_note':
                        valuesList.push(d.detencionNote);
                        break;
                    case 'detencion_code':
                        valuesList.push(d.detencionCode);
                        break;
                    case 'insp_corrected':
                        valuesList.push(d.inspCorrected);
                        break;
                    case 'to_send':
                        valuesList.push(d.toSend);
                        break;
                    case 'sign_risk_detail':
                        valuesList.push(d.signRiskDetail);
                        break;
                    case 'sign_req':
                        valuesList.push(d.signReq);
                        break;
                    case 'insp_weight_mail':
                        valuesList.push(d.inspWeightMail);
                        break;
                    case 'insp_total_cost_eur':
                        valuesList.push(d.inspTotalCostEur);
                        break;
                }
            })
        }
    });
    alert(valuesList[2]);

    var fieldsRecountField = document.getElementById('fieldsRecount').options[document.getElementById('fieldsRecount').selectedIndex].text;
    var filterDateField = document.getElementById('fieldsDate').options[document.getElementById('fieldsDate').selectedIndex].text;
    var dateFrom, dateTo;
    if (filterDateField != '-') {
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

        var wealth = data.mapAs({x: 0, value: 1});

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
    if (fullName != null && dateBirth != null && phoneNumber != null && email != null && passportNumber != null) {
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
    } else alert("Заполните поля");
}

function deleteClient() {
    let clientId = document.getElementById('idClientDelete').value;
    if (clientId != null) {
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

function changeClient() {
    let clientId = document.getElementById('idClientChange').value;
    let fullName = document.getElementById('fullName2').value;
    let dateBirth = document.getElementById('dateBirth2').value;
    let phoneNumber = document.getElementById('phoneNumber2').value;
    let email = document.getElementById('email2').value;
    let passportNumber = document.getElementById('passportNumber2').value;
    if (clientId != null && fullName != null && dateBirth != null && phoneNumber != null && email != null && passportNumber != null) {
        $.ajax({
            method: 'PUT',
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
                console.log('Клиент обновлен в бд:', response);
                alert('Клиент обновлен в бд.');
            },
            error: function (error) {
                console.error('Ошибка в обновлении клиента в бд:', error);
                alert('Ошибка в обновлении клиента в бд');
            }
        })
    }
}

function showClientTable() {
    $.ajax({
        url: '/api/clients/all',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            console.log("Success" + data);
            let table = document.querySelector('#clientsTable');
            for (let i = -1; i < data.length; i++) {
                let tr = document.createElement('tr');
                for (let j = 0; j < 6; j++) {
                    let td = document.createElement('td');
                    if (i == -1) {
                        switch (j) {
                            case 0: {
                                td.innerHTML = 'ID клиента';
                                td.id = 'ThClientId';
                                break;
                            }
                            case 1: {
                                td.innerHTML = 'Полное имя';
                                td.id = 'ThFullName';
                                break;
                            }
                            case 2: {
                                td.innerHTML = 'Дата рождения';
                                td.id = 'ThDateBirth';
                                break;
                            }
                            case 3: {
                                td.innerHTML = 'Номер телефона';
                                td.id = 'ThPhoneNumber';
                                break;
                            }
                            case 4: {
                                td.innerHTML = 'Электронная почта';
                                td.id = 'ThEmail';
                                break;
                            }
                            case 5: {
                                td.innerHTML = 'Номер паспорта';
                                td.id = 'ThPassportNumber';
                                break;
                            }
                        }
                    } else {
                        switch (j) {
                            case 0: {
                                td.innerHTML = data[i].clientId;
                                break;
                            }
                            case 1: {
                                td.innerHTML = data[i].clientFullName;
                                break;
                            }
                            case 2: {
                                td.innerHTML = data[i].birthDate;
                                break;
                            }
                            case 3: {
                                td.innerHTML = data[i].clientPhoneNumber;
                                break;
                            }
                            case 4: {
                                td.innerHTML = data[i].clientEmail;
                                break;
                            }
                            case 5: {
                                td.innerHTML = data[i].passportNumber;
                                break;
                            }
                        }
                    }
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
        }
    });
}

function addService() {
    let serviceName = document.getElementById('serviceName').value;
    let servicePrice = document.getElementById('servicePrice').value;
    let productType = document.getElementById('productType').value;
    let serviceDescription = document.getElementById('serviceDescription').value;
    if (serviceName != null && servicePrice != null && productType != null && serviceDescription != null) {
        $.ajax({
            type: 'POST',
            url: '/api/services/save',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify({
                "serviceName": serviceName,
                "servicePrice": servicePrice,
                "productType": productType,
                "serviceDescription": serviceDescription
            }),
            success: function (response) {
                console.log('Услуга сохранена в бд:', response);
                alert('Услуга сохранена в бд.');
            },
            error: function (error) {
                console.error('Ошибка в сохранении услуги в бд:', error);
                alert('Ошибка в сохранении услуги в бд');
            }
        })
    } else alert("Заполните поля");
}

function deleteService() {
    let serviceId = document.getElementById('idServiceDelete').value;
    if (serviceId != null) {
        $.ajax({
            type: 'DELETE',
            url: '/api/services/delete/' + serviceId,
            dataType: 'text',
            success: function (response) {
                console.log('Услуга удалена из бд:', response);
                alert('Услуга удалена из бд.');
            },
            error: function (error) {
                console.error('Ошибка в удалении услуги из бд:', error);
                alert('Ошибка в удалении услуги из бд');
            }
        })
    }
}

function showServiceTable() {
    $.ajax({
        url: '/api/services/all',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            console.log("Success" + data);
            let table = document.querySelector('#servicesTable');
            for (let i = -1; i < data.length; i++) {
                let tr = document.createElement('tr');
                for (let j = 0; j < 5; j++) {
                    let td = document.createElement('td');
                    if (i == -1) {
                        switch (j) {
                            case 0: {
                                td.innerHTML = 'ID услуги';
                                td.id = 'ThServiceId';
                                break;
                            }
                            case 1: {
                                td.innerHTML = 'Название услуги';
                                td.id = 'ThServiceName';
                                break;
                            }
                            case 2: {
                                td.innerHTML = 'Цена';
                                td.id = 'ThServicePrice';
                                break;
                            }
                            case 3: {
                                td.innerHTML = 'Тип продуктов';
                                td.id = 'ThProductType';
                                break;
                            }
                            case 4: {
                                td.innerHTML = 'Описание';
                                td.id = 'ThServiceDescription';
                                break;
                            }
                        }
                    } else {
                        switch (j) {
                            case 0: {
                                td.innerHTML = data[i].serviceId;
                                break;
                            }
                            case 1: {
                                td.innerHTML = data[i].serviceName;
                                break;
                            }
                            case 2: {
                                td.innerHTML = data[i].servicePrice;
                                break;
                            }
                            case 3: {
                                td.innerHTML = data[i].productType;
                                break;
                            }
                            case 4: {
                                td.innerHTML = data[i].serviceDescription;
                                break;
                            }
                        }
                    }
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
        }
    });
}

function addOnetimeService() {
    let serviceId = document.getElementById('serviceId').value;
    let clientId = document.getElementById('clientId').value;
    let acceptionDate = document.getElementById('acceptionDate').value;
    let deadlineDate = document.getElementById('deadlineDate').value;
    let responsibleEmployee = document.getElementById('responsibleEmployee').value;
    if (serviceId != null && clientId != null && acceptionDate != null && deadlineDate != null && responsibleEmployee != null) {
        $.ajax({
            type: 'POST',
            url: '/api/onetime_service/save',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify({
                "serviceId": serviceId,
                "clientId": clientId,
                "acceptionDate": acceptionDate,
                "deadlineDate": deadlineDate,
                "responsibleEmployee": responsibleEmployee
            }),
            success: function (response) {
                console.log('Операция сохранена в бд:', response);
                alert('Операция сохранена в бд.');
            },
            error: function (error) {
                console.error('Ошибка в сохранении операции в бд:', error);
                alert('Ошибка в сохранении операции в бд');
            }
        })
    } else alert("Заполните поля");
}

function deleteOnetimeService() {
    let onetimeServiceId = document.getElementById('idOnetimeServiceDelete').value;
    if (onetimeServiceId != null) {
        $.ajax({
            type: 'DELETE',
            url: '/api/onetime_service/delete/' + onetimeServiceId,
            dataType: 'text',
            success: function (response) {
                console.log('Услуга удалена из бд:', response);
                alert('Услуга удалена из бд.');
            },
            error: function (error) {
                console.error('Ошибка в удалении услуги из бд:', error);
                alert('Ошибка в удалении услуги из бд');
            }
        })
    }
}

function showOnetimeServiceTable() {
    $.ajax({
        url: '/api/onetime_service/all',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            console.log("Success" + data);
            let table = document.querySelector('#onetimeServicesTable');
            for (let i = -1; i < data.length; i++) {
                let tr = document.createElement('tr');
                for (let j = 0; j < 6; j++) {
                    let td = document.createElement('td');
                    if (i == -1) {
                        switch (j) {
                            case 0: {
                                td.innerHTML = 'ID сделки';
                                td.id = 'ThOnetimeServiceId';
                                break;
                            }
                            case 1: {
                                td.innerHTML = 'ID услуги';
                                td.id = 'ThOnetimeServiceServiceId';
                                break;
                            }
                            case 2: {
                                td.innerHTML = 'ID клиента';
                                td.id = 'ThOnetimeServiceClientId';
                                break;
                            }
                            case 3: {
                                td.innerHTML = 'Дата принятия';
                                td.id = 'ThAcceptionDate';
                                break;
                            }
                            case 4: {
                                td.innerHTML = 'Срок выполнения';
                                td.id = 'ThDeadlineDate';
                                break;
                            }
                            case 5: {
                                td.innerHTML = 'Ответственный сотрудник';
                                td.id = 'ThResponsibleEmployee';
                                break;
                            }
                        }
                    } else {
                        switch (j) {
                            case 0: {
                                td.innerHTML = data[i].onetimeServiceId;
                                break;
                            }
                            case 1: {
                                td.innerHTML = data[i].serviceId;
                                break;
                            }
                            case 2: {
                                td.innerHTML = data[i].clientId;
                                break;
                            }
                            case 3: {
                                td.innerHTML = data[i].acceptionDate;
                                break;
                            }
                            case 4: {
                                td.innerHTML = data[i].deadlineDate;
                                break;
                            }
                            case 5: {
                                td.innerHTML = data[i].responsibleEmployee;
                                break;
                            }
                        }
                    }
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
        }
    });
}

function showClient(value) {
    var ind = Number(document.getElementById('showClientId').innerHTML);
    if (value == 'next') document.getElementById('showClientId').innerHTML = ind + 1;
    else if (ind > 0) document.getElementById('showClientId').innerHTML = ind - 1;
    ind = Number(document.getElementById('showClientId').innerHTML);
    $.ajax({
        url: '/api/clients/get/' + ind,
        method: 'get',
        dataType: 'json',
        success: function (data) {
            document.getElementById('showClientName').innerHTML = data.clientFullName;
            document.getElementById('showClientDateBirth').innerHTML = data.birthDate;
            document.getElementById('showClientPhoneNumber').innerHTML = data.clientPhoneNumber;
            document.getElementById('showClientEmail').innerHTML = data.clientEmail;
            document.getElementById('showClientPassportNumber').innerHTML = data.passportNumber;
        },
        error: function (error) {
            document.getElementById('showClientName').innerHTML = 'Нет клиента с таким индексом';
            document.getElementById('showClientDateBirth').innerHTML = '';
            document.getElementById('showClientPhoneNumber').innerHTML = '';
            document.getElementById('showClientEmail').innerHTML = '';
            document.getElementById('showClientPassportNumber').innerHTML = '';
        }
    });
}

function showService(value) {
    var ind = Number(document.getElementById('showServiceId').innerHTML);
    if (value == 'next') document.getElementById('showServiceId').innerHTML = ind + 1;
    else if (ind > 0) document.getElementById('showServiceId').innerHTML = ind - 1;
    ind = Number(document.getElementById('showServiceId').innerHTML);
    $.ajax({
        url: '/api/services/get/' + ind,
        method: 'get',
        dataType: 'json',
        success: function (data) {
            document.getElementById('showServiceName').innerHTML = data.serviceName;
            document.getElementById('showServicePrice').innerHTML = data.servicePrice;
            document.getElementById('showProductType').innerHTML = data.productType;
            document.getElementById('showServiceDescription').innerHTML = data.serviceDescription;
        },
        error: function (error) {
            document.getElementById('showServiceName').innerHTML = 'Нет услуги с таким индексом';
            document.getElementById('showServicePrice').innerHTML = '';
            document.getElementById('showProductType').innerHTML = '';
            document.getElementById('showServiceDescription').innerHTML = '';
        }
    });
}

function showOnetimeService(value) {
    var ind = Number(document.getElementById('showOnetimeServiceId').innerHTML);
    if (value == 'next') document.getElementById('showOnetimeServiceId').innerHTML = ind + 1;
    else if (ind > 0) document.getElementById('showOnetimeServiceId').innerHTML = ind - 1;
    ind = Number(document.getElementById('showOnetimeServiceId').innerHTML);
    $.ajax({
        url: '/api/onetime_service/get/' + ind,
        method: 'get',
        dataType: 'json',
        success: function (data) {
            document.getElementById('showServiceId2').innerHTML = data.serviceId;
            document.getElementById('showClientId2').innerHTML = data.clientId;
            document.getElementById('showAcceptionDate').innerHTML = data.acceptionDate;
            document.getElementById('showDeadlineDate').innerHTML = data.deadlineDate;
            document.getElementById('showResponsibleEmployee').innerHTML = data.responsibleEmployee;
        },
        error: function (error) {
            document.getElementById('showServiceId2').innerHTML = 'Нет услуги с таким индексом';
            document.getElementById('showClientId2').innerHTML = '';
            document.getElementById('showAcceptionDate').innerHTML = '';
            document.getElementById('showDeadlineDate').innerHTML = '';
            document.getElementById('showResponsibleEmployee').innerHTML = '';
        }
    });
}

function addOperation() {
    let toMailMessageId = document.getElementById('toMailMessageId').value;
    let custom = document.getElementById('custom').value;
    let pto = document.getElementById('pto').value;
    let lnpPhotography = document.getElementById('lnpPhotography').value;
    let lnpInspection = document.getElementById('lnpInspection').value;
    let lnpCustom = document.getElementById('lnpCustom').value;
    let lnpWarehouse = document.getElementById('lnpWarehouse').value;
    let datePhotography = document.getElementById('datePhotography').value;
    let dateInspection = document.getElementById('dateInspection').value;
    let dateCustom = document.getElementById('dateCustom').value;
    let dateWarehouse = document.getElementById('dateWarehouse').value;
    let goodDescription = document.getElementById('goodDescription').value;
    let nameInsp = document.getElementById('nameInsp').value;
    let requirement = document.getElementById('requirement').value;
    let signPassport = document.getElementById('signPassport').value;
    let signPassportDetail = document.getElementById('signPassportDetail').value;
    let dateSend = document.getElementById('dateSend').value;
    let signAutoRelease = document.getElementById('signAutoRelease').value;
    let signRisk = document.getElementById('signRisk').value;
    let inspCost = document.getElementById('inspCost').value;
    let inspCurrencyCode = document.getElementById('inspCurrencyCode').value;
    let inspFullName = document.getElementById('inspFullName').value;
    let status = document.getElementById('status').value;
    let statusText = document.getElementById('statusText').value;
    let signMedical = document.getElementById('signMedical').value;
    let signMedicalComment = document.getElementById('signMedicalComment').value;
    let releaseWeight = document.getElementById('releaseWeight').value;
    let releaseNote = document.getElementById('releaseNote').value;
    let refuseCause = document.getElementById('refuseCause').value;
    let refuseNote = document.getElementById('refuseNote').value;
    let detencionCause = document.getElementById('detencionCause').value;
    let detencionNote = document.getElementById('detencionNote').value;
    let detencionCode = document.getElementById('detencionCode').value;
    let inspCorrected = document.getElementById('inspCorrected').value;
    let toSend = document.getElementById('toSend').value;
    let signRiskDetail = document.getElementById('signRiskDetail').value;
    let signReq = document.getElementById('signReq').value;
    let inspWeightMail = document.getElementById('inspWeightMail').value;
    let inspTotalCostEur = document.getElementById('inspTotalCostEur').value;
    if (toMailMessageId != null && custom != null && pto != null && lnpPhotography != null && lnpInspection != null && lnpCustom != null &&
        lnpWarehouse != null && datePhotography != null && dateInspection != null && dateCustom != null && dateWarehouse != null &&
        goodDescription != null && nameInsp != null && requirement != null && signPassport != null && signPassportDetail != null &&
        dateSend != null && signAutoRelease != null && signRisk != null && inspCost != null && inspCurrencyCode != null && inspFullName != null &&
        status != null && statusText != null && signMedical != null && signMedicalComment != null && releaseWeight != null &&
        releaseNote != null && refuseCause != null && refuseNote != null && detencionCause != null && detencionNote != null &&
        detencionCode != null && inspCorrected != null && toSend != null && signRiskDetail != null && signReq != null && inspWeightMail != null &&
        inspTotalCostEur != null) {
        $.ajax({
            type: 'POST',
            url: '/api/operations/save',
            dataType: 'text',
            contentType: 'application/json',
            data: JSON.stringify({
                "toMailMessageId": toMailMessageId,
                "custom": custom,
                "pto": pto,
                "lnpPhotography": lnpPhotography,
                "lnpInspection": lnpInspection,
                "lnpCustom": lnpCustom,
                "lnpWarehouse": lnpWarehouse,
                "datePhotography": datePhotography,
                "dateInspection": dateInspection,
                "dateCustom": dateCustom,
                "dateWarehouse": dateWarehouse,
                "goodDescription": goodDescription,
                "nameInsp": nameInsp,
                "requirement": requirement,
                "signPassport": signPassport,
                "signPassportDetail": signPassportDetail,
                "dateSend": dateSend,
                "signAutoRelease": signAutoRelease,
                "signRisk": signRisk,
                "inspCost": inspCost,
                "inspCurrencyCode": inspCurrencyCode,
                "inspFullName": inspFullName,
                "status": status,
                "statusText": statusText,
                "signMedical": signMedical,
                "signMedicalComment": signMedicalComment,
                "releaseWeight": releaseWeight,
                "releaseNote": releaseNote,
                "refuseCause": refuseCause,
                "refuseNote": refuseNote,
                "detencionCause": detencionCause,
                "detencionNote": detencionNote,
                "detencionCode": detencionCode,
                "inspCorrected": inspCorrected,
                "toSend": toSend,
                "signRiskDetail": signRiskDetail,
                "signReq": signReq,
                "inspWeightMail": inspWeightMail,
                "inspTotalCostEur": inspTotalCostEur
            }),
            success: function (response) {
                console.log('Операция сохранена в бд:', response);
                alert('Операция сохранена в бд.');
            },
            error: function (error) {
                console.error('Ошибка в сохранении операции в бд:', error);
                alert('Ошибка в сохранении операции в бд');
            }
        })
    } else alert("Заполните поля");
}

function deleteClient() {
    let operationId = document.getElementById('idOperationDelete').value;
    if (operationId != null) {
        $.ajax({
            type: 'DELETE',
            url: '/api/operations/delete/' + operationId,
            dataType: 'text',
            success: function (response) {
                console.log('Операция удалена из бд:', response);
                alert('Операция удалена из бд.');
            },
            error: function (error) {
                console.error('Ошибка в удалении операции из бд:', error);
                alert('Ошибка в удалении операции из бд');
            }
        })
    }
}

function showOperationTable() {
    $.ajax({
        url: '/api/operations/all',
        method: 'get',
        dataType: 'json',
        success: function (data) {
            console.log("Success" + data);
            let table = document.querySelector('#operationTable');
            for (let i = -1; i < data.length; i++) {
                let tr = document.createElement('tr');
                for (let j = 0; j < 41; j++) {
                    let td = document.createElement('td');
                    if (i == -1) {
                        switch (j) {
                            case 0: {
                                td.innerHTML = 'Operation ID';
                                td.id = 'ThOperationId';
                                break;
                            }
                            case 1: {
                                td.innerHTML = 'To mail message ID';
                                td.id = 'ThToMailMessageId';
                                break;
                            }
                            case 2: {
                                td.innerHTML = 'Custom';
                                td.id = 'ThCustom';
                                break;
                            }
                            case 3: {
                                td.innerHTML = 'Pto';
                                td.id = 'ThPto';
                                break;
                            }
                            case 4: {
                                td.innerHTML = 'Lnp photography';
                                td.id = 'ThLnpPhotography';
                                break;
                            }
                            case 5: {
                                td.innerHTML = 'Lnp inspection';
                                td.id = 'ThLnpInspection';
                                break;
                            }
                            case 6: {
                                td.innerHTML = 'Lnp custom';
                                td.id = 'ThLnpCustom';
                                break;
                            }
                            case 7: {
                                td.innerHTML = 'Lnp warehouse';
                                td.id = 'ThLnpWarehouse';
                                break;
                            }
                            case 8: {
                                td.innerHTML = 'Date photography';
                                td.id = 'ThDatePhotography';
                                break;
                            }
                            case 9: {
                                td.innerHTML = 'Date inspection';
                                td.id = 'ThDateInspection';
                                break;
                            }
                            case 10: {
                                td.innerHTML = 'Date custom';
                                td.id = 'ThDateCustom';
                                break;
                            }
                            case 11: {
                                td.innerHTML = 'Date warehouse';
                                td.id = 'ThDateWarehouse';
                                break;
                            }
                            case 12: {
                                td.innerHTML = 'Good description';
                                td.id = 'ThGoodDescription';
                                break;
                            }
                            case 13: {
                                td.innerHTML = 'Name inspection';
                                td.id = 'ThNameInsp';
                                break;
                            }
                            case 14: {
                                td.innerHTML = 'Requirement';
                                td.id = 'ThRequirement';
                                break;
                            }
                            case 15: {
                                td.innerHTML = 'Sign passport';
                                td.id = 'ThSignPassport';
                                break;
                            }
                            case 16: {
                                td.innerHTML = 'Sign passport detail';
                                td.id = 'ThSignPassportDetail';
                                break;
                            }
                            case 17: {
                                td.innerHTML = 'Date send';
                                td.id = 'ThDateSend';
                                break;
                            }
                            case 18: {
                                td.innerHTML = 'Sign auto release';
                                td.id = 'ThSignAutoRelease';
                                break;
                            }
                            case 19: {
                                td.innerHTML = 'Sign risk';
                                td.id = 'ThSignRisk';
                                break;
                            }
                            case 20: {
                                td.innerHTML = 'Inspection cost';
                                td.id = 'ThInspCost';
                                break;
                            }
                            case 21: {
                                td.innerHTML = 'Inspection currency code';
                                td.id = 'ThInspCurrencyCode';
                                break;
                            }
                            case 22: {
                                td.innerHTML = 'Inspection full name';
                                td.id = 'ThInspFullName';
                                break;
                            }
                            case 23: {
                                td.innerHTML = 'Status';
                                td.id = 'ThStatus';
                                break;
                            }
                            case 24: {
                                td.innerHTML = 'Status text';
                                td.id = 'ThStatusText';
                                break;
                            }
                            case 25: {
                                td.innerHTML = 'Sign medical';
                                td.id = 'ThSignMedical';
                                break;
                            }
                            case 26: {
                                td.innerHTML = 'Sign medical comment';
                                td.id = 'ThSignMedicalComment';
                                break;
                            }
                            case 27: {
                                td.innerHTML = 'Release weight';
                                td.id = 'ThReleaseWeight';
                                break;
                            }
                            case 28: {
                                td.innerHTML = 'Release note';
                                td.id = 'ThReleaseNote';
                                break;
                            }
                            case 29: {
                                td.innerHTML = 'Refuse cause';
                                td.id = 'ThRefuseCause';
                                break;
                            }
                            case 30: {
                                td.innerHTML = 'Refuse note';
                                td.id = 'ThRefuseNote';
                                break;
                            }
                            case 31: {
                                td.innerHTML = 'Detencion cause';
                                td.id = 'ThDetencionCause';
                                break;
                            }
                            case 32: {
                                td.innerHTML = 'Detencion note';
                                td.id = 'ThDetencionNote';
                                break;
                            }
                            case 33: {
                                td.innerHTML = 'Detencion code';
                                td.id = 'ThDetencionCode';
                                break;
                            }
                            case 34: {
                                td.innerHTML = 'Inspection corrected';
                                td.id = 'ThInspCorrected';
                                break;
                            }
                            case 35: {
                                td.innerHTML = 'To send';
                                td.id = 'ThToSend';
                                break;
                            }
                            case 36: {
                                td.innerHTML = 'Sign risk detail';
                                td.id = 'ThSignRiskDetail';
                                break;
                            }
                            case 37: {
                                td.innerHTML = 'Sign requirement';
                                td.id = 'ThSignReq';
                                break;
                            }
                            case 38: {
                                td.innerHTML = 'Inspection weight mail';
                                td.id = 'ThInspWeightMail';
                                break;
                            }
                            case 39: {
                                td.innerHTML = 'Inspection total cost (eur)';
                                td.id = 'ThInspTotalCostEur';
                                break;
                            }
                        }
                    } else {
                        switch (j) {
                            case 0: {
                                td.innerHTML = data[i].operationId;
                                break;
                            }
                            case 1: {
                                td.innerHTML = data[i].toMailMessageId;
                                break;
                            }
                            case 2: {
                                td.innerHTML = data[i].custom;
                                break;
                            }
                            case 3: {
                                td.innerHTML = data[i].pto;
                                break;
                            }
                            case 4: {
                                td.innerHTML = data[i].lnpPhotography;
                                break;
                            }
                            case 5: {
                                td.innerHTML = data[i].lnpInspection;
                                break;
                            }
                            case 6: {
                                td.innerHTML = data[i].lnpCustom;
                                break;
                            }
                            case 7: {
                                td.innerHTML = data[i].lnpWarehouse;
                                break;
                            }
                            case 8: {
                                td.innerHTML = data[i].datePhotography;
                                break;
                            }
                            case 9: {
                                td.innerHTML = data[i].dateInspection;
                                break;
                            }
                            case 10: {
                                td.innerHTML = data[i].dateCustom;
                                break;
                            }
                            case 11: {
                                td.innerHTML = data[i].dateWarehouse;
                                break;
                            }
                            case 12: {
                                td.innerHTML = data[i].goodDescription;
                                break;
                            }
                            case 13: {
                                td.innerHTML = data[i].nameInsp;
                                break;
                            }
                            case 14: {
                                td.innerHTML = data[i].requirement;
                                break;
                            }
                            case 15: {
                                td.innerHTML = data[i].signPassport;
                                break;
                            }
                            case 16: {
                                td.innerHTML = data[i].signPassportDetail;
                                break;
                            }
                            case 17: {
                                td.innerHTML = data[i].dateSend;
                                break;
                            }
                            case 18: {
                                td.innerHTML = data[i].signAutoRelease;
                                break;
                            }
                            case 19: {
                                td.innerHTML = data[i].signRisk;
                                break;
                            }
                            case 20: {
                                td.innerHTML = data[i].inspCost;
                                break;
                            }
                            case 21: {
                                td.innerHTML = data[i].inspCurrencyCode;
                                break;
                            }
                            case 22: {
                                td.innerHTML = data[i].inspFullName;
                                break;
                            }
                            case 23: {
                                td.innerHTML = data[i].status;
                                break;
                            }
                            case 24: {
                                td.innerHTML = data[i].statusText;
                                break;
                            }
                            case 25: {
                                td.innerHTML = data[i].signMedical;
                                break;
                            }
                            case 26: {
                                td.innerHTML = data[i].signMedicalComment;
                                break;
                            }
                            case 27: {
                                td.innerHTML = data[i].releaseWeight;
                                break;
                            }
                            case 28: {
                                td.innerHTML = data[i].releaseNote;
                                break;
                            }
                            case 29: {
                                td.innerHTML = data[i].refuseCause;
                                break;
                            }
                            case 30: {
                                td.innerHTML = data[i].refuseNote;
                                break;
                            }
                            case 31: {
                                td.innerHTML = data[i].detencionCause;
                                break;
                            }
                            case 32: {
                                td.innerHTML = data[i].detencionNote;
                                break;
                            }
                            case 33: {
                                td.innerHTML = data[i].detencionCode;
                                break;
                            }
                            case 34: {
                                td.innerHTML = data[i].inspCorrected;
                                break;
                            }
                            case 35: {
                                td.innerHTML = data[i].toSend;
                                break;
                            }
                            case 36: {
                                td.innerHTML = data[i].signRiskDetail;
                                break;
                            }
                            case 37: {
                                td.innerHTML = data[i].signReq;
                                break;
                            }
                            case 38: {
                                td.innerHTML = data[i].inspWeightMail;
                                break;
                            }
                            case 39: {
                                td.innerHTML = data[i].inspTotalCostEur;
                                break;
                            }
                        }
                    }
                    tr.appendChild(td);
                }
                table.appendChild(tr);
            }
        }
    });
}

function showOperation(value) {
    var ind = Number(document.getElementById('showOperationId').innerHTML);
    if (value == 'next') document.getElementById('showOperationId').innerHTML = ind + 1;
    else if (ind > 0) document.getElementById('showOperationId').innerHTML = ind - 1;
    ind = Number(document.getElementById('showOperationId').innerHTML);
    $.ajax({
        url: '/api/operations/get/' + ind,
        method: 'get',
        dataType: 'json',
        success: function (data) {
            document.getElementById('showToMailMessageId').innerHTML = data.toMailMessageId;
            document.getElementById('showCustom').innerHTML = data.custom;
            document.getElementById('showPto').innerHTML = data.pto;
            document.getElementById('showLnpPhotography').innerHTML = data.lnpPhotography;
            document.getElementById('showLnpInspection').innerHTML = data.lnpInspection;
            document.getElementById('showLnpCustom').innerHTML = data.lnpCustom;
            document.getElementById('showLnpWarehouse').innerHTML = data.lnpWarehouse;
            document.getElementById('showDatePhotography').innerHTML = data.datePhotography;
            document.getElementById('showDateInspection').innerHTML = data.dateInspection;
            document.getElementById('showDateCustom').innerHTML = data.dateCustom;
            document.getElementById('showDateWarehouse').innerHTML = data.dateWarehouse;
            document.getElementById('showGoodDescription').innerHTML = data.goodDescription;
            document.getElementById('showNameInspection').innerHTML = data.nameInsp;
            document.getElementById('showRequirement').innerHTML = data.requirement;
            document.getElementById('showSignPassport').innerHTML = data.signPassport;
            document.getElementById('showSignPassportDetail').innerHTML = data.signPassportDetail;
            document.getElementById('showDateSend').innerHTML = data.dateSend;
            document.getElementById('showSignAutoRelease').innerHTML = data.signAutoRelease;
            document.getElementById('showSignRisk').innerHTML = data.signRisk;
            document.getElementById('showInspectionCost').innerHTML = data.inspCost;
            document.getElementById('showInspectionCurrencyCode').innerHTML = data.inspCurrencyCode;
            document.getElementById('showInspectionFullName').innerHTML = data.inspFullName;
            document.getElementById('showStatus').innerHTML = data.status;
            document.getElementById('showStatusText').innerHTML = data.statusText;
            document.getElementById('showSignMedical').innerHTML = data.signMedical;
            document.getElementById('showSignMedicalComment').innerHTML = data.signMedicalComment;
            document.getElementById('showReleaseWeight').innerHTML = data.releaseWeight;
            document.getElementById('showReleaseNote').innerHTML = data.releaseNote;
            document.getElementById('showRefuseCause').innerHTML = data.refuseCause;
            document.getElementById('showRefuseNote').innerHTML = data.refuseNote;
            document.getElementById('showDetencionCause').innerHTML = data.detencionCause;
            document.getElementById('showDetencionNote').innerHTML = data.detencionNote;
            document.getElementById('showDetencionCode').innerHTML = data.detencionCode;
            document.getElementById('showInspectionCorrected').innerHTML = data.inspCorrected;
            document.getElementById('showToSend').innerHTML = data.toSend;
            document.getElementById('showSignRiskDetail').innerHTML = data.signRiskDetail;
            document.getElementById('showSignRequirement').innerHTML = data.signReq;
            document.getElementById('showInspectionWeightMail').innerHTML = data.inspWeightMail;
            document.getElementById('showInspectionTotalCostEur').innerHTML = data.inspTotalCostEur;
        },
        error: function (error) {
            document.getElementById('showToMailMessageId').innerHTML = 'Нет операции с таким индексом';
            document.getElementById('showCustom').innerHTML = '';
            document.getElementById('showPto').innerHTML = '';
            document.getElementById('showLnpPhotography').innerHTML = '';
            document.getElementById('showLnpInspection').innerHTML = '';
            document.getElementById('showLnpCustom').innerHTML = '';
            document.getElementById('showLnpWarehouse').innerHTML = '';
            document.getElementById('showDatePhotography').innerHTML = '';
            document.getElementById('showDateInspection').innerHTML = '';
            document.getElementById('showDateCustom').innerHTML = '';
            document.getElementById('showDateWarehouse').innerHTML = '';
            document.getElementById('showGoodDescription').innerHTML = '';
            document.getElementById('showNameInspection').innerHTML = '';
            document.getElementById('showRequirement').innerHTML = '';
            document.getElementById('showSignPassport').innerHTML = '';
            document.getElementById('showSignPassportDetail').innerHTML = '';
            document.getElementById('showDateSend').innerHTML = '';
            document.getElementById('showSignAutoRelease').innerHTML = '';
            document.getElementById('showSignRisk').innerHTML = '';
            document.getElementById('showInspectionCost').innerHTML = '';
            document.getElementById('showInspectionCurrencyCode').innerHTML = '';
            document.getElementById('showInspectionFullName').innerHTML = '';
            document.getElementById('showStatus').innerHTML = '';
            document.getElementById('showStatusText').innerHTML = '';
            document.getElementById('showSignMedical').innerHTML = '';
            document.getElementById('showSignMedicalComment').innerHTML = '';
            document.getElementById('showReleaseWeight').innerHTML = '';
            document.getElementById('showReleaseNote').innerHTML = '';
            document.getElementById('showRefuseCause').innerHTML = '';
            document.getElementById('showRefuseNote').innerHTML = '';
            document.getElementById('showDetencionCause').innerHTML = '';
            document.getElementById('showDetencionNote').innerHTML = '';
            document.getElementById('showDetencionCode').innerHTML = '';
            document.getElementById('showInspectionCorrected').innerHTML = '';
            document.getElementById('showToSend').innerHTML = '';
            document.getElementById('showSignRiskDetail').innerHTML = '';
            document.getElementById('showSignRequirement').innerHTML = '';
            document.getElementById('showInspectionWeightMail').innerHTML = '';
            document.getElementById('showInspectionTotalCostEur').innerHTML = '';
        }
    });
}

function showDateFields() {
    var catalog = 'customs';
    var table = document.getElementById('tables').value;
    if (table == 'clients') {
        $('#periodFields').find('option').remove();
        $('#periodFields').append(new Option('birth_date', 'birth_date'));
    } else if (table == 'onetime_service') {
        $('#periodFields').find('option').remove();
        $('#periodFields').append(new Option('acception_date', 'acception_date'));
        $('#periodFields').append(new Option('deadline_date', 'deadline_date'));
    } else if (table == 'operations') {
        $('#periodFields').find('option').remove();
        $('#periodFields').append(new Option('date_photography', 'date_photography'));
        $('#periodFields').append(new Option('date_inspection', 'date_inspection'));
        $('#periodFields').append(new Option('date_custom', 'date_custom'));
        $('#periodFields').append(new Option('date_warehouse', 'date_warehouse'));
        $('#periodFields').append(new Option('date_send', 'date_send'));
    } else if (table == 'services') {
        $('#periodFields').find('option').remove();
    }
}

function makeReport() {
    const XlsxPopulate = require('xlsx-populate');

    // Load a new blank workbook
    XlsxPopulate.fromBlankAsync()
        .then(workbook => {
            // Modify the workbook.
            workbook.sheet("Sheet1").cell("A1").value("This is neat!");

            // Write to file.
            return workbook.toFileAsync("./out.xlsx");
        });
}