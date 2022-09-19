var style = ".pa-box{position:fixed;right:0;bottom:0;left:0;z-index:20000000;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);background-color:rgb(0 37 77 / 85%);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.pa-none{display:none}.pa-container{width:100%;max-width:1140px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding-top:1rem;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin-right:1rem;margin-left:1rem}.pa-btn{display:block;width:100%;padding:.5rem 1rem;font-size:1.06rem;line-height:1.5;border-radius:.3rem;color:#212529;background-color:#e0a800;border-color:#d39e00;-webkit-box-shadow:0 0 0 .2rem rgba(222,170,12,.5);box-shadow:0 0 0 .2rem rgba(222,170,12,.5);font-weight:400;text-align:center;vertical-align:middle;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;border:1px solid transparent;-webkit-transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;-o-transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out;margin-bottom:1rem;text-transform:uppercase;font-weight:700}.pa-paragraph{color:#fff;font-size:.75rem;font-weight:300;line-height:1.5;text-align:left;margin-bottom:1rem}.pa-link{color:#fff;text-decoration:underline}@media (min-width:992px){.pa-container{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.pa-btn,.pa-paragraph{margin-right:15px;margin-left:15px}}";
function montaElementos(textos) {
  var box = document.createElement("div");
  box.className = "pa-box pa-none";
  box.id = "pa-cookies";

  var container = document.createElement("div");
  container.className = "pa-container";

  var p = document.createElement("p");
  p.className = "pa-paragraph";

  var button = document.createElement("button");
  button.className = "pa-btn";
  button.addEventListener("click", getDomain);

  var a = document.createElement("a");
  a.className = "pa-link";
  a.href = textos.link;
  a.target = "_blank";

  var texto = document.createTextNode(textos.text_paragrafo);

  var texto_link = document.createTextNode(textos.texto_link);

  var texto_btn = document.createTextNode(textos.texto_botao);

  p.appendChild(texto);
  button.appendChild(texto_btn);
  a.appendChild(texto_link);

  p.appendChild(a);
  p.appendChild(document.createTextNode("."));
  container.appendChild(p);
  container.appendChild(button);

  box.appendChild(container);

  document.body.appendChild(box);
}

function checkCookie() {
  var valor = getCookie("iasd_privacidade");

  if (valor != "") {
    //console.log('Tem cookies');

    var element = document.getElementById("pa-cookies");
    element.classList.add("pa-none");

    return true;
  } else {
    // console.log('Não tem cookies');

    var element = document.getElementById("pa-cookies");
    element.classList.remove("pa-none");

    return false;
  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(dominio) {
  var cname = "iasd_privacidade";
  var cvalue = true;
  var exdays = 30;
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  var final =
    cname + "=" + cvalue + ";" + expires + ";path=/;domain=" + dominio + ";";
  document.cookie = final;
}

function getDomain() {
  var i = 0;
  var domain = document.domain;
  var p = domain.split(".");

  while (i < p.length - 1) {
    domain = p.slice(-1 - ++i).join(".");
    //console.log(domain);

    if (checkCookie()) {
      break;
    } else {
      setCookie(domain);
      if (checkCookie()) {
        break;
      }
    }
  }
}

function getLanguage() {
  if (document.querySelector("html").getAttribute("lang")) {
    var lg = document.querySelector("html").getAttribute("lang").substr(0, 2);
  } else if (document.querySelector("meta[property='og:locale']")) {
    var lg = document
      .querySelector("meta[property='og:locale']")
      .getAttribute("content")
      .substr(0, 2);
  } else {
    var lg = navigator.language.substr(0, 2);
  }

  switch (lg) {
    case "es":
      var textos = {
        text_paragrafo:
          "Utilizamos cookies y otras tecnologías similares para mejorar su experiencia en nuestros servicios, personalizar la publicidad y recomendar contenido que le interese. Al utilizar nuestros servicios, usted da su consentimiento para dicha supervisión. Conoce nuestra pagina ",
        texto_link: "Política de privacidad",
        link:
          "https://www.adventistas.org/es/institucional/organizacion/politica-de-privacidad-de-datos-de-la-iglesia-adventista-del-septimo-dia/",
        texto_botao: "Aceptar",
      };

      break;
    default:
      var textos = {
        text_paragrafo:
          "Nós usamos cookies e outras tecnologias semelhantes para melhorar a sua experiência em nossos serviços, personalizar publicidade e recomendar conteúdo de seu interesse. Ao utilizar nossos serviços, você concorda com tal monitoramento. Conheça nossa página de ",
        texto_link: "Política de privacidade",
        link:
          "https://www.adventistas.org/pt/institucional/organizacao/politica-de-privacidade-de-dados-da-igreja-adventista-do-setimo-dia/",
        texto_botao: "Aceitar",
      };
  }

  return textos;
}

function setStyles(valores) {
  var style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = valores;
  document.getElementsByTagName("head")[0].appendChild(style);
}

function carrega(valores) {
  setStyles(valores);
  montaElementos(getLanguage());
  checkCookie();
}

window.onload = carrega(style);
