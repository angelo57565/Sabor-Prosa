let cart = [];
let total = 0;

function alterarQuantidade(button, change, name, price) {

    const span = button.parentElement.querySelector(".quantidade");
    let quantidade = parseInt(span.innerText);

    quantidade += change;

    if (quantidade < 0) {
        quantidade = 0;
    }

    span.innerText = quantidade;

    let item = cart.find(produto => produto.name === name);

    if (item) {

        item.quantity = quantidade;

        if (item.quantity === 0) {
            cart = cart.filter(produto => produto.name !== name);
        }

    } else if (quantidade > 0) {

        cart.push({
            name: name,
            price: price,
            quantity: quantidade
        });

    }

    atualizarTotal();
}

function verificarPagamento() {

    const forma = document.getElementById("formaPagamento").value;
    const campoDinheiro = document.getElementById("campoDinheiro");

    if (forma === "dinheiro") {
        campoDinheiro.style.display = "block";
    } else {
        campoDinheiro.style.display = "none";
    }
}

function updateCart() {

    const cartItems = document.getElementById("cartItems");

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        cartItems.innerHTML += `
        <div class="cart-item">
        ${item.quantity}x ${item.name}
        <button onclick="removeItem(${index})">X</button>
        </div>
        `;
    });

    document.getElementById("count").innerText = cart.length;
    document.getElementById("total").innerText = total.toFixed(2);
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

    const quantidadeSpan = button.parentElement.querySelector(".quantidade");
    const quantity = parseInt(quantidadeSpan.innerText);

    if (quantity === 0) {
        alert("Escolha a quantidade primeiro!");
        return;
    }

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity: quantity });
    }

    atualizarTotal();

    button.innerText = "✔ Adicionado";
    button.style.background = "green";

    setTimeout(() => {
        button.innerText = "Adicionar";
        button.style.background = "#512615";
    }, 1000);

    quantidadeSpan.innerText = 0;
}

function removeItem(index) {

    cart.splice(index, 1);

    atualizarTotal();
}

function atualizarTotal() {

    total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    updateCart();
}

function resetCart() {

    cart = [];
    total = 0;

    updateCart();
}

function sendWhatsApp() {

    const cliente = document.getElementById("clienteNome").value;
    const forma = document.getElementById("formaPagamento").value;
    const observacao = document.getElementById("observacao").value;

    if (!cliente) {
        alert("Digite seu nome!");
        return;
    }

    if (cart.length === 0) {
        alert("Carrinho vazio!");
        return;
    }

    if (!forma) {
        alert("Selecione a forma de pagamento!");
        return;
    }

    let message = `Pedido de ${cliente}:%0A%0A`;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        message += `${item.quantity}x ${item.name} - R$ ${subtotal.toFixed(2)}%0A`;
    });

    message += `%0ATotal: R$ ${total.toFixed(2)}%0A%0A`;

    if (observacao) {
        message += `Observação: ${observacao}%0A%0A`;
    }

    if (forma === "pix") {

        message += `Forma de pagamento: PIX%0A`;
        message += `Chave PIX: 92984827707%0A`;

    } else if (forma === "dinheiro") {

        const valorPago = parseFloat(document.getElementById("valorPago").value);

        if (!valorPago || valorPago < total) {
            alert("Valor pago inválido!");
            return;
        }

        const troco = valorPago - total;

        message += `Forma de pagamento: Dinheiro%0A`;
        message += `Valor pago: R$ ${valorPago.toFixed(2)}%0A`;
        message += `Troco: R$ ${troco.toFixed(2)}%0A`;
    }

    window.open(`https://wa.me/5592984827707?text=${message}`);
}