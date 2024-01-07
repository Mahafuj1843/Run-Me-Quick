import app from "./app.js"
import { connected } from './config/db.js'
const PORT=process.env.PORT || 8081;
app.listen(PORT, ()=>{
    connected();
    console.log(`Server is running at port ${PORT}`)
})

