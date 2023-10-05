import {
    Controller,
} from "react-hook-form";
import {Field, FormProps, Section} from "./interfaces";

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
            <Controller rules={field.rules} control={control} render={(renderProps)=>renderComponent({...renderProps, ...field})} name={name}></Controller>
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

