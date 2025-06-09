const Employee = require('../models/Employee')
const mongoose = require("mongoose");

const generateEmpId = async () => {
    const employees = await Employee.find()
    const employeeId = employees?.length + 1
    return employeeId;
}

const getAll = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { createdBy: new mongoose.Types.ObjectId(req.user._id) };

        const total = await Employee.countDocuments(query);
        const employees = await Employee.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            data: employees,
            message: "Employees fetched successfully",
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.toString() });
    }
};
const addOne = async (req, res) => {
    try {
        let result = new Employee(req.body);
        if (req.user && req.user._id) {
            result.createdBy = req.user._id;
        }

        result.employeeId = generateEmpId();
        await result.save();
        res.status(200).json({ success: true, message: "Employee saved successfully", data: result, });

    } catch (error) {
        console.error('Failed to create Data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.toString() });
    }
};
const getOne = async (req, res) => {
    try {
        let result = await Employee.findOne({ _id: req.params.id });
        if (!result) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }

        res.status(200).json({ success: true, data: result, message: "Employee details fetch successfully" });

    } catch (error) {
        console.error('Failed to get Data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.toString() });
    }
}

const editOne = async (req, res) => {
    try {
        let result = await Employee.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        result.modifiedAt = new Date()
        await result.save();
        if (!result) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }
        res.status(200).json({ success: true, data: result, message: "Employee updated successfully" });

    } catch (error) {
        console.error('Failed to create Data:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.toString() });
    }
};

const deleteData = async (req, res) => {
    try {
        const result = await Employee.deleteOne({ _id: req.params.id });
        if (!result) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }
        res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (err) {
        console.error('Failed to delete Empoyee:', err);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.toString() });
    }
}
module.exports = { getAll, addOne, getOne, editOne, deleteData };