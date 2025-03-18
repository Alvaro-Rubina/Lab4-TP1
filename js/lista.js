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
        console.error('Hubo un error al traer los registros:', error);
    }
}

async function llenarTabla(data) {
    const tbody = document.querySelector("table.table tbody");
    tbody.innerHTML = "";

    data.forEach(elemento => {
        const row = document.createElement("tr");

        // si bloqueado = Y la fila es roja, si bloqueado = N la fila es verde
        if (elemento.bloqueado === 'Y') {
            row.classList.add('red-row');
        } else if (elemento.bloqueado === 'N') {
            row.classList.add('green-row');
        }

        row.innerHTML = `
        <td>${elemento.id}</td>
        <td>${elemento.usuario}</td>
        <td>${elemento.bloqueado}</td>
        <td>${elemento.apellido}</td>
        <td>${elemento.nombre}</td>
        <td><button class="btn btn-block">Bloquear</button></td>
        <td><button class="btn btn-unblock">Desbloquear</button></td>
        `;
        tbody.appendChild(row);
    });

    // agrego eventos a los botones que se agregaron a la tabla
    document.querySelectorAll(".btn-block").forEach(button => {
        button.addEventListener("click", bloquearUsuario);
    });
    document.querySelectorAll(".btn-unblock").forEach(button => {
        button.addEventListener("click", desbloquearUsuario);
    });
}

async function bloquearUsuario(event) {
    event.preventDefault();

    const boton = event.target;
    const fila = boton.closest("tr");
    const id = fila.querySelector("td").textContent;

    try {
        const respuesta = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${id}&estado=Y`)
        if (respuesta.ok) {
            // llamo de vuelta para reflejar los cambios
            await traerRegistros();
            
        } else {
            console.error('Hubo un error al bloquear el usuario');
        }

    } catch (error) {
        console.error('Hubo un error al realizar la consulta:', error);
    }
    
}

async function desbloquearUsuario(event) {
    event.preventDefault();

    const boton = event.target;
    const fila = boton.closest("tr");
    const id = fila.querySelector("td").textContent;

    try {
        const respuesta = await fetch(`http://181.111.166.250:8081/tp/lista.php?action=BLOQUEAR&idUser=${id}&estado=N`);
        if (respuesta.ok) {
            // llamo de vuelta para reflejar los cambios
            await traerRegistros();

        } else {
            console.error('Hubo un error al desbloquear el usuario');
        }
    } catch (error) {
        console.error('Hubo un error al realizar la consulta:', error);
    }
}