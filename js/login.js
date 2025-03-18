document.querySelector("#loginBtn").addEventListener("click", autenticarUsuario);

async function autenticarUsuario(event) {
    event.preventDefault();
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;

    if (!username || !password) {
        alert("Complete todos los campos antes de continuar");
        return;
    }

    try {
        const response = await fetch(`http://181.111.166.250:8081/tp/login.php?user=${username}&pass=${password}`);
        const data = await response.json();

        const respuesta = data.respuesta;
        const mensaje = data.mje;

        switch (respuesta) {
            case "OK":
                alert(mensaje)
                window.location.href = "lista.html"
                break;
            case "ERROR":
                alert(mensaje)
                break;
        }
    } catch (error) {
        console.log("Error en la autenticacion: " + error)
        alert("Hubo un problema al autenticar")
    }

    

}