import React from "react";
import {ControllerFieldState, ControllerRenderProps, UseFormReturn, UseFormStateReturn, RegisterOptions} from "react-hook-form";

export enum InputType {
    Input="Input",
    TextArea="TextArea",
}

export interface JsonFormSchema {
    formTitle: string
    formDescription?: string
    sections: Section[]
}

export interface Section {
    sectionName:string
    title: string
    description?: string
    fields: Field[]
}

export interface Field {
    fieldName:string
    label: string
    description?:string
    inputType: InputType
    rules:Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'| "validate"| "onChange"|"onBlur"|"shouldUnregister"|"deps"|"value">
}


export interface JsonFormWidgets {
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
        Input:(props:Render)=>React.ReactElement
        TextArea:(props:Render)=>React.ReactElement
        Radio:(props:Render)=>React.ReactElement
        Checkbox:(props:Render)=>React.ReactElement
    }

}

export interface JsonFormProps {
    jsonFormSchema:JsonFormSchema
    Widgets:JsonFormWidgets
}

export interface FormProps extends JsonFormProps {
    form:UseFormReturn
}

export interface Render extends Field {
    field: ControllerRenderProps;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<any>;
}