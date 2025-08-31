import { useContext, useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { InputText } from "primereact/inputtext"
import { Password } from 'primereact/password';
import { Card } from "primereact/card"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import Navbar from "../components/Navbar";
        
const LoginForm = () =>{

    const { login } = useContext(AuthContext)
    const toast = useRef(null)

    const initialValuesUser = {
        email:'',
        password:''
    }

    const validationSchemaUser = Yup.object({
        email: Yup.string().email('Email invalido').required('Campo requerido'),
        password: Yup.string().required('Campo requerido')
    }) 

    const onSubmitLogin = async (values) =>{
        try {
            await login(values)
            
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Credenciales inválidas',
                life: 3000
            })
        }
    }

    return(
        <div>
            <Navbar /> 
            {/* Toast global */}
            <Toast ref={toast} />

            <Card title='Iniciar sesión'>
                <Formik 
                    initialValues={initialValuesUser} 
                    validationSchema={validationSchemaUser} 
                    onSubmit={onSubmitLogin}
                >
                {({handleChange, values})=>(
                    <Form>
                        <label>Email</label>
                        <InputText name='email' value={values.email} onChange={handleChange}/>
                        <span className="text-danger"> <ErrorMessage name='email' /> </span>
                        
                        <label>Contraseña</label> 
                        <Password name='password' value={values.password} onChange={handleChange} toggleMask />
                        <span className="text-danger"> <ErrorMessage name='password' /> </span>
                        
                        <Button label='Iniciar sesión' type='submit' className="mt-3"/>
                    </Form>
                )}
                </Formik>
            </Card>
        </div>
    )
}

export default LoginForm
