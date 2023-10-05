
import {useForm} from "react-hook-form";
import {getDefaultValuesFromJsonForm, InputType, JsonForm, JsonFormSchema, JsonFormWidgets} from "./src";


const json:JsonFormSchema = {
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
            inputType:InputType.Input,
            rules:{
                required:{
                    value:true,
                    message:"Este campo es requerido"
                }
            }
        },
        {
            fieldName:"description",
             label:"Descripcion",
             inputType:InputType.TextArea,
            rules:{
                required:{
                    value:true,
                    message:"Este campo es requerido"
                },
                maxLength:{
                    value:5,
                    message:"el limite es 5"
                }
            }
            }]
    }, {
        sectionName:"seccion 2",
        title:"Seccion 2",
        description:"Esta es la seccion 2",
        fields:[{
            fieldName:"nombre",
            label:"Nombre",
            description:"Este es el nombre",
            inputType:InputType.Input,
            rules:{
                required:{
                    value:true,
                    message:"Este campo es requerido"
                }
            }
        },
            {
                fieldName:"description",
                label:"Descripcion",
                inputType:InputType.TextArea,
                rules:{
                    required:{
                        value:true,
                        message:"Este campo es requerido"
                    },
                    maxLength:{
                        value:5,
                        message:"el limite es 5"
                    }
                }
            }]
    }],

}

const Row = ({children}:any)=>{
    return <div style={{display:"flex", flexDirection:"row"}}>{children}</div>
}

const Column = ({children, style}:any)=>{
    return <div style={{display:"flex", flexDirection:"column", ...style}}>{children}</div>
}


const COMPONENTS:JsonFormWidgets = {
    Form:{
        Container:({children}:any)=><Column>{children}</Column>,
        Title:({children}:any)=><h1>{children}</h1>,
        Description:({children}:any)=><h2>{children}</h2>,
    },
    Section:{
        Container:({children}:any)=><Column>{children}</Column>,
        Title:({children}:any)=><Row>{children}</Row>,
        Description:({children}:any)=><Row>{children}</Row>,
        FieldContainer:({children}:any)=><Column>{children}</Column>,
    },
    Field:{
        Container:({children}:any)=><Column style={{marginTop:20, marginBottom:20}}>{children}</Column>,
    },
    Inputs:{
        Input:({field:{value, onChange, onBlur},fieldState:{error}, label, description})=><Column>{label}<input value={value} onChange={onChange} onBlur={onBlur} />{description}{error && <div style={{color:"red"}}>{error.message}</div>}</Column>,
        TextArea:({field:{value, onChange, onBlur},fieldState:{error}, label, description})=><Column>{label}<input value={value} onChange={onChange} onBlur={onBlur} />{description}{error && <div style={{color:"red"}}>{error.message}</div>}</Column>,
        Radio:()=><></>,
        Checkbox:()=><></>,
    }
}

function App() {
    const form = useForm({defaultValues:getDefaultValuesFromJsonForm(json)});
    const onSubmit = (values:any)=>{
        console.log(values)
    }
    return <Column>
        <JsonForm jsonFormSchema={json} Widgets={COMPONENTS} form={form}/>
        <button onClick={form.handleSubmit(onSubmit)}>Guardar datos</button>
    </Column>
}

export default App
