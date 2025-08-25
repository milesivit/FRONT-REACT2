import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Password } from "primereact/password";
import { Card } from "primereact/card";

const RegisterForm = () => {
  const { register } = useContext(AuthContext);

  const initialValues = {
    nombre: "",
    email: "",
    password: "",
    edad: null,
    role: "cliente", // valor inicial
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
    await register(dataToSend);
    resetForm();
  };

  return (
    <Card title="Registrarse">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, values }) => (
          <Form>
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              name="nombre"
              value={values.nombre}
              onChange={handleChange}
            />
            <ErrorMessage name="nombre" component="div" />

            <label htmlFor="email">Email</label>
            <InputText
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <ErrorMessage name="email" component="div" />

            <label htmlFor="password">Contraseña</label>
            <Password
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              toggleMask
              feedback={false}
            />
            <ErrorMessage name="password" component="div" />

            <label htmlFor="edad">Edad</label>
            <InputNumber
              id="edad"
              name="edad"
              value={values.edad}
              onValueChange={(e) =>
                handleChange({ target: { name: "edad", value: e.value } })
              }
            />
            <ErrorMessage name="edad" component="div" />

            <label htmlFor="role">Rol</label>
            <select
              id="role"
              name="role"
              value={values.role}
              onChange={handleChange}
              style={{ width: "100%", padding: "0.5em", marginBottom: "1em" }}
            >
              <option value="cliente">Cliente</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <ErrorMessage name="role" component="div" />

            <button type="submit">Registrarse</button>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default RegisterForm;
