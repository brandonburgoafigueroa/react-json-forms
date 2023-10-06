import {InputType, JsonFormSchema} from "./interfaces";
import {get} from "react-hook-form";

export const DefaultValuesForInputs = {
    number:0,
    string:"",
    boolean:false
}


export const ValueTypesAvailableForInput:Record<InputType, string[]>={
    "Input":["number", "string"],
    "TextArea":[ "string"],
    "Checkbox":["boolean"],
    "Radio":["string"],
}

export const getDefaultValuesFromJsonForm = (jsonFormSchema:JsonFormSchema)=>{
    const formData:Record<string, Record<string, any>> = {}
    jsonFormSchema.sections.forEach(section => {
        if (!formData[section.sectionName]) {
            formData[section.sectionName] = {}
        }
        section.fields.forEach(field => {
            if (!formData[section.sectionName][field.fieldName]) {
                const defaultValue = DefaultValuesForInputs[field.type];
                formData[section.sectionName][field.fieldName] =  defaultValue === undefined ? "" : defaultValue
            }
        })
    })
    return formData;
}


type TableResult = {title:string,description:string, header:string[], data:string[][]}
export const getTableResults = (schema:JsonFormSchema, answers:unknown[]) => {
    const result:TableResult[] = []
    schema.sections.forEach(section => {
        const sectionExport:TableResult = {
            title:section.title,
            description:section.description || "",
            header:[],
            data:[]
        }

        answers.forEach(answer => {
            let columnIndex = 0;
            const data:string[] = [];
            section.fields.forEach(field => {
                sectionExport.header[columnIndex] = field.label;
                const fieldNameAccessor = `${section.sectionName}.${field.fieldName}`;
                data.push(get(answer, fieldNameAccessor))
                columnIndex++
            })
            sectionExport.data.push(data)
        })
        result.push(sectionExport)
    })
    return result;
}