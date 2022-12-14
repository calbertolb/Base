class Product {
  constructor(name, price,inventary, description,img) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.inventary = inventary;
    this.img = img;
  }
}



// Objeto que se crea en el Dom y su compportamiento al apretar un boton
class UI {
  addProduct(producto) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
  
    <div class="card text-center mb-2 mt-3">
    <img src="${producto.img}" class="card-img-top img-thumbnail img-fluid" alt="...">  
      <div class="card-body"> 
        <strong id="name">Producto</strong>: ${producto.name}
        <strong id="price">Precio</strong>: ${producto.price}
        <strong id="description">Descripcion</strong>: ${producto.description}
        <a href='#' class ="btn btn-danger" name ="delete">Eliminar</a>
        </div>
         
    </div>
    `;
    productList.appendChild(element);
  }

  resetForm() {
    document.getElementById("producto-form").reset();
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
      this.showMesage('Producto elminado satisfactoriamente', 'danger')
    }
  }

  successProduct(element) {
    if (element.name === "add") {
      console.log(element.parentElement.parentElement.parentElement); // metodo pendiente para subir a base de datos
        
    }
  }

  showMesage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));
    //muestra en el DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(div, app);
    //metodo y funcion de temporizador para elminar la alerta 
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },2300);
  }
}

//DOM Events
// esta funcion obtiene los valores ingresados de los inputs y los agrega a la clase producto anteriomente definida
//crea objeto cada vez que se ingresan nuevos datos
const form = document.getElementById("producto-form");
form.addEventListener("submit", function (event) {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;
  const imagen = document.getElementById("image").value;
  const inventary = document.getElementById("inventary").value;


  let b = {name:name,price:price,inventary:inventary,description:description,img:imagen}; //Creaci??n de JSON
  let b_user=JSON.stringify(b);//
  localStorage.setItem("Info",b_user); 

  const URL_MAIN ='https://calida-mx.herokuapp.com/api/productos/';
  
  fetch(URL_MAIN,{
    method: 'POST',
    headers:{
      'Content-type' : 'application/json',
    },
    body:JSON.stringify(b),
  })
  .then(response => response.text())
  .then(data =>{
    //if
  })
  .catch((error)=>{
    console.error('Error:',error);
  });



  //Se agrega a localStorage



  const producto = new Product(name, price,inventary, description, imagen);

  const ui = new UI();
  //condicion para la validacion de datos
  if(name === ''|| price === '' || description === '' || imagen === ''||inventary === ''){
    return ui.showMesage('Campos incompletos, favor de llenarlos', 'warning');
  }//temrmina funcion de validacion 

  ui.addProduct(producto);
  ui.resetForm();
  ui.showMesage('producto a??adido satisfactoriamente', 'success' );
  event.preventDefault();
});

//funcion de evento para elminar producto
document
  .getElementById("product-list")
  .addEventListener("click", function (event) {
    localStorage.removeItem("Info");
    const ui = new UI();
    ui.deleteProduct(event.target);
  });

//funcion de evento para agregar producto
document
  .getElementById("product-list")
  .addEventListener("submit", function (event) {
    const ui = new UI();
    ui.successProduct(event.target);
  });

  
