import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';

import apiFunctions from '../functions/apiFunctions';
import { LoginContext } from '../functions/context/LoginContext';
import {
  fetchAllTodos,
  completeTodoAPI,
  openTodoAPI,
} from '../functions/api/todoAPI';

const api = apiFunctions.getAPI();

function TodoPage() {
  const { currentUser } = useContext(LoginContext);
  const queryClient = useQueryClient();
  const [updatingTodoID, setUpdatingTodoID] = useState(null);

  const {
    data: todosResponse,
    isLoading,
    isError,
    error,
  } = useQuery(['todos'], () => fetchAllTodos({ api }));

  const todos = Array.isArray(todosResponse?.data) ? todosResponse.data : [];

  async function handleToggleTodo(todo) {
    if (!todo?.todoID || updatingTodoID != null) {
      return;
    }

    const isCompleted = todo.status === 'completed';
    setUpdatingTodoID(todo.todoID);

    try {
      if (isCompleted) {
        await openTodoAPI({
          api,
          todoID: todo.todoID,
          currentUser,
        });
      } else {
        await completeTodoAPI({
          api,
          todoID: todo.todoID,
          currentUser,
        });
      }

      await queryClient.invalidateQueries(['todos']);
    } catch (toggleError) {
      window.alert('Could not update To Do. Try again.');
      console.error(toggleError);
    } finally {
      setUpdatingTodoID(null);
    }
  }

  return (
    <div
      className="d-flex flex-column bg-light"
      style={{
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <header
        className="bg-white border-bottom shadow-sm py-2 flex-shrink-0"
        style={{ position: 'relative', height: 'auto', width: '100%' }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center gap-4">
            <div className="d-flex align-items-center">
              <span className="text-dark fs-5 fw-bold me-0" style={{ fontFamily: 'monospace' }}>{'{'}</span>
              <div
                className="d-flex align-items-center justify-content-center rounded-2 mx-1"
                style={{ width: 36, height: 36, backgroundColor: '#1a1a1a' }}
              >
                <span className="text-white fw-bold">B</span>
              </div>
              <span className="text-dark fs-5 fw-bold ms-0" style={{ fontFamily: 'monospace' }}>{'}'}</span>
            </div>
            <nav className="d-flex gap-3">
              <Link to="/chat" className="text-decoration-none text-dark">Chat</Link>
              <Link to="/dashboard" className="text-decoration-none text-dark">Dashboard</Link>
              <Link to="/todos" className="text-decoration-none text-dark fw-semibold">To Dos</Link>
            </nav>
          </div>
        </div>
      </header>

      <main
        className="d-flex flex-column flex-grow-1 bg-light mx-auto overflow-auto"
        style={{ maxWidth: 800, flex: 1, minHeight: 0, minWidth: 0, width: '100%' }}
      >
        <div className="px-4 pt-3 pb-0 flex-shrink-0">
          <h1 className="h5 mb-0">To Dos</h1>
          <p className="text-muted small mb-0 mt-1">
            Check an item to mark it complete. Uncheck to reopen it.
          </p>
        </div>

        <div
          className="flex-grow-1 d-flex flex-column p-4"
          style={{ flex: 1, minHeight: 0 }}
        >
          <div
            className="bg-white rounded-3 shadow-sm flex-grow-1 overflow-auto p-4 mb-3"
            style={{ minHeight: 0, flex: 1 }}
          >
            {isLoading && (
              <p className="text-muted mb-0">Loading To Dos…</p>
            )}

            {isError && (
              <p className="text-danger mb-0">
                Could not load To Dos{error?.message ? `: ${error.message}` : '.'}
              </p>
            )}

            {!isLoading && !isError && todos.length === 0 && (
              <p className="text-muted mb-0">No To Dos yet.</p>
            )}

            {!isLoading && !isError && todos.length > 0 && (
              <ul className="list-group">
                {todos.map((todo) => {
                  const checkboxId = `todoCheckbox-${todo.todoID}`;
                  const isCompleted = todo.status === 'completed';
                  const isUpdating = updatingTodoID === todo.todoID;

                  return (
                    <li
                      key={todo.todoID}
                      className="list-group-item"
                    >
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        value={todo.todoID}
                        id={checkboxId}
                        checked={isCompleted}
                        disabled={isUpdating}
                        onChange={() => handleToggleTodo(todo)}
                      />
                      <label
                        className={`form-check-label${isCompleted ? ' text-decoration-line-through text-muted' : ''}`}
                        htmlFor={checkboxId}
                      >
                        {todo.title}
                        {todo.category ? (
                          <span className="text-muted small ms-2">
                            ({todo.category})
                          </span>
                        ) : null}
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TodoPage;
