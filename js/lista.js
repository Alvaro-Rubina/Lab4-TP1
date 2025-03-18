document.addEventListener("DOMContentLoaded", traerRegistros);
document.querySelector("#btn-search", buscarPorNombre).addEventListener("click", buscarPorNombre);

async function traerRegistros() {
    try {
        const response = await fetch("http://181.111.166.250:8081/tp/lista.php?action=BUSCAR");
        const data = await response.json();

        llenarTabla(data);
        
    } catch (error) {
        console.error('Hubo un error al traer los registros:', error);
    }    
}

async function buscarPorNombre(event) {
    event.preventDefault();
    let nombre = document.getElementById("input-search").value;

    try {
        const response = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BUSCAR&usuario=${nombre}`);
        const data = await response.json();

        llenarTabla(data);
        
    } catch (error) {
        console.error('Hubo un error al realizar la consulta:', error);
    }
}

async function llenarTabla(data) {
    const tbody = document.querySelector("table.table tbody");
    tbody.innerHTML = "";

    if(data.length === 0) {
        console.log("No se encontraron registros");
        return;
    }

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