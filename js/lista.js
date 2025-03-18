document.addEventListener("DOMContentLoaded", traerRegistros);
document.querySelector("#btn-search", buscarPorUsuario).addEventListener("click", buscarPorUsuario);

async function traerRegistros() {
    try {
        const respuesta = await fetch("http://181.111.166.250:8081/tp/lista.php?action=BUSCAR");
        const data = await respuesta.json();

        if (data.length === 0) {
            console.log('No hay registros para mostrar');
            return;
        }

        llenarTabla(data);
        
    } catch (error) {
        console.error('Hubo un error al traer los registros:', error);
    }    
}

async function buscarPorUsuario(event) {
    event.preventDefault();
    let usuario = document.getElementById("input-search").value;

    try {
        const respuesta = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BUSCAR&usuario=${usuario}`);
        const data = await respuesta.json();

        if (data.length === 0) {
            alert(`No hay registros que coincidan con la busqueda (${usuario})`);
        }

        llenarTabla(data);
        
    } catch (error) {
        console.error('Hubo un error al realizar la consulta:', error);
    }
}

async function llenarTabla(data) {
    const tbody = document.querySelector("table.table tbody");
    tbody.innerHTML = "";

    data.forEach(element => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${element.id}</td>
        <td>${element.usuario}</td>
        <td>${element.bloqueado}</td>
        <td>${element.apellido}</td>
        <td>${element.nombre}</td>
        <td><button class="btn btn-block">Bloquear</button></td>
        <td><button class="btn btn-unblock">Desbloquear</button></td>
        `;
        tbody.appendChild(row);
    });
}