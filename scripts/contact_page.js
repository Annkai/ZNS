"use strict";

var addContactListButton = document.getElementById('addContactListButton');
var addContactButton = document.getElementById('addContactButton');
var contactimgCont = document.getElementById('contactimgCont');
var emptyContactTextCont = document.getElementById('emptyContactTextCont');
var addContactButtonCont = document.getElementById('addContactButtonCont');
var addContactBox = document.getElementById('addContactBox');
var closeAddContactBox = document.getElementById('closeAddContactBox');
var contactsMaintCont = document.getElementById('contactsMaintCont');


addContactListButton.addEventListener('click', addContact, false);
addContactButton.addEventListener('click', addContact, false);

function addContact(EO) {
    EO = EO || window.event;
    addContactBox.style.display = 'block';
    contactimgCont.style.display = 'none';
    emptyContactTextCont.style.display = 'none';
    addContactButtonCont.style.display = 'none';
    contactsMaintCont.style.display = 'none';
}

closeAddContactBox.addEventListener('click', closeAddContact, false);

function closeAddContact(EO) {
    EO = EO || window.event;
    addContactBox.style.display = 'none';
    contactimgCont.style.display = 'block';
    contactsMaintCont.style.display = 'block';
    //emptyContactTextCont.style.display = 'block';
    //addContactButtonCont.style.display = 'block';
}


//Contact List

var contactListDiv = document.querySelector('.contactBlocks');
var contactList = document.getElementById('contactList');
var menuRow = document.getElementById('menuRow');
var delCont = document.getElementById('delCont');


//setup contacts
contactListDiv.innerHTML = '';
var setupContacts = (notes) => {
    var contactsLength = notes.length;

    let delInf = '';
    let contactInf = '';
    let html = '';
    notes.forEach((doc, item) => {
        var notes = doc.data();
        const li = `
            <li style="list-style-type:none;">
                <div class="contactCell" id="contactCell_${item}" style="margin-left:-40px; height: 64px;font-size: 19px; cursor:pointer; border-radius: 3px;">
                <div class="photoContact"></div> 
                    <span style="float:left; margin-top: 18.5px; margin-left:13px;">${notes.name}</span>
                    <div class="starContact"><img src="img/star.svg"></div>
                </div>
                
            </li>
        `;



        const contactInfCont = `
            <div style="display: none" id="contactCard_${item}">
            <p class="contactName">${notes.name}<img src="img/mask.svg" class="maskIcon"></p>
            <p class="position">undefined</p>
            <div class="contactInformationMenu">
                <span class="information">Information</span>
                <span class="notes">Notes</span>
                <span class="files">Files</span>
                <span class="history">History</span>

                <div class="hrCont">
                    <hr class="infHr">
                    <hr class="notesHr">
                    <hr class="filesHr">
                    <hr class="historyHr">
                </div>

                <hr class="contactInfHr">

            </div>

            <p class="phoneInf">
                <img src="img/phone.svg">
                <span class="phoneInfText">Phone</span>
            </p>

            <div class="phoneHomeCont">
                <span>${notes.number}</span>
                <span>Home</span>
            </div>

            <div class="phoneOfficeCont">
                <span>${notes.number}</span>
                <span>Office</span>
            </div>

            <p class="phoneInf">
                <img src="img/email.svg">
                <span class="mailInfText">E-mail</span>
            </p>

            <div>
                <span>${notes.email}</span>
                <span>Work</span>
            </div>

            <p class="phoneInf">Ways of communications:</p>
            <img src="img/twitter.svg" class="infTwitter">
            <img src="img/facebookIcon.svg" class="infFacebook">
            <img src="img/linkedIN.svg">

            <p class="phoneInf">
                <img src="img/birthday.svg">
                <span class="birthdayInfText">Date of Birthday</span>
            </p>

            <div>
                <span>undefined</span>
            </div>

            <p class="phoneInf">
                <img src="img/locations.svg">
                <span class="locationsInfText">Locations</span>
            </p>

            <div class="phoneHomeCont">
                <span>undefined</span>
                <span>Currently lives in</span>
            </div>

            <div class="phoneOfficeCont">
                <span>undefined</span>
                <span>Lived in</span>
            </div>

            <div class="phoneHomeCont">
                <span>undefined</span>
                <span>Added to contacts</span>
            </div>

            <p class="phoneInf">
                <img src="img/work.svg">
                <span class="workInfText">Work</span>
            </p>

            <div class="phoneHomeCont">
                <span>undefined</span>
                <p>undefined</p>
            </div>

            <div class="phoneOfficeCont">
                <span>undefined</span>
                <p>undefined</p>
            </div>

        </div>

        `;

        const del = `
        <div style="display: none" id="delCont_${item}">
        <img src="img/ic_share.svg" class="icShareIcon">
        <img src="img/delete.svg" class="deleteIcon" id="delIcon_${item}" onClick='deleteContactButton("${doc.id}")'>
        </div>
    `;

        html += li;
        contactInf += contactInfCont;
        delInf += del;

    });

    contactListDiv.innerHTML = html;
    menuRow.innerHTML = contactInf;
    delCont.innerHTML = delInf;

    document.getElementById('contactCell_0').classList.add('add-highlight'); //Первый контакт подсвечивается
    document.getElementById('contactCard_0').style.display = 'block'; //Отображается карточка первого контакта
    document.getElementById('delCont_0').style.display = 'block';


    //  ПРИ ВЫБОРЕ КОНТАКТА - ПОДСВЕТКА И ОТОБРАЖЕНИЕ КАРТОЧКИ КОНТАКТА

    function getContactCard(n) {

        document.getElementById('contactCell_' + n).addEventListener('click', changeContactCard, false);

        function changeContactCard(EO) {
            EO = EO || window.event;

            document.getElementById('delCont_' + n).style.display = 'block';
            document.getElementById('contactCard_' + n).style.display = 'block';
            document.getElementById('contactCell_' + n).classList.add('add-highlight');

            for (var z = 0; z < contactsLength; z++) {
                if (z !== n) {
                    document.getElementById('delCont_' + z).style.display = 'none';
                    document.getElementById('contactCard_' + z).style.display = 'none'; //скрываются все картоячки контактов кроме выбранного контакта
                    document.getElementById('contactCell_' + z).classList.remove('add-highlight'); //при выборе контакта скрывается подсветка с остальных
                }
            }
        }
    }

    for (var m = 0; m < contactsLength; m++) {
        getContactCard(m);
    }

}


// get data
auth.onAuthStateChanged(user => {
    if (user) {
        var currentUserUid = firebase.auth().currentUser.uid;

        //get data from contacts
        db.collection('users').doc(currentUserUid).collection('notes').orderBy('name').onSnapshot(snapshot => {
            setupContacts(snapshot.docs);
            // setupUI(user);
        }, err => {
            console.log(err.message)
        });

    } else {
        setupUI();
        console.log('user logged out')
        setupContacts([]);
    }
});

// get current user uid
var currentUserUid;

function checkAuthStatus() {
    return new Promise((resolve, reject) => {
        try {
            firebase.auth().onAuthStateChanged(user => {
                resolve(user.Sb.uid);
                currentUserUid = user.Sb.uid;
            });
        } catch {
            reject('api failed');
        }
    });
};


// delete contact
function deleteContactButton(contactId) {
    checkAuthStatus().then(() => {
        db.collection('users').doc(currentUserUid).collection('notes').doc(contactId).delete();
    });
}


// create new contact
const createForm = document.querySelector('#create-form');
checkAuthStatus().then(createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').doc(currentUserUid).collection('notes').add({
        name: createForm.name.value,
        number: createForm.phone.value,
        email: createForm.email.value,
    }).then(() => {
        // close the create modal & reset form
        // const modal = document.querySelector('#addContactBox');
        // M.Modal.getInstance(addContactBox).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
}));