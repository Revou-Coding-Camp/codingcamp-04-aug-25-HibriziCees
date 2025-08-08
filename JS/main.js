const form = document.getElementById('todo-form');
const todoListContainer = document.getElementById('todo-list');
const filterBtn = document.getElementById('filter-btn');
const deleteAllBtn = document.getElementById('delete-all');

let todos = [];


function renderTodos(list) {
    todoListContainer.innerHTML = '';
    list.forEach((todo, index) => {
        const item = document.createElement('div');
        item.classList.add('todo-item');
        item.innerHTML = `
            <div>
                <strong>${todo.headline}</strong> - ${todo.date} <br>
                <small>${todo.notes}</small>
            </div>
            <button onclick="deleteTodo(${index})"><i class='bx bx-trash'></i></button>
        `;
        todoListContainer.appendChild(item);
    });
}


form.addEventListener('submit', function(e) {
    e.preventDefault();
    const headline = document.getElementById('headline').value.trim();
    const date = document.getElementById('date').value;
    const notes = document.getElementById('notes').value.trim();

    if (!headline || !date) {
        alert('Headline dan tanggal harus diisi!');
        return;
    }

    todos.push({ headline, date, notes });
    renderTodos(todos);

    form.reset();
});


function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos(todos);
}


deleteAllBtn.addEventListener('click', () => {
    if (confirm('Hapus semua tugas?')) {
        todos = [];
        renderTodos(todos);
    }
});

filterBtn.addEventListener('click', () => {
    const filterDate = prompt('Masukkan tanggal untuk filter (YYYY-MM-DD)');
    if (filterDate) {
        const filtered = todos.filter(todo => todo.date === filterDate);
        renderTodos(filtered);
    }
});