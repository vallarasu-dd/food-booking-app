const btnCart=document.querySelector('#cart-icon');
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',(e)=>{
    cart.classList.add('cart-active');
});

btnClose.addEventListener('click',(e)=>{
    cart.classList.remove('cart-active');
});


document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
    loadContent();
}

function loadContent(){
    //remove items from cart

    let btnRemove=document.querySelectorAll('.cart-remove');
    btnRemove.forEach((btn) => {

        btn.addEventListener('click',removeItem); 
        
    });
    let qty=document.querySelectorAll('.cart-quantity');
    qty.forEach((input) => {

        input.addEventListener('change',changeEvent); 
        
    });

    let btnCart=document.querySelectorAll('.add-cart');
    btnCart.forEach((btn) => {

        btn.addEventListener('click',addcart); 
        
    });
    updateTotal();
}
// removeitems function
function removeItem(){
    if(confirm('Are you sure want to remove'))
    {
        let title=this.parentElement.querySelector('.cart-food-title').innerHTML;
        itemList=itemList.filter(ele=>ele.title!=title);
    this.parentElement.remove();
    loadContent();
    }

}

//quanity input box changing function

function changeEvent(){

    if(isNaN(this.value)  || this.value<1)
    {
       this.value=1;
    }
    loadContent();  
}

let itemList=[];

//adding items to the cart by clicking the cart menu in the foodbox

    function addcart()
    {
            
        let addfood=this.parentElement;
        let title=addfood.querySelector('.fdname').innerHTML;
        let price=addfood.querySelector('.price').innerHTML;
        let image=addfood.querySelector('.food-img').src;

        // console.log(title,price,image);
        let productFinder={title,price,image}
        //checking 

        if(itemList.find((el)=>el.title==productFinder.title))
        {
            alert("Product Already added in Cart");
            return;
        }
        else{
            itemList.push(productFinder);
           }

        let newProductElement=createproduct(title,price,image);
        let cartBasket=document.querySelector('.cart-content');
        let element=document.createElement('div');
        element.innerHTML=newProductElement;
        cartBasket.append(element);
        loadContent();

        

           
    }

    function createproduct(title,price,image){
        return `
        <div class="cart-box">
                        <img src="${image}" alt="error" class="cart-img">
                        <div class="details">
                            <div class="cart-food-title">${title}</div>
                            <div class="price-box">
                                <div class="cart-price">${price}</div>
                                <div class="cart-amt">${price}</div>
                            </div>
                            <input type="number" value="1" class="cart-quantity">
                            
                        </div>
                        <ion-icon name="trash" class="cart-remove"></ion-icon>
                    </div>
        `;
    }

    function updateTotal(){
        const cartItem=document.querySelectorAll('.cart-box');
        const totalValue=document.querySelector('.total-price');

        let total=0;

        cartItem.forEach(product=>
        {
            let priceElement=product.querySelector('.cart-price');
            let price=parseFloat(priceElement.innerHTML.replace("Rs.",""));
            let qty=product.querySelector('.cart-quantity').value;
            total+=(price*qty);
            console.log(total);
            product.querySelector('.cart-amt').innerText="Rs."+(price*qty);

  });

  totalValue.innerHTML='Rs.'+total;

  //cart count
  const cartCount=document.querySelector('.cart-count');
  let count=itemList.length;
  cartCount.innerHTML=count;

  if(count==0){
    cartCount.style.display='none';
 
    

  }else{
    cartCount.style.display='block';
  }

     
    }