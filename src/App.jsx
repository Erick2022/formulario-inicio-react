import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { jsPDF } from "jspdf";

//declaras el componente
function App() {
  //manejo de eventos
  const { register, handleSubmit, reset,
    formState: { errors }
  } = useForm();
  const [formData, setFormData] = useState(null);
  console.log(errors)

  const onSubmit = (data) => {
    setFormData(data);
    generatePDF(data);
    alert("Formulario creado...!");
    console.log(data)
  };
  const handleNewForm = () => {
    // Limpia los campos
    reset();
    setFormData(null);
    // setpdfContent(null);
  };
  const generatePDF = (formData) => {
    const doc = new jsPDF();
    console.log('Generando pdf con los sgtes datos:', formData);

    //Titulo del formualario

    doc.setFontSize(16); //tamaño de fuente
    const espacioSuperior = 20;

    const texto = "Inicio de Turno de Operativo en la Vía Nacional";
    const width = doc.getStringUnitWidth(texto) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const x = (doc.internal.pageSize.width - width) / 2;
    const y = espacioSuperior;
    doc.text(texto, x, y);

    doc.setFontSize(11); //tamaño de fuente
    doc.text(`Ubicacion: PN - KM 1196, Cercanías Peaje Cancas, EP - Tumbes`, 20, 40);
    doc.text(`Fecha: ${formData.Fecha}`, 20, 50);
    doc.text(`HORARIO: ${formData.horario}`, 20, 60);
    doc.text(`Responsable de turno: ${formData.responsableTurno}`, 20, 70);
    doc.text(`Inspector: ${formData.Inspector1}`, 20, 80);
    doc.text(`Inspector: ${formData.Inspector2}`, 20, 90);
    doc.text(`Inspector: ${formData.Inspector3}`, 20, 100);
    doc.text(`Incidencia 1: ${formData.incidencia1}`, 20, 110);
    doc.text(`Incidencia 2: ${formData.incidencia2}`, 20, 120);
    doc.text(`Incidencia 3: ${formData.incidencia3}`, 20, 130);
    // guarda el docuemnto
    doc.save('formularioInicio.pdf');
  };
  //   const handleForSubmit = (data) => {
  //     setFormData(data);
  //   };
  return (
    //declaras el formulario
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>

      <h1>Inicio de Turno de Operativo en la Vía Nacional</h1>

      <label
        htmlFor="ubicacion">Ubicacion: PN - KM 1196, Cercanías Peaje Cancas, EP - Tumbes
      </label>

      <label
        htmlFor="Fecha">Fecha
      </label>
      <input
        type="date"
        {...register("Fecha", { // manejo de campos requeridos y errores
          required: {
            value: true,
            message: "Fecha es requerida..."
          }
        })}
      />
      {
        errors.Fecha && <span>{errors.Fecha.message}</span>
      }


      <label
        htmlFor="Horario">Horario
      </label>

      <input
        type="text"
        {...register("horario", {  // manejo de campos requeridos y errores
          required: {
            value: true,
            message: "Horario requerido..."
          },
          minLength: {
            value: 11,
            message: "Se debe ingresar horario de turno..."
          }
        })} />
      {
        errors.horario && <span>{errors.horario.message}</span>
      }

      <label
        htmlFor="responsableTurmo">Responsable de turno
      </label>
      <input
        type="text"
        {...register("responsableTurno", {  // manejo de campos requeridos y errores
          required: {
            value: true,
            message: "Inspector requerido..."
          },
          minLength: {
            value: 2,
            message: "INSPECTOR debe tener al menos 2 caracteres..."
          },
          maxLength: {
            value: 20,
            message: "NSPECTOR no debe tener más de 20 caracteres..."
          }
        })} />
      {
        errors.responsableTurno && <span>{errors.responsableTurno.message}</span>
      }

      <label
        htmlFor="Inspector1">Inspector</label>
      <input
        type="text"
        {...register("Inspector1", {  // manejo de campos requeridos y errores
          required: {
            value: true,
            message: "Inspector requerido..."
          },
          minLength: {
            value: 2,
            message: "INSPECTOR debe tener al menos 2 caracteres..."
          },
          maxLength: {
            value: 20,
            message: "NSPECTOR no debe tener más de 20 caracteres..."
          }
        })} />
      {
        errors.Inspector1 && <span>{errors.Inspector1.message}</span>
      }

      <label
        htmlFor="Inspector2">Inspector</label>
      <input
        type="text"
        {...register("Inspector2", {
          required: {
            value: true,
            message: "Inspector requerido..."
          },
          minLength: {
            value: 2,
            message: "INSPECTOR debe tener al menos 2 caracteres..."
          },
          maxLength: {
            value: 20,
            message: "NSPECTOR no debe tener más de 20 caracteres..."
          }
        })} />
      {
        errors.Inspector2 && <span>{errors.Inspector2.message}</span>
      }

      <label
        htmlFor="Inspector3">Inspector</label>
      <input
        type="text"
        {...register("Inspector3", {
          required: {
            value: true,
            message: "Inspector requerido..."
          },
          minLength: {
            value: 2,
            message: "INSPECTOR debe tener al menos 2 caracteres..."
          },
          maxLength: {
            value: 20,
            message: "NSPECTOR no debe tener más de 20 caracteres..."
          }
        })} />
      {
        errors.Inspector3 && <span>{errors.Inspector3.message}</span>
      }

      <label
        htmlFor="incidencia1">Incidencias durante el operativo</label>
      <textarea
        id="incidencia1"
        name='incidencia1'
        type="text"
        {...register("incidencia1")}

        defaultValue="Inspectores llegaron temprano, vehículos intervenidos son ingresados al SISCOTT."
      />

      <label
        htmlFor="incidencia2">Sobre puntualidad de inspectores</label>
      <textarea
        id="incidencia2"
        name='incidencia2'
        type="text"
        {...register("incidencia2")}
        defaultValue="Se usa laptop para ingreso de vehículos al SISCOTT."
      />

      <label
        htmlFor="incidencia3">OBSERVACIONES</label>
      <textarea
        id="incidencia3"
        name='incidencia3'
        type="text"
        {...register("incidencia3")}
      />

      <div className="button-container">

        <button type="submit">GENERAR</button>

        <button type="button" onClick={handleNewForm}>NUEVO</button>
        {/* {formData && <PDF formData={formData} />} */}
        {formData && <pre>{JSON.stringify(formData, null, 2)}</pre>}
      </div>

    </form >
  );
}
export default App;