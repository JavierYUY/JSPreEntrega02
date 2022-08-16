/*
let consultorioAgenda = {
    dia : '',
    horario : '',
    nombreReserva : '',
    celular : '',
    consultorio : {
        Metatron : false,
        Mercabha : false,
        VesicaPisis : false
    }
}*/

let agenda;

function prepararAgenda(){
    if(agenda != null){
        agenda = JSON.parse(localStorage.getItem('agenda'));
        console.log('agenda recuperada')
    }else{
        agenda = [
            {'dia': 'lunes', 'maniana': false, 'tarde': false},
            {'dia': 'martes', 'maniana': false, 'tarde': false},
            {'dia': 'miercoles', 'maniana': false, 'tarde': false},
            {'dia': 'jueves', 'maniana': false, 'tarde': false},
            {'dia': 'viernes', 'maniana': false, 'tarde': false}
        ]
        console.log('agenda creada')
    }
}

function agendarDia(dia, man, tar){
    this.agendaDia = dia;
    this.agendaManiana = man;
    this.agendaTarde = tar;
    
    if(this.agendaManiana == true){
        switch(this.agendaDia){
            case 'lunes':
                agenda[0].maniana = true;
                break;
            case 'martes':
                agenda[1].maniana = true;
                break;
            case 'miercoles':
                agenda[2].maniana = true;
                break;
            case 'jueves':
                agenda[3].maniana = true;
                break;
            case 'viernes':
                agenda[4].maniana = true;
                break;
            default:
                break;
        }
    }
    
    if(this.agendaTarde == true){
        switch(this.agendaDia){
            case 'lunes':
                agenda[0].tarde = true;
                break;
            case 'martes':
                agenda[1].tarde = true;
                break;
            case 'miercoles':
                agenda[2].tarde = true;
                break;
            case 'jueves':
                agenda[3].tarde = true;
                break;
            case 'viernes':
                agenda[4].tarde = true;
                break;
            default:
                break;
        }
    }
}

let hora = "";
let diaSeleccionado = '';
let divSeleccionado;

function divBotonDia(elDia){
    //e.preventDefault(); //frena el formulario
    prepararAgenda();

    console.log(agenda);
    let mani = false;
    let tard = false;
    //diaSeleccionado  = agenda.find(a => a.dia = elDia);

    switch(elDia){
        case 'lunes':
            diaSeleccionado = agenda[0];
            divSeleccionado = document.querySelector('#divLunes');
            //divSeleccionado = document.getElementById('divLunes');
            break;
        case 'martes':
            diaSeleccionado = agenda[1];
            divSeleccionado = document.querySelector('#divMartes');
            break;
        case 'miercoles':
            diaSeleccionado = agenda[2];
            divSeleccionado = document.querySelector('#divMiercoles');
            break;
        case 'jueves':
            diaSeleccionado = agenda[3];
            divSeleccionado = document.querySelector('#divJueves');
            break;
        case 'viernes':
            diaSeleccionado = agenda[4];
            divSeleccionado = document.querySelector('#divViernes');
            break;
        default:
            break;
    }
    
    this.mani = diaSeleccionado.maniana;
    this.tard = diaSeleccionado.tarde;

    console.log(this.mani + ' ' + this.tard)

    if(this.mani == false || this.tard == false){
        divSeleccionado.innerHTML = `
            <div class="divHorarios">`;

        if(!this.mani){
            divSeleccionado.innerHTML += `<div class="disponible" id="divManiana" onclick="botonHorario('${elDia}','mañana')" >Mañana</div>`;
        }else{
            divSeleccionado.innerHTML += `<div class="ocupado" id="divManiana">Mañana</div>`;
        }

        if(!this.tard){
            divSeleccionado.innerHTML += `<div class="disponible" id="divTarde" onclick="botonHorario('${elDia}','tarde')">Tarde</div>`;
        }else{
            divSeleccionado.innerHTML += `<div class="ocupado" id="divTarde">Tarde</div>`;
        }

        divSeleccionado.innerHTML += `</div>`;
        //hora = prompt("Ingrese hora de la reserva (mañana - tarde)");
    }else{
        divSeleccionado.innerHTML = `
        <div class="divHorarios">
            <div class="ocupado" id="divManiana">Mañana</div>
            <div class="ocupado" id="divTarde">Tarde</div>
        </div>`;
        alert("El dia ya está ocupado");
    }
}

function botonHorario(elDia, hora){
    console.log('botonHorario ' + hora);

    if (hora == "mañana") {
        if (this.mani == false) {
            if(this.tard == false){
                console.log('tarde false 1')
                agendarDia(elDia, true, false);
                colorearBoton(elDia, 'yellow');
            }else{
                console.log('tarde true 1')
                agendarDia(elDia, true, true);
                colorearBoton(elDia, 'red')
            }

            alert("Reserva Aceptada");
        }else{
            alert("Horario Ocupado, por favor ingrese otro horario");
        }
    }else if(hora == "tarde"){
        if (this.tard == false) {
            if(this.mani == false){
                console.log('mani false 2')
                agendarDia(elDia, false, true);
                colorearBoton(elDia, 'yellow');
            }else{
                console.log('mani true 2')
                agendarDia(elDia, true, true);
                colorearBoton(elDia, 'red')
            }

            alert("Reserva Aceptada");
        }else{
            alert("Horario Ocupado, por favor ingrese otro horario")
        }
    }

    localStorage.setItem('agenda', JSON.stringify(agenda));
}

function colorearBoton(dia, color){
    let boton;
    switch (dia){
        case "lunes":
            boton = document.getElementById('divLunes')
            boton.style.backgroundColor = color;
            break;
        case "martes":
            boton = document.getElementById('divMartes')
            boton.style.backgroundColor = color;
            break;
        case "miercoles":
            boton = document.getElementById('divMiercoles')
            boton.style.backgroundColor = color;
            break;
        case "jueves":
            boton = document.getElementById('divJueves')
            boton.style.backgroundColor = color;
            break;
        case "viernes":
            boton = document.getElementById('divViernes')
            boton.style.backgroundColor = color;
            break;
        default: 
            break;
    }
}
