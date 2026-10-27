
document.addEventListener("DOMContentLoaded", () => {
  // ===== ELEMENTOS DE LA PÁGINA =====

  const pista = document.querySelector(".pista");
  const botones = document.querySelectorAll(".curva");
  const tarjeta = document.querySelector("#info-curva");

  const numero = document.querySelector("#info-numero");
  const etiqueta = document.querySelector("#info-etiqueta");
  const titulo = document.querySelector("#info-titulo");
  const texto = document.querySelector("#info-texto");
  const codigo = document.querySelector("#info-codigo");

  // Evitar errores si falta algún elemento del HTML
  if (
    !pista ||
    !tarjeta ||
    !numero ||
    !etiqueta ||
    !titulo ||
    !texto ||
    !codigo ||
    botones.length === 0
  ) {
    console.error("No se encontraron todos los elementos del circuito.");
    return;
  }

  // ===== INFORMACIÓN DE CADA CURVA =====

  const curvas = [
    {
      numero: "CURVA 01",
      etiqueta: "PRESENTACIÓN DEL PILOTO",
      titulo: "¿Quién soy?",
      texto:
        "Soy Agostina, estudiante de Diseño Gráfico en UADE. Curiosa, organizada y detallista, disfruto explorar nuevas formas de crear y comunicar ideas. Me gusta combinar lo analógico y lo digital para encontrar mi propia manera de diseñar.",
      codigo: "AM / PROFILE"
    },
    {
      numero: "CURVA 02",
      etiqueta: "FORMACIÓN",
      titulo: "Mi recorrido",
      texto:
        "2022 – Actualidad: Licenciatura en Diseño Gráfico, UADE. 2021: Curso de Marketing Digital en Capacitarte. 2020: Bachillerato con orientación en Economía y Gestión de las Organizaciones.",
      codigo: "AM / EDUCATION"
    },
    {
      numero: "CURVA 03",
      etiqueta: "EQUIPAMIENTO DE FÁBRICA",
      titulo: "Mis herramientas",
      texto:
        "Trabajo con Illustrator, Photoshop, InDesign, Fresco y Figma. Me interesan la ilustración, la composición, la tipografía, la edición de imagen y la creación de contenido para redes sociales.",
      codigo: "AM / TOOLKIT"
    },
    {
      numero: "CURVA 04",
      etiqueta: "EXPERIENCIA EN PISTA",
      titulo: "Mi recorrido profesional",
      texto:
        "Trabajé en identidad visual, branding y gestión de redes para Lei Kawsay y Tina Cosmetics. También desarrollé contenido y piezas gráficas para Librería Oeste y Librería Atalaya.",
      codigo: "AM / EXPERIENCE"
    },
    {
      numero: "CURVA 05",
      etiqueta: "MÉTODO DE CONDUCCIÓN",
      titulo: "Cómo trabajo",
      texto:
        "Investigo, organizo, experimento y ajusto. Me gusta cuidar los detalles y trabajar con método, pero dejando espacio para probar nuevos caminos. Cada proyecto necesita encontrar su propia trazada.",
      codigo: "AM / SETUP"
    }
  ];

  // ===== POSICIONAR LA TARJETA =====

 
function posicionarTarjeta(boton, indice) {
  const esMovil = window.matchMedia("(max-width: 700px)").matches;

  const pistaRect = pista.getBoundingClientRect();
  const botonRect = boton.getBoundingClientRect();

  const anchoPista = pista.clientWidth;
  const altoPista = pista.clientHeight;

  const anchoTarjeta = tarjeta.offsetWidth;
  const altoTarjeta = tarjeta.offsetHeight;

  const centroX =
    botonRect.left - pistaRect.left + botonRect.width / 2;

  const centroY =
    botonRect.top - pistaRect.top + botonRect.height / 2;

  let izquierda;
  let arriba;

  // En móvil: tarjeta centrada debajo del número.
  if (esMovil) {
    izquierda = (anchoPista - anchoTarjeta) / 2;
    arriba = centroY + botonRect.height / 2 + 20;
  } else {
    // Orden personalizado de los lados:
    // 01 derecha, 02 izquierda, 03 izquierda,
    // 04 derecha, 05 izquierda.
    const lados = [
      "derecha",
      "izquierda",
      "izquierda",
      "derecha",
      "izquierda"
    ];

    const lado = lados[indice] || "derecha";
    const espacio = 24;

    // Posicionar respetando el lado asignado.
    if (lado === "derecha") {
      izquierda = centroX + botonRect.width / 2 + espacio;

      // Si no entra a la derecha, colocarla a la izquierda.
      if (izquierda + anchoTarjeta > anchoPista - 12) {
        izquierda = centroX - botonRect.width / 2
          - espacio - anchoTarjeta;
      }
    } else {
      izquierda = centroX - botonRect.width / 2
        - espacio - anchoTarjeta;

      // Si no entra a la izquierda, colocarla a la derecha.
      if (izquierda < 12) {
        izquierda = centroX + botonRect.width / 2 + espacio;
      }
    }

    // Evitar que se salga horizontalmente.
    izquierda = Math.max(
      12,
      Math.min(izquierda, anchoPista - anchoTarjeta - 12)
    );

    // Alinear verticalmente con el número.
    arriba = centroY - altoTarjeta / 2;
  }

  // Evitar que se salga verticalmente de la pista.
  arriba = Math.max(
    12,
    Math.min(arriba, altoPista - altoTarjeta - 12)
  );

  tarjeta.style.left = `${izquierda}px`;
  tarjeta.style.top = `${arriba}px`;
  tarjeta.style.transform = "none";

  tarjeta.classList.toggle(
    "derecha",
    !esMovil && indice % 5 === 0
      || !esMovil && indice % 5 === 3
  );

  tarjeta.classList.toggle(
    "izquierda",
    !esMovil && (
      indice % 5 === 1 ||
      indice % 5 === 2 ||
      indice % 5 === 4
    )
  );
}


  // ===== CAMBIAR DE CURVA =====

  function seleccionarCurva(boton) {
    const indice = Number(boton.dataset.curva);
    const datos = curvas[indice];

    if (!datos) return;

    // Actualizar la información de la tarjeta.
    numero.textContent = datos.numero;
    etiqueta.textContent = datos.etiqueta;
    titulo.textContent = datos.titulo;
    texto.textContent = datos.texto;
    codigo.textContent = datos.codigo;

    // Activar solamente el número seleccionado.
    botones.forEach((otroBoton) => {
      const seleccionado = otroBoton === boton;

      otroBoton.classList.toggle("activa", seleccionado);
      otroBoton.setAttribute(
        "aria-pressed",
        String(seleccionado)
      );
    });

    // Primero se actualiza el texto y después se calcula
    // la posición usando el tamaño real de la tarjeta.
    requestAnimationFrame(() => {
      posicionarTarjeta(boton, indice);
    });
  }

  // ===== EVENTOS DE LOS NÚMEROS =====

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      seleccionarCurva(boton);
    });
  });

  // Recalcular la posición si cambia el tamaño de pantalla.
  window.addEventListener("resize", () => {
    const botonActivo = document.querySelector(".curva.activa");

    if (botonActivo) {
      requestAnimationFrame(() => {
        posicionarTarjeta(
          botonActivo,
          Number(botonActivo.dataset.curva)
        );
      });
    }
  });

  // Mostrar la primera curva al entrar.
  const primeraCurva =
    document.querySelector('.curva[data-curva="0"]') || botones[0];

  seleccionarCurva(primeraCurva);
});

/* MENÚ PRINCIPAL */

const btnMenu = document.querySelector("#btnMenu");
const mainNav = document.querySelector("#mainNav");
const scrim = document.querySelector("#scrim");

if (btnMenu && mainNav) {
  function cerrarMenu() {
    mainNav.classList.remove("is-open");
    btnMenu.setAttribute("aria-expanded", "false");
    btnMenu.setAttribute("aria-label", "Abrir menú");

    if (scrim) {
      scrim.hidden = true;
    }
  }

  function abrirMenu() {
    mainNav.classList.add("is-open");
    btnMenu.setAttribute("aria-expanded", "true");
    btnMenu.setAttribute("aria-label", "Cerrar menú");

    if (scrim) {
      scrim.hidden = false;
    }
  }

  btnMenu.addEventListener("click", () => {
    const estaAbierto = mainNav.classList.contains("is-open");

    if (estaAbierto) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });

  if (scrim) {
    scrim.addEventListener("click", cerrarMenu);
  }

  mainNav.querySelectorAll("a").forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      cerrarMenu();
    }
  });
}
