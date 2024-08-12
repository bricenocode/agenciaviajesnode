import { Viaje } from "../models/Viaje.js";
import { Testimonial } from "../models/Testimoniales.js";


const paginaInicio =async (req, res) => {

    //Consultar 3 vaijes del modelo Viaje
    const promiseDB = []
    
    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));
    

    try {
        const resultado = await Promise.all(promiseDB);
        
        res.render('inicio', {
        pagina:'Inicio',
        clase: 'home',
        viajes: resultado[0],
        testimoniales: resultado[1]
    });
    } catch (error) {
        console.log(error)
    }
}

const paginaNosotros = (req, res) => {//req - Lo que enviamos, res - lo que express nos responde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes =  async (req, res) => {//req - Lo que enviamos, res - lo que express nos responde
    //Consulta BD
    const viajes = await Viaje.findAll();
    console.log(viajes)

    res.render('viajes', {
        pagina: 'Proximos viajes',
        viajes
    });
}

//Muesta un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const {viaje} = req.params
    try {
        const resultado = await Viaje.findOne({where: {slug: viaje}});

        res.render('viaje', {
            pagina: 'Información de viaje',
            resultado
        })
    } catch (error) {
        console.log(error)
    }
}

const paginaTestimoniales = async(req, res) => {//req - Lo que enviamos, res - lo que express nos responde
    try{
        const testimoniales = await Testimonial.findAll();
        res.render('testimoniales', {
        pagina: 'Testimoniales',
        testimoniales
        });
    }catch(error){
        console.log(error)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}