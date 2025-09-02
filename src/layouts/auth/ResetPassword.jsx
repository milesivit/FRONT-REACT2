import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";


const ResetPassword = () =>{
    const resetSchema = Yup.object({
        password: Yup.string(6, 'minimo 6 caracteres').required("la contraseña es requerida"),
        confirm: Yup.string().oneOf([Yup.ref("password")], "las contraseñas no coinciden").required("repetir la contra papa")
    })
    
    const {ResetPassword} = useContext(AuthContext)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [params, setParams] = useState({token: '', id:''})

    console.log(window.location.search)

    useEffect(()=>{
        const url= new URLSearchParams(window.location.search)
        setParams({token: url.get("token")||"", id: url.get('id') || ''})
        console.log(url);
    }, [])

    const invalidLink = !params.token || !params.id

    return(
        <Card title='nueva contra'>
            {invalidLink ? <h5>Enlace invalido o incompleto</h5> : 
                <Formik>
                    
                </Formik>
            }
        </Card>
    )

}

export default ResetPassword

