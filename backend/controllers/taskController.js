const Task = require("../model/taskModel");

// CREATE TASK
const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ mesg: error.message })
    }
};

// GET ALL TASK
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ mesg: error.message })
    }
}


// get a single task
const getTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json(`NO task with this id: ${id}`)
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ mesg: error.message })
    }
}

// Delete Task
const deleteTask = async (req, res) => {
    try {
        const {id} = req.params
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).json(`NO task with this id: ${id}`)
        }

        res.status(200).send("task deleted successfully")
    } catch (error) {
        res.status(500).json({ mesg: error.message })
    }
}

// Update a Task 
const updateTask = async (req, res) => {
    try {
        const {id} = req.params
        const task = await Task.findByIdAndUpdate(
            {_id: id}, req.body, {new: true, runValidators: true}
        )
        if (!task) {
            return res.status(404).json(`NO task with this id: ${id}`)
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ mesg: error.message })
    }

}


module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}