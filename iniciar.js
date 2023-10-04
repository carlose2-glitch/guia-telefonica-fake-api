const form = document.getElementById('form_ingresar');//formulario de iniciar seccion
const btnIngresar = document.getElementById('create-user');//boton de ingresar a la lista de contactos
const formCreateUser = document.getElementById('form_create-user');//formulario de crear usuario
const ingresarCuenta = document.getElementById('ingresar-cuenta');//link de ingresar cuenta
const inputUserCreate = document.getElementById('user-create');//input de crear usuario
const inputPasswordCreate = document.getElementById('password-create');//input de crear clave
const title = document.getElementById('title');//titulo
const subtitle = document.getElementById('subtitle');//subtitulo

formCreateUser.style.display = 'none';
ingresarCuenta.style.display = 'none';

//formulario de ingresar usuario
form.addEventListener('submit', async e =>{

    e.preventDefault();

    const response = await fetch('https://septimointent.onrender.com/users',{method: 'GET'});
    const users = await response.json();
    const uservalue = e.target.children[1].value;
    const passwordValue = e.target.children[3].value;
    
    const userFind = users.find(user => user.username === uservalue);
    const passwordFind = users.find(user => user.password === passwordValue);
    
    if(userFind && passwordFind){
        
        localStorage.setItem('user', JSON.stringify(userFind));
        window.location.href = './guia-telefonica/listcontact.html';
    }else{
        console.log('error en usuario o clave');
    }
   
   //console.log(e.target.children[1].value);//usuario
    //console.log(e.target.children[3].value);//clave
})

//formulario de crear usuario
formCreateUser.addEventListener('submit', e =>{

    e.preventDefault();
    const user = /^[A-Z][a-z]+$/;//el nombre dede empezar con letra mayuscula luego de puras letras minusculas sin espacio
    const password = /\w{5,8}/;//cualquier valor alfa numerico entre 5 y 8 caracteres
    const evlUsuario = e.target.children[1].value;//crear usuario
    const evlClave = e.target.children[3].value;//crear clave
    
    
    //console.log(userFind);

    if(user.test(evlUsuario) && password.test(evlClave)){

        addUser(evlUsuario, evlClave)

    }else{
        console.log('el usuario debe ser un solo nombre y la contraseña no debe tener espacios');
    }

})

const addUser = async (usuario, clave) =>{//funcion de agregar usuario a la base de datos

    const response = await fetch('https://septimointent.onrender.com/users', {method: "GET"});
    const users = await response.json();
    console.log(users)
    const userFind = users.find(user => user.username === usuario);
    if(userFind){

        console.log('el usuario ya existe');
    }else{
        await fetch('https://septimointent.onrender.com/users', {method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: usuario,
                              password: clave})
    });
    inputUserCreate.value = '';
    inputPasswordCreate.value = '';
    title.innerHTML = 'Iniciar Seccion';
    subtitle.innerHTML = 'Para acceder a la lista de contactos debe iniciar seccion';
    formCreateUser.style.display = 'none';
    ingresarCuenta.style.display = 'none';
    form.style.display = 'flex';
    btnIngresar.style.display = 'flex';

    }

}

//link de crear cuenta 
btnIngresar.addEventListener('click', e =>{

    title.innerHTML = 'Crear Cuenta';
    subtitle.innerHTML = 'Para iniciar seccion debe crear una cuenta';
    formCreateUser.style.display = 'flex';
    ingresarCuenta.style.display = 'flex';
    form.style.display = 'none';
    btnIngresar.style.display = 'none';

})

//link de ingresar cuenta
ingresarCuenta.addEventListener('click',e =>{

    title.innerHTML = 'Iniciar Seccion';
    subtitle.innerHTML = 'Para acceder a la lista de contactos debe iniciar seccion';
    formCreateUser.style.display = 'none';
    ingresarCuenta.style.display = 'none';
    form.style.display = 'flex';
    btnIngresar.style.display = 'flex';

})