import React, { useState } from 'react'

import Card from './../UI/Card'
import Button from './../UI/Button'
import ErrorModal from './../UI/ErrorModal'

import classes from './AddUser.module.css'

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredUserage, setEnteredUserage] = useState('')
  const [error, setError] = useState()

  //not reaload the page when the form is submitted
  const addUserHandler = (e) => {
    e.preventDefault()
    //validation of input fields
    if (
      enteredUsername.trim().length === 0 ||
      enteredUserage.trim().length === 0
    ) {
      setError({
        title: 'invalid Input',
        message: 'Please enter a valid name and age (non-empty values)',
      })
      return
    }
    if (+enteredUserage < 1) {
      setError({
        title: 'invalid age',
        message: 'Please enter a valid age (> 0)',
      })
      return
    }
    //from app.js (add new user and uptade the state)
    props.onAddUser(enteredUsername, enteredUserage)
    //clean the form after submission
    setEnteredUserage('')
    setEnteredUsername('')
  }

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value)
  }

  const userageChangeHandler = (event) => {
    setEnteredUserage(event.target.value)
  }

  const errorHandler = () => {
    setError(null)
  }
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            onChange={usernameChangeHandler}
            value={enteredUsername}
          />
          <label htmlFor='age'>Age (Years)</label>
          <input
            type='number'
            id='age'
            onChange={userageChangeHandler}
            value={enteredUserage}
          />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </>
  )
}

export default AddUser
