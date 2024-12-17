const apiURL = "http://<EC2_PUBLIC_IP>:3000"; // Reemplaza con la IP pública de tu EC2

// **Agregar Cliente**
document.getElementById("clienteForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("clienteNombre").value;
    const email = document.getElementById("clienteEmail").value;

    await fetch(`${apiURL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
    });

    alert("Cliente agregado");
    document.getElementById("clienteForm").reset();
    cargarClientes();
});

// **Cargar Clientes**
async function cargarClientes() {
    const res = await fetch(`${apiURL}/clientes`);
    const clientes = await res.json();

    const clientesLista = document.getElementById("clientesLista");
    clientesLista.innerHTML = "";
    clientes.forEach(cliente => {
        clientesLista.innerHTML += `<p>${cliente.id}: ${cliente.nombre} - ${cliente.email}</p>`;
    });
}

// **Agregar Producto**
document.getElementById("productoForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombre = document.getElementById("productoNombre").value;
    const precio = document.getElementById("productoPrecio").value;
    const stock = document.getElementById("productoStock").value;

    await fetch(`${apiURL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio, stock }),
    });

    alert("Producto agregado");
    document.getElementById("productoForm").reset();
    cargarProductos();
});

// **Cargar Productos**
async function cargarProductos() {
    const res = await fetch(`${apiURL}/productos`);
    const productos = await res.json();

    const productosLista = document.getElementById("productosLista");
    productosLista.innerHTML = "";
    productos.forEach(producto => {
        productosLista.innerHTML += `<p>${producto.id}: ${producto.nombre} - $${producto.precio} - Stock: ${producto.stock}</p>`;
    });
}

// **Enviar Correo**
document.getElementById("emailForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const to = document.getElementById("correoPara").value;
    const subject = document.getElementById("correoAsunto").value;
    const text = document.getElementById("correoMensaje").value;

    await fetch(`${apiURL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, text }),
    });

    alert("Correo enviado exitosamente");
    document.getElementById("emailForm").reset();
});
