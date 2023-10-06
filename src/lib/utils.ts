import {InputType, JsonFormSchema} from "./interfaces";

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