let unosi = document.querySelectorAll('input');
let greske = {
    "ime_prezime": [],
    "korisnicko_ime": [],
    "email": [],
    "lozinka": [],
    "ponovi_lozinku": []
};

unosi.forEach(element => {
    element.addEventListener('change', e => {
        let trenutniUnos = e.target;
        let vrednostUnosa = trenutniUnos.value;
        let imeUnosa = trenutniUnos.getAttribute('name');

        if (vrednostUnosa.length > 4) {
            greske[imeUnosa] = [];
            switch (imeUnosa) {
                case 'ime_prezime':
                    let validacija = vrednostUnosa.trim();
                    validacija = validacija.split(" ");
                    if (validacija.length < 2) {
                        greske[imeUnosa].push('Morate napisati ime i prezime');
                    }
                    break;

                case 'email':
                    if (!proveraEmail(vrednostUnosa)) {
                        greske[imeUnosa].push('Neispravna email adresa');
                    }
                    break;

                case 'ponovi_lozinku':
                    let lozinka = document.querySelector('input[name = "lozinka"]').value;
                    if (vrednostUnosa !== lozinka) {
                        greske[imeUnosa].push('Lozinke se ne poklapaju');
                    }
                    break;
            }
        }

        else {
            greske[imeUnosa] = ['Polje ne moze imati manje od 5 karaktera'];
        }

        ceste_greske();
    });
});

const ceste_greske = () => {
    for (let elem of document.querySelectorAll('ul')) {
        elem.remove();
    }

    for (let key of Object.keys(greske)) {
        let unos = document.querySelector(`input[name = "${key}"]`);
        let parentElement = unos.parentElement;
        let greskeElement = document.createElement('ul');
        parentElement.appendChild(greskeElement);

        greske[key].forEach(x => {
            let li = document.createElement('li');
            li.innerText = x;
            greskeElement.appendChild(li);
        });
    }
}

const proveraEmail = email => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }

    return false;
}
