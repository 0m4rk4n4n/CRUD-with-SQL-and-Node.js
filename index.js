import express from "express"
import mysql from "mysql"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
dotenv.config()
const app=express()
app.use(express.json())
app.use(cors())
app.use(morgan("common"))
const db=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:process.env.DBK3Y,
        database:"test"
    })

    app.get("/",(req,res)=>
    {
        db.query("SELECT * FROM book",(err,data)=>
        {
            if(err)
            return res.json(err)
            else
            res.json(data)
        })
    })
    app.post("/post",(req,res)=>
    {
        const q="INSERT INTO book(title,description,cover) VALUES(?)"
        const values=[req.body.title,req.body.description,req.body.cover]
        db.query(q,[values],(err,data)=>
        {
            err? res.json(err) : res.json(data)
        })
    })
    app.put("/books/update/:id",(req,res)=>
    {
        const bookId=req.params.id
        const q="UPDATE book SET title= ?, description = ? , cover= ? WHERE id = ?"
        const values=
        [
            req.body.title,
            req.body.description,
            req.body.cover
        ]
        db.query(q,[...values,bookId],(err,data)=>
        {
            err ? res.json(err) : res.json("Book has been updated successfully")
        })
    })
    app.delete("/books/delete/:id",(req,res)=>
    {
        const bookId=req.params.id
        const q=`DELETE FROM book WHERE id= ?`
        db.query(q,[bookId],(err,data)=>
        {
err ? res.json(err) : res.json("Book has been deleted successfully!")
        })
    })
app.listen(8000,()=>
{
    console.log(`Server is listening on port 8000`)
})