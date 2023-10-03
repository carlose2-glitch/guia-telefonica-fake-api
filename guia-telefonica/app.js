
const userIn = document.querySelector('.enter_name');
const userTelf = document.querySelector('.enter_number');
const listContactBtn = document.querySelector('.list_item');
const form = document.getElementById('form');
const listContactTag = document.querySelector('.btn_list');
const subtitleListContact = document.querySelector('.subtitle');
const listContacts = document.querySelector('.contacts');
const createContactReturn = document.querySelector('.create_contact-btn');
const btnCreateReturn = document.querySelector('.btn-create');
const edit = document.querySelector('.fa-pencil');
const number_contact = document.querySelector('.number-contact');
//const trash = document.querySelector('.fa-trash');
const contact = document.querySelector('.contact');
const saveContact = document.querySelector('.save-btn');
saveContact.disabled = true;
const btnEdit = document.querySelector('.btn-edit');
let contador= 1;
const redp = document.querySelector('.error1'); 
const redp2 = document.querySelector('.error2');
let nameValid = false;
let numberValid = false;

const nombreeditar = /^[A-Z][a-z]+$/;
const numeroeditar = /^((0412)|(0212)|(0416)|(0414)|(0424)|(0426))[0-9]{7}$/;
const medida = matchMedia('(min-width: 769px)');

window.addEventListener('resize', e =>{
 
if(medida.matches){

        listContacts.style.display = 'flex';//etiqueta padre de lista de contactos
        listContactTag.style.display = 'none';//boton de lista de contactos
        form.style.display = 'flex';//formulario
        btnCreateReturn.style.display = 'none';
        createContactReturn.style.display = 'none';//boton de regreso a crear contacto
        //createContactReturn.style.display = 'none';//boton de regreso a la lista de contactos

}else{
       

        if (createContactReturn.style.display === 'flex'){
            listContacts.style.display = 'flex';
            listContactTag.style.display = 'none';
        }else{
            createContactReturn.style.display = 'none'
            listContactTag.style.display = 'flex';
            listContacts.style.display = 'none';
        }
       
    }
    
})

//funcion para evaluar los inputs de editar en tiempo real
listContacts.addEventListener('input', e=> {
     
    if(e.target.type === 'text'){

        validationedit(e.target, nombreeditar);
        
   }else if(e.target.type === 'tel'){

        validationedit(e.target, numeroeditar);
}

})
const validationedit = (verification, verificationRegex) =>{
    
    if(verificationRegex.test(verification.value)){

        verification.style.color = '#d1d5db';
    }else{
        verification.style.color = 'rgb(150, 35, 35)';
    }

}

//eventos del formulario del input crear nombre y telf del formulario
userIn.addEventListener('input', e =>{

    nameValid = nombreeditar.test(userIn.value);
    validation(userIn, nameValid, redp);
    unlockbtn (nameValid, numberValid); 
})

userTelf.addEventListener('input', e =>{

    numberValid = numeroeditar.test(userTelf.value);
    validation(userTelf, numberValid, redp2);
    unlockbtn(nameValid, numberValid);  
})
//verificacion de los datos de los inputs en crear contacto
const validation = (check, verificationData, error) =>{
    if (check.value !== ''){

        if(!verificationData){
            error.style.display = 'block';
        }else{
            error.style.display = 'none';
        }

    }else{
        error.style.display = 'none';
    }
}
//verificacion del desbloqueo del boton
const unlockbtn = (verificationname, verificationnumber) =>{

    if(verificationname && verificationnumber){
        saveContact.disabled = false;
    }else{
        saveContact.disabled = true;
    }

}
//boton de enviar contacto
saveContact.addEventListener('click', e =>{

    e.preventDefault();
    const data = {
        username: userIn.value,
        tefl: userTelf.value
    }

    const crearContacto = document.createElement('div');
    crearContacto.setAttribute ('class', 'contact');
    crearContacto.setAttribute('id', `contact${contador}`)

    crearContacto.innerHTML = `<div class='name-contact'>
    <i class='fa-solid fa-trash' onclick='deletecontact(${contador})'></i>

    <input type='text' value='${data.username}' readonly class='input_edit enter_name-edit'>
    
    <button class='btn-edit'>
        <i class='fa-solid fa-pencil' onclick='editproduct(${contador})'></i>
        
        <div class="iconcheck" onclick='saveproduct(${contador})'>

            <i class="fa-solid fa-check"></i>
        </div>

    </button>
    
    </div>

    <div class='number-contact'>
        <input type='tel' readonly value='${data.tefl}' class='input_edit number_edit'>
    </div>`;



listContacts.appendChild(crearContacto);//agrega el contacto
contador = contador + 1;//numero de contacto
form.reset()//resetea el formulario
saveContact.disabled = true;//desabilita el boton guardar

localStorage.setItem('listcontact', listContacts.innerHTML);
localStorage.removeItem('contador');
localStorage.setItem('contador', contador);

})

//boton para acceder a la lista de contactos en version mobile
listContactBtn.addEventListener('click', e => {
    form.style.display = 'none';
    listContactTag.style.display = 'none';
    subtitleListContact.style.display = 'block';
    listContacts.style.display = 'flex';
    createContactReturn.style.display = 'flex';
    btnCreateReturn.style.display = 'flex';
})
//boton regresar a crear contacto en version mobile
btnCreateReturn.addEventListener('click', e =>{
    form.style.display = 'flex';
    listContactTag.style.display = 'flex';
    btnCreateReturn.style.display = 'none';
    subtitleListContact.style.display = 'none';
    listContacts.style.display = 'none';
    createContactReturn.style.display = 'none';
})
//boton para editar producto
function editproduct(n){

    let editar = document.getElementById('contact'+n);
  
                  editar.children[0].children[1].removeAttribute('readonly');//permite editar el input del nombre
                  editar.children[1].children[0].removeAttribute('readonly');//permite editar el input del numero
                  editar.children[1].children[0].style.background = '#4b5563';
                  editar.children[0].children[1].style.background = '#4b5563';
                  editar.children[0].children[2].children[1].style.display = 'flex';//habilita el icono check
                  editar.children[0].children[2].children[0].style.display = 'none';// desabilita el icono pencil
    }
//boton para guardar el contacto del icono check
function saveproduct(n){

    let editar = document.getElementById('contact'+n);
    
    const nameInput = editar.children[0].children[1];//etiqueta del inputname
    const numberInput = editar.children[1].children[0];//etiqueta del inputnumber

    if(nombreeditar.test(nameInput.value)){
        nameInput.style.color = '#d1d5db';

    }else{
        alert('el nombre no cumple con las reglas');
    }
    
    if(numeroeditar.test(numberInput.value)){
        numberInput.style.color = '#d1d5db';
    }else{
        alert('el numero no cumple con las reglas')
    }

    if(nombreeditar.test(nameInput.value) && numeroeditar.test(numberInput.value)){

        editar.children[0].children[2].children[0].style.display = 'flex';//habilita el pencil
        editar.children[0].children[2].children[1].style.display = 'none';//desabilita el check
        editar.children[0].children[1].setAttribute('readonly',true);//solo lectura 
        editar.children[1].children[0].setAttribute('readonly',true);//solo lectura 
        
        editar.children[1].children[0].style.background = '#1f2937';//devuelve los colores del input nombre en modo guardado
        editar.children[0].children[1].style.background = '#1f2937';//devuelve los colores del input del numero en modo guardado

        nameInput.setAttribute('value', nameInput.value);//guarda el valor del atributo
        numberInput.setAttribute('value', numberInput.value);//guarda el valor del atributo
        localStorage.removeItem("listcontact");
        localStorage.setItem('listcontact', listContacts.innerHTML);

    }
}

//boton para borrar contacto
function deletecontact(n){

    let editar = document.getElementById('contact'+n);
    localStorage.removeItem("listcontact");
    editar.remove();
    
    localStorage.setItem('listcontact', listContacts.innerHTML);
}

listContacts.innerHTML = localStorage.getItem('listcontact');
contador = Number(localStorage.getItem('contador'));