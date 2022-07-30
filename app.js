// get element
const productForm =document.getElementById('productForm');
const product_update_form =document.getElementById('product_update_form');
const msg = document.querySelector('.msg');
const productList=document.querySelector('#productList');
const single_product=document.getElementById('single_product');


// get all products
const getAllProducts =()=>{
    let data=readLocalStorageData('product');
    if(!data){
        productList.innerHTML=`
            <tr>
                <td colspan="7" class="text-center">No product found </td>
            </tr>
        `
    }
    if(data){
        let list =[];
        let finalAmount = 0;
        data.map((item,index) => {
            finalAmount +=(item.price * item.quantity);
            list +=`
            <tr>
            <td>${index +1}</td>
            <td>
                <img src="${item.photo}" alt="">
            </td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.price * item.quantity}</td>
            <td>
                <a class="btn btn-info btn-sm product_view" product_index=${index} data-bs-toggle="modal" href="#shopSingleModal"><i class="fas fa-eye"></i> </a>
                <a class="btn btn-warning btn-sm product_edit" product_index=${index} data-bs-toggle="modal" href="#shop_edit_Modal"><i class="fas fa-edit"></i> </a>
                <a class="btn btn-danger btn-sm product_delete" href="#"><i class="fas fa-trash"></i> </a>
            </td>
         </tr>
            `
        });
        list += `
                <tr>
                  <td colspan="6" class="text-end">Total Amount ${finalAmount} BDT </td>
                    <td></td>
                </tr>
            `
        productList.innerHTML=list;
    }
}
getAllProducts();

productForm.onsubmit=(e)=>{
    e.preventDefault();

    let form_data= new FormData(e.target);
    let productData=Object.fromEntries(form_data.entries());
    let {name,photo,quantity,price}=Object.fromEntries(form_data.entries());

    if (!name || !photo || !quantity || !price) {
        msg.innerHTML=setAlert("All fields are required");
    }
    else{

        createLocalStore('product',productData);
        msg.innerHTML=setAlert("Data stable", 'warning');
        getAllProducts();
        e.target.reset();
    }

}
// single product view
productList.onclick=(e)=>{
    e.preventDefault();
   
    // product view
   if (e.target.classList.contains('product_view')) {
    let index=e.target.getAttribute('product_index');
   let data=readLocalStorageData('product');
   const {name,price,photo,quantity}=data[index];
   single_product.innerHTML=`
                <img
                class="shadow"
                src="${photo}"
                alt=""
              />
              <h1>name: ${name}</h1>
              <p>price: ${price}</p> 
              <p>quantity: ${quantity}</p>
   `;
   };
  //  product edit
   if (e.target.classList.contains('product_edit')){
    let index=e.target.getAttribute('product_index');
    let data=readLocalStorageData('product');
    const {name,price,photo,quantity}=data[index];
    product_update_form.innerHTML  =`<div class="my-3">
                <label for="name">Name:</label>
                <input name="name" class="form-control" value="${name}" type="text" id="name" />
              </div>
              <div class="my-3">
              <img class="w-90 " src="${photo}" alt="">
              <input name="photo" class="form-control" value="${photo}" type="text" id="name" />
              </div>
              <div class="my-3">
                <label for="price">price:</label>
                <input
                  name="price"
                  value="${price}"
                  class="form-control"
                  type="text"
                  id="price"
                />
              </div>
              <div class="my-3">
                <label for="quantity">Quantity:</label>
                <input
                  name="index"
                  value="${quantity}"
                  class="form-control"
                  type="text"
                  id="quantity"
                />
              </div>
              <div class="my-3">
                
                <input
                  name="quantity"
                  value="${index}"
                  class="form-control"
                  type="hidden"
                  id="quantity"
                />
              </div>
              <div class="my-3">
                <input
                  class="form-control btn btn-success"
                  type="submit"
                  value="update"
                  id="submit"
                />
              </div>`;
   };

  //  product delete
 if (e.target.classList.contains('product_delete')) {
   let index=e.target.getAttribute('product_index');
   let data=readLocalStorageData('product');

   data.splice(index,1)
   updateLocalStorageData('product',data)
   getAllProducts();
 }
}
// update product


product_update_form.onsubmit=(e)=>{
    e.preventDefault();

    const form_data=new FormData(e.target);
    const {name,photo,price,quantity,index}=Object.fromEntries(form_data.entries());
    // get all data
    let all_data=readLocalStorageData('product');
    all_data[index]={name,photo,price,quantity}
    // update your Data
    updateLocalStorageData('product',all_data);
    getAllProducts();
}