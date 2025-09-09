import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


const ResetPassword = () =>{
    const resetSchema = Yup.object({
        password: Yup.string().min(6, 'mínimo 6 caracteres').required("la contraseña es requerida"),
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
        <div>
            <Navbar />
            <Card title='nueva contra'>
                {invalidLink ? <h5>Enlace invalido o incompleto</h5> : 
                
                    <Formik
                        initialValues={{password: '', confirm:''}}
                        validationSchema={resetSchema}
                        onSubmit={async(values, {resetForm}) =>{
                            setLoading(true)
                            const response = await ResetPassword({
                                id: params.id,
                                token: params.token,
                                password: values.password
                            })
                            if(response){
                                resetForm()
                                navigate('/inicio-sesion')
                            }
                        setLoading(false)
                        }}
                    >
                        {({values, handleChange, handleBlur})=>(
                            <Form>
                                <label>Nueva contraseña</label>
                                <Password
                                    id= 'password'
                                    name= 'password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    feedback={false}
                                    placeholder='nueva contraseña'
                                />
                                <ErrorMessage name="password"/>

                                <label>Repetir contraseña</label>
                                <Password
                                    id= 'confirm'
                                    name= 'confirm'
                                    value={values.confirm}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    feedback={false}
                                    placeholder='Repetir contraseña'
                                />
                                <ErrorMessage name="confirm"/>

                                <Button
                                    type="submit"
                                    label="Guardar contraseña"
                                    icon={loading ? "pi pi-spin pi-spinner" : "pi pi-send"}
                                />
                            </Form>
                        )}
                    </Formik>
                }
            </Card>

        </div>
    )

}

export default ResetPassword

