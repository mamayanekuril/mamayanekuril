function addVideo() {
  const btn = document.querySelectorAll('.addVideo')
  
  btn.forEach(item => {
    item.addEventListener('click', function() {
      const parent = item.closest('.addVideo-wrapper')
      const height = parent.offsetHeight
      parent.style.height = height + 'px'
      parent.innerHTML = `
        <video controls="controls" autoplay="true">
          <source src="static/video/${this.dataset.video}.mp4" type="video/mp4">
        </video>
      `
      setTimeout(() => {
        parent.style.height = null
      }, 1000)
    })
  })
}

addVideo()


const links = document.querySelectorAll('.footer-menu__link')

links.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault()

        const type = this.dataset.modal

        const modal = document.querySelector(`._modal[data-modal="${type}"]`)
        modal.classList.add('open')
    })
})

const modal = document.querySelectorAll('._modal')

modal.forEach(item => {
    item.addEventListener('click', function() {
        this.classList.remove('open')
    })
})






function order() {
  const orderItem = document.querySelectorAll('.order-item')
  if (!orderItem.length) return
  let price = 0
  let sale = 0
  let shiping = 0
  let total = 0
  let retailText = ''

  const item1 = document.querySelector('.item1')
  const item2 = document.querySelector('.item2')
  const item3 = document.querySelector('.item3')

  const sp = document.getElementById('shiping')
  const yt = document.getElementById('total')
  const save = document.getElementById('save')
  const retail = document.getElementById('retail')

  const select = document.querySelector('#country')

  orderItem.forEach(item => {
      item.addEventListener('click', function() {
          orderItem.forEach(i => i.classList.remove('selected'))
          this.classList.add('selected')

          price = Number(this.dataset.price)
          sale = Number(this.dataset.sale)
          
          retailText = this.dataset.retail
          let event = new Event("change");
          select.dispatchEvent(event);

          output()
      })
  })


  function output() {
      sp.textContent = `$${shiping}`
      save.textContent = `You Save $${sale}`
      retail.textContent = `Retail: ${retailText}`

      yt.textContent = `$${price}`
  }

  if (!select) return

  select.addEventListener('change', function() {
      let value1 = this.querySelector(':checked').getAttribute('data-price1')
      let value2 = this.querySelector(':checked').getAttribute('data-price2')
      let value3 = this.querySelector(':checked').getAttribute('data-price3')

      if (item1.classList.contains('selected') && item1) {
          shiping = Number(value1)
      } else if (item2.classList.contains('selected') && item2) {
          shiping = Number(value2)
      } else if (item3.classList.contains('selected') && item3) {
          shiping = Number(value3)
      } else {
          shiping = 0
      }

      // console.log(shiping)

      output()
  })
}

order()

function orderForm() {
  const form = document.getElementById('form')
  if (!form) return
  form.addEventListener('submit', function(e) {
    const items = form.querySelectorAll('.intro-form__item')

    items.forEach(item => {
      if (!item.value) {
        e.preventDefault()
        item.style.borderColor = 'red'
        item.style.boxShadow = '0 0 0 0.1rem rgb(220 53 69 / 100%)'

        item.addEventListener('focusin', function() {
          item.style.borderColor = null
          item.style.boxShadow = null
        })
      }
    })
  })
}

orderForm()

const form = document.querySelector('.intro-form')

if (form) {
    form.addEventListener('submit', function(e) {
        
        e.preventDefault()

        const name = document.querySelector('input[data-name]')
        const mail = document.querySelector('input[data-mail]')

        
        if (name.value === '') {
            name.style.borderColor = 'red'
            name.style.boxShadow = '0 0 0 0.1rem rgb(220 53 69 / 100%)'
        }

        if (mail.value === '') {
            mail.style.borderColor = 'red'
            mail.style.boxShadow = '0 0 0 0.1rem rgb(220 53 69 / 100%)'
        }

        name.addEventListener('focusin', function() {
            name.style.borderColor = null
            name.style.boxShadow = null
        })

        mail.addEventListener('focusin', function() {
            mail.style.borderColor = null
            mail.style.boxShadow = null
        })

        
        if (mail.value == '' || name.value == '') {
            return false
        } else {
            
            window.location.href = 'order.html';
        }
       
    })
}


var COUNTRY_SELECT = document.getElementById('country');
var COUNTRY_SELECT_HOME = document.getElementById('country-home');
var STATE = document.getElementById('state');
var INPUTS_HOME_FORM = document.querySelectorAll('#first .intro-form__item');
var HOME_FORM = document.querySelector('#first');
var STORE_FORM = 'formFirst';
var STORE_COUNTRY = 'selected-country';
var STORE_STATE = 'selected-state';
var INPUTS_EL = document.querySelectorAll('form  .intro-form__item');
var API_TOKEN = 'mtbp56YSdFxwOZBR5tMf-LAvKyxtRb1JNKu-RvBidKm_bB0F63thfw7TlUBQR560G-k';
var EMAIL = 'info@biolabrx.com';
var API_URL = 'https://www.universal-tutorial.com/api/';
var JSON_URL = './static/js/json/price.json';

var forms = function () {
    var dataTable = null;
  
    var removeOptions = function removeOptions(selectElement) {
      var i;
      var L = selectElement.options.length - 1;
  
      for (i = L; i >= 0; i -= 1) {
        if (i !== 0) selectElement.remove(i);
      }
    };
  
    var sortComparator = function sortComparator(a, b, comp) {
      if (a[comp[0]] === b[comp[0]]) {
        if (comp.length > 1) {
          return sortComparator(a, b, comp.slice(1));
        }
  
        return 0;
      }
  
      return a[comp[0]] < b[comp[0]] ? -1 : 1;
    };
  
    var loadState = function loadState() {
      var country = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  
      if (country) {
        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', "".concat(API_URL, "states/").concat(country));
        xhttp.setRequestHeader('Authorization', "Norman ".concat(localStorage.getItem('auth_token')));
        xhttp.setRequestHeader('Accept', 'application/json');
  
        xhttp.onload = function () {
          if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
              removeOptions(STATE);
              var response = JSON.parse(xhttp.responseText);
              response.forEach(function (elem) {
                var option = document.createElement('option');
                option.innerHTML = "".concat(elem.state_name);
                option.value = elem.state_name;
                var store = localStorage.getItem(STORE_STATE);
  
                if (store && option.value === JSON.parse(store)) {
                  option.setAttribute('selected', true);
                }
  
                if (STATE) {
                  STATE.appendChild(option);
                }
              });
            }
          }
        };
  
        xhttp.send();
      }
    };
  
    var getTableInfo = function getTableInfo(data) {
      data.forEach(function (elem) {
        var option = document.createElement('option');
        option.innerHTML = "".concat(elem.info.name);
        option.value = elem.id;
        option.dataset.country = elem.info.name;
        var store = localStorage.getItem(STORE_COUNTRY);

        option.dataset.price1 = elem.info.offer1
        option.dataset.price2 = elem.info.offer2
        option.dataset.price3 = elem.info.offer3
  
        if (store && option.value === JSON.parse(store)) {
          option.setAttribute('selected', true);
          loadState(option.dataset.country);
        }
  
        if (COUNTRY_SELECT_HOME) {
          COUNTRY_SELECT_HOME.appendChild(option);
        }
  
        if (COUNTRY_SELECT) {
          COUNTRY_SELECT.appendChild(option);
        }
      });
    };
  
    var loadCountry = function loadCountry() {
      var xhttp = new XMLHttpRequest();
      xhttp.open('GET', JSON_URL);
  
      xhttp.onload = function () {
        if (xhttp.readyState === 4) {
          if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
              dataTable = JSON.parse(xhttp.responseText);
              dataTable.sort(function (a, b) {
                return sortComparator(a, b, ['name']);
              });
              getTableInfo(dataTable);
            }
          }
        }
      };
  
      xhttp.send();
    };
  
    var showSelected = function showSelected() {
      var value = COUNTRY_SELECT[COUNTRY_SELECT.selectedIndex].value;
      loadState(COUNTRY_SELECT[COUNTRY_SELECT.selectedIndex].dataset.country);
      
      // dataTable.forEach(function (elem) {
      //   if (+value === +elem.id) {
      //     document.getElementById('offer1-btn').setAttribute('data-shiping', elem.info.offer1);
      //     document.getElementById('offer2-btn').setAttribute('data-shiping', elem.info.offer2);
      //     document.getElementById('offer3-btn').setAttribute('data-shiping', elem.info.offer3);
      //   } else if (value === 'country') {
      //     document.getElementById('offer1-btn').setAttribute('data-shiping', '0.00');
      //     document.getElementById('offer2-btn').setAttribute('data-shiping', '0.00');
      //     document.getElementById('offer3-btn').setAttribute('data-shiping', '0.00');
      //   }
      // });
    };
  
    var getAccessToken = function getAccessToken() {
      var xhttp = new XMLHttpRequest();
      xhttp.open('GET', "".concat(API_URL, "getaccesstoken"));
      xhttp.setRequestHeader('Accept', 'application/json');
      xhttp.setRequestHeader('api-token', API_TOKEN);
      xhttp.setRequestHeader('user-email', EMAIL);
  
      xhttp.onload = function () {
        if (xhttp.readyState === 4) {
          if (xhttp.status === 200) {
            var response = JSON.parse(xhttp.responseText);
            localStorage.setItem('auth_token', response.auth_token);
          }
        }
      };
  
      xhttp.send();
    };
  
    var formsInit = function formsInit() {
      if (COUNTRY_SELECT) {
        loadCountry();
        COUNTRY_SELECT.addEventListener('change', function () {
          showSelected(COUNTRY_SELECT[COUNTRY_SELECT.selectedIndex].dataset.country);
        });
      }
  
      if (COUNTRY_SELECT_HOME) {
        loadCountry();
        COUNTRY_SELECT_HOME.addEventListener('change', function () {
          loadState(COUNTRY_SELECT_HOME[COUNTRY_SELECT_HOME.selectedIndex].dataset.country);
        });
      }
  
      if (HOME_FORM) {
        HOME_FORM.addEventListener('submit', function (event) {
          event.preventDefault();
          var formValue = {};
          var isInvalidField = 0;
          Array.from(INPUTS_HOME_FORM).forEach(function (input) {
            if (!input.checkValidity()) {
              isInvalidField += 1;
            }
  
            var key = input.attributes.name.value;
            var value = input.value; // eslint-disable-next-line no-return-assign
  
            return formValue[key] = value || null;
          });
  
          if (isInvalidField === 0) {
            localStorage.setItem(STORE_FORM, JSON.stringify(formValue));
  
            if (COUNTRY_SELECT_HOME && COUNTRY_SELECT_HOME[COUNTRY_SELECT_HOME.selectedIndex].value) {
              localStorage.setItem(STORE_COUNTRY, JSON.stringify(COUNTRY_SELECT_HOME[COUNTRY_SELECT_HOME.selectedIndex].value));
            }
  
            if (STATE && STATE[STATE.selectedIndex].value) {
              localStorage.setItem(STORE_STATE, JSON.stringify(STATE[STATE.selectedIndex].value));
            }
  
            HOME_FORM.submit();
          }
        });
      }
  
      var itemsData = JSON.parse(localStorage.getItem(STORE_FORM));
  
      if (INPUTS_EL && itemsData) {
        Array.from(INPUTS_EL).forEach(function (input) {
          Object.keys(itemsData).forEach(function (key) {
            var inputName = input.attributes.name.value;
            var value = itemsData[key]; // eslint-disable-next-line no-return-assign
  
            return inputName === key ? input.value = value : null;
          });
        });
      }
    };
  
    var init = function init() {
      getAccessToken();
      formsInit();
    };

  
    return {
      init: init
    };
  }();

  forms.init()




  function link() {
      const btn = document.querySelector('a.fight-content__btn.btn')
      if (!btn) return
    if(window.matchMedia('(max-width: 768px)').matches){
        btn.setAttribute('href', 'qualify.html') 
    } else {
        btn.setAttribute('href', '#') 
    }
}


window.addEventListener('load', link)
window.addEventListener('resize', link)