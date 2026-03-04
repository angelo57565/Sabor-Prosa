let cart = [];
let total = 0;

function updateCart() {

    document.getElementById("count").innerText = cart.length;
    document.getElementById("total").innerText = total.toFixed(2);
    const cliente = document.getElementById("clienteNome").value;
    document.getElementById("clienteCarrinho").innerText =
        cliente ? "Cliente: " + cliente : "";
}

function toggleCart() {
    document.getElementById("cartSidebar").classList.toggle("active");
}

function addToCart(name, price, button) {

    const cliente = document.getElementById("clienteNome").value;

    if (!cliente) {
        alert("Digite seu nome primeiro!");
        return;
    }


    const quantidadeInput = button.parentElement.querySelector(".quantidade");
    const quantity = parseInt(quantidadeInput.value);
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }

    total += price * quantity;

    updateCart();

    // efeito visual botão
    button.innerText = "✔ Adicionado";
    button.style.background = "green";

    setTimeout(() => {
        button.innerText = "Adicionar";
        button.style.background = "#512615";
    }, 1000);

    quantidadeInput.value = 1;
}

function removeItem(index) {

    if (cart[index]) {
        total -= cart[index].price * cart[index].quantity;
        cart.splice(index, 1);
        updateCart();
    }
}

function resetCart() {
    cart = [];
    total = 0;
    document.getElementById("clienteCarrinho").innerText = "";
    updateCart();
}

function sendWhatsApp() {

    const cliente = document.getElementById("clienteNome").value;

    if (!cliente) {
        alert("Digite seu nome!");
        return;
    }

    if (cart.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    let message = `Pedido de ${cliente}:%0A%0A`;

    cart.forEach(item => {

        const subtotal = item.price * item.quantity;

        message += `${item.quantity}x ${item.name} - R$ ${subtotal.toFixed(2)}%0A`;
    });

    message += `%0ATotal: R$ ${total.toFixed(2)}`;

    window.open(`https://wa.me/5592984827707?text=${message}`);
}