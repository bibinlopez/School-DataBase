const Student = require('../models/student')
const Class = require('../models/class')

const brandController = {
    addStudent: async (req, res) => {
        // var division = await Student.find({ _id: req.body.classId })


        var List = await Student.find({ classId: req.body.classId })
            .then((result) => {
                return result
            })
            .catch((err) => {
                return res.status(422).json({
                    success: false,
                    error: err
                })
            })

        if (!(List.length === 0)) {
            console.log('student list', List);
            console.log('List[0].rollNumber', List[0].rollNumber);

            console.log(List.length);


            var largest = List[0].rollNumber;

            for (var i = 0; i < List.length; i++) {
                if (largest < List[i].rollNumber) {
                    largest = List[i].rollNumber;
                }
            }
            console.log('Roll Number', largest);

            if (largest) {
                var data = {
                    name: req.body.name,
                    mobileNumber: req.body.mobileNumber,
                    classId: req.body.classId,
                    rollNumber: largest + 1
                }
                var student = new Student(data)
                student.save()
                    .then((result) => {
                        return res.status(200).json({
                            success: true,
                            data: result
                        })
                    })
                    .catch((err) => {
                        return res.status(422).json({
                            success: false,
                            error: err
                        })
                    })

            }

        } else {
            // student in the class , add 1st student
            var data = {
                name: req.body.name,
                mobileNumber: req.body.mobileNumber,
                classId: req.body.classId,
                rollNumber: 1
            }
            var student = new Student(data)
            student.save()
                .then((result) => {
                    return res.status(200).json({
                        success: true,
                        data: result
                    })
                })
                .catch((err) => {
                    return res.status(422).json({
                        success: false,
                        error: err
                    })
                })

        }

    },
    listStudent: (req, res) => {
        Student.find()
            .populate("classId")
            .then((result) => {
                return res.status(200).json({
                    success: true,
                    data: result
                })
            })
            .catch((err) => {
                return res.status(422).json({
                    success: false,
                    error: err
                })
            })

    },
    listStudentByClass: async (req, res) => {
        var data = await Student.find({ classId: req.body.classId })
            .populate("classId")
            .then((result) => {
                return result
            })
            .catch((err) => {
                return res.status(422).json({
                    success: false,
                    error: err
                })
            })

            if((data.length===0)){
                return res.status(422).json({
                    success: true,
                    data: "add student first"
                })
            }else{
                return res.status(200).json({
                    success: true,
                    data : data
                })
            }

    },
    listStudentByStandard: async (req, res) => {
        var standard = await Class.find({ standard: req.body.standard })


            .then((result) => {
                return result
            })
            .catch((err) => {
                return res.status(422).json({
                    success: false,
                    error: err
                })
            })
        // console.log('standard', standard[0]._id);
        console.log('length',standard.length);
        if (standard.length===4) {
            Student.find({ $or: [{ classId: standard[2]._id  }, { classId: standard[1]._id }, { classId: standard[0]._id }, { classId: standard[3]._id }] })
                .populate("classId")
                .then((result) => {
                    // console.log('$$$$', result);
                    return res.status(200).json({
                        success: true,
                        data: result
                    })
                })
                .catch((err) => {
                    return res.status(422).json({
                        success: false,
                        error: err
                    })
                })
        }else if (standard.length===3){
            Student.find({ $or: [{ classId: standard[2]._id  }, { classId: standard[1]._id }, { classId: standard[0]._id }] })
                .populate("classId")
                .then((result) => {
                    // console.log('$$$$', result);
                    return res.status(200).json({
                        success: true,
                        data: result
                    })
                })
                .catch((err) => {
                    return res.status(422).json({
                        success: false,
                        error: err
                    })
                })
        }else if(standard.length===2){
            Student.find({ $or: [ { classId: standard[1]._id }, { classId: standard[0]._id }] })
                .populate("classId")
                .then((result) => {
                    // console.log('$$$$', result);
                    return res.status(200).json({
                        success: true,
                        data: result
                    })
                })
                .catch((err) => {
                    return res.status(422).json({
                        success: false,
                        error: err
                    })
                })
        }else if(standard.length===1){
            Student.find({ $or: [ { classId: standard[0]._id }] })
                .populate("classId")
                .then((result) => {
                    // console.log('$$$$', result);
                    return res.status(200).json({
                        success: true,
                        data: result
                    })
                })
                .catch((err) => {
                    return res.status(422).json({
                        success: false,
                        error: err
                    })
                })
        }else if(standard.length===0){
            return res.status(422).json({
                success: false,
                data: "add first"
            })
        }else {
            return res.status(422).json({
                success: false,
                data: "Contact developer"
            })
        }


    },
    getStudent: (req, res) => {
        Student.findById(req.params.id)
            .populate({ path: "classId" })
            .then((result) => {
                if (result) {
                    return res.status(200).json({
                        success: true,
                        data: result
                    })
                } else {
                    return res.status(422).json({
                        success: false,
                        error: "Student not found"
                    })
                }
            })
            .catch((err) => {
                return res.status(422).json({
                    success: false,
                    error: err
                })
            })

    },
    updateStudent: (req, res) => {
        //you can't update classId and roll Number
        var data = {
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            classId: req.body.abc,
            rollNumber: req.body.abc
        }
        Student.findByIdAndUpdate(req.params.id, { $set: data })
            .then((result) => {
                if (result) {
                    return res.status(200).json({
                        success: true,
                        message: "student successfully update"
                    })
                } else {
                    return res.status(422).json({
                        success: false,
                        error: "student not found"
                    })
                }
            })
            .catch((err) => {
                console.log('error', err);
                return res.status(422).json({
                    success: false,
                    error: err
                })
            })
    },
    deleteStudent: (req, res) => {
        Student.findByIdAndRemove(req.params.id)
            .then((result) => {
                if (result) {
                    return res.status(200).json({
                        success: true,
                        data: "Deleted student successfully"
                    })
                } else {
                    return res.status(422).json({
                        success: false,
                        error: "student not found"
                    })
                }
            })
            .catch((err) => {
                return res.status(422).json({
                    success: false,
                    error: err
                })
            })

    },
}

module.exports = brandController