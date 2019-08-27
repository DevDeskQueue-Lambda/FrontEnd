import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

function NewTicketForm({ values, errors, touched }) {
  return (
    <div className='form-card'>
    <Form className='ui form'>

    <div className='field'>
      <label htmlFor='name'>Name
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field type="text" name="name" placeholder="Name" />
      </label>
    </div>

      <div className='field'>
    <label htmlFor='itemType'> Topic:
      <Field component="select" name="itemType">
          <option value="User Interface">User Interface I</option>
          <option value="Advanced CSS">Advanced CSS</option>
          <option value="JavaScript Fundamentals">JavaScript Fundamentals</option>
          <option value="Applied JavaScript">Applied JavaScript</option>
          <option value="Intro to React">Intro to React</option>
          <option value="Single Page Applications">Single Page Applications</option>
          <option value="Build Week">Build Week</option>
          <option value="General">General</option>
        </Field>
    </label>
    </div>
    <div className='field'>
    <label htmlFor='description'>Description
        {touched.description && errors.description && <p>{errors.description}</p>}
        <Field component='textarea' name="description" placeholder="Description of Your Issue" />
      </label>
      </div>
      <div className='field'>
        <label htmlFor='gitHub'>Link to Your Github
        {touched.gitHub && errors.gitHub && <p>{errors.gitHub}</p>}
        <Field type="url" name="gitHub" placeholder="Github Link goes here.." />
        </label>
      </div>

      <button className='ui button' type='submit'>Submit</button>
      <button className='ui button' type='reset'>Reset Form</button>
    </Form>
    </div>
  );
}

const NewTicket = withFormik({
  mapPropsToValues({
    itemType,
    description,
    gitHub,
    name

  }) {
    return {
      itemType: itemType || "Camera",
      description: description || "",
     gitHub: gitHub || "",
      name: name || ""
    };
  },
  validationSchema: Yup.object().shape({
    itemType: Yup.string().required("Type is required"),
    description: Yup.string().required("is required"),
    gitHub: Yup.string()
    .url('Must be a valid URL')
     .required("is required"),
     name:  Yup.string().required("is required"),
  }),

  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
      console.log(
        values
      );
    }
  }
)(NewTicketForm);
export default NewTicket;
