import Express  from "express";
import connectDB from './config/db.js'
import dotnev from 'dotenv'
import veterinarioRoutes from "./routes/veterinarioRoutes.js"
import pacienteRoutes from "./routes/pacienteRoutes.js"
import Cors from 'cors'

const app = Express();
app.use(Express.json())
dotnev.config();
connectDB()

const dominiosPermitidos = [process.env.FRONTEND_URL]


const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
            //El origen esta permitido
            callback(null,true)

        }else{
            callback(new Error('No permitido por CORS'))
        }
    }
}

app.use(Cors(corsOptions))

app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)


const port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log(`Funcionando en el puerto ${port}`)
})
