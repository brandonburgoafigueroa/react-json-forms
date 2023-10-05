import React from "react";
import {Controller, useForm, UseFormReturn} from "react-hook-form";

export enum InputType {
    Input="Input",
    TextArea="TextArea",
}

export interface JsonFormSchema {
    formTitle: string
    formDescription: string
    sections: Section[]
}

export interface Section {
    sectionName:string
    title: string
    description: string
    fields: Field[]
}

export interface Field {
    fieldName:string
    label: string
    description?:string
    type: string
    inputType: InputType
}

interface Input {
    value:string
    onChange:(value:string)=>void
    onBlur?:()=>void
    label:string
    description?:string
}

interface Widgets {
    Form: {
        Container:({value}:any)=>React.ReactNode,
        Title:({value}:any)=>React.ReactNode,
        Description:({value}:any)=>React.ReactNode,
    },
    Section:{
        Title:({value}:any) =>React.ReactNode,
        Description:({value}:any) =>React.ReactNode
        Container:(children:any)=>React.ReactNode
        FieldContainer:(children:any)=>React.ReactNode
    },
    Field:{
        Container:(children:any)=>React.ReactNode
    },
    Inputs:{
        Input:(props:Input)=>React.ReactElement
        TextArea:(props:Input)=>React.ReactElement
    }

}

interface JsonFormProps {
    jsonFormSchema:JsonFormSchema
    Widgets:Widgets
}

interface FormProps extends JsonFormProps {
    form:UseFormReturn
}

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
            <Controller control={control} render={({field:{onChange, onBlur, value}})=>renderComponent({...field, onBlur, onChange, value})} name={name}></Controller>
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