
import {useForm} from "react-hook-form";
import {
    buildAnswersSummary,
    getDefaultValuesFromJsonForm, getNewSelectedValuesCheckbox,
    getTableResults, isChecked,
    JsonForm,
    JsonFormSchema,
    JsonFormWidgets
} from "./src/lib";
import {useEffect} from "react";


const json:JsonFormSchema = {
    formTitle:"Este es el titulo del formulario",
    formDescription:"Esta es la descripcion del formulario",
    sections:[{
        sectionName:"Quieres pizza",
        title:"Quieres pizza",
        description:"Esta es la seccion 1",
        fields:[{
            fieldName:"pizza",
            label:"Quieres pizza",
            description:"",
            inputType:"Radio",
            type:"string",
            options:["SI", "NO"],
            rules:{
                required:{
                    value:false,
                    message:"Este campo es requerido"
                }
            }
        },
            {
                fieldName:"sillpancho",
                label:"Quieres Sillpancho",
                description:"",
                inputType:"Checkbox",
                type:"array",
                options:["SI", "NO", "talvez", "quizas"],
                rules:{
                    required:{
                        value:false,
                        message:"Este campo es requerido"
                    }
                }
            }
       ]
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
        Title:({children}:any)=><h1>{children}</h1>,
        Description:({children}:any)=><h2>{children}</h2>,
    },
    Section:{
        Title:({children}:any)=><Row>{children}</Row>,
        Description:({children}:any)=><Row>{children}</Row>,
    },
    Inputs:{
        Input:({field:{value, onChange, onBlur},fieldState:{error}, fieldSchema: {label, description, options}})=><Column>{label}<input value={value} onChange={onChange} onBlur={onBlur} />{description}{error && <div style={{color:"red"}}>{error.message}</div>}</Column>,
        TextArea:({field:{value, onChange, onBlur},fieldState:{error}, fieldSchema:{label, description, options}})=><Column>{label}<input value={value} onChange={onChange} onBlur={onBlur} />{description}{error && <div style={{color:"red"}}>{error.message}</div>}</Column>,
        Radio:({field:{value, onChange, onBlur},fieldState:{error}, fieldSchema:{label, description, options}})=> {
            return <Column>{label}<input value={value} onChange={onChange} onBlur={onBlur}/>{description}{error &&
                <div style={{color: "red"}}>{error.message}</div>}</Column>
        },
        Checkbox:({field:{value, onChange, onBlur},fieldState:{error}, fieldSchema:{label, description, options}})=><Column>{label}{options.map(option => <input type="checkbox" value={option} checked={isChecked(option, value)} onChange={(event)=>{
           onChange(getNewSelectedValuesCheckbox(option, event.target.checked, value));
        }} />)}</Column>,
    }
}


function App() {
    const form = useForm({defaultValues:getDefaultValuesFromJsonForm(json), mode:"all"});
    const {formState:{isValid}} = form;
    const onSubmit = (values:any)=>{
        const results = [values, values, values, values, values];
        const table = getTableResults(json, results);
        table.forEach(table => {
            console.table([[...table.header], ...table.data])
        })
        let summary = buildAnswersSummary(json, {
            "Quieres pizza": {
                "pizza": false
            },
            "Selecciona tus platos": {
                "sillpancho": false,
                "pique": false
            }
        });
        summary = buildAnswersSummary(json, {
            "Quieres pizza": {
                "pizza": true
            },
            "Selecciona tus platos": {
                "sillpancho": true,
                "pique": true
            }
        }, summary);
        summary = buildAnswersSummary(json, {
            "Quieres pizza": {
                "pizza": "NO"
            },
            "Selecciona tus platos": {
                "sillpancho": "PUEDE SER",
                "pique": "QUIZAS"
            }
        }, summary);
        console.log(summary)
    }
    useEffect(()=>{
        console.log(isValid);
    },[isValid])
    return <Column>
        <JsonForm jsonFormSchema={json} Widgets={COMPONENTS} form={form}/>
        <button onClick={form.handleSubmit(onSubmit)}>Guardar datos</button>
    </Column>
}

export default App
