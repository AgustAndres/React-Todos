import React, { Component } from "react";
import TodoDataService from '../api/todo/TodoDataService'
import AuthenticationService from '../Security/AuthenticationService.js'
import moment from 'moment'

class ListTodoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            message: null,
            search: ''
        }
    }
    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos = () => {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
            .then(
                response => {
                    this.setState({ todos: response.data })
                }
            )
    }

    deleteTodoClicked = (id) => {
        let username = AuthenticationService.getLoggedInUserName()
        console.log(id, username);
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({ message: `Delete of todo ${id} successful` })
                    this.refreshTodos();
                }
            )
    }

    updateTodoClicked = (id) => {
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked = () => {
        this.props.history.push('/todos/-1')
    }
    updateSearch = (event) => {
        this.setState({ search: event.target.value.substr(0, 50) })
    }
    clearSearch = () => {
        this.setState({ search: '' })
    }
    render() {
        let filteredTodos = this.state.todos.filter(
            (todo) => {
                return todo.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        )
        return (
            <div>
                <h1>Todos list</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">

                    <div className="input-group mb-3">
                        <input type="text"
                            className=" form-control "
                            placeholder="Search todo..."
                            value={this.state.search}
                            onChange={this.updateSearch} />

                        <div className="input-group-append">
                            <button className="btn btn-success"
                                type="button" id="button-addon2"
                                onClick={this.clearSearch}>X
                            </button>
                        </div>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filteredTodos.length ?filteredTodos.map(todo =>
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.isDone.toString()}</td>
                                    <td>{moment(todo.targetDate).format('DD-MM-YYYY')}</td>

                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => this.updateTodoClicked(todo.id)}>Update
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => this.deleteTodoClicked(todo.id)}>Delete
                                        </button>
                                    </td>
                                </tr>):<h3>No todos found</h3>}
                        </tbody>
                    </table>

                    <div className="row justify-content-end">
                        <button
                            className="btn btn-success col-3"
                            onClick={this.addTodoClicked}>Add todo
                        </button>
                    </div>
                </div>
            </div >
        );
    }
}

export default ListTodoComponent