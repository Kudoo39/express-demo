const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];
app.get('/', (req, res) => {
    res.send("Hello World!!");
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});


//HTTP POST Requests
app.post('/api/courses', (req, res) => {
    //INPUT VALIDADION
    const { error } = validateCourse(req.body); //result.error
    //In valid -> return 400 bad request
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

//HTTP GET Requests
app.get('/api/courses/:id', (req, res) => {
    //look up for the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given ID was not found!!');//404
    res.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//HTTP PUT Requests
app.put('api/courses/:id', (req, res) => {
    //Look up the course, if no, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given ID was not found!!');//404
    
    
    const { error } = validateCourse(req.body); //result.error
    //In valid -> return 400 bad request
    if(error) return res.status(400).send(error.details[0].message);
      

    //update
    course.name = req.body.name;
    //return the updated
    res.send(course);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

//HTTP DELETE Requests
app.delete('/api/courses/:id', (req, res) => {
    //Find the course, if no => return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with given ID was not found!!');//404

    //Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //Return the same course
    res.send(course);
})
