const taskModel = require('../lib/models/task');
const taskController = {};

taskController.renderNewTaskForm = (req, res) => {
    res.render('tasks/newTask');
}

taskController.createNewTask = async(req, res) => {
    const { title, description, deadline, time, priority } = req.body;
    const newTask = new taskModel({ title, description, deadline, time, priority });
    newTask.user = req.user._id;
    newTask.state = "ToDo";
    await newTask.save();
    req.flash('msg_success', 'Task added');
    res.redirect('/task');
}

taskController.renderTasks = async(req, res) => {
    const tasks = await taskModel.find({ user: req.user._id }).lean();
    // const tasks = await taskModel.find({ user: req.user._id }).sort({ deadline: 'asc' }).lean();
    res.render('tasks/allTasks', { tasks });
}

taskController.renderEditTaskForm = async(req, res) => {
    const task = await taskModel.findById(req.params.id).lean();
    if (task.user != req.user._id) {
        return res.redirect('/task');
    }
    res.render('tasks/editTask', { task });
}

taskController.editTask = async(req, res) => {
    const { title, description, deadline, time, priority } = req.body;
    await taskModel.findByIdAndUpdate(req.params.id, { title, description, deadline, time, priority });
    req.flash('msg_success', 'Task updated');
    res.redirect('/task');
}

taskController.editStateFwTask = async(req, res) => {
    const task = await taskModel.findById(req.params.id);
    if (task.state === "ToDo") {
        task.state = "Process";
    } else if (task.state === "Process") {
        task.state = "Finish";
    }
    await task.save();
    res.redirect('/task');
}

taskController.editStateBkTask = async(req, res) => {
    const task = await taskModel.findById(req.params.id);
    if (task.state === "Process") {
        task.state = "ToDo";
    } else if (task.state === "Finish") {
        task.state = "Process";
    }
    await task.save();
    res.redirect('/task');
}

taskController.deleteTask = async(req, res) => {
    await taskModel.findByIdAndDelete(req.params.id);
    req.flash('msg_success', 'Task deleted');
    res.redirect('/task');
}


module.exports = taskController;