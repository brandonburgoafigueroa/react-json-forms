import {InputType, JsonFormSchema} from "./interfaces";
import {cloneDeep, get, orderBy} from "lodash"

export const DefaultValuesForInputs = {
    number:0,
    string:"",
    array:[]
}


export const ValueTypesAvailableForInput:Record<InputType, string[]>={
    "Input":["number", "string"],
    "TextArea":["string"],
    "Checkbox":["array"],
    "Radio":["string"],
}

const getFieldPropertyAccessor = (sectionName:string, fieldName:string)=> {
    return `${sectionName}.${fieldName}`
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
                const fieldNameAccessor = getFieldPropertyAccessor(section.sectionName, field.fieldName);
                data.push(get(answer, fieldNameAccessor))
                columnIndex++
            })
            sectionExport.data.push(data)
        })
        result.push(sectionExport)
    })
    return result;
}
type Summary = Record<string, Record<string, Record<string, number>>>
export const createAnswersSummary = <T>(jsonSchema:JsonFormSchema, answer:T)=>{
    const summary:Summary = {};
    jsonSchema.sections.forEach(section => {
        if (!summary[section.sectionName]) {
            summary[section.sectionName] = {}
        }
        section.fields.forEach(field => {
            if (!summary[section.sectionName][field.fieldName]) {
                summary[section.sectionName][field.fieldName] = {}
            }
            const fieldNameAccessor = getFieldPropertyAccessor(section.sectionName, field.fieldName);
            const fieldValue = get(answer, fieldNameAccessor);
            if (!summary[section.sectionName][field.fieldName][`${fieldValue}`]) {
                summary[section.sectionName][field.fieldName][`${fieldValue}`] = 1;
            }
        })
    })
    return summary;
}


export const buildAnswersSummary = <T>(jsonSchema:JsonFormSchema, answer:T, summary?:Summary)=>{
    const result = summary ? cloneDeep(summary) : {};
    jsonSchema.sections.forEach(section => {
        if (!result[section.sectionName]) {
            result[section.sectionName] = {}
        }
        section.fields.forEach(field => {
            if (!result[section.sectionName][field.fieldName]) {
                result[section.sectionName][field.fieldName] = {}
            }
            const fieldNameAccessor = getFieldPropertyAccessor(section.sectionName, field.fieldName);
            const fieldValue = get(answer, fieldNameAccessor);
            if (!result[section.sectionName][field.fieldName][`${fieldValue}`]) {
                result[section.sectionName][field.fieldName][`${fieldValue}`] = 1;
            }
            else {
                result[section.sectionName][field.fieldName][`${fieldValue}`]++
            }
        })
    })
    return result;
}

export const getNewSelectedValuesCheckbox=(option:string, isChecked:boolean, currentValue:string[])=>{
    if (!isChecked) {
        return orderBy(Array.from(new Set(currentValue.filter(item => item !== option))))
    }
    else {
        return orderBy(Array.from(new Set( [...currentValue,option])))
    }
}

export const isChecked = (option:string, value:string[])=>{
    return value.find(item => item === option)
}