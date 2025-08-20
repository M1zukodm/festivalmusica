document.addEventListener('DOMContentLoaded', function(){
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
})


function navegacionFija(){
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const headerPlaceholder = document.querySelector('.header-placeholder');

    window.addEventListener('scroll', function(){
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
            if (headerPlaceholder) {
                headerPlaceholder.style.display = 'block';
            }
        } else {
            header.classList.remove('fixed');
            if (headerPlaceholder) {
                headerPlaceholder.style.display = 'none';
            }
        }
    });
}

function crearGaleria(){
     const galeria=document.querySelector('.galeria-imagenes');

     const cantidad=16;

     for(let i=1; i<=cantidad; i++){
        const imagen= document.createElement('img');
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt='Imagen de Galeria';

        //Even handler
        imagen.onclick = function() {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen);
     }
      
}

function mostrarImagen(i){
     const imagen= document.createElement('img');
        imagen.src = `src/img/gallery/full/${i}.jpg`
        imagen.alt='Imagen de Galeria';

    //Generar modal
    const modal =document.createElement('div');
    modal.classList.add('modal');
    modal.onclick= cerrarModal;

    //Boton cerrrar
    const cerrarModalBtn= document.createElement('button');
    cerrarModalBtn.textContent= 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick= cerrarModal;

    
    modal.appendChild(imagen);
    modal.appendChild(cerrarModalBtn);

    //Agregarlo al HTML
    const body =document.querySelector('body');
    body.classList.add('overflow-hidden');
    body.appendChild(modal);


}

function cerrarModal(){
    const modal= document.querySelector('.modal');
    modal.classList.add('fade-out');
    
    setTimeout(() =>{
         modal?.remove();

         const body =document.querySelector('body');
    body.classList.remove('overflow-hidden');
    },500);
   
}

function resaltarEnlace(){
    document.addEventListener('scroll', function(){
        const sections= document.querySelectorAll('section');
        const navLinks= document.querySelectorAll('.navegacion-principal a');

        let actual = '';
        sections.forEach(section =>{

            const sectionTop= section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(window.scrollY >=(sectionTop - sectionHeight/ 3)){
                actual= section.id;
            }
        })

        navLinks.forEach(link =>{
            link.classList.remove('active');
          if(link.getAttribute('href') === '#' + actual){
            link.classList.add('active');
          }  
        })
    })
}

function scrollNav(){
    const navLinks= document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach(link =>{
        link.addEventListener('click', e =>{
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section= document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'});
        })
    })
}