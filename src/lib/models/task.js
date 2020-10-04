const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    priority: {
        type: String,
        enum: [
            "none",
            "Low",
            "Medium",
            "High",
            "Urgent"
        ]
    },
    deadline: {
        type: String
    },
    time: {
        type: String
    },
    state: {
        type: String,
        enum: [
            "ToDo",
            "Process",
            "Finish"
        ]
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Task', taskSchema);