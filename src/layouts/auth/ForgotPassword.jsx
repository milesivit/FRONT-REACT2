import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import Navbar from "../components/Navbar";

const ForgotPassword = () =>{
    
    const {forgotPassword} = useContext(AuthContext)
    const [loading, setLoading] = useState(false);

    const ForgotSchema = Yup.object({
        email: Yup.string().email('email invalido').required('el email es obligatorio')
    })

    return(
        <div>
            <Navbar />
            <Card title='recuperar contrasenia'>
                <p>ingresa tu email y te enviaremos un enlace de recuperacion</p>
    
                <Formik 
                initialValues={{email:''}}
                validationSchema={ForgotSchema}
                onSubmit={async(values, {resetForm})=>{
                    setLoading(true)
                    const response = await forgotPassword(values.email)
                    if(response) resetForm()
                    setLoading(false)
                }}
                >
                    <Form>
                        <label>
                            email
                        </label>
                        <Field name='email'>
                            {({ field }) => (
                                <InputText id="email" {...field} placeholder="ejemplo@gmail.com" />
                            )}
                        </Field>
    
                        <ErrorMessage name="email"/>
    
                        <Button
                        type="submit"
                        label="enviar email"
                        icon={loading ? "pi pi-spin pi-spinner" : "pi pi-send"}
                        ></Button>
                    </Form>
                </Formik>
            </Card>
            
        </div> 
)}

export default ForgotPassword

