const navToggle = document.querySelector(".hamburguesa");
const navMenu = document.querySelector(".menu");
const animar = document.querySelector(".animar");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("visible");
  animar.classList.remove("animar");
});

navMenu.addEventListener("click", () => {
  navMenu.classList.toggle("visible");
  animar.classList.add("animar");
});


const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expnombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
const expemail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const campos= {
  nombre: false,
  email: false
};


const validarformulario = (e) => {
  switch (e.target.name) {
    case "nombre":
      validarcampo(expnombre, e.target, "nombre");
    break;
    case "email":
      validarcampo(expemail, e.target, "email");
    break;
  };

};

const validarcampo = (expresion, ingreso, campo) => {
  if (expresion.test(ingreso.value)) {
    document.getElementById(`grupo-${campo}`).classList.remove("form-grupo-incorrecto");
    document.getElementById(`grupo-${campo}`).classList.add("form-grupo-correcto");
    document.querySelector(`#grupo-${campo} i`).classList.remove("fa-circle-xmark");
    document.querySelector(`#grupo-${campo} i`).classList.add("fa-circle-check");
    document.querySelector(`#grupo-${campo}  .texto-error`).classList.remove("texto-error-activo");
    campos[campo] = true;
  } else {
    document.getElementById(`grupo-${campo}`).classList.remove("form-grupo-correcto");
    document.getElementById(`grupo-${campo}`).classList.add("form-grupo-incorrecto");
    document.querySelector(`#grupo-${campo} i`).classList.remove("fa-circle-check");
    document.querySelector(`#grupo-${campo} i`).classList.add("fa-circle-xmark");
    document.querySelector(`#grupo-${campo}  .texto-error`).classList.add("texto-error-activo");
    campos[campo] = false;
  }; 
};


inputs.forEach((input) => {
  input.addEventListener("keyup", validarformulario);
  input.addEventListener("blur", validarformulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (campos.nombre && campos.email) {
    formulario.reset(); 

    document.getElementById("mensaje-exito").classList.add("mensaje-exito-activo");
    
    setTimeout(() => {
      document.getElementById("mensaje-exito").classList.remove("mensaje-exito-activo");
    },5000); 
    
    document.querySelectorAll(".form-grupo-correcto").forEach((icono) => {
      icono.classList.remove("form-grupo-correcto");
    });
  } else {
    document.getElementById("mensaje-error").classList.add("mensaje-error-activo");

    setTimeout(() => {
      document.getElementById("mensaje-error").classList.remove("mensaje-error-activo");
      
      formulario.reset(); 
      
      document.querySelectorAll(".form-grupo-incorrecto").forEach((icono) => {
        icono.classList.remove("form-grupo-incorrecto");
                
      });

      document.querySelectorAll(".form-grupo p").forEach((mensaje) => {
        mensaje.classList.remove("texto-error-activo");
                
      });
      
      document.querySelectorAll(".form-grupo-correcto").forEach((icono) => {
        icono.classList.remove("form-grupo-correcto");
        
      });

    },4000); 
    
    
  }
});