let pedidos = [];
let pedidoNumero = 1;

function agregarPedido() {
    const cedulaCliente = document.getElementById("cedula-cliente").value;
    const producto = document.getElementById("productos").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);

    if (!cedulaCliente || cantidad <= 0) {
        alert("Por favor, completa todos los campos y verifica la cantidad.");
        return;
    }

    let precio = 0;
    switch (producto) {
        case "mote-de-queso":
            precio = 10000;
            break;
        case "bebidas":
            precio = 5000;
            break;
        case "guarniciones":
            precio = 6000;
            break;
    }

    const total = precio * cantidad;

    const pedido = {
        numero: pedidoNumero++,
        cedula: cedulaCliente,
        producto: producto,
        cantidad: cantidad,
        total: total
    };

    pedidos.push(pedido);
    mostrarPedidos();
    limpiarFormulario();
}

function mostrarPedidos() {
    const listadoPedidos = document.getElementById("listado-pedidos");
    listadoPedidos.innerHTML = "";

    for (const pedido of pedidos) {
        const pedidoInfo = document.createElement("div");
        pedidoInfo.className = "listado-pedidos";
        pedidoInfo.innerHTML = `<p>Número de Pedido: ${pedido.numero}</p>
                                <p>Cédula del Cliente: ${pedido.cedula}</p>
                                <p>Producto: ${pedido.producto}</p>
                                <p>Cantidad: ${pedido.cantidad}</p>
                                <p>Total: ${pedido.total} pesos</p>
                                <button type="button" onclick="eliminarPedido(${pedido.numero})">Eliminar</button>`;

        listadoPedidos.appendChild(pedidoInfo);
    }
}

function eliminarPedido(numeroPedido) {
    const index = pedidos.findIndex(pedido => pedido.numero === numeroPedido);

    if (index !== -1) {
        pedidos.splice(index, 1);
        mostrarPedidos();
    }
}

function mostrarPedidosCliente() {
    const cedulaCliente = document.getElementById("cedula-cliente-lista").value;
    const listadoPedidosCliente = document.getElementById("listado-pedidos-cliente");
    
    // Filtrar pedidos por cliente
    const pedidosCliente = pedidos.filter(pedido => pedido.cedula === cedulaCliente);

    if (pedidosCliente.length === 0) {
        listadoPedidosCliente.innerHTML = "No se encontraron pedidos para este cliente.";
        return;
    }

    listadoPedidosCliente.innerHTML = "";

    for (const pedido of pedidosCliente) {
        const pedidoInfo = document.createElement("div");
        pedidoInfo.className = "listado-pedidos";
        pedidoInfo.innerHTML = `<p>Número de Pedido: ${pedido.numero}</p>
                                <p>Cédula del Cliente: ${pedido.cedula}</p>
                                <p>Producto: ${pedido.producto}</p>
                                <p>Cantidad: ${pedido.cantidad}</p>
                                <p>Total: ${pedido.total} pesos</p>`;

        listadoPedidosCliente.appendChild(pedidoInfo);
    }
}

function mostrarPedidosOrdenados() {
    const listadoPedidosOrdenados = document.getElementById("listado-pedidos-ordenados");

    // Ordenar todos los pedidos por valor final (de mayor a menor)
    const pedidosOrdenados = [...pedidos].sort((a, b) => b.total - a.total);

    listadoPedidosOrdenados.innerHTML = "";

    for (const pedido of pedidosOrdenados) {
        const pedidoInfo = document.createElement("div");
        pedidoInfo.className = "listado-pedidos";
        pedidoInfo.innerHTML = `<p>Número de Pedido: ${pedido.numero}</p>
                                <p>Cédula del Cliente: ${pedido.cedula}</p>
                                <p>Producto: ${pedido.producto}</p>
                                <p>Cantidad: ${pedido.cantidad}</p>
                                <p>Total: ${pedido.total} pesos</p>`;

        listadoPedidosOrdenados.appendChild(pedidoInfo);
    }
}

function limpiarFormulario() {
    document.getElementById("cedula-cliente").value = "";
    document.getElementById("productos").value = "mote-de-queso";
    document.getElementById("cantidad").value = "";
}
