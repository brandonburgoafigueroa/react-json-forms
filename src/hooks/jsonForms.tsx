import {
    Controller,
} from "react-hook-form";
import {Field, JsonFormSchema, Section, FormProps} from "./types.ts";

export const JsonForm = ({jsonFormSchema, Widgets, form}:FormProps)=>{
    const {control} = form;
    const renderField = (sectionName:string, field:Field)=>{
        const property = field.inputType
        const renderComponent = Widgets.Inputs[property];
        if (!renderComponent) {
            return null;
        }
        const name = `${sectionName}.${field.fieldName}`
        return <Widgets.Field.Container>
            <Controller control={control} render={(renderProps)=>renderComponent({...renderProps, ...field})} name={name}></Controller>
        </Widgets.Field.Container>
    }
    const renderSection = (section:Section)=>{
        return <Widgets.Section.Container>
            <Widgets.Section.Title>
                {section.title}
            </Widgets.Section.Title>
            <Widgets.Section.Description>
                {section.description}
            </Widgets.Section.Description>
            <Widgets.Section.FieldContainer>
                {section.fields.map(field => renderField(section.sectionName, field))}
            </Widgets.Section.FieldContainer>
        </Widgets.Section.Container>
    }
    return <Widgets.Form.Container>
        <Widgets.Form.Title>
            {jsonFormSchema.formTitle}
        </Widgets.Form.Title>
        <Widgets.Form.Description>
            {jsonFormSchema.formDescription}
        </Widgets.Form.Description>
        {jsonFormSchema.sections.map(section => renderSection(section))}
    </Widgets.Form.Container>;
}

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