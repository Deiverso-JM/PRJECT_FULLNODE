import mongoose from "mongoose";
import generarId from "../helpers/generarID.js";
import bcrypt from 'bcrypt'



const pacientesSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true
    },
    propietario: {
        type: String,
        require: true

    },
    fechaAlta:{
        type: Date,
        require: true,
        default: Date.now(),
    },
    sintomas: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
    },
    veterinario:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Veterinario",
    }
},{
    timestamps: true
})


const Paciente = mongoose.model("Paciente", pacientesSchema)
export default Paciente;