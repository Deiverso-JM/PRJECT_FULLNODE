import Express  from "express";
import connectDB from './config/db.js'
import dotnev from 'dotenv'
import veterinarioRoutes from "./routes/veterinarioRoutes.js"
import pacienteRoutes from "./routes/pacienteRoutes.js"

const app = Express();
app.use(Express.json())
dotnev.config();
connectDB()


app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)


const port = process.env.PORT || 4000

app.listen(port, ()=>{
    console.log(`Funcionando en el puerto ${port}`)
})
