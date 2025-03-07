// Obtener el menú del LocalStorage o inicializarlo si no existe
let menuData = JSON.parse(localStorage.getItem('menuData')) || {
  "menu": [
      { "id": 1, "nombre": "Inicio", "enlace": "/inicio" },
      { "id": 2, "nombre": "Servicios", "enlace": "/servicios" },
      { "id": 3, "nombre": "Contacto", "enlace": "/contacto" }
  ]
};

// Función para generar el menú dinámico
function generateMenu() {
  const menuContainer = document.getElementById('menu');
  menuContainer.innerHTML = ''; // Limpiar el menú actual

  menuData.menu.forEach(item => {
      const menuItem = document.createElement('li');
      
      const menuLink = document.createElement('a');
      menuLink.href = item.enlace;
      menuLink.textContent = item.nombre;
      menuLink.style.marginRight = "10px"; // Espaciado entre el link y el botón de eliminar
      
      // Botón para eliminar
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "❌";
      deleteBtn.style.cursor = "pointer";
      deleteBtn.onclick = () => deleteMenuItem(item.id);

      menuItem.appendChild(menuLink);
      menuItem.appendChild(deleteBtn);
      menuContainer.appendChild(menuItem);
  });
}

// Función para agregar un nuevo elemento al menú
function addMenuItem() {
  const menuName = document.getElementById('menuName').value.trim();
  const menuLink = document.getElementById('menuLink').value.trim();

  if (menuName && menuLink) {
      const newMenuItem = {
          id: Date.now(), // Generar un ID único
          nombre: menuName,
          enlace: menuLink
      };

      menuData.menu.push(newMenuItem);  // Agregar nuevo elemento al menú
      localStorage.setItem('menuData', JSON.stringify(menuData));  // Guardar en LocalStorage
      generateMenu();  // Regenerar el menú

      // Limpiar formulario
      document.getElementById('menuName').value = '';
      document.getElementById('menuLink').value = '';
  } else {
      alert('Por favor, complete ambos campos.');
  }
}

// Función para eliminar un elemento del menú
function deleteMenuItem(id) {
  menuData.menu = menuData.menu.filter(item => item.id !== id); // Filtrar menú
  localStorage.setItem('menuData', JSON.stringify(menuData)); // Guardar en LocalStorage
  generateMenu(); // Regenerar el menú
}

// Generar el menú al cargar la página
window.onload = generateMenu;
