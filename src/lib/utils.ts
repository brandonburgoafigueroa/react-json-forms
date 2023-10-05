import {JsonFormSchema} from "./interfaces.ts";

export const getDefaultValuesFromJsonForm = (jsonFormSchema:JsonFormSchema)=>{
    const formData:Record<string, Record<string, string>> = {}
    jsonFormSchema.sections.forEach(section => {
        if (!formData[section.sectionName]) {
            formData[section.sectionName] = {}
        }
        section.fields.forEach(field => {
            if (!formData[section.sectionName][field.fieldName]) {
                formData[section.sectionName][field.fieldName] = ""
            }
        })
    })
    return formData;
}