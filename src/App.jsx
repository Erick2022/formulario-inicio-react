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

    // Establece la fuente para el documento PDF
    doc.setFont('helvetica');

    // Título del formulario;
    doc.setFontSize(16);
    const espacioSuperior = 20;
    const titulo = "Inicio de Turno de Operativo en la Vía Nacional";

    // Agrega el texto del título al PDF centrado en la página
    const width = doc.getStringUnitWidth(titulo) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const x = (doc.internal.pageSize.width - width) / 2;
    const y = espacioSuperior;

    // Establece la fuente en negrita solo para el título
    doc.setFont(undefined, 'bold');

    // Agrega el texto del título al PDF
    doc.text(titulo, x, y);

    // Restaura la configuración de fuente
    doc.setFont(undefined, 'normal');

    doc.setFontSize(11); // Tamaño de fuente
    doc.text(`Ubicacion: PN - KM 1196, Cercanías Peaje Cancas, EP - Tumbes`, 10, 40);
    doc.text(`Fecha: ${formData.Fecha}`, 10, 50);
    doc.text(`HORARIO: ${formData.horario}`, 10, 60);
    doc.text(`Responsable de turno: ${formData.responsableTurno}`, 10, 70);
    doc.text(`Inspector: ${formData.Inspector1}`, 10, 80);
    doc.text(`Inspector: ${formData.Inspector2}`, 10, 90);
    doc.text(`Inspector: ${formData.Inspector3}`, 10, 100);
    doc.text(`Incidencias durante el operativo: ${formData.incidencia1}`, 10, 110);
    doc.text(`Sobre puntualidad de inspectores: ${formData.incidencia2}`, 10, 120);
    doc.text(`OBSERVACIONES: ${formData.incidencia3}`, 10, 130);

    // Guarda el documento
    doc.save('formularioInicio.pdf');
  };
  return (
    /* declaras el formulario */
    <div className="page-container">

      <div className="container">
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
            {...register("Fecha",
              {
                // declaras el formulario 
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
            {...register("horario", {
              // manejo de campos requeridos y errores
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
            {...register("responsableTurno", {
              // manejo de campos requeridos y errores
              required: {
                value: true,
                message: "Inspector requerido..."
              },
              minLength: {
                value: 2,
                message: "INSPECTOR debe tener al menos 2 caracteres..."
              },
              maxLength: {
                value: 30,
                message: "NSPECTOR no debe tener más de 30 caracteres..."
              }
            })} />
          {
            errors.responsableTurno && <span>{errors.responsableTurno.message}</span>
          }

          <label
            htmlFor="Inspector1">Inspector</label>
          <input
            type="text"
            {...register("Inspector1", {
              // manejo de campos requeridos y errores
              required: {
                value: true,
                message: "Inspector requerido..."
              },
              minLength: {
                value: 2,
                message: "INSPECTOR debe tener al menos 2 caracteres..."
              },
              maxLength: {
                value: 30,
                message: "NSPECTOR no debe tener más de 30 caracteres..."
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
                value: 30,
                message: "NSPECTOR no debe tener más de 30 caracteres..."
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
                value: 30,
                message: "NSPECTOR no debe tener más de 30 caracteres..."
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

            defaultValue="Vehículos intervenidos son ingresados al SISCOTT."
          />

          <label
            htmlFor="incidencia2">Sobre puntualidad de inspectores</label>
          <textarea
            id="incidencia2"
            name='incidencia2'
            type="text"
            {...register("incidencia2")}
            defaultValue="Inspectores llegaron temprano,
se usa laptop para ingreso de vehículos al SISCOTT."
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

        <div className="ad-container">
          <div className="message">
            <p>Yapea <span className="number">S/.1</span>al programador... Pol Dali</p>
          </div>
          <img className="image" src="./img/21320185072024-04-18T16-18-22.png"
           alt="yapea al programador...!!!" />
        </div>
      </div>
    </div>
  );
}
export default App;
