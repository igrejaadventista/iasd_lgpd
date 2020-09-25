function montaElementos(textos) {
  console.log(textos);
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
  console.log(navigator.language);
  if (/^es\b/.test(navigator.language)) {
    var textos = {
      text_paragrafo:
        "Utilizamos cookies y otras tecnologías similares para mejorar su experiencia en nuestros servicios, personalizar la publicidad y recomendar contenido que le interese. Al utilizar nuestros servicios, usted da su consentimiento para dicha supervisión. Conoce nuestra pagina ",
      texto_link: "Política de privacidad",
      link:
        "https://www.adventistas.org/es/institucional/organizacion/politica-de-privacidad-de-datos-de-la-iglesia-adventista-del-septimo-dia/",
      texto_botao: "Aceptar",
    };
  } else {
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
