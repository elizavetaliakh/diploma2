new Vue({
    el: '#app',
    data: {
        users: [],
        newUsersRecord: {
            userRole: '',
            userName: '',
            userPassword: '',
            registrationDate: ''
            
        },
        mounted() {
            this.fetchUsers();
        },
        methods: {
            // ... (предыдущие методы)
            addUsersRecord() {
                fetch('/api/table', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newUsersRecord)
                })
                    .then(response => response.json())
                    .then(data => {
                        this.users.push(data);
                        this.newUsersRecord = {}; // Очистим форму
                        this.fetchUsers(); // Обновим данные после добавления
                    })
                    .catch(error => console.error('Error:', error));
            }
        }
    },
    methods: {
        fetchUsers() {
            fetch('/api/table')
                .then(response => response.json())
                .then(data => {
                    this.UsersData = data;
                })
                .catch(error => console.error('Error:', error));
        }
    },
    methods: {
        fetchUsersById(id) {
            fetch(`/api/users/${id}`)
                .then(response => response.json())
                .then(data => {
                    alert(`Поле: ${data.fieldName}, Значение: ${data.fieldValue}`);
                })
                .catch(error => console.error('Error:', error));
        }
    },
    template: `
    <button class="but" type="button">Show data</button><br>
<div>
<t2>Данные о пользователях</t2>
<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Роль</th>
        <th>Имя пользователя</th>
        <th>Пароль</th>
        <th>Дата регистрации</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in customs" :key="item.user_id">
        <td>{{item.user_id}}</td>
        <td>{{item.user_role}}</td>
        <td>{{item.user_name}}</td>
        <td>{{item.user_password}}</td>
        <td>{{item.registration_date}}</td>
    </tr>
    </tbody>
</table>
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<script src="/js/app.js"></script>
</div>
        `
});