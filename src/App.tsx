import {getDefaultValuesFromJsonForm, JsonForm} from "./hooks/jsonForms";
import {useForm} from "react-hook-form";
import {InputType, JsonFormWidgets} from "./hooks/types.ts";


const json = {
    formTitle:"Este es el titulo del formulario",
    formDescription:"Esta es la descripcion del formulario",
    sections:[{
        sectionName:"seccion 1",
        title:"Seccion 1",
        description:"Esta es la seccion 1",
        fields:[{
            fieldName:"nombre",
            label:"Nombre",
            description:"Este es el nombre",
            type:"string",
            inputType:InputType.Input
        },
        {
            fieldName:"description",
             label:"Descripcion",
             placeholder:"Ingrese la descripcion",
             type:"string",
             inputType:InputType.TextArea
            }]
    }]
}



const COMPONENTS:JsonFormWidgets = {
    Form:{
        Container:({children}:any)=><div>{children}</div>,
        Title:({children}:any)=><h1 style={{color:"red"}}>{children}</h1>,
        Description:({children}:any)=><h2 style={{color:"red"}}>{children}</h2>,
    },
    Section:{
        Container:({children}:any)=><div>{children}</div>,
        Title:({children}:any)=><div style={{color:"red"}}>{children}</div>,
        Description:({children}:any)=><div style={{color:"red"}}>{children}</div>,
        FieldContainer:({children}:any)=><div style={{color:"red"}}>{children}</div>,
    },
    Field:{
        Container:({children}:any)=><div>{children}</div>,
    },
    Inputs:{
        Input:({field:{value, onChange, onBlur}, label, description})=><div>{label}<input value={value} onChange={onChange} onBlur={onBlur} />{description}</div>,
        TextArea:({field:{value, onChange, onBlur}, label, description})=><div>{label}<input value={value} onChange={onChange} onBlur={onBlur} />{description}</div>
    }
}

function App() {
    const form = useForm({defaultValues:getDefaultValuesFromJsonForm(json)});
    const onSubmit = (values:any)=>{
        console.log(values)
    }
    return <div>
        <JsonForm jsonFormSchema={json} Widgets={COMPONENTS} form={form}/>
        <button onClick={form.handleSubmit(onSubmit)}>Guardar datos</button>
    </div>
}

export default App
