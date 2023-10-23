// Control Sliders 

        
$(document).ready(function(){
    $('.project__card-body').slick({
        prevArrow: $('.previous-btn'),
        nextArrow: $('.next-btn'),
        appendArrows: $('.project__card-controller'),
        dots: true,
        infinite: false,
        draggable: false,
        speed: 300,
        slidesToShow: 1,
        cssEase: 'linear'
    });
  });



//   Global Variables 

const customer_info = {};
let service_name;
let budget;

const elPreviewBtn = get('js-preview-btn');

// General control part

let current_step = 1;

const elAuthSection = get('js-auth-section');
const elProjectSection = get('js-project-section');
const elDescription = get('js-description');

elAuthSection.style.display = 'none';
elProjectSection.style.display = 'none';
elDescription.style.display = 'none';

const elHeaderBtn = get('js-header-btn');

// Check Token 

checkAuth();

// Auth part 

const elPasswordEyeIcon = get('js-password-eye-icon');
const elConfirmPasswordEyeIcon = get('js-c-password-eye-icon');

elPasswordEyeIcon.addEventListener('click', (evt) => {
    elPasswordEyeIcon.classList.toggle('eye-closed-icon');
    get('js-password').type === 'password' ? get('js-password').type = 'text' : get('js-password').type = 'password';
});

elConfirmPasswordEyeIcon.addEventListener('click', (evt) => {
    elConfirmPasswordEyeIcon.classList.toggle('eye-closed-icon');
    get('js-confirm-password').type === 'password' ? get('js-confirm-password').type = 'text' : get('js-confirm-password').type = 'password';
});

// Handle Registered user data 

handleRegisteredUserData();


// Auth part ends 










// Description part

const elDescriptionName = get('js-description-name');
const elDescriptionEmail = get('js-description-email');
const elDescriptionContact = get('js-description-contact');
const elDescriptionCompany = get('js-description-company');
const elDescriptionService = get('js-description-service');
const elDescriptionBudget = get('js-description-budget');



// Description part ends


// Controller part 

// Control Prev and Next Movement 

const elPrevBtn = get('js-prev-btn');
const elNextBtn = get('js-next-btn');
const elProjectForms = get('js-project-form');
const elCustomerInfoForm = get('js-customer-info-form');
const elServicesForm = get('js-service-form');
const elBudgetForm = get('js-budget-form');
let clicked;

elPrevBtn.addEventListener('click', (evt) => {
    
    moveToPrev();
    
    function moveToPrev() {
        if(clicked) clearTimeout(clicked);
        clicked = setTimeout(() => {
            if(current_step > 1) current_step--;
            showAndHideControllerBtn();
            decreaseProgressBar();
        }, 300);
    }
});

elNextBtn.addEventListener('click', (evt) => {

    // On before slide change
    $('.project__card-body').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        
        console.log(slick);
    });


    const submitEvt = new Event("submit");

    if(current_step == 1) {

        const elCustomerName = get('js-customer-name');
        const elCustomerEmail = get('js-customer-email');
        const elCustomerPhone = get('js-customer-tel');
        const elCustomerCompany = get('js-customer-company-name');

        const elCustomerNameError = get('js-customer-name-error');
        const elCustomerEmailError = get('js-customer-email-error');
        const elCustomerPhoneError = get('js-customer-tel-error');
        const elCustomerCompanyError = get('js-customer-company-name-error');

        elCustomerInfoForm.addEventListener('submit', evt => {
            evt.preventDefault();

            if(!validate(elCustomerName, "Name", elCustomerNameError, ["required"])) return;
            if(!validate(elCustomerEmail, "Email", elCustomerEmailError, ["required", "email"])) return;
            if(!validate(elCustomerPhone, "Phone number", elCustomerPhoneError, ["required", "tel"])) return;
            if(!validate(elCustomerCompany, "Company name", elCustomerCompanyError, ["required"])) return;

            customer_info["name"] = elCustomerName.value.trim();
            customer_info["email"] = elCustomerEmail.value.trim();
            customer_info["contact"] = elCustomerPhone.value.trim();
            customer_info["company"] = elCustomerCompany.value.trim();
            
            moveToNext();

        });

        elCustomerInfoForm.dispatchEvent(submitEvt);
    }

    if(current_step == 2) {

        const elDevelopment = get('js-development-input');
        const elWebDesign = get('js-web-design-input');
        const elMarketing = get('js-marketing-input');
        const elOther = get('js-other-input');
        const elArr = [elDevelopment, elWebDesign, elMarketing, elOther];

        elArr.forEach(inp => {
            inp.addEventListener('click', (evt) => {
                elArr.forEach(el => {
                    el.nextElementSibling.classList.remove('invalid-label');
                });
            });
        });


        elServicesForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            

            const checkedInput = elArr.find(el => {
                if(el.checked) return el;
            });

            if(!checkedInput) {
                elArr.forEach(el => {
                    el.nextElementSibling.classList.add('invalid-label');
                });

                return;
            }

            elArr.forEach(el => {
                el.nextElementSibling.classList.remove('invalid-label');
            });

            service_name = checkedInput.value;

            moveToNext();

        });


        elServicesForm.dispatchEvent(submitEvt);

    }

    if(current_step == 3) {

        const elSmallProject = get('js-small-project');
        const elMediumProject = get('js-medium-project');
        const elBigProject = get('js-big-project');
        const elLargeProject = get('js-large-project');
        const elArr = [elSmallProject, elMediumProject, elBigProject, elLargeProject];

        elArr.forEach(inp => {
            inp.addEventListener('click', (evt) => {
                elArr.forEach(el => {
                    el.nextElementSibling.classList.remove('invalid-label');
                });
            });
        });


        elBudgetForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            

            const checkedInput = elArr.find(el => {
                if(el.checked) return el;
            });

            if(!checkedInput) {
                elArr.forEach(el => {
                    el.nextElementSibling.classList.add('invalid-label');
                });

                return;
            }

            elArr.forEach(el => {
                el.nextElementSibling.classList.remove('invalid-label');
            });

            budget = checkedInput.value;
            
            moveToNext();
            
            createDescriptionSection();

        });


        elBudgetForm.dispatchEvent(submitEvt);
       
    }
            


    function moveToNext() {
        if(clicked) clearTimeout(clicked);
        clicked = setTimeout(() => {
            if(current_step < 4) current_step++;
            showAndHideControllerBtn();
            IncreaseProgressBar();
        }, 300);
    }
});

showAndHideControllerBtn();

// Control Progress bar 



// Controller part ends


// Functions 

function IncreaseProgressBar() {
    const elProgressBarWrapper = get('project__progress-wrapper');
    const elProgressPoints = get('project__point', true);
    const elProgressLines = get('project__line', true);
    let odd = true;
    for(let i = 0; i < current_step; i++) {
        elProgressPoints[i].classList.add('active-point');
        if(elProgressLines[i - 1]) elProgressLines[i - 1].classList.add('full-line');
        else elProgressLines[0].classList.add('full-line')
        if(elProgressLines[i]) elProgressLines[i].classList.add('half-line');
      
    }
    
}

function decreaseProgressBar() {
    const elProgressBarWrapper = get('project__progress-wrapper');
    const elProgressPoints = get('project__point', true);
    const elProgressLines = get('project__line', true);

    elProgressPoints[current_step].classList.remove('active-point');
    if(current_step == 3) {
        elProgressLines[current_step - 1].classList.remove('full-line');
        return;
    }
    
    elProgressLines[current_step].classList.remove('half-line');
    if(elProgressLines[current_step - 1]) elProgressLines[current_step - 1].classList.remove('full-line');
    else elProgressLines[0].classList.remove('full-line');
    
}



function createDescriptionSection() {
    elPreviewBtn.addEventListener('click', (evt) => {
        if(Object.keys(customer_info).length && service_name && budget) {
            renderSection(elDescription);
            renderDescriptionData(customer_info, service_name, budget);
        }
    });
}














function showAndHideControllerBtn() {
    
    if(current_step == 1) elPrevBtn.classList.add('hide');
    else elPrevBtn.classList.remove('hide');
    if(current_step == 4) elNextBtn.classList.add('hide');
    else elNextBtn.classList.remove('hide');
    
}




function handleRegisteredUserData() {

    const elAuthForm = get('js-auth-form');
    const elFirstNameInput = get('js-first-name');
    const elLastNameInput = get('js-last-name');
    const elEmailInput = get('js-email');
    const elPasswordInput = get('js-password');
    const elConfirmPasswordInput = get('js-confirm-password');
    const elGenderInput = get('js-gender');
    const elDobInput = get('js-dob');
    const elAgreementInput = get('js-agreement');

    const elFirstNameError = get('js-first-name-error');
    const elLastNameError = get('js-last-name-error');
    const elEmailError = get('js-email-error');
    const elPasswordError = get('js-password-error');
    const elConfirmPasswordError = get('js-confirm-password-error');
    const elGenderError = get('js-gender-error');
    const elDobError = get('js-dob-error');

   

    elAuthForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        
        if(!validate(elFirstNameInput, "First name", elFirstNameError, ["required"])) return;
        if(!validate(elLastNameInput, "Last name", elLastNameError, ["required"])) return;
        if(!validate(elEmailInput, "Email", elEmailError, ["required", "gmail"])) return;
        if(!validate(elPasswordInput, "Password", elPasswordError, ["required", "password"])) return;
        if(!validate(elConfirmPasswordInput, "Repeat password", elConfirmPasswordError, ["required", "confirm_password"])) return;
        if(!validate(elAgreementInput, undefined, undefined, ["checked"])) return;
    
        const user_data = {
            firstName: elFirstNameInput.value.trim(),
            lastName: elLastNameInput.value.trim(),
            email: elEmailInput.value.trim(),
            password: elPasswordInput.value.trim()
        }

    
        if(user_data) {
            window.localStorage.setItem("user_data", JSON.stringify(user_data));
            const reverseFirstName = user_data?.firstName.split('').reverse().join('$');
            const reverseEmail = user_data?.email.split('').reverse().join('');
            const reverseLastName = user_data?.lastName.split('').reverse().join('.');
            const token = (reverseFirstName + reverseEmail + reverseLastName).toLowerCase();
            window.localStorage.setItem("token", token);
            checkAuth();
        }
    
    
    
    });

  
}




function checkAuth() {
    if(localStorage.getItem("token")) {
        elAuthSection.style.display = 'none';
        elProjectSection.style.display = 'block';
        elHeaderBtn.classList.add('logout');
        elHeaderBtn.textContent = 'Logout';

        elHeaderBtn.addEventListener('click', (evt) => {
            elAuthSection.style.display = 'block';
            elProjectSection.style.display = 'none';
            elHeaderBtn.classList.remove('logout');
            elHeaderBtn.textContent = 'Register';
            window.localStorage.removeItem("token");
        });
    }else {
        elAuthSection.style.display = 'block';
        elProjectSection.style.display = 'none';
    }

    handleRegisteredUserData();
}






function validate(el, elName, elError, options = []) {

    if(options.length > 0) {

        for(const option of options) {
            const isLastElement = options.indexOf(option) === options.length - 1 ? true : false;
            if(option === 'required') {
                if(el.value.trim().length == 0) {
                    addInvalidClass(`${elName} field is required !`);
                    return false;
                }else {
                    removeInvalidClass();
                    if(isLastElement) return true;
                }
            }

            if(option === 'email') {
                const regEx = /([a-z0-9\.]+)@([a-z]+)\.([a-z]{2,6})/g;
                if(!regEx.test(el.value.trim())) {
                    addInvalidClass(`${elName} field must be valid email address !`);
                    return false;
                }else {
                    removeInvalidClass();
                    if(isLastElement) return true;
                }
            }

            if(option === 'gmail') {
                const regEx = /[\w]*@*[a-z]*\.*[\w]{1,}(\.)*(com)*(@gmail\.com)/g;
                if(!regEx.test(el.value.trim())) {
                    addInvalidClass('The last letters of the email must end with @gmail.com');
                    return false;
                }else {
                    removeInvalidClass();
                    if(isLastElement) return true;
                }
            }

            if(option === 'tel') {
                const regEx = /(^\+?)(?:[0-9]●?){6,14}[0-9]$/;
                if(!regEx.test(el.value.trim())) {
                    addInvalidClass(`${elName} must be valid phone number !`);
                    return false;
                }else {
                    removeInvalidClass();
                    if(isLastElement) return true;
                }
            }

            if(option === "password") {
                const regEx = /^(?=[^\d_].*?\d)\w(\w|[!@#$%]){7,20}/;
                if(!regEx.test(el.value)) {
                   addInvalidClass(`${elName} field must be min 8 characters and combination of special chars and letters`);
                   return false;
                }else {
                    removeInvalidClass();
                    if(isLastElement) return true;
                }
            }

            if(option === "confirm_password") {
                const password = get('js-password') ? get('js-password') : false;
                if(!password) return false;
                if(password.value !== el.value) {
                    addInvalidClass(`${elName} must be same as password field`);
                    return false;
                }else {
                    removeInvalidClass();
                    if(isLastElement) return true;
                }
            }

            if(option === "checked") {
                if(!el.checked) {
                    addInvalidClass();
                    return false;
                }else {
                    removeInvalidClass();

                    if(isLastElement) return true;
                }
            }
        }
    }

    function addInvalidClass(msg) {
        el.closest('.form-group').classList.add('is-invalid');
        if(elError) elError.textContent = msg; 
    }

    function removeInvalidClass() {
        el.closest('.form-group').classList.remove('is-invalid');
        if(elError) elError.textContent = '';
    }
}


function renderSection(section) {
    elAuthSection.style.display = 'none';
    elProjectSection.style.display = 'none';
    elDescription.style.display = 'none';

    section.style.display = 'block';
}

function renderDescriptionData(customer_info, service_name, budget) {
    // const elDescriptionList = get('description__list');

    const elCustomerName = get('js-description-name');
    const elCustomerEmail = get('js-description-email');
    const elCustomerContact = get('js-description-contact');
    const elCustomerCompany = get('js-description-company');
    const elCustomerService = get('js-description-service');
    const elCustomerBudget = get('js-description-budget');

    elCustomerName.textContent = customer_info.name;
    elCustomerEmail.textContent = customer_info.email;
    elCustomerContact.textContent = customer_info.contact;
    elCustomerCompany.textContent = customer_info.company;
    elCustomerService.textContent = service_name;
    elCustomerBudget.textContent = budget;

}



function get(className, isAll = false) {
    if(isAll) return document.querySelectorAll(`.${className}`); 
    return document.querySelector(`.${className}`);
}