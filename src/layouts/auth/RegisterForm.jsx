import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import Navbar from "../components/Navbar";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);
  const toast = useRef(null);

  const initialValues = {
    nombre: "",
    email: "",
    password: "",
    edad: null,
    role: "cliente",
  };

  const validationSchema = Yup.object({
    nombre: Yup.string().required("Campo requerido"),
    email: Yup.string().email("Email inválido").required("Campo requerido"),
    password: Yup.string()
      .min(6, "Mínimo 6 caracteres")
      .required("Campo requerido"),
    edad: Yup.number()
      .min(1, "La edad debe ser mayor a 0")
      .required("Campo requerido"),
    role: Yup.string().required("Campo requerido"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const dataToSend = {
      nombre: values.nombre,
      email: values.email,
      contrasenia: values.password,
      edad: values.edad,
      role: values.role,
    };
    try {
      await register(dataToSend);
      resetForm();
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Usuario registrado correctamente",
        life: 3000,
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Credenciales inválidas",
        life: 3000,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <Toast ref={toast} />

      <div className="flex justify-center items-center flex-1 p-6">
        <Card
          title="Registrarse"
          className="shadow-lg w-full max-w-md"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ handleChange, values }) => (
              <Form className="flex flex-col gap-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block mb-1 font-semibold">
                    Nombre
                  </label>
                  <InputText
                    id="nombre"
                    name="nombre"
                    className="w-full"
                    value={values.nombre}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="nombre"
                    component="small"
                    className="p-error block"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block mb-1 font-semibold">
                    Email
                  </label>
                  <InputText
                    id="email"
                    name="email"
                    className="w-full"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    name="email"
                    component="small"
                    className="p-error block"
                  />
                </div>

                {/* Contraseña */}
                <div>
                  <label htmlFor="password" className="block mb-1 font-semibold">
                    Contraseña
                  </label>
                  <Password
                    id="password"
                    name="password"
                    className="w-full"
                    value={values.password}
                    onChange={handleChange}
                    toggleMask
                    feedback={false}
                  />
                  <ErrorMessage
                    name="password"
                    component="small"
                    className="p-error block"
                  />
                </div>

                {/* Edad */}
                <div>
                  <label htmlFor="edad" className="block mb-1 font-semibold">
                    Edad
                  </label>
                  <InputNumber
                    id="edad"
                    name="edad"
                    className="w-full"
                    value={values.edad}
                    onValueChange={(e) =>
                      handleChange({ target: { name: "edad", value: e.value } })
                    }
                  />
                  <ErrorMessage
                    name="edad"
                    component="small"
                    className="p-error block"
                  />
                </div>

                {/* Rol */}
                <div>
                  <label htmlFor="role" className="block mb-1 font-semibold">
                    Rol
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="cliente">Cliente</option>
                    <option value="moderador">Moderador</option>
                    <option value="admin">Admin</option>
                  </select>
                  <ErrorMessage
                    name="role"
                    component="small"
                    className="p-error block"
                  />
                </div>

                {/* Botón */}
                <Button
                  type="submit"
                  label="Registrarse"
                  className="w-full mt-4"
                />
              </Form>
            )}
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default RegisterForm;
