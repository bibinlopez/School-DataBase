const Class = require('../models/class')

const classController = {
    addClass: (req, res) => {
        var data = req.body
        // console.log('data',data);
        Class.findOne({ $and: [ { standard: req.body.standard }, { division: req.body.division }]})
            .then((result) => {
                if (result) {
                    console.log(result);
                    return res.status(422).json({
                        success: false,
                        error: "already exist"
                    })
                } else {
                    
                    var class1 = new Class(req.body)
                    class1.save()
                        .then((result) => {
                            console.log('result', result);
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
            })
            .catch((err) => {
                return res.status(422).json({
                    success: false,
                    error: err
                })
            })

    },
    listClass: (req, res) => {
        Class.find()
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
    getClass: (req, res) => {
        Class.findById(req.params.id)
            .then((result) => {
                if (result) {
                    return res.status(200).json({
                        success: true,
                        data: result
                    })
                } else {
                    return res.status(422).json({
                        success: false,
                        error: "Brand not found"
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
    updateClass: (req, res) => {
        var data = req.body
        Class.findOne({ $and: [ { standard: req.body.standard }, { division: req.body.division }]})
            .then((result) => {
                if (result) {
                    console.log(result);
                    return res.status(422).json({
                        success: false,
                        error: "class already exist"
                    })
                } else {
                    
                    Class.findByIdAndUpdate(req.params.id, { $set: req.body })
                        .then((result) => {
                            if (result) {
                                return res.status(200).json({
                                    success: true,
                                    message: 'successfully updated'
                                })
                            } else {
                                return res.status(422).json({
                                    success: false,
                                    error: "Class not found"
                                })
                            }
                        })
                        .catch((err) => {
                            return res.status(422).json({
                                success: false,
                                error: err
                            })
                        })

                }
            })
            .catch((err) => {
                console.log(err)
                return res.status(422).json({
                    success: false,
                    error: err
                })
            })

    },
    deleteClass: (req, res) => {
        Class.findByIdAndRemove(req.params.id)
            .then((result) => {
                if (result) {
                    return res.status(200).json({
                        success: true,
                        data: "Deleted Class successfully"
                    })
                } else {
                    return res.status(422).json({
                        success: false,
                        error: "Class not found"
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

module.exports = classController