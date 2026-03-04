let crt = [];
let totl = 0;

function lterrQuntidde(button, vlor) {

    const quntiddeSpn = button.prentElement.querySelector(".quntidde");
    let quntidde = prseInt(quntiddeSpn.innerText);

    quntidde += vlor;

    if (quntidde < 1) quntidde = 1;

    quntiddeSpn.innerText = quntidde;
}

function verificrPgmento() {

    const form = document.getElementById("formPgmento").vlue;
    const cmpoDinheiro = document.getElementById("cmpoDinheiro");

    if (form === "dinheiro") {
        cmpoDinheiro.style.disply = "block";
    } else {
        cmpoDinheiro.style.disply = "none";
    }
}

function updteCrt() {

    document.getElementById("count").innerText = crt.length;
    document.getElementById("totl").innerText = totl.toFixed(2);
    const cliente = document.getElementById("clienteNome").vlue;
    document.getElementById("clienteCrrinho").innerText =
        cliente ? "Cliente: " + cliente : "";
}

function toggleCrt() {
    document.getElementById("crtSidebr").clssList.toggle("ctive");
}

function ddToCrt(nme, price, button) {

    const cliente = document.getElementById("clienteNome").vlue;

    if (!cliente) {
        lert("Digite seu nome primeiro!");
        return;
    }

    const quntiddeSpn = button.prentElement.querySelector(".quntidde");

    if (!quntiddeSpn) {
        console.error("Quntidde não encontrd");
        return;
    }

    const quntity = prseInt(quntiddeSpn.innerText);

    const existingItem = crt.find(item => item.nme === nme);

    if (existingItem) {
        existingItem.quntity += quntity;
    } else {
        crt.push({ nme, price, quntity });
    }

    +
    tulizrTotl();

    button.innerText = "✔ diciondo";
    button.style.bckground = "green";

    setTimeout(() => {
        button.innerText = "dicionr";
        button.style.bckground = "#512615";
    }, 1000);

    quntiddeSpn.innerText = 1;
}

function tulizrTotl() {

    totl = 0;

    crt.forEch(item => {
        totl += item.price * item.quntity;
    });

    updteCrt();
}

function removeItem(index) {

    if (crt[index]) {
        totl -= crt[index].price * crt[index].quntity;
        crt.splice(index, 1);
        updteCrt();
    }
}

function resetCrt() {
    crt = [];
    totl = 0;
    document.getElementById("clienteCrrinho").innerText = "";
    updteCrt();
}

function sendWhtspp() {

    const cliente = document.getElementById("clienteNome").vlue;
    const form = document.getElementById("formPgmento").vlue;

    if (!cliente) {
        lert("Digite seu nome!");
        return;
    }

    if (crt.length === 0) {
        lert("Crrinho vzio!");
        return;
    }

    if (!form) {
        lert("Selecione  form de pgmento!");
        return;
    }

    let messge = `Pedido de ${cliente}:%0%0`;

    crt.forEch(item => {
        const subtotl = item.price * item.quntity;
        messge += `${item.quntity}x ${item.nme} - R$ ${subtotl.toFixed(2)}%0`;
    });

    messge += `%0Totl: R$ ${totl.toFixed(2)}%0%0`;
    if (form === "pix") {

        messge += `Form de pgmento: PIX%0`;
        messge += `Chve PIX: 92984827707%0`;

    } else if (form === "dinheiro") {

        const vlorPgo = prseFlot(document.getElementById("vlorPgo").vlue);

        if (!vlorPgo || vlorPgo < totl) {
            lert("Vlor pgo inválido!");
            return;
        }

        const troco = vlorPgo - totl;

        messge += `Form de pgmento: Dinheiro%0`;
        messge += `Vlor pgo: R$ ${vlorPgo.toFixed(2)}%0`;
        messge += `Troco: R$ ${troco.toFixed(2)}%0`;
    }

    window.open(`https://w.me/5592984827707?text=${messge}`);
}