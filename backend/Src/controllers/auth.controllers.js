import { pool } from "../db.js";
import bcrypt from 'bcrypt';
import { generateToken } from "../libs/jwt.js"; 

export const getUsers = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);  // Enviar los resultados como JSON
    } catch (error) {
       
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


export const loginUser  = async (req, res) => {
   try {
    const { email, password } = req.body;
   
    // 1. Verificar si el usuario existe en la base de datos
    const { rows } = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
 
    const user = rows[0];
    if (rows.length === 0) {
        // Si no existe el usuario
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      

      //  Compara la contraseña ingresada con la almacenada (hasheada)
      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        // Si la contraseña no coincide
        return res.status(401).json({ message: "La contraseña es incorrecta" });
      }

       //  Generar un token JWT
    const token = generateToken(user);
    res.cookie('token',token)
    
    return res.json({ token, user: { id: user.id, name: user.name, gmail: user.email, role: user.role } });
   } catch (error) {
    console.error("Error en el login", error);
    return res.status(500).json({ message: "error en el servidor" })
   }
};

export const createUser = async (req, res) => {
    try {
      const data = req.body;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      const { rows } = await pool.query(
        "insert into users(name,email,password) values ($1,$2,$3) RETURNING*",
        [data.name, data.email , hashedPassword]
      );
    //   return res.json(rows[0],); edit down
    // Retorno el usuario creado (sin la contraseña)
    const user = { ...rows[0], password: undefined };
    return res.status(201).json(user);
    } catch (error) {
      //console.log(error);
      if (error?.code ==="23505"){
          return res.status(409).json({message:"email already exists"})
      }
      return res.status(500).json({ message: "internal server error" });
    }
  };

//para quitar el token
  export const logout = (req,res)=>{
    res.cookie('token',"",{expires:new Date(0)})
    return res.sendStatus(200);
}