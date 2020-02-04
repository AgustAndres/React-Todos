import React, { Component } from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import TodoDataService from '../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService'

class TodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: "",
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    onSubmit(values) {
        let name = AuthenticationService.getLoggedInUserName;
        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
        if (this.state.id === -1) {
            TodoDataService.createTodo(name, todo).then(() => { this.props.history.push('/todos') })
        } else {
            TodoDataService.updateTodo(name, this.state.id, todo).then(() => { this.props.history.push('/todos') })
        }
    }

    validate(values) {
        let errors = {}
        if (!values.description) {
            errors.description = "Enter a description"
        } else if (values.description.length < 5) {
            errors.description = "should have 5 characters"
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a valid target date"
        }
        return errors
    }

    componentDidMount() {
        if (this.state.id === -1) {
            return
        }
        TodoDataService.retrieveTodo(AuthenticationService.getLoggedInUserName, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            })
            )
    }
    render() {
        let { description, targetDate } = this.state
        //Same as:
        //let targetDate = this.state.targetDate let description = this.state.description
        return (
            <div>
                <h1>Todo</h1>
                <div className="container">
                    <Formik initialValues={{ description: description, targetDate }}
                        onSubmit={this.onSubmit} validate={this.validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning" />
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description" />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning" />
                                        <label>Target date</label>
                                        <Field className="form-control" type="date" name="targetDate" />
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}

export default TodoComponent