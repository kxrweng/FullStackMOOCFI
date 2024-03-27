import React from 'react'
import Header from "./Header"
import Content from "./Content"
const Course = ({courses}) => {

    return(
        courses.map((course) => {
            return (
                <div key = {course.id}>
                <Header title = {course.name}/>
                <Content parts = {course.parts} />
                </div>
              
            )
        })
    )
    // return (

    //     <>
    //     {/* <Header title = {course.name} />
    //     <Content parts = {course.parts} /> */}
    //     </>
      
    // )
   
}

export default Course