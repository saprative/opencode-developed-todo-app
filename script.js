document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    
    // Render existing todos
    function renderTodos() {
        // Clear the todo list
        todoList.innerHTML = '';
        
        // Add each todo item to the list
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            if (todo.completed) {
                li.classList.add('completed');
            }
            
            li.innerHTML = `
                <span>${todo.text}</span>
                <div class="actions">
                    <button class="toggle-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            li.dataset.id = todo.id;
            todoList.appendChild(li);
        });
        
        // Add event listeners to buttons
        document.querySelectorAll('li').forEach(item => {
            const id = item.dataset.id;
            const todo = todos.find(t => t.id == id);
            if (todo) {
                const toggleBtn = item.querySelector('.toggle-btn');
                const deleteBtn = item.querySelector('.delete-btn');
                
                toggleBtn.addEventListener('click', () => toggleTodo(id));
                deleteBtn.addEventListener('click', () => deleteTodo(id));
            }
        });
    }
    
    // Initial render
    renderTodos();
    
    // Add new todo
    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            const newTodo = {
                id: Date.now(),
                text: text,
                completed: false
            };
            todos.push(newTodo);
            saveTodos();
            todoInput.value = '';
            renderTodos();
        }
    }
    
    // Toggle todo completion status
    function toggleTodo(id) {
        const todo = todos.find(t => t.id == id);
        if (todo) {
            todo.completed = !todo.completed;
            saveTodos();
            renderTodos();
        }
    }
    
    // Delete todo
    function deleteTodo(id) {
        todos = todos.filter(t => t.id != id);
        saveTodos();
        renderTodos();
    }
    
    // Save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    // Event listeners
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});