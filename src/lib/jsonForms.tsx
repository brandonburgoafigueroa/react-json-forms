import {
    Controller,
} from "react-hook-form";
import {Field, FormProps, Section} from "./interfaces";

const defaultContainer = ({children}:any)=><>{children}</>

export const JsonForm = ({jsonFormSchema, Widgets, form}:FormProps)=>{
    const {control} = form;
    const renderField = (sectionName:string, field:Field)=>{
        const property = field.inputType
        const renderComponent = Widgets.Inputs[property];
        if (!renderComponent) {
            return null;
        }
        const Container = Widgets?.Field?.Container || defaultContainer
        const name = `${sectionName}.${field.fieldName}`
        return <Container>
            <Controller rules={field.rules} control={control} render={(renderProps)=>renderComponent({...renderProps, fieldSchema:field})} name={name}></Controller>
        </Container>
    }
    const renderSection = (section:Section)=>{
        const Container = Widgets?.Section?.Container || defaultContainer
        const Title = Widgets?.Section?.Title || defaultContainer
        const Description = Widgets?.Section?.Description || defaultContainer
        const FieldsContainer = Widgets?.Section?.FieldsContainer || defaultContainer

        return <Container>
            <Title>
                {section.title}
            </Title>
            <Description>
                {section.description}
            </Description>
            <FieldsContainer>
                {section.fields.map(field => renderField(section.sectionName, field))}
            </FieldsContainer>
        </Container>
    }
    const Container = Widgets?.Form?.Container || defaultContainer
    const Title = Widgets?.Form?.Title || defaultContainer
    const Description = Widgets?.Form?.Description || defaultContainer
    return <Container>
        <Title>
            {jsonFormSchema.formTitle}
        </Title>
        <Description>
            {jsonFormSchema.formDescription}
        </Description>
        {jsonFormSchema.sections.map(section => renderSection(section))}
    </Container>;
}

